"use client";
import React from "react";
import { userInputType } from "../../../helpers/interfaces";
import { MdEdit, MdSave } from "react-icons/md";
import { useState, useRef } from "react";
import { editPersonal } from "../../../actions/main";
const PersonalInfo: React.FC<{ user: userInputType }> = ({ user }) => {
  const [personals, setPersonals] = useState({
    gender: user.gender,
    phone: user.phone,
    jobTitle: user.jobTitle,
  });
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const butRef = useRef<HTMLButtonElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<HTMLInputElement>(null);
  const [state, action] = React.useActionState(editPersonal, []);
  if (state) {
  }
  const handleSubmit = () => {
    const gender = genderRef.current?.value as string;
    const phone = phoneRef.current?.value as string;
    const jobTitle = jobRef.current?.value as string;
    setToggleEdit(false);
    setPersonals({ gender, phone, jobTitle });
    butRef.current?.click();
  };
  return (
    <div
      className={`w-[40%] h-[126px] duration-[350ms] border-[0.4px] rounded-[7px] border-[#2b122380] p-4 relative ${
        toggleEdit ? "h-[200px]" : "h-[126px]"
      }`}
    >
      <h3 className="font-light text-black text-[18px] mb-[4px]">
        Personal Information
      </h3>
      {!toggleEdit ? (
        <>
          <h1 className="font-bold text-[15px]">
            Gender:{" "}
            <span className="font-normal">
              {personals.gender ? personals.gender : "un setted"}
            </span>
          </h1>
          <h1 className="font-bold text-[15px]">
            Phone:{" "}
            <span className="font-normal">
              {personals.phone ? personals.phone : "un setted"}
            </span>
          </h1>
          <h1 className="font-bold text-[15px]">
            Job Title:{" "}
            <span className="font-normal">
              {personals.jobTitle ? personals.jobTitle : "un setted"}
            </span>
          </h1>
          <MdEdit
            color="#49243e"
            size={16}
            onClick={() => setToggleEdit(true)}
            className="rounded-full absolute bottom-[10px] right-[10px] cursor-pointer"
          />
        </>
      ) : (
        <form action={action}>
          <div className="flex gap-1 items-center">
            <h1 className="font-bold text-[15px]">Gender:</h1>
            <select
              name="gender"
              ref={genderRef}
              className="bg-transparent p-1 m-1 border-[.4px] border-[#49243ec2] rounded-[5px] focus:outline-none duration-[350ms]"
            >
              <option className="bg-transparent"></option>
              <option className="bg-transparent">Male</option>
              <option className="bg-transparent">Female</option>
            </select>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="font-bold text-[15px]">Phone:</h1>
            <input
              name="phone"
              type="number"
              ref={phoneRef}
              className="bg-transparent p-1 m-1 border-[.4px] border-[#49243ec2] rounded-[5px] focus:outline-none duration-[350ms]"
            />
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="font-bold text-[15px]">Job Title:</h1>
            <input
              name="jobTitle"
              type="text"
              ref={jobRef}
              className="bg-transparent p-1 m-1 border-[.4px] border-[#49243ec2] rounded-[5px] focus:outline-none duration-[350ms]"
            />
          </div>
          <button type="submit" ref={butRef}>
            <MdSave
              color="#49243e"
              size={16}
              onClick={handleSubmit}
              className="rounded-full absolute bottom-[10px] right-[10px] cursor-pointer"
            />
          </button>
        </form>
      )}
    </div>
  );
};
export default PersonalInfo;
