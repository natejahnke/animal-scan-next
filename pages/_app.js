import React, { useState } from "react";
import Head from "next/head";
import AnimalCaption from "../components/AnimalCaption";
import AnimalImage from "../components/AnimalImage";
import { BarLoader } from "react-spinners";
import "../styles/globals.css";
import { CloudUploadSharp, LogoGithub, LogoReact } from "react-ionicons";

function App() {
  const [animalName, setAnimalName] = useState("");
  const [fullCaption, setFullCaption] = useState("");
  const [animalInfo, setAnimalInfo] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageProcess = (name, caption, info) => {
    setAnimalName(name);
    setFullCaption(caption);
    setAnimalInfo(info);
    setImageUploaded(true);
  };

  const handleImageUpload = () => {
    setImageUploaded(true);
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleButtonClick = () => {
    document.getElementById("fileinput").click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue-1 via-dark-blue-2 to-dark-blue-3">
      <Head>
        <title>Nate's AI Animal Detector</title>
        <meta
          name="description"
          content="Upload an image of an animal to find out its name with Nate's AI Animal Detector"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <main className="m-4">
        <div className="mx-auto bg-slate-50 text-gray-800 rounded-xl shadow-lg px-1 sm:p-1">
          <h1 className="text-3xl font-bold text-center mb-1">
            Nate's AI Animal Detector
          </h1>
          <h3 className="text-center text-gray-800">
            Upload an image of an animal to find out its name with Nate's AI
            Animal Detector
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
      <footer className="flex justify-center text-xs bottom-0 left-0 w-full py-4 text-center text-grey-800">
        <a
          href="https://github.com/natejahnke/animal-scan-next"
          className="hover:text-[#3B71CA] transition-colors duration-300 ml-1 flex"
        >
          <LogoGithub className="" />
          Github
        </a>
        <span className="text-gray-600 flex ml-2">
          Built with <LogoReact />
          Next.js, Tailwind CSS, OpenAI, and Azure Computer Vision
        </span>
      </footer>
    </div>
  );
}

export default App;

// Path: pages\_app.js
