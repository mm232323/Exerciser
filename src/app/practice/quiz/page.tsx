"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUser, setAnswer, setPracticedTest } from "../../../../actions/main";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { TestType } from "../../../../helpers/interfaces";
import TestManager from "@/components/practice/TestManager";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";

const PracticeQuizPage: React.FC = () => {
  const { data: session } = useSession();
  const [tests, setTests] = useState<TestType[]>([]);
  const [testIdx, setTestIdx] = useState<number>(0);
  const [testState, setTestState] = useState<boolean>(false);
  const [testAnswer, setTestAnswer] = useState<string>("");
  const [deck, setDeck] = useState<string>("");
  useEffect(() => {
    async function getTests() {
      if (session?.user) {
        const progress = (await getUser(session!.user.email as string))
          .progress;
        if (progress.state == "off") redirect("/practice");
        setTests(progress.tests);
        setDeck(progress.deck);
      }
    }
    getTests();
  }, [session?.user, session]);
  const handleComplete = (state: boolean, answer: string) => {
    setTestState(state);
    setTestAnswer(answer);
  };
  const handleSwitch = () => {
    if (testIdx == 19) {
      setPracticedTest();
      redirect("/practice/result");
    } else {
      if (testState) {
        setTestIdx((prevIdx) => prevIdx + 1);
        setAnswer(testIdx, testAnswer, deck);
        setTestState(false);
      }
    }
  };
  return (
    <main>
      <Image
        src="/profile/bg.png"
        width={1440}
        height={700}
        alt="background img"
        className="max-w-[1440px] h-auto absolute left-0 top-0 z-[-10]"
      />
      <h1
        dir="rtl"
        className="font-light text-[25px] opacity-70 relative right-[50px] mt-[10px]"
      >
        {testIdx + 1}/20
      </h1>
      <AnimatePresence>
        {(tests as TestType[]).map((test, idx) =>
          idx == testIdx ? (
            <AnimatePresence key={idx}>
              <TestManager test={test} onHandleComplete={handleComplete} />
            </AnimatePresence>
          ) : (
            <AnimatePresence key={idx}>
              <div></div>
            </AnimatePresence>
          )
        )}
      </AnimatePresence>
      <div
        className={`flex items-center gap-[10px] relative right-[40px] mt-[10px] duration-[350ms] ${
          testState ? "cursor-pointer" : "opacity-50 cursor-default"
        }`}
        dir="rtl"
        onClick={handleSwitch}
      >
        <FaLongArrowAltRight size={30} color="#49243E" />
        <p className="font-normal text-[22px]">Next Exerciser</p>
      </div>
    </main>
  );
};
export default PracticeQuizPage;
