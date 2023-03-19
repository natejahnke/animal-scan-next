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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-purple-800">
            Nate's AI Animal Detector
          </h1>
          <h3 className="text-center text-gray-700 mt-2">
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
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full py-4 text-center text-gray-300 bg-gray-900">
        <p>
          🔍
          <a
            href="https://github.com/natejahnke/animal-scan-next"
            className="hover:text-white transition-colors duration-300"
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
