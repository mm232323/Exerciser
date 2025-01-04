"use client";
import React from "react";
import { PostDeck } from "../../../actions/main";
import { redirect } from "next/navigation";
const DeckForm: React.FC = () => {
  const [state, action] = React.useActionState(PostDeck, []);
  if (state.includes("done")) {
    redirect("/practice");
  }
  return (
    <div>
      <h1 className="border-[.5px] border-[#49243E] rounded-[15px] text-[#D8D4D7] font-bold bg-[#49243E] pl-[10px] pt-[4px] w-[627px] h-[73px] mb-[22px] text-[50px]">
        Create Deck
      </h1>
      <form
        className="flex flex-col gap-[22px] items-center relative"
        action={action}
      >
        <input
          type="text"
          placeholder="Deck Name"
          name="name"
          className={`border-[.5px] rounded-[15px] font-light bg-transparent w-[627px] h-[73px] focus:outline-none duration-[350ms] pl-[8px] ${
            state.includes("name")
              ? "text-red-800 border-red-500"
              : "border-[#49243E] text-[#300B25]"
          }`}
        />
        <input
          type="text"
          placeholder="Training Language"
          name="lang"
          className={`border-[.5px] rounded-[15px] font-light bg-transparent w-[627px] h-[73px] focus:outline-none duration-[350ms] pl-[8px] ${
            state.includes("lang")
              ? "text-red-800 border-red-500"
              : "text-[#300B25] border-[#49243E]"
          }`}
        />
        <div className="border-[.5px] flex items-center justify-between border-[#49243E] rounded-[15px] bg-transparent w-[627px] h-[73px] relative px-[15px]">
          <h1 className="text-[16px] text-black/35">Deck Color</h1>
          <input
            type="color"
            name="color"
            className="w-[50px] h-[50px] rounded-[15px] absolute right-[15px] top-1/2 translate-y-[-50%] cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="rounded-[15px] text-white font-light bg-[#49243E] w-[627px] h-[73px] text-[20px] hover:bg-[#532847] duration-[350ms]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeckForm;
