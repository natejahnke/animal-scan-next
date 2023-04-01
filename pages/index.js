import React, { useState, useEffect } from "react";
import Head from "next/head";
import AnimalCaption from "../components/AnimalCaption";
import AnimalImage from "../components/AnimalImage";
import BrowseWrapper from "../components/BrowseWrapper";
import { RiseLoader } from "react-spinners";
import { CloudUploadSharp, LogoGithub, LogoReact } from "react-ionicons";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function Home({ user }) {
  // Declare state variables
  const [animalName, setAnimalName] = useState("");
  const [fullCaption, setFullCaption] = useState("");
  const [animalInfo, setAnimalInfo] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const animalsSnapshot = await db.collection("animals").get();
      const animalsData = animalsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate().toISOString(),
        };
      });
      setAnimals(animalsData);
    };

    fetchAnimals();
  }, []);

  // Function to update state variables when image processing is complete
  const handleImageProcess = async (
    name,
    caption,
    info,
    imageURL,
    imageFile,
    uploadedImageURL
  ) => {
    // Add 'async' here
    setAnimalName(name);
    setFullCaption(caption);
    setAnimalInfo(info);
    setImageUploaded(true);
    setImageURL(imageURL);

    if (name && caption && info && imageFile) {
      // Upload image to Firebase Storage
      // const storageRef = storage.ref();
      // const imageRef = storageRef.child(`images/${imageFile.name}`);
      // await imageRef.put(imageFile);
      // const imageUrl = await imageRef.getDownloadURL();

      const dataToSave = {
        name,
        caption,
        info,
        imageURL: uploadedImageURL,
        username: user.displayName,
        userId: user.uid,
        email: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), // For Firestore
      };
      try {
        // Realtime Database
        // const newAnimalRef = db.ref("animals").push();
        // await newAnimalRef.set(dataToSave);

        // Firestore
        await db.collection("animals").add(dataToSave);

        console.log("Data saved to the database");
      } catch (error) {
        console.error("Error saving data to the database:", error);
      }
    }
  };

  // Function to set imageUploaded state variable to true
  const handleImageUpload = () => {
    setImageUploaded(true);
  };

  // Function to set loading state variable to false
  const handleLoadingComplete = () => {
    setLoading(false);
  };

  // Function to trigger a click event on the file input element
  const handleButtonClick = () => {
    if (user) {
      document.getElementById("fileinput").click();
    } else {
      alert("Please sign in to upload an image.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Nate's AI Animal Detector</title>
        <meta
          name="description"
          content="Upload an image of an animal to find out its name with Nate's AI Animal Detector"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <main className="flex-grow m-2 sm:m-4">
        <div className="px-1 mx-auto text-gray-800 shadow-lg bg-slate-50 rounded-xl sm:p-1">
          <h1 className="mb-1 text-3xl font-bold text-center">
            AI Wildlife Explorer
          </h1>
          <h3 className="mb-2 text-center text-gray-800">
            Explore the world of animals with AI Wildlife Explorer - upload an
            image and unveil fascinating insights about common species!
          </h3>
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              {" "}
              <button
                disabled={!user}
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                className={`mb-2 flex rounded px-12 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out ${
                  user
                    ? "bg-[#3B71CA] text-white shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleButtonClick}
              >
                <CloudUploadSharp color="#ffffff" className="pr-2" />
                Upload Image
              </button>
              {!user && (
                <div className="flex items-center justify-center shadow-lg alert alert-error">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 w-6 h-6 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Sign In with Google! to upload an Animal Image</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="col-span-1 lg:mb-0">
              <AnimalImage
                onImageProcess={handleImageProcess}
                onImageUpload={handleImageUpload}
                onLoadingComplete={handleLoadingComplete}
                setLoading={setLoading}
                alt={`${animalName} image`}
                onButtonClick={handleButtonClick}
                user={user}
              />
            </div>
            <div className="lg:col-span-2">
              {loading ? (
                <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex items-center justify-center z-50">
                  <RiseLoader color="#3B71CA" />
                </div>
              ) : (
                imageUploaded && (
                  <AnimalCaption
                    animalName={animalName}
                    fullCaption={fullCaption}
                    animalInfo={animalInfo}
                  />
                )
              )}
            </div>
          </div>
          <BrowseWrapper animals={animals} user={user} />
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-slate-50">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex justify-center space-x-6 text-gray-800">
            <a
              href="https://github.com/natejahnke/animal-scan-next"
              className="hover:text-[#3B71CA] transition-colors duration-300 flex items-center space-x-1"
            >
              <LogoGithub className="" />
              <span>Github</span>
            </a>
            <span className="flex space-x-1 text-gray-600">
              Built with
              <LogoReact className="w-4 h-4" />
              <span>
                Next.js, Tailwind CSS, OpenAI, and Azure Computer Vision
              </span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Path: pages\index.js
