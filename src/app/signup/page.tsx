import React from "react";
import Image from "next/image";
import SignupForm from "@/components/forms/signup";

const SignupPage: React.FC = () => {
  return (
    <>
      <Image
        src="/auth/bg.svg"
        alt="auth background"
        width={1920}
        height={1080}
        className="absolute z-[-10] top-0"
      />
      <center>
        <div className="w-3/4 h-[613px] relative bg-white rounded-[45px] mt-[80px] border-[.5px] border-[#49243e88] shadow-[73px_51px_73.6px_0_rgba(0,0,0,.1)] flex flex-row gap-[20px] items-center">
          <Image
            src="/auth/auth_img.png"
            alt="auth img"
            width={543}
            height={613}
            className="h-[611px]"
          />
          <SignupForm />
        </div>
      </center>
    </>
  );
};
export default SignupPage;
