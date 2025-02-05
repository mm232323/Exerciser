import React from "react";
import data from "@/how.json";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
export default async function HowPage() {
  const session = await getServerSession();
  return (
    <div className="flex flex-col items-center gap-[50px] mt-[50px] w-full justify-center">
      <h1 className="text-[50px] font-extrabold">How to use</h1>
      <p className="opacity-70 text-[18px] w-[500px] text-center mb-[-10px] mt-[-20px]">
        this page will describe for you how to use our app in an efficient way
        and how to get the best out of it.
      </p>
      {data.map((block, idx) => (
        <div
          key={idx * Math.random()}
          dir={idx % 2 == 0 ? "ltr" : "rtl"}
          className="flex items-center gap-[22px] mb-[25px] justify-between w-10/12"
        >
          <h1 className={`text-[33px] font-bold w-[550px]`} dir="ltr">
            {block.title}
          </h1>
          <Image
            src={block.recImg}
            alt="record img"
            width={1440}
            height={860}
            className="rounded-[17px] border-[1px] border-purple-900 w-[600px] h-auto shadow-2xl"
          />
        </div>
      ))}
      <h1 className="text-[30px] font-extrabold">explanatory video</h1>
      <center>
        <video
          src="/how/vids/vid_rec.mp4"
          width="1440"
          height="860"
          controls
          preload="none"
          className="w-[800px] h-auto border-[1.5px] border-purple-900 rounded-[17px] shadow-2xl mb-[25px]"
        />
      </center>
      <Link href={session?.user ? "/profile" : "/login"}>
        <div className="flex justify-center relative items-center but-container mb-[90px]">
          <button className="bg-[#321529] text-white p-[22px] rounded-[25px] font-thin text-[30px] absolute w-[250px]">
            Start now <span className="text-[18px]">it&apos;s free</span>
          </button>
          <div className="bg-[#a599a18f] w-[260px] h-[100px] rounded-[30px] back-but absolute z-[-20]" />
        </div>
      </Link>
    </div>
  );
}
