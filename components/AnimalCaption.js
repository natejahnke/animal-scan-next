import React, { useEffect, useState } from "react";
import AnimalInfoItem from "./AnimalInfoItem";
import {
  EarthSharp,
  RestaurantSharp,
  SearchSharp,
  FitnessSharp,
  AlertCircleSharp,
  PawSharp,
} from "react-ionicons";

function AnimalCaption({ animalName, fullCaption, animalInfo }) {
  // Define a state variable to store structured animal information
  const [structuredInfo, setStructuredInfo] = useState({});

  const icons = [
    <SearchSharp color="#00000" />,
    <EarthSharp color="#00000" />,
    <RestaurantSharp color="#00000" />,
    <PawSharp color="#00000" />,
    <FitnessSharp color="#00000" />,
    <AlertCircleSharp color="#00000" />,
  ];

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
    <div className="">
      <>
        <h3 id="animalName" className="mt-3 text-2xl font-bold text-gray-800">
          {animalName}
        </h3>
        <h3 id="AIresponse" className="mb-2 text-lg text-gray-800">
          <span className="text-xs font-bold">Azure Computer Vision: </span>
          {fullCaption}
        </h3>
        {/* Render the structured animal information using the AnimalInfoItem component */}
        <div className="grid lg:grid-cols-2 auto-rows-auto gap-4">
          {Object.entries(structuredInfo).map(([key, value], index) => (
            <AnimalInfoItem
              key={key}
              title={key}
              content={value}
              icon={icons[index]}
            />
          ))}
        </div>
      </>
    </div>
  );
}

export default AnimalCaption;

// Path: components\AnimalCaption.js
