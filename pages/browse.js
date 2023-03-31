import React from "react";
import BrowseWrapper, { getServerSideProps } from "../components/BrowseWrapper";

const BrowsePage = ({ animals, user }) => {
  return (
    <BrowseWrapper
      animals={animals}
      user={user}
    />
  );
};

export { getServerSideProps };

export default BrowsePage;

// Path: pages\browse.js
