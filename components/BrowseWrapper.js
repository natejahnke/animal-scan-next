import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../firebase";
import AnimalGrid from "./AnimalGrid";
import { PawSharp } from "react-ionicons";

const BrowseWrapper = ({ animals, user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [uploadedAnimals, setUploadedAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState(animals);

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    setFilteredAnimals(
      filter === "user"
        ? animals.filter((animal) => animal.username === user?.displayName)
        : animals
    );
  }, [filter, animals, user]);

  const removeAnimal = (animalId) => {
    setFilteredAnimals(
      filteredAnimals.filter((animal) => animal.id !== animalId)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-8">
        <div className="flex flex-col mx-auto max-w-7xl md:flex-row md:items-center md:justify-between md:space-x-4">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
            <Link href={"/browse"}>
              <span className="flex items-center justify-center">
                <PawSharp />
                <span className="ml-2">Browse Animals</span>
              </span>
            </Link>
          </h1>
          {user && (
            <div className="flex justify-center mb-6 space-x-4">
              <button
                onClick={() => handleFilter("all")}
                className={`${
                  filter === "all" ? "bg-blue-500" : "bg-white"
                } px-4 py-2 text-gray-800 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200`}
              >
                All Animals
              </button>

              <button
                onClick={() => handleFilter("user")}
                className={`${
                  filter === "user" ? "bg-blue-500" : "bg-white"
                } px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200`}
                disabled={!user}
              >
                My Animals
              </button>
            </div>
          )}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search animals..."
              className="px-4 py-2 w-[300px] text-gray-700 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <AnimalGrid
          animals={filteredAnimals}
          searchTerm={searchTerm}
          uploadedAnimals={uploadedAnimals}
          removeAnimal={removeAnimal}
          user={user}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const animalsSnapshot = await db.collection("animals").get();
  const animals = animalsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      timestamp: data.timestamp.toDate().toISOString(),
    };
  });
  console.log("Animals fetched in getServerSideProps:", animals);
  return {
    props: {
      animals,
    },
  };
}

export default BrowseWrapper;

// Path: components\BrowseWrapper.js
