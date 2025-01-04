import React from "react";
import Image from "next/image";
import DeckForm from "@/components/forms/deck";

const CreateDeckPage = () => {
  return (
    <main className="flex items-center justify-center gap-[22px] w-full h-full">
      <DeckForm />
      <Image src="/create/decks.png" alt="cards" width={409} height={493} />
      <Image
        src="/create/bg.png"
        alt="background"
        width={1920}
        height={1080}
        className="absolute z-[-10] top-0"
      />
    </main>
  );
};
export default CreateDeckPage;
