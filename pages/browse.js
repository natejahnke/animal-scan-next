import React from "react";
import BrowseWrapper, { getServerSideProps } from "../components/BrowseWrapper";

const BrowsePage = ({ animals }) => {
  return <BrowseWrapper animals={animals} />;
};

export { getServerSideProps };

export default BrowsePage;

// Path: pages\browse.js
