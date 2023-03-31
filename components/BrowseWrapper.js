import React from "react";
import { db } from "../firebase";
import AnimalGrid from "./AnimalGrid";

const BrowseWrapper = ({ animals }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-center">Browse Animals</h1>
        <AnimalGrid animals={animals} />
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
