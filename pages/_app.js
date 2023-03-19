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
    <main className="px-2 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center">
          Nate's AI Animal Detector
        </h1>
        <h3 className="text-center text-gray-700">
          Upload an image of an animal to find out its name with Nate's AI
          Animal Detector
        </h3>
        <AnimalImage
          onImageProcess={handleImageProcess}
          onImageUpload={handleImageUpload}
          onLoadingComplete={handleLoadingComplete}
          setLoading={setLoading}
        />
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <BarLoader color="#f11946" />
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
        <footer className="fixed bottom-0 left-0 w-full py-4 text-center text-gray-300 bg-gray-900">
          <p>
            🔍
            <a href="https://github.com/natejahnke">
              https://github.com/natejahnke🔍
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;

// Path: pages\_app.js
