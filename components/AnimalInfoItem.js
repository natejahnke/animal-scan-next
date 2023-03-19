import React from "react";

const AnimalInfoItem = ({ title, content }) => {
  return (
    <div className="mb-2">
      <span className="font-bold capitalize text-base">{title}:</span>{" "}
      <span className="text-gray-600 text-xs">{content}</span>
    </div>
  );
};

export default AnimalInfoItem;

// Path: components\AnimalInfoItem.js
