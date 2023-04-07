import React, { useState } from "react";
import BrowseWrapper from "../components/BrowseWrapper";
import { db } from "../firebase";
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

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <BrowseWrapper
        animals={animals}
        setAnimals={updateAnimals}
        user={user}
      />
    </motion.div>
  );
};

export async function getServerSideProps() {
  const animalsSnapshot = await db.collection("animals").get();
  const animals = animalsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      timestamp: data.timestamp ? data.timestamp.toDate().toISOString() : null,
    };
  });
  console.log("Animals fetched in getServerSideProps:", animals);
  return {
    props: {
      animals,
    },
  };
}

export default BrowsePage;

// Path: pages\browse.js
