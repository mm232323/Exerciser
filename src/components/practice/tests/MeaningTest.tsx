"use client";
import React, { useRef } from "react";
import { TestType } from "../../../../helpers/interfaces";
import Image from "next/image";
import { meaningTest } from "@/../../helpers/testTypes";
import { motion } from "framer-motion";
const MeaningTest: React.FC<{
  test: TestType;
  onHandleComplete: (state: boolean, answer: string) => void;
}> = ({ test, onHandleComplete }) => {
  const inpRef = useRef<HTMLInputElement>(null);
  const properties = test.properties as meaningTest;
  const handleSymbol = (char: string) => {
    inpRef.current!.value += char;
  };
  const handleChange = () => {
    const value = inpRef.current!.value;
    if (value.length > 0) onHandleComplete(true, value);
    else onHandleComplete(false, "");
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
          src="/practice/meaning.png"
          width={521.43}
          height={385.78}
          className="w-[212.43px] h-auto"
          alt="meaning test image"
        />
        <p className="font-normal text-[26px]">What&apos;s the meaning of</p>
        <h1 className="font-extrabold text-[48px] text-[#8858AE] mt-[15px]">
          {properties.translation}
        </h1>
        <input
          type="text"
          ref={inpRef}
          defaultValue={inpRef.current?.value}
          onChange={handleChange}
          className="w-[56.3888888889%] h-[88px] bg-black/10 rounded-[3px] focus:outline-none duration-[350ms] border-b-[2.5px] border-b-[#8858AE] mt-[10px] text-[19px] text-center mb-[20px]"
        />
        <div className="grid grid-cols-8 grid-rows-1 w-[60%]">
          {properties.chars.split("").map((char) => (
            <h1
              key={char}
              onClick={() => handleSymbol(char)}
              className=" rounded-[10px] bg-[#bb84933d] text-[26px] relative left-1/2 translate-x-[-50%] font-thin w-[58px] h-[58px] flex justify-center items-center cursor-pointer hover:scale-[0.9] duration-[350ms]"
            >
              {char}
            </h1>
          ))}
        </div>
      </center>
    </motion.main>
  );
};
export default MeaningTest;
