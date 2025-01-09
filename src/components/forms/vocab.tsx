/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Deck } from "../../../helpers/interfaces";
import { MdAdd } from "react-icons/md";
import { PostVocab } from "../../../actions/main";
import { redirect } from "next/navigation";

const VocabForm: React.FC<{ decks: Deck[] }> = ({ decks }) => {
  const [sentences, setSentences] = useState<string[]>([""]);
  const [state, action] = React.useActionState(PostVocab, []);
  if (state.includes("done")) {
    redirect("/practice");
  }
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    setSentences((prevSentences) => {
      const newSentences = [...prevSentences];
      newSentences[idx] = event.target.value;
      return newSentences;
    });
  };
  return (
    <div className="relative top-[50px] w-8/12 h-fit">
      <h1 className="w-full border-[.5px] border-[#49243E] rounded-[15px] text-[#D8D4D7] font-bold bg-[#49243E] pl-[10px] pt-[4px] text-center h-[73px] mb-[22px] text-[50px]">
        Create Vocab
      </h1>
      <form
        className="relative flex flex-col gap-[14px] items-center mb-[20px]"
        action={action}
      >
        <select
          className={`w-full h-[76px] pl-[15px] rounded-[15px] bg-transparent border-[.5px] border-[#49243e] focus:outline-none duration-[350ms] ${
            !state?.includes("deck")
              ? "border-[#49243e]"
              : " border-red-800 text-red-900"
          }`}
          name="deck"
        >
          <option>Choose Deck</option>
          {decks.map((deck: Deck) => (
            <option key={deck.name} value={deck.name}>
              {deck.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Vocab Name"
          name="name"
          className={`w-full h-[76px] pl-[15px] rounded-[15px] bg-transparent border-[.5px] border-[#49243e] focus:outline-none duration-[350ms] ${
            !state?.includes("name")
              ? "border-[#49243e]"
              : " border-red-800 text-red-900"
          }`}
        />
        <select
          className={`w-full h-[76px] pl-[15px] rounded-[15px] bg-transparent border-[.5px] border-[#49243e] focus:outline-none duration-[350ms] ${
            !state?.includes("type")
              ? "border-[#49243e]"
              : " border-red-800 text-red-900"
          }`}
          name="type"
        >
          <option>Choose Type</option>
          <option>Noun</option>
          <option>Pronoun</option>
          <option>Verb</option>
          <option>Adverb</option>
          <option>Adjective</option>
          <option>Another</option>
        </select>
        <input
          type="text"
          placeholder="Vocab Translation"
          name="translation"
          className={`w-full h-[76px] pl-[15px] rounded-[15px] bg-transparent border-[.5px] border-[#49243e] focus:outline-none duration-[350ms] ${
            !state?.includes("translation")
              ? "border-[#49243e]"
              : " border-red-800 text-red-900"
          }`}
        />
        {sentences.map((_sentence, index) => (
          <div key={index} className="flex gap-2 w-full items-center">
            <input
              type="text"
              placeholder="make a sentence (must include the vocab)"
              onChange={(event) => handleChange(event, index)}
              className="w-full h-[60px] pl-[15px] rounded-[15px] bg-transparent border-[.5px] border-[#49243e] focus:outline-none duration-[350ms]"
            />
            {index == sentences.length - 1 && (
              <MdAdd
                size={20}
                color="#49243E"
                onClick={() =>
                  setSentences((_prevSentences) => [...sentences, ""])
                }
                cursor="pointer"
              />
            )}
          </div>
        ))}
        <input
          type="text"
          value={sentences.join("|")}
          name="sentences"
          className="hidden"
        />
        <button className="w-full h-[76px] rounded-[15px] bg-[#49243e] text-[20px] font-light text-white cursor-pointer duration-[350ms] hover:bg-[#5e2d4f]">
          Submit
        </button>
      </form>
    </div>
  );
};
export default VocabForm;
