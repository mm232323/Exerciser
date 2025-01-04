import React from "react";

const RatingBlocks: React.FC<{ score: number }> = ({ score }) => {
  const bad = "#EE373B";
  const medium = "#EEA237";
  const good = "#2CD216";
  const colors = ["#ffff", "#ffff", "#ffff"];
  if (score > 30) {
    colors[0] = bad;
  }
  if (score > 50) {
    colors[0] = medium;
    colors[1] = medium;
  }
  if (score > 80) {
    colors[0] = good;
    colors[1] = good;
    colors[2] = good;
  }
  return (
    <div className="flex gap-[4px] rotate-[-180deg] scale-x-[-1]">
      {score >= 80 ? (
        <>
          <div className={`bg-[#2cd216] w-[6px] h-[5px] rounded-[1px]`}></div>
          <div className={`bg-[#2cd216] w-[6px] h-[10px] rounded-[1px]`}></div>
          <div className={`bg-[#2cd216] w-[6px] h-[15px] rounded-[1px]`}></div>
        </>
      ) : score >= 50 ? (
        <>
          <div className={`bg-[#EEA237] w-[6px] h-[5px] rounded-[1px]`}></div>
          <div className={`bg-[#EEA237] w-[6px] h-[10px] rounded-[1px]`}></div>
          <div className={`bg-white w-[6px] h-[15px] rounded-[1px]`}></div>
        </>
      ) : score >= 30 ? (
        <>
          <div className={`bg-[#EE373B] w-[6px] h-[5px] rounded-[1px]`}></div>
          <div className={`bg-white w-[6px] h-[10px] rounded-[1px]`}></div>
          <div className={`bg-white w-[6px] h-[15px] rounded-[1px]`}></div>
        </>
      ) : (
        <>
          <div className={`bg-white w-[6px] h-[5px] rounded-[1px]`}></div>
          <div className={`bg-white w-[6px] h-[10px] rounded-[1px]`}></div>
          <div className={`bg-white w-[6px] h-[15px] rounded-[1px]`}></div>
        </>
      )}
    </div>
  );
};
export default RatingBlocks;
