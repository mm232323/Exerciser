import React from "react";
import Image from "next/image";
import Link from "next/link";
const Home: React.FC = async () => {
  return (
    <div className="">
      <Image
        src="/home/bg.svg"
        alt="home background"
        width={1920}
        height={1080}
        className=" w-[1440px] min-w-[1440px] h-auto absolute z-[-10] top-0"
      />
      <h1 className="text-[75px] font-black text-center text-strock mt-[70px] leading-[90px] text-shadow">
        practice your <span className="text-[#BB8493]">vocabularies</span> with
        unlimited features
      </h1>
      <center>
        <p className="text-[17px] w-[471px] mt-[20px] font-thin">
          Unlock your potential by actively creating and engaging with your
          vocabulary in powerful and efficient ways!
        </p>
      </center>
      <Link href="/how-to-use">
        <div className="flex justify-center relative mt-[70px] items-center but-container">
          <button className="bg-[#321529] text-white p-[22px] rounded-[25px] font-thin text-[30px] absolute">
            Start now <span className="text-[18px]">it&apos;s free</span>
          </button>
          <div className="bg-[#a599a18f] w-[240px] h-[100px] rounded-[30px] back-but absolute z-[-20]" />
        </div>
      </Link>
    </div>
  );
};
export default Home;
