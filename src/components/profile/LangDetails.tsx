import React from "react";
import { userInputType } from "../../../helpers/interfaces";
import RatingBlocks from "../UI/RatingBlocks";

const LangDetails: React.FC<{ user: userInputType }> = ({ user }) => {
  const { languages } = user;
  return (
    <div className="w-[40%] h-fit duration-[350ms] border-[0.4px] rounded-[7px] border-[#2b122380] p-4 relative ">
      <h3 className="font-light text-black text-[18px] mb-[4px]">
        Learning Languages
      </h3>
      <br />
      <div className="flex flex-col gap-[10px] justify-center items-center">
        {languages.map((language) => (
          <div key={language.name} className="flex gap-[10px]">
            <h1 className="text-white bg-[#BB8493] rounded-full w-[136px] p-[4px] font-normal text-center">
              {language.name}
            </h1>
            <div className="rounded-full w-[136px] border-[1px] border-[#BB8493] text-[#814857] font-normal p-2 flex justify-around items-center">
              <h1>{language.score}</h1>
              <RatingBlocks score={language.score} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LangDetails;
