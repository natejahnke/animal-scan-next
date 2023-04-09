import React from "react";
import Image from "next/image";
import { db } from "../../firebase";
import AnimalCaption from "../../components/AnimalCaption";

const AnimalDetails = ({ animal }) => {
  if (!animal) {
    return (
      <div className="flex items-center justify-center min-h-screen"></div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 mx-auto space-y-4 max-w-7xl">
      <div className="w-auto h-48 overflow-hidden rounded-md md:h-64 lg:h-96">
        <Image
          src={animal.imageURL}
          alt={animal.name}
          width="0"
          height="0"
          sizes="100vw"
          className="object-contain w-auto h-full"
        />
      </div>
      <AnimalCaption
        animalName={animal.name}
        fullCaption={animal.caption}
        animalInfo={animal.info}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const animalSnapshot = await db.collection("animals").doc(id).get();
  const animal = { id: animalSnapshot.id, ...animalSnapshot.data() };

  return {
    props: {
      animal,
    },
  };
}

export default AnimalDetails;

// Path: pages\animals\[id].js
