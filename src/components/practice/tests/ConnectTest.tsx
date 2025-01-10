/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { TestType } from "../../../../helpers/interfaces";
import Image from "next/image";
import { motion } from "framer-motion";
import { connectTest } from "../../../../helpers/testTypes";
import { shuffleArray } from "../../../../helpers/user";

const ConnectTest: React.FC<{
  test: TestType;
  onHandleComplete: (state: boolean, answer: string) => void;
}> = ({ test, onHandleComplete }) => {
  const properties = test.properties as connectTest;
  const [keys, setKeys] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  useEffect(() => {
    const newKeys: string[] = [];
    const newValues: string[] = [];
    for (let i = 0; i < properties.choosed.length; i++) {
      newKeys.push(properties.choosed[i].name);
      newValues.push(properties.choosed[i].translation);
    }
    shuffleArray(newKeys);
    shuffleArray(newValues);
    setKeys(() => newKeys);
    setValues(() => newValues);
  }, []);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [answer, setAnswer] = useState<string[]>(["", ""]);

  const handleAnswer = (value: string, dir: string) => {
    if (dir == "right") {
      if (answer[0]) {
        if (answers.length == 3) {
          const compressedAnswer = [...answers, [value, answer[0]]]
            .map((answer) => answer)
            .map((answer) => answer.join("-"))
            .sort()
            .join("|");
          onHandleComplete(true, compressedAnswer);
        }
        setAnswers((prevAnswer) => [...prevAnswer, [value, answer[0]]]);
        setAnswer(() => ["", ""]);
      } else {
        setAnswer(() => ["", value]);
      }
    } else {
      if (answer[1]) {
        if (answers.length == 3) {
          const compressedAnswer = [...answers, [value, answer[0]]]
            .map((answer) => answer.join("-"))
            .join("|");
          onHandleComplete(true, compressedAnswer);
        }
        setAnswers((prevAnswer) => [...prevAnswer, [answer[1], value]]);
        setAnswer(() => ["", ""]);
      } else {
        setAnswer(() => [value, ""]);
      }
    }
  };
  const selectedKeys = answers.map((answer) => answer[0]);
  const selectedValues = answers.map((answer) => answer[1]);
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
          src="/practice/connect.png"
          width={821.43}
          height={685.78}
          className="w-[512.43px] h-auto"
          alt="connecting test image"
        />
        <p className="font-normal text-[26px] mb-[15px]">connect blocks</p>
        <div className="flex items-center gap-[18px] w-[60%] justify-center">
          <div className="flex flex-col gap-[8px] items-center">
            {keys.map((word, idx) => (
              <h1
                key={idx}
                onClick={() => handleAnswer(word, "left")}
                className={`w-[235px] h-[89px] rounded-[15px] text-[25px] font-normal border-[1px] border-[#BB8493] flex justify-center items-center duration-[350ms] ${
                  answer.includes(word) || selectedValues.includes(word)
                    ? "bg-[#BB8493] text-white cursor-default opacity-60 scale-[.8]"
                    : "text-[#BB8493] bg-white hover:bg-pink-100 cursor-pointer"
                }`}
              >
                {word}
              </h1>
            ))}
          </div>
          <div className="flex flex-col gap-[8px] items-center">
            {values.map((word, idx) => (
              <h1
                key={idx}
                onClick={() => handleAnswer(word, "right")}
                className={`w-[235px] h-[89px] rounded-[15px] text-[25px] font-normal border-[1px] border-[#574E9F] flex justify-center items-center duration-[350ms] ${
                  answer.includes(word) || selectedKeys.includes(word)
                    ? "bg-[#574e9f] text-white cursor-default opacity-60 scale-[.8]"
                    : "text-[#574e9f] bg-white hover:bg-indigo-100 cursor-pointer"
                }`}
              >
                {word}
              </h1>
            ))}
          </div>
        </div>
      </center>
    </motion.main>
  );
};
export default ConnectTest;
