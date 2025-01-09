"use client";
import React, { useState } from "react";
import { TestType } from "../../../../helpers/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";
import { chooseTest } from "../../../../helpers/testTypes";
const ChooseTest: React.FC<{
  test: TestType;
  onHandleComplete: (state: boolean, answer: string) => void;
}> = ({ test, onHandleComplete }) => {
  const properties = test.properties as chooseTest;
  const [choosedOption, setChoosedOption] = useState<string>("");
  const handleChoose = (word: string) => {
    setChoosedOption(word);
    onHandleComplete(true, word);
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
          src="/practice/choose.png"
          width={521.43}
          height={385.78}
          className="w-[318.03px] h-auto"
          alt="choose test image"
        />
        <p className="font-normal text-[26px]">choose the correct answer</p>
        <h1 className="font-extrabold text-[48px] text-[#8858AE] mt-[15px]">
          {properties.dir == "vocab-to-translation"
            ? properties.word
            : properties.translation}
        </h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-y-[16px] gap-x-[2px] w-[60%] relative mt-[17px]">
          {properties.chooses.map((choose) => (
            <h1
              key={choose}
              onClick={() => handleChoose(choose)}
              className={`w-[402px] h-[85px] rounded-[12px] flex justify-center items-center border-[1px] border-[#8858AE] duration-[350ms] cursor-pointer font-light text-[25px] ${
                choosedOption == choose
                  ? "bg-[#8858AE] text-white cursor-default"
                  : "bg-white hover:bg-[#ede5ff] text-[#8858AE] cursor-pointer"
              }`}
            >
              {choose}
            </h1>
          ))}
        </div>
      </center>
    </motion.main>
  );
};
export default ChooseTest;
