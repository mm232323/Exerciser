import React from "react";
import { FaStar } from "react-icons/fa6";
const Stars: React.FC<{
  ratingColor: string;
  rating: number;
  emptyColor: string;
}> = ({ ratingColor, rating, emptyColor }) => {
  return (
    <div className="flex items-center w-[300px] gap-[5px] mt-[50px] mb-[20px]">
      <div className="flex items-center gap-[4px]">
        <FaStar size={45} color={rating > 0 ? ratingColor : emptyColor} />
        <FaStar
          size={60}
          color={rating > 2 ? ratingColor : emptyColor}
          className="relative top-[-15px]"
        />
      </div>
      <FaStar
        size={70}
        color={rating == 5 ? ratingColor : emptyColor}
        className="relative top-[-30px]"
      />
      <div className="flex items-center gap-[4px] relative">
        <FaStar
          size={60}
          color={rating > 3 ? ratingColor : emptyColor}
          className="relative top-[-15px]"
        />
        <FaStar size={45} color={rating > 1 ? ratingColor : emptyColor} />
      </div>
    </div>
  );
};
export default Stars;
