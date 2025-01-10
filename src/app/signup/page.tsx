import React from "react";
import Image from "next/image";
import SignupForm from "@/components/forms/signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignupPage: React.FC = async () => {
  const session = await getServerSession();
  if (session) redirect("/profile");
  return (
    <>
      <Image
        src="/auth/bg.svg"
        alt="auth background"
        width={1920}
        height={1080}
        className="absolute z-[-10] top-0 max-w-[1440px] h-auto h-[1440px]"
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
