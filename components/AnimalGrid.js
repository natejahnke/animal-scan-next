import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "../firebase";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const AnimalGrid = ({ animals, searchTerm, user, removeAnimal }) => {
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [deletedAnimalStyles, setDeletedAnimalStyles] = useState({});
  const [deletedAnimalIds, setDeletedAnimalIds] = useState([]);

  useEffect(() => {
    const newFilteredAnimals = animals.filter(
      (animal) =>
        animal.name &&
        animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnimals(newFilteredAnimals);
  }, [animals, searchTerm]);

  const handleDelete = async (event, animalId) => {
    event.preventDefault();
    event.stopPropagation();
    setDeletedAnimalIds((prevDeletedAnimalIds) => [
      ...prevDeletedAnimalIds,
      animalId,
    ]);
  };

  const handleAnimationComplete = async (animalId) => {
    try {
      // Delete the animal document from Firestore
      await db.collection("animals").doc(animalId).delete();
      console.log("Animal deleted with ID:", animalId);

      // Update the filteredAnimals state after the deletion
      setFilteredAnimals((prevAnimals) =>
        prevAnimals.filter((animal) => animal.id !== animalId)
      );
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };

  const deleteAnimation = {
    initial: {
      scale: 1,
      borderRadius: "0%",
    },
    animate: {
      scale: 0,
      borderRadius: "50%",
      transitionEnd: {
        opacity: 0,
      },
    },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  return (
    <div className="grid gap-6 mx-auto max-w-7xl w-[300px] sm:grid-cols-2 sm:w-auto md:grid-cols-3 lg:grid-cols-4">
      {filteredAnimals.map((animal, index) => (
        <Link href={`/animal?id=${animal.id}`} key={animal.id}>
          <motion.div
            key={animal.id}
            className="relative max-w-[300px] bg-white shadow-md"
            initial={deletedAnimalIds.includes(animal.id) ? false : "initial"}
            animate={deletedAnimalIds.includes(animal.id) ? "animate" : false}
            transition={{ ...deleteAnimation.transition }}
            onAnimationComplete={() => handleAnimationComplete(animal.id)}
            variants={deleteAnimation}
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
                onClick={(event) => handleDelete(event, animal.id)}
                className="absolute top-0 right-0 p-1 m-1"
              >
                <XCircleIcon className="w-6 h-6 text-white transition duration-300 ease-in-out transform shadow-md hover:text-slate-800 active:scale-90 active:rotate-12" />
              </button>
            )}
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default AnimalGrid;

// Path: components\AnimalGrid.js
