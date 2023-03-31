import React, { useState } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <div className="content">
      <Navbar
        user={user}
        setUser={setUser}
      />
      {React.cloneElement(children, { user })}
    </div>
  );
};

export default Layout;

// Path: components\Layout.js
