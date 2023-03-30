import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { db } from "../firebase";

const Browse = ({ animals }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>Browse Animals</title>
      </Head>
      <div className="px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-center">Browse Animals</h1>
        <div className="grid gap-6 mx-auto w-[300px] sm:grid-cols-2 sm:w-auto md:grid-cols-3 lg:grid-cols-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="relative max-w-[300px] bg-white shadow-md"
            >
              <div className="relative w-full h-0 pb-[66.666%]">
                <Image
                  src={animal.imageURL}
                  alt={animal.name}
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

export default Browse;

// Path: pages\browse.js
