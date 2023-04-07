import AnimalDetails from "../components/AnimalDetails";
import Link from "next/link";
import { ArrowLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import {
  pageVariants,
  pageTransition,
} from "../components/utils/pageTransitions";

const AnimalPage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="container px-4 py-8 mx-auto"
    >
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800"
      >
        <button className="flex gap-1 bg-[#3B71CA] text-white hover:bg-white hover:text-[#3B71CA] hover:border-[#3B71CA] border border-transparent px-4 py-2 rounded transition duration-300 active:bg-[#3B71CA] active:text-white active:border-transparent focus:outline-none">
          <ArrowLeftIcon className="w-6 h-6" />
          Back
        </button>
      </Link>
      {/* <h1 className="mb-4 text-2xl font-bold">Animal Details</h1> */}
      <AnimalDetails />
    </motion.div>
  );
};

export default AnimalPage;
