import React, { useState, useEffect } from "react";
import BrowseWrapper from "../components/BrowseWrapper";
import { db, initializePerformanceMonitoring } from "../firebase";
import { motion } from "framer-motion";
import {
  pageVariants,
  pageTransition,
} from "../components/utils/pageTransitions";

const BrowsePage = ({ animals, user }) => {
  const [animalList, setAnimalList] = useState(animals);

  const updateAnimals = (newAnimals) => {
    setAnimalList(newAnimals);
  };

  useEffect(() => {
    // Initialize performance monitoring on the client-side
    initializePerformanceMonitoring();
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <BrowseWrapper
        animals={animalList}
        setAnimals={updateAnimals}
        user={user}
      />
    </motion.div>
  );
};

export async function getStaticProps() {
  const animalsSnapshot = await db.collection("animals").get();
  const animals = animalsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      timestamp: data.timestamp ? data.timestamp.toDate().toISOString() : null,
    };
  });

  console.log("Animals fetched in getStaticProps:", animals);
  return {
    props: {
      animals,
    },
    revalidate: 60, // Revalidate the data every 60 seconds
  };
}

export default BrowsePage;

// Path: pages\browse.js
