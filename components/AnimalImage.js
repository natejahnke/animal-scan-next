import React, { useRef, useState } from "react";
import { animals } from "../public/animals";
import resizeImage from "./utils/resizeImage";
import fetchAnimalInfo from "./utils/fetchAnimalInfo";
import Image from "next/image";
import { db, storage } from "../firebase";

function AnimalImage({
  onImageProcess,
  onImageUpload,
  onLoadingComplete,
  setLoading,
  alt,
  onButtonClick,
  user,
  setUploadedAnimals,
}) {
  const [opacity, setOpacity] = useState(0);
  const [animalDetails, setAnimalDetails] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  const isAnimal = (caption) => {
    for (const name of animals) {
      const regex = new RegExp(`\\b${name}(s)?\\b`, "i");
      if (regex.test(caption)) {
        return true;
      }
    }
    return false;
  };

  const handleButtonClick = () => {
    if (user) {
      fileInputRef.current.click();
    } else {
      onButtonClick();
    }
  };

  const handleFileSelect = async (evt) => {
    console.log("handleFileSelect called");
    const file = evt.target.files[0];

    // Check if a file was selected
    if (!file) {
      return;
    }

    setImageSrc(URL.createObjectURL(file));
    setLoading(true);
    setErrorMessage("");
    setLoading(true);
    onImageProcess("", "", "", "");
    onImageUpload();
    setOpacity(0);

    const img = new window.Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setImageSrc(URL.createObjectURL(file));
      setOpacity(1);
    };
    img.src = URL.createObjectURL(file);

    const fullCaption = await processImage(file);
    console.log("processImage returned:", fullCaption);
    let animalName;
    for (const name of animals) {
      const regex = new RegExp(`\\b${name}(s)?\\b`, "i");
      if (regex.test(fullCaption)) {
        animalName = name;
        break;
      }
    }

    const prompt = `Give me the common scientific names species, habitat, diet, physical characteristics(include typical size and weight and largest on record), behavior, and conservation status for a ${animalName}. Format the response data under the following headings: Scientific Name, Habitat, Diet, Physical Characteristics, Behavior, and Conservation Status. Highlight key info, Keep concise.`;
    const animalInfo = animalName
      ? await fetchAnimalInfo(animalName, prompt)
      : "";
    if (animalName) {
      setAnimalDetails(animalInfo);
    }
    const uploadedImageURL = await uploadImage(file, animalName);
    onImageProcess(
      animalName,
      fullCaption,
      animalInfo,
      imageSrc,
      file,
      uploadedImageURL
    );
    setLoading(false);
    setUploadedAnimals((prevAnimals) => [
      ...prevAnimals,
      {
        animalName,
        fullCaption,
        animalInfo,
        imageSrc,
      },
    ]);
  };

  const uploadImage = async (blobImage, animalName) => {
    if (!animalName) return null;

    const storageRef = storage.ref();
    const animalImageRef = storageRef.child(
      `animal_images/${animalName}/${blobImage.name}`
    );
    const snapshot = await animalImageRef.put(blobImage);

    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  };

  const processImage = async (blobImage) => {
    console.log("processImage called");
    const subscriptionKey = process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY;
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    const uriBase = endpoint + "vision/v3.2/analyze";

    const params = {
      visualFeatures: "Categories,Description,Color",
      details: "",
      language: "en",
    };

    try {
      const resizedBlob = await resizeImage(blobImage, 1000, 1000, 0.7);
      const response = await fetch(
        uriBase + "?" + new URLSearchParams(params),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
          body: resizedBlob,
        }
      );
      const data = await response.json();

      const fullCaption = data?.description?.captions?.[0]?.text ?? "";
      if (!isAnimal(fullCaption)) {
        setErrorMessage(
          "No animal detected. Please upload an image of an animal."
        );
        onLoadingComplete();
        return "";
      } else {
        setErrorMessage("");
      }

      return fullCaption;
    } catch (error) {
      console.error(`Error processing image: ${error}`);
      return "";
    }
  };

  const aspectRatio = dimensions.width / dimensions.height;

  return (
    <div className="flex flex-col justify-center mt-4">
      {imageSrc && (
        <div className="h-[30vh] sm:h-[50vh]">
          <Image
            src={imageSrc}
            alt={alt}
            width={dimensions.width}
            height={dimensions.height}
            className={`mx-auto object-cover transition-opacity duration-1000 ${
              opacity === 1 ? "opacity-100" : "opacity-0"
            } rounded-lg`}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              height: "auto",
              width: `calc(100% * ${aspectRatio})`,
            }}
          />
        </div>
      )}
      <input
        type="file"
        id="fileinput"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
        // disabled={!user}
        ref={fileInputRef}
      />

      {errorMessage && (
        <div className="p-4 mt-4 border rounded-md shadow-md bg-dark-blue-2 text-yellow border-dark-blue-1">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5zm-1 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">Error</h3>
              <div className="mt-2 text-sm">{errorMessage}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimalImage;

// Path: components\AnimalImage.js
