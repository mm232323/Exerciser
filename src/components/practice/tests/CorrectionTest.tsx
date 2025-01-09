"use client";
import React, { useState } from "react";
import { TestType } from "../../../../helpers/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";
import { correctionTest } from "../../../../helpers/testTypes";
const CorrectionTest: React.FC<{
  test: TestType;
  onHandleComplete: (state: boolean, answer: string) => void;
}> = ({ test, onHandleComplete }) => {
  const [answer, setAnswer] = useState("");
  const properties = test.properties as correctionTest;
  const handleAnswer = (answer: string) => {
    setAnswer(answer);
    onHandleComplete(true, answer);
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
          src="/practice/trueorfalse.png"
          width={721.43}
          height={585.78}
          className="w-[312.43px] h-auto"
          alt="correction test image"
        />
        <p className="font-normal text-[26px]">true or false</p>
        {properties.testType == "meaning" ? (
          <h1 className="font-extrabold text-[41px] text-black/90 mt-[15px]">
            the meaning of &quot;
            <span className="text-[#8858AE]">{properties.word}</span>&quot; is{" "}
            {properties.translation}
          </h1>
        ) : (
          <h1 className="font-extrabold text-[41px] text-black/90 mt-[15px]">
            the word &quot;
            <span className="text-[#8858AE]">{properties.word}</span>&quot; is a{" "}
            {properties.type}
          </h1>
        )}
        <div className="flex items-center gap-[30px] w-[60%] mt-[30px] mb-[10px]">
          <button
            onClick={() => handleAnswer("True")}
            className={`w-[459px] h-[85px] font-normal rounded-[12px] border-[1px] duration-[350ms] border-[#0B9C0B] box-border border-l-[20px] text-[32px] ${
              answer == "True"
                ? "bg-[#0b9c0b] text-white cursor-default"
                : "bg-white text-[#0B9C0B] hover:bg-green-100 cursor-pointer"
            }`}
          >
            True
          </button>
          <button
            onClick={() => handleAnswer("False")}
            className={`w-[459px] h-[85px] font-normal rounded-[12px] border-[1px] border-r-[20px] duration-[350ms] border-[#A10000] box-border text-[32px] ${
              answer == "False"
                ? "bg-[#a10000] text-white cursor-default"
                : "bg-white text-[#A10000] hover:bg-red-100 cursor-pointer"
            }`}
          >
            False
          </button>
        </div>
      </center>
    </motion.main>
  );
};
export default CorrectionTest;
