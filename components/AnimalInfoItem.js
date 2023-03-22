import React from "react";

const AnimalInfoItem = ({ title, content, icon }) => {
  return (
    <div className="w-full max-w-md-mx-auto">
      <div className="transition bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-md">
        <div className="p-4 md:p-5">
          <div className="flex">
            {React.cloneElement(icon, {
              className: "shrink-0 w-5 h-5 text-gray-800 dark:text-gray-200",
              onClick: () => alert("Hi!"),
            })}
            <div className="ml-5 grow">
              <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                {title}
              </h3>
              <p className="text-sm text-gray-500">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalInfoItem;

// Path: components\AnimalInfoItem.js
