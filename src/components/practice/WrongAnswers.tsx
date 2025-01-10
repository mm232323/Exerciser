"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import WrongAnswer from "./WrongAnswer";
import { AnimatePresence } from "framer-motion";
const WrongAnswers: React.FC<{
  wrongAns: {
    name: string;
    properties: object;
    answer: string;
    correctAnswer: string;
  }[];
}> = ({ wrongAns }) => {
  const [toggleAns, setToggleAns] = useState(false);
  return (
    <div>
      {toggleAns ? (
        <div
          className="flex items-center gap-[6px] cursor-pointer relative w-fit mt-[30px] mb-[30px]"
          onClick={() => setToggleAns(false)}
        >
          <h1>Hide wrong answers</h1>
          <IoIosArrowUp />
        </div>
      ) : (
        <div
          className="flex items-center gap-[6px] cursor-pointer relative w-fit mt-[30px] mb-[30px]"
          onClick={() => setToggleAns(true)}
        >
          <h1>Show wrong answers</h1>
          <IoIosArrowDown />
        </div>
      )}
      <div className="flex flex-col relative w-fit">
        <AnimatePresence>
          {toggleAns &&
            wrongAns.map((answer, idx) => (
              <WrongAnswer wrongAnswer={answer} key={idx} />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default WrongAnswers;
