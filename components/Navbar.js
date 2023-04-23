import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, provider } from "../firebase";
import { CameraSharp, HomeSharp } from "react-ionicons";
import BottomNavbar from "./BottomNavbar";

const Navbar = ({ user, setUser }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const signIn = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      setUser(result.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="text-green-50 navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/browse"}>Explore Animals</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={"/"} className="text-xl normal-case btn btn-ghost">
          <HomeSharp color="#FFFFFF" className="mr-1" />
          AIWild
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <CameraSharp color="#FFFFFF" />
          <span className="text-xs">Add Animal</span>
        </button>
        <div className="dropdown dropdown-end">
          {user ? (
            <>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                {/* <li>
                  <a className="justify-between" btn-disabled	>Profile</a>
                </li> */}
                <li>
                  <a onClick={signOut}>Logout</a>
                </li>
              </ul>
            </>
          ) : (
            <button onClick={signIn} className="btn btn-ghost">
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// Path: components\Navbar.js
