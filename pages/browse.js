import React from "react";
import Image from "next/image";
import Head from "next/head";
import { db } from "../firebase";

const Browse = ({ animals }) => {
  console.log("Fetched animals:", animals);
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>Browse Animals</title>
      </Head>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center">Browse Animals</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="relative max-w-[300px] overflow-hidden bg-white rounded-md shadow-md"
            >
              <Image
                src={animal.imageURL}
                alt={animal.name}
                width={300}
                height={200}
                className={`mx-auto transition duration-500 ease-in-out transform hover:scale-110`}
              />
              <div className="absolute bottom-0 left-0 w-full py-1 text-lg font-semibold text-white text-center bg-black bg-opacity-70">
                {animal.name}
              </div>
            </div>
          ))}
        </div>
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
      timestamp: data.timestamp.toDate().toISOString(), // Convert Firestore timestamp to ISO string
    };
  });
  console.log("Animals fetched in getServerSideProps:", animals);
  return {
    props: {
      animals,
    },
  };
}

export default Browse;

// Path: pages\browse.js
