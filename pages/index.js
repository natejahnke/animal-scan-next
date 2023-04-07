import React, { useState, useEffect } from "react";
import Head from "next/head";
import AnimalCaption from "../components/AnimalCaption";
import AnimalImage from "../components/AnimalImage";
import BrowseWrapper from "../components/BrowseWrapper";
import { RiseLoader } from "react-spinners";
import { CloudUploadSharp } from "react-ionicons";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { motion } from "framer-motion";
import {
  pageVariants,
  pageTransition,
} from "../components/utils/pageTransitions";

export default function Home({ user }) {
  // Declare state variables
  const [animalName, setAnimalName] = useState("");
  const [fullCaption, setFullCaption] = useState("");
  const [animalInfo, setAnimalInfo] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [animals, setAnimals] = useState([]);
  const [showSignInMessage, setShowSignInMessage] = useState(false);
  const [uploadedAnimals, setUploadedAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const animalsSnapshot = await db.collection("animals").get();
      const animalsData = animalsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp
            ? data.timestamp.toDate().toISOString()
            : null,
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

    const dataToSave = {
      name,
      caption,
      info,
      imageURL: uploadedImageURL,
      username: user ? user.displayName : "",
      userId: user ? user.uid : "",
      email: user ? user.email : "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      if (user) {
        const docRef = await db.collection("animals").add(dataToSave);
        console.log("Data saved to the database");

        // Update the animals state with the new animal
        setAnimals([
          ...animals,
          {
            id: docRef.id,
            ...dataToSave,
            timestamp: new Date().toISOString(),
          },
        ]);
      } else {
        setShowSignInMessage(true);
      }
    } catch (error) {
      console.error("Error saving data to the database:", error);
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
    document.getElementById("fileinput").click();
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="flex flex-col min-h-screen">
        <Head>
          <title>Nate's AI Animal Detector</title>
          <meta
            name="description"
            content="Upload an image of an animal to find out its name with Nate's AI Animal Detector"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
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
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className={
                    "mb-2 flex rounded px-12 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out bg-[#3B71CA] text-white shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  }
                  onClick={handleButtonClick}
                >
                  <CloudUploadSharp
                    color="#ffffff"
                    className="pr-2"
                  />
                  Upload Image
                </button>
                {!user && showSignInMessage && (
                  <div className="mt-2 text-sm text-red-500">
                    Please sign in to save images to the database.
                  </div>
                )}
                {user && (
                  <div className="mt-2 text-sm text-green-500">
                    You are signed in. Images you upload will be saved to the
                    database.
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
                  uploadedAnimals={uploadedAnimals}
                  setUploadedAnimals={setUploadedAnimals}
                />
              </div>
              <div className="lg:col-span-2">
                {loading ? (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
            <BrowseWrapper
              animals={animals}
              setAnimals={setAnimals}
              user={user}
              // uploadedAnimals={uploadedAnimals}
            />
          </div>
        </main>
      </div>
    </motion.div>
  );
}

// Path: pages\index.js
