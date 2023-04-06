import AnimalDetails from "../components/AnimalDetails";
import Link from "next/link";
import { ArrowLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";

const AnimalPage = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800"
      >
        <button className="gap-1 btn btn-outline">
          <ArrowLeftIcon className="w-6 h-6" />
          Button
        </button>
      </Link>
      {/* <h1 className="mb-4 text-2xl font-bold">Animal Details</h1> */}
      <AnimalDetails />
    </div>
  );
};

export default AnimalPage;
