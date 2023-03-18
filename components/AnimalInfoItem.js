import React from "react";

const AnimalInfoItem = ({ title, content }) => {
  return (
    <div className="mb-2">
      <span className="font-bold capitalize">{title}:</span>{" "}
      <span className="text-gray-600">{content}</span>
    </div>
  );
};

export default AnimalInfoItem;

// Path: animal-detector-react\src\components\AnimalInfoItem.js
