import React, { useEffect, useState } from "react";
import AnimalInfoItem from "./AnimalInfoItem";

function AnimalCaption({ animalName, fullCaption, animalInfo }) {
  // Define a state variable to store structured animal information
  const [structuredInfo, setStructuredInfo] = useState({});

  // Use the useEffect hook to parse and structure the animal information when it changes
  useEffect(() => {
    if (animalInfo) {
      const parsedInfo = parseAnimalInfo(animalInfo);
      setStructuredInfo(parsedInfo);
    } else {
      setStructuredInfo({});
    }
  }, [animalInfo]);

  // Define a function to parse the animal information and return an object with categories as keys and values as values
  const parseAnimalInfo = (info) => {
    // Make sure the animal information is a string
    if (typeof info !== "string") {
      console.error("Animal info is not a string:", info);
      return {};
    }

    // Define an array of categories that we want to extract from the animal information
    const categories = [
      "Scientific Name",
      "Habitat",
      "Diet",
      "Physical Characteristics",
      "Behavior",
      "Conservation Status",
    ];

    // Create an empty object to store the parsed information
    const parsedInfo = {};

    // Iterate over the categories array and use regex to extract the information for each category
    categories.forEach((category) => {
      const regex = new RegExp(`${category}:\\s*([^\\n]+)`, "i");
      const match = info.match(regex);

      if (match && match[1]) {
        parsedInfo[category] = match[1].trim();
      } else {
        parsedInfo[category] = "Not available";
      }
    });

    return parsedInfo;
  };

  return (
    // Render the animal caption component
    <div className="px-2 bg-white rounded-lg shadow-lg">
        <>
          <h3 id="animalName" className="mb-4 text-2xl font-bold text-center">
            {animalName}
          </h3>
          <h3 id="AIresponse" className="mb-6 text-lg text-center">
            {fullCaption}
          </h3>
          {/* Render the structured animal information using the AnimalInfoItem component */}
          <div>
            {Object.entries(structuredInfo).map(([key, value]) => (
              <AnimalInfoItem key={key} title={key} content={value} />
            ))}
          </div>
        </>
    </div>
  );
}

export default AnimalCaption;

// Path: animal-detector-react\src\components\AnimalCaption.js
