import React from "react";
import { TestType } from "../../../helpers/interfaces";
import MeaningTest from "./tests/MeaningTest";
import ChooseTest from "./tests/ChooseTest";
import CompleteTest from "./tests/CompleteTest";
import CorrectionTest from "./tests/CorrectionTest";
import ConnectTest from "./tests/ConnectTest";
import { AnimatePresence } from "framer-motion";

const TestManager: React.FC<{
  test: TestType;
  onHandleComplete: (state: boolean, answer: string) => void;
}> = ({ test, onHandleComplete }) => {
  const handleCompelete = (state: boolean, answer: string) => {
    onHandleComplete(state, answer);
  };
  return (
    <>
      <AnimatePresence>
        {test.name == "meaning" ? (
          <MeaningTest test={test} onHandleComplete={handleCompelete} />
        ) : test.name == "choose" ? (
          <ChooseTest test={test} onHandleComplete={handleCompelete} />
        ) : test.name == "complete" ? (
          <CompleteTest test={test} onHandleComplete={handleCompelete} />
        ) : test.name == "trueorfalse" ? (
          <CorrectionTest test={test} onHandleComplete={handleCompelete} />
        ) : (
          <ConnectTest test={test} onHandleComplete={handleCompelete} />
        )}
      </AnimatePresence>
    </>
  );
};
export default TestManager;
