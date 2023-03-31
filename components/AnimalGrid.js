import React from "react";
import Image from "next/image";

const AnimalGrid = ({ animals }) => {
  return (
    <div className="grid gap-6 mx-auto max-w-7xl w-[300px] sm:grid-cols-2 sm:w-auto md:grid-cols-3 lg:grid-cols-4">
      {animals.map((animal) => (
        <div
          key={animal.id}
          className="relative max-w-[300px] bg-white shadow-md"
        >
          <div className="relative w-full h-0 pb-[66.666%]">
            <Image
              src={animal.imageURL}
              alt={animal.name}
              quality={50}
              placeholder="blurDataURL"
              fill
              className={`mx-auto object-cover rounded-lg transition duration-500 ease-in-out transform hover:scale-110`}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full py-1 text-lg font-semibold text-center text-white bg-black rounded-lg bg-opacity-70">
            {animal.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimalGrid;
