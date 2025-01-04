"use client";
import React, { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUser } from "../../../../actions/main";
import { practicedType, userInputType } from "../../../../helpers/interfaces";
import Image from "next/image";
const StartPractice: React.FC = () => {
  const { data: session } = useSession();
  const { deckName } = Object.fromEntries(useSearchParams());
  const [user, setUser] = React.useState<userInputType | null>(null);
  const [practices, setPractices] = React.useState<practicedType[] | null>(
    null
  );
  useEffect(() => {
    async function fetchUser() {
      if (session) {
        setUser(await getUser(session?.user?.email as string));
      }
    }
    fetchUser();
  }, [session]);
  useEffect(() => {
    if (user)
      setPractices(
        user.practiced.filter((practice) => practice.deckName == deckName)
      );
  }, [deckName, user]);
  if (deckName == undefined) redirect("/practice");
  return (
    <main>
      <Image
        src="/profile/bg.png"
        alt="background"
        width={1440}
        height={1080}
        className="absolute z-[-10] top-0 w-[1440px] h-[1080px] max-w-[1920px]"
      />
      <h1 className="text-center mt-[20px] font-extrabold text-[#4F276F] text-[44px]">
        Are you Ready
      </h1>
      <Image
        src="/practice/start.png"
        width={377.12}
        height={382.05}
        alt="start practice img"
        className="mx-auto mt-[10px]"
      />
      <div className="flex items-center gap-[20px] mt-[20px] relative left-1/2 translate-x-[-50%] w-fit">
        <p className="font-normal text-[26px]">
          <span className="font-bold text-[#8858AE]">{deckName}</span>&ensp;deck
        </p>
        <p className="font-normal text-[26px]">
          <span className="font-bold text-[#8858AE]">{practices?.length}</span>
          &ensp;practices
        </p>
      </div>
      <center>
        <button className="w-[560px] h-[90px] rounded-full bg-[#8858AE] font-light text-white text-[25px] mt-[20px] mb-[10px] hover:bg-[#a45fbb] duration-[350ms]">
          Let&rsquo;s Start
        </button>
      </center>
    </main>
  );
};

export default StartPractice;
