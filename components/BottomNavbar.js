import React from "react";
import Link from "next/link";
import { CameraSharp, HomeSharp } from "react-ionicons";

const BottomNavbar = ({ user, signIn, signOut }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-green-500 p-2 md:hidden">
      <Link href={"/"} className="flex items-center text-white">
        <HomeSharp />
        <span className="ml-2">Home</span>
      </Link>
      <label className="flex items-center text-white">
        <CameraSharp />
        <span className="ml-2">Add Animal</span>
      </label>
      {user ? (
        <a onClick={signOut} className="flex items-center text-white">
          <img
            src={user.photoURL}
            className="w-6 h-6 rounded-full"
            alt="Profile"
          />
        </a>
      ) : (
        <button onClick={signIn} className="text-white">
          Sign in
        </button>
      )}
    </div>
  );
};

export default BottomNavbar;
