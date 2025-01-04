"use client";
import React from "react";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { signup } from "../../../actions/auth";
const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [state, action] = React.useActionState(signup, []);
  return (
    <div className="w-11/12">
      <h1 className="text-[35px] font-bold text-center">Create your Account</h1>
      <p className="text-[15px] w-[369px] mt-[17px] font-thin leading-[25px] text-center opacity-55 text-black">
        Sign up now and unlock a world of endless possibilities! Dive into our
        vibrant community and enhance your vocabulary every day!
      </p>
      <form
        className="flex flex-col gap-[15px] mt-[30px] w-10/12"
        action={action}
      >
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          className={`p-[20px] rounded-[17px] bg-none border-[1px] font-thin text-[18px] focus:outline-none focus:border-[#49243E] py-[15px] duration-[.35s] ${
            state?.includes("name")
              ? "bg-red-100 border-red-800 text-red-700"
              : "border-[#8858AE] bg-transparent "
          }`}
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          className={`p-[20px] rounded-[17px] bg-none border-[1px] border-[#8858AE] font-thin text-[18px] focus:outline-none duration-300 focus:border-[#49243E] py-[15px] ${
            state?.includes("email")
              ? "bg-red-100 border-red-800 text-red-700"
              : "border-[#8858AE] bg-transparent "
          }`}
        />
        <div className="relative flex items-center">
          <input
            placeholder="Password (min 8 characters | 1 uppercase | 1 lowercase | 1 number)"
            name="password"
            type={showPassword ? "text" : "password"}
            className={`p-[20px] w-[100%] rounded-[17px] bg-none border-[1px] border-[#8858AE] font-thin text-[18px] focus:outline-none duration-300 focus:border-[#49243E] py-[15px] ${
              state?.includes("password")
                ? "bg-red-100 border-red-800 text-red-700"
                : "border-[#8858AE] bg-transparent "
            }`}
          />
          {showPassword ? (
            <GoEye
              size={16}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-[#8858AE] z-10 right-[20px] cursor-pointer"
            />
          ) : (
            <GoEyeClosed
              size={16}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-[#8858AE] z-10 right-[20px] cursor-pointer"
            />
          )}
        </div>
        <button className="bg-[#321529] text-white p-[20px] rounded-[17px] font-thin text-[20px] duration-300 hover:bg-[#49243E] focus:outline-none py-[15px]">
          Sign up
        </button>
        <button className="bg-white text-[#3B5998] p-[20px] rounded-[17px] font-thin text-[20px] duration-300 hover:bg-[rgba(0,0,0,0.08)] focus:outline-none py-[15px] border-[.5px] border-[#321529a9]">
          Continue with Google
          <FcGoogle size={25} className="inline ml-[10px]" />
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
