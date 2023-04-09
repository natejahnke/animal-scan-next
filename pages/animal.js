import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AnimalDetails from "./animals/[id]";
import Link from "next/link";
import { ArrowLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { db, initializePerformanceMonitoring } from "../firebase";
import { motion } from "framer-motion";
import {
  pageVariants,
  pageTransition,
} from "../components/utils/pageTransitions";

const AnimalPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    // Initialize performance monitoring on the client-side
    initializePerformanceMonitoring();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchAnimal = async () => {
        const animalSnapshot = await db.collection("animals").doc(id).get();
        setAnimal({ id: animalSnapshot.id, ...animalSnapshot.data() });
      };
      fetchAnimal();
    }
  }, [id]);

  if (!animal) {
    return (
      <div className="flex items-center justify-center min-h-screen"></div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="container px-4 py-8 mx-auto"
    >
      <Link href="/" className="text-blue-600 hover:text-blue-800">
        <button className="flex gap-1 bg-[#3B71CA] text-white hover:bg-white hover:text-[#3B71CA] hover:border-[#3B71CA] border border-transparent px-4 py-2 rounded transition duration-300 active:bg-[#3B71CA] active:text-white active:border-transparent focus:outline-none">
          <ArrowLeftIcon className="w-6 h-6" />
          Back
        </button>
      </Link>
      <AnimalDetails animal={animal} />
    </motion.div>
  );
};

export default AnimalPage;

// Path: pages\animal.js
