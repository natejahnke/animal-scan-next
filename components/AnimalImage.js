import React, { useRef, useState } from "react";
import { animals } from "../pages/animals"
import resizeImage from "./utils/resizeImage";
import fetchAnimalInfo from "./utils/fetchAnimalInfo";

function AnimalImage({ onImageProcess, onImageUpload, onLoadingComplete, setLoading  }) {
  const canvasRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [animalDetails, setAnimalDetails] = useState("");

  const handleFileSelect = async (evt) => {
    setLoading(true);
    onImageProcess("", "", "");
    onImageUpload();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.style.opacity = 0;
    setOpacity(0);

    const files = evt.target.files;
    const file = files[0];

    const img = new Image();
    img.onload = function () {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      context.drawImage(img, 0, 0);
      canvas.style.opacity = 1;
    };
    img.src = URL.createObjectURL(file);

    const fullCaption = await processImage(file);

    let animalName = "";
    for (const name of animals) {
      const regex = new RegExp(`\\b${name}(s)?\\b`, "i");
      if (regex.test(fullCaption)) {
        animalName = name;
        break;
      }
    }

    const prompt = `Give me the common scientific names species, habitat, diet, physical characteristics, behavior, and conservation status for a ${animalName}. Format the response data under the following headings: Scientific Name, Habitat, Diet, Physical Characteristics, Behavior, and Conservation Status.`;
    const animalInfo = animalName
      ? await fetchAnimalInfo(animalName, prompt)
      : "";
    if (animalName) {
      setAnimalDetails(animalDetails); // You can use this information as needed
    }

    onImageProcess(animalName, fullCaption, animalInfo);
    setOpacity(1);
    onLoadingComplete();
  };

  const processImage = async (blobImage) => {
    const subscriptionKey = process.env.REACT_APP_SUBSCRIPTION_KEY;
    const endpoint = process.env.REACT_APP_ENDPOINT;
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

      return fullCaption;
    } catch (error) {
      console.error(`Error processing image: ${error}`);
      return "";
    }
  };

  return (
    <div className="flex flex-col justify-center mt-4">
      <canvas
        ref={canvasRef}
        className={`rounded-lg max-h-80 w-auto object-cover opacity-${opacity} transition-opacity duration-1000`}
      />
      <label
        htmlFor="fileinput"
        className="self-center px-3 py-2 mt-2 font-medium leading-6 text-white bg-indigo-600 rounded-lg"
        style={{ zIndex: 2 }}
      >
        Upload Image
      </label>
      <input
        type="file"
        id="fileinput"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}

export default AnimalImage;

// Path: animal-detector-react\src\components\AnimalImage.js
