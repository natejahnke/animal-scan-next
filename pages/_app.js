import React, { useState } from "react";
import AnimalCaption from "../components/AnimalCaption";
import AnimalImage from "../components/AnimalImage";
import { BarLoader } from "react-spinners";
import "../styles/globals.css";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue-1 via-dark-blue-2 to-dark-blue-3">
      <main className="px-4 py-6">
        <div className="mx-auto bg-dark-blue-2 text-light-yellow rounded-xl shadow-lg py-4 px-1 sm:p-6 sm:w-[90%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[60%]">
          <h1 className="text-3xl font-bold text-center mb-1">
            Nate's AI Animal Detector
          </h1>
          <h3 className="text-center text-yellow mb-4">
            Upload an image of an animal to find out its name with Nate's AI
            Animal Detector
          </h3>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12">
            <div className="lg:w-1/2 mb-4 lg:mb-0">
              <AnimalImage
                onImageProcess={handleImageProcess}
                onImageUpload={handleImageUpload}
                onLoadingComplete={handleLoadingComplete}
                setLoading={setLoading}
              />
            </div>
            <div className="lg:w-1/2">
              {loading ? (
                <div className="flex items-center justify-center h-24">
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
      <footer className="fixed bottom-0 left-0 w-full py-4 text-center text-yellow bg-dark-blue-2">
        <p>
          🔍
          <a
            href="https://github.com/natejahnke/animal-scan-next"
            className="hover:text-light-yellow transition-colors duration-300"
          >
            https://github.com/natejahnke/animal-scan-next🔍
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

// Path: pages\_app.js
