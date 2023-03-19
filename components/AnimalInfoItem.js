import React from "react";

const AnimalInfoItem = ({ title, content }) => {
  return (
    <div className="mb-2">
      <div className="px-2 bg-white rounded-lg shadow-lg transition-opacity duration-500 ease-in opacity-0 animate-fadeIn">
        <span className="font-bold capitalize text-base">{title}:</span>{" "}
        <span className="text-gray-600 text-xs">{content}</span>
      </div>
    </div>
  );
};

export default AnimalInfoItem;

// Path: components\AnimalInfoItem.js
