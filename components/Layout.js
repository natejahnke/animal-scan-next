import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { auth, provider } from "../firebase";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);

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
    <div className="content">
      <>
        <Navbar
          user={user}
          setUser={setUser}
          signIn={signIn}
          signOut={signOut}
        />
      </>
      {React.cloneElement(children, { user })}
      <Footer />
    </div>
  );
};

export default Layout;

// Path: components\Layout.js
