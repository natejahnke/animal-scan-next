import React, { useState } from "react";
import Head from "next/head";
import AnimalCaption from "../components/AnimalCaption";
import AnimalImage from "../components/AnimalImage";
import { BarLoader } from "react-spinners";
import "../styles/globals.css";
import { CloudUploadSharp, LogoGithub, LogoReact } from "react-ionicons";

// Main App component
function App() {
  // Declare state variables
  const [animalName, setAnimalName] = useState("");
  const [fullCaption, setFullCaption] = useState("");
  const [animalInfo, setAnimalInfo] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to update state variables when image processing is complete
  const handleImageProcess = (name, caption, info) => {
    setAnimalName(name);
    setFullCaption(caption);
    setAnimalInfo(info);
    setImageUploaded(true);
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
          Explore the world of animals with AI Wildlife Explorer - upload an image and unveil fascinating insights about common species!
          </h3>
          <div className="flex justify-center">
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="flex rounded bg-[#3B71CA] px-12 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] self-center"
              onClick={handleButtonClick}
            >
              <CloudUploadSharp color="#ffffff" className="pr-2" />
              Upload Image
            </button>
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
              />
            </div>
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex items-center self-center justify-center h-24">
                  <BarLoader color="#ffc300" />
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
          <span>Next.js, Tailwind CSS, OpenAI, and Azure Computer Vision</span>
          </span>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default App;

// Path: pages\_app.js
