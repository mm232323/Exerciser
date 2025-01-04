"use client";
import React from "react";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { login } from "../../../actions/auth";
import { signIn } from "next-auth/react";
import { userInputType } from "../../../helpers/interfaces";
import { redirect } from "next/navigation";
const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [state, action] = React.useActionState(login, []);
  if (state?.includes("done")) {
    const data = state[1] as userInputType;
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log("done");
    redirect("/profile");
  }
  return (
    <div className="w-11/12">
      <h1 className="text-[35px] font-bold text-center">Welcome Back!</h1>
      <p className="text-[15px] w-[369px] mt-[17px] font-thin leading-[25px] text-center opacity-55 text-black">
        Login the way your prefer and don’t miss your exercises
      </p>
      <form
        className="flex flex-col gap-[15px] mt-[30px] w-10/12"
        action={action}
      >
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
            placeholder="Password"
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
          {state?.includes("done") ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
