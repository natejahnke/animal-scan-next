import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "../firebase";
import { XCircleIcon } from "@heroicons/react/24/solid";

const AnimalGrid = ({
  animals,
  searchTerm,
  // uploadedAnimals,
  user,
  removeAnimal,
}) => {
  const [deletedAnimals, setDeletedAnimals] = useState([]);
  const combinedAnimals = [...animals];
  const [deletedAnimalStyles, setDeletedAnimalStyles] = useState({});
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  useEffect(() => {
    const newFilteredAnimals = animals.filter(
      (animal) =>
        animal.name &&
        !deletedAnimals.includes(animal.id) &&
        animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnimals(newFilteredAnimals);
  }, [animals, searchTerm, deletedAnimals]);

  const handleDelete = async (animalId, removeAnimal) => {
    try {
      setDeletedAnimalStyles((prevStyles) => ({
        ...prevStyles,
        [animalId]: "scale-0",
      }));
      setTimeout(() => {
        removeAnimal(animalId);
        setDeletedAnimalStyles((prevStyles) => {
          const updatedStyles = { ...prevStyles };
          delete updatedStyles[animalId];
          return updatedStyles;
        });
      }, 500);
      await db.collection("animals").doc(animalId).delete();
      console.log("Animal deleted with ID:", animalId);
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };

  return (
    <div className="grid gap-6 mx-auto max-w-7xl w-[300px] sm:grid-cols-2 sm:w-auto md:grid-cols-3 lg:grid-cols-4">
      {filteredAnimals.map((animal, index) => (
        <Link
          href={`/animal?id=${animal.id}`}
          key={animal.id}
        >
          <div
            key={animal.id}
            className={`relative max-w-[300px] bg-white shadow-md transition-all duration-500 ease-in-out ${
              deletedAnimalStyles[animal.id] || ""
            }`}
          >
            <div className="relative group overflow-hidden w-full h-full rounded-md pb-[66.666%]">
              <Image
                src={animal.imageURL}
                alt={animal.name}
                fill
                placeholder="blur"
                blurDataURL={animal.imageURL}
                sizes="(max-width: 640px) 300px, (max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
                className={`mx-auto object-cover w-full h-full transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:shadow-2xl`}
                priority={index < 2}
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full py-1 text-lg font-semibold text-center text-white bg-black rounded-md bg-opacity-70">
              {animal.name}
            </div>
            {user && animal.username === user.displayName && (
              <button
                onClick={() => handleDelete(animal.id, removeAnimal)}
                className="absolute top-0 right-0 p-1 m-1"
              >
                <XCircleIcon className="w-6 h-6 text-white transition duration-300 ease-in-out transform shadow-md hover:text-slate-800 active:scale-90 active:rotate-12" />
              </button>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AnimalGrid;

// Path: components\AnimalGrid.js
