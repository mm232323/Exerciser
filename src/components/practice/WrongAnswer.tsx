import React from "react";
import { motion } from "framer-motion";

const WrongAnswer: React.FC<{
  wrongAnswer: {
    name: string;
    properties: object;
    answer: string;
    correctAnswer: string;
  };
}> = ({ wrongAnswer }) => {
  const name = wrongAnswer.name;
  const properties = wrongAnswer.properties;
  return (
    <motion.div
      variants={{
        show: { opacity: 1, filter: "blur(0)", y: 0 },
        hide: { opacity: 0, filter: "blur(8px)", y: 20 },
      }}
      initial="hide"
      animate="show"
      exit="hide"
      className="w-[903px] min-h-[232px] h-fit p-[40px] bg-white rounded-[48px] shadow-xl border-[1px] border-[#49243e] mb-[20px]"
    >
      <h1 className="text-[30px] font-normal text-[#49243E]">
        {name == "meaning"
          ? `What's the meaning of ${(properties as { word: string }).word}`
          : name == "choose"
          ? `choose the correct answer for the word "${
              (properties as { word: string }).word
            }"`
          : name == "complete"
          ? (properties as { sentence: string }).sentence
              .split(" ")
              .map((word) =>
                word.toLowerCase() ==
                (properties as { word: string }).word.toLowerCase()
                  ? "..."
                  : word
              )
              .join(" ")
          : name == "connect"
          ? "connect blocks with each other"
          : (properties as { testType: string }).testType == "type"
          ? `the word "${(properties as { word: string }).word}" is a ${
              (properties as { type: string }).type
            }`
          : `the meaning of the word "${
              (properties as { word: string }).word
            }" is ${(properties as { translation: string }).translation}`}
      </h1>
      <div className="flex items-center gap-[20px] relative w-fit">
        <div className="text-[27px] font-normal w-fit h-fit relative  top-[20px] flex flex-col items-center">
          <h1 className="text-red-700">Your Answer</h1>
          <h1 style={{ fontSize: name == "connect" ? 20 : 27 }}>
            {wrongAnswer.answer}
          </h1>
        </div>

        <div className="text-[27px] font-normal w-fit h-fit relative top-[20px] flex flex-col items-center">
          <h1 className="text-green-700">Correct Answer</h1>
          <h1 style={{ fontSize: name == "connect" ? 20 : 27 }}>
            {name == "connect"
              ? wrongAnswer.correctAnswer.split("|").join(" ")
              : wrongAnswer.correctAnswer}
          </h1>
        </div>
      </div>
    </motion.div>
  );
};
export default WrongAnswer;
