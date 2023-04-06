import React from "react";

const AnimalInfoItem = ({ title, content, icon }) => {
  return (
    <div className="transition bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-md hover:bg-gray-100">
      <div className="p-4 md:p-6">
        <div className="flex items-start space-x-4">
          {React.cloneElement(icon, {
            className: "shrink-0 w-6 h-6 text-gray-800 dark:text-gray-200",
          })}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalInfoItem;

// Path: components\AnimalInfoItem.js
