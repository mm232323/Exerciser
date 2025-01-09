"use client";
import React, { useState } from "react";
import { TestType } from "../../../../helpers/interfaces";
import { completeTest } from "../../../../helpers/testTypes";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
const CompleteTest: React.FC<{
  test: TestType;
  onHandleComplete: (state: boolean, answer: string) => void;
}> = ({ test, onHandleComplete }) => {
  const properties = test.properties as completeTest;
  const sentence = properties.sentence.split(" ");
  const targeted = sentence
    .map((word, idx) => [word, idx])
    .filter(
      (word) =>
        (word[0] as string).toLowerCase() === properties.word.toLowerCase()
    )
    .map((word) => ["", word[1]]);
  const [_, setAnswers] = useState(targeted);
  const [toggleHint, setToggleHint] = useState(false);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = event.target.value;
    setAnswers((prevAnswers) => {
      let newAnswers = [...prevAnswers];
      newAnswers = newAnswers.map((answer) =>
        answer[1] == idx ? [value, idx] : answer
      );
      if (newAnswers.filter((answer) => answer[0] == "").length == 0)
        onHandleComplete(true, newAnswers.map((answer) => answer[0]).join("-"));
      return newAnswers;
    });
  };
  return (
    <motion.main
      variants={{
        show: { opacity: 1, y: 0, filter: "blur(0)" },
        hide: { opacity: 0, y: 25, filter: "blur(8px)" },
      }}
      initial="hide"
      animate="show"
      exit="hide"
    >
      <center>
        <Image
          src="/practice/complete.png"
          width={1021.43}
          height={1085.78}
          className="w-[312.43px] h-auto mb-[5px]"
          alt="complete test image"
        />
        <p className="font-normal text-[26px]">Complete the next Sentence</p>
        <div className="flex items-center justify-center gap-[10px] w-[60%] mt-[15px]">
          {sentence.map((word, idx) =>
            word.toLowerCase() == properties.word.toLowerCase() ? (
              <input
                type="text"
                key={idx}
                onChange={(event) => handleChange(event, idx)}
                className="text-[32px] font-bold w-[200px] focus:outline-none duration-[350ms] text-[#8858AE]  bg-black/10 rounded-[6px] p-[10px] border-[#8858AE] border-[1.5px]"
              />
            ) : (
              <h1 key={idx} className="text-[44px] font-bold ">
                {word}
              </h1>
            )
          )}
        </div>
        <div>
          <div
            className="flex items-center gap-[5px] cursor-pointer hover:scale-[1.1] duration-[350ms] w-fit mt-[30px] mb-[5px]"
            onClick={() => setToggleHint((prevToggle) => !prevToggle)}
          >
            <h1>{!toggleHint ? "Show Hint" : "Hide Hint"}</h1>
            {toggleHint ? (
              <FaAngleUp size={10} color="#49243e" />
            ) : (
              <FaAngleDown size={10} color="#49243e" />
            )}
          </div>
          <AnimatePresence>
            {toggleHint && (
              <motion.p
                variants={{
                  show: { opacity: 0.7, y: 0, filter: "blur(0)" },
                  hide: { opacity: 0, y: -15, filter: "blur(6px)" },
                }}
                initial="hide"
                animate="show"
                exit="hide"
              >
                what&#39;s the meaning of {properties.translation}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </center>
    </motion.main>
  );
};
export default CompleteTest;
