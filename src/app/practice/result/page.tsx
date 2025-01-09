import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { getUser } from "../../../../actions/main";
import { userInputType } from "../../../../helpers/interfaces";
import { redirect } from "next/navigation";
import { Calligraffitti } from "next/font/google";
import Stars from "@/components/UI/Stars";
import Link from "next/link";
const calligraf = Calligraffitti({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
const ResultPage: React.FC = async () => {
  const session = await getServerSession();
  const user = (await getUser(session?.user?.email as string)) as userInputType;
  const practiced = user.practiced[user.practiced.length - 1];
  if (!practiced || practiced.state == "off") redirect("/practice");
  const ratingTitle = [
    "Perfect",
    "Almost Perfect",
    "Very Good",
    "Good",
    "Not Much",
    "Bad Degree",
  ];
  const colors = [
    "#FFB325",
    "#FF8025",
    "#09E52A",
    "#097BE5",
    "#AE09E5",
    "#CB1215",
  ];
  let rate = 5;
  if (practiced.finalScore > 90) rate = 0;
  else if (practiced.finalScore > 80) rate = 1;
  else if (practiced.finalScore > 60) rate = 2;
  else if (practiced.finalScore > 50) rate = 4;
  else if (practiced.finalScore > 30) rate = 0;
  return (
    <main>
      <Image
        src="/profile/bg.png"
        alt="background"
        width={1920}
        height={1080}
        className="absolute w-[1440px] z-[-10] top-0 max-w-[1440px] h-auto"
      />
      <center>
        <div className="w-[906px] h-[537px] bg-white rounded-[45px] mt-[40px] border-[1px] border-[#49243E] shadow-2xl">
          <Stars
            rating={5 - rate}
            ratingColor={colors[rate]}
            emptyColor="#D9D9D9"
          />
          <h1
            style={{ color: colors[rate] }}
            className={`text-[40px] ${calligraf.className}`}
          >
            {ratingTitle[rate]}
          </h1>
          <div className="w-full p-[20px] flex items-center justify-between px-[60px] mt-[20px]">
            <h1 className="text-[37px] font-bold text-black/90">
              Your score is:&nbsp;
              <span className="text-[#8758aee3]">
                {practiced.score}/{practiced.maxScore}
              </span>
            </h1>
            <h1 className="text-[37px] font-bold text-black/90">
              Wrong answers:&nbsp;
              <span className="text-[#8758aee3]">
                {practiced.maxScore - practiced.score}/{practiced.maxScore}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-[25px] relative w-fit mt-[30px]">
            <Link href="/practice/start">
              <button className="w-[297px] h-[75px] border-[.7px] border-black/70 rounded-[17px] font-bold text-[30px] text-white bg-[#574E9F] hover:shadow-xl duration-[350ms]">
                Try Again
              </button>
            </Link>
            <Link href="/practice">
              <button className="w-[297px] h-[75px] border-[.7px] border-black/70 rounded-[17px] font-bold text-[30px] text-[#574E9F] hover:shadow-xl duration-[350ms]">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </center>
    </main>
  );
};
export default ResultPage;
