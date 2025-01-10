import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { TbPlayCardStarFilled, TbVocabulary } from "react-icons/tb";
import { redirect } from "next/navigation";
const CreatePage: React.FC = async () => {
  const session = await getServerSession();
  if (!session) redirect("/login");
  return (
    <main>
      <Image
        src="/create/bg.png"
        alt="background"
        width={1920}
        height={1080}
        className="absolute z-[-10] top-0 w-max-[1440px] h-auto w-[1440px]"
      />
      <center>
        <Image
          src="/create/title.png"
          alt="title"
          width={527}
          height={82}
          className="relative mt-[50px]"
        />
      </center>
      <div className="flex justify-center gap-[50px] mt-[30px]">
        <Link href="/create/deck">
          <div className="w-[445.5px] h-[445.5px] rounded-[34px] border-[1px] border-[#372139] bg-gradient-to-b from-transparent to-[rgba(1,1,1,0.1)] hover:to-[rgba(1,1,1,0.3)] duration-[350ms] relative cursor-pointer">
            <TbVocabulary
              size={340.5}
              color="#49243e"
              className="absolute bottom-2 left-1/2 translate-x-[-50%] z-[-9]"
            />
            <h1 className="font-bold text-[70px] text-center relative  left-[50%] translate-x-[-50%] top-[20px]">
              DECK
            </h1>
          </div>
        </Link>
        <Link href="/create/vocab">
          <div className="w-[445.5px] h-[445.5px] rounded-[34px] border-[1px] border-[#372139] bg-gradient-to-b from-transparent to-[rgba(1,1,1,0.1)] hover:to-[rgba(1,1,1,0.3)] duration-[350ms] relative cursor-pointer ">
            <TbPlayCardStarFilled
              size={340.5}
              color="#49243E"
              className="absolute bottom-2 left-1/2 translate-x-[-50%] z-[-9]"
            />
            <h1 className="font-bold text-[70px] text-center relative  left-[50%] translate-x-[-50%] top-[20px]">
              VOCAB
            </h1>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default CreatePage;
