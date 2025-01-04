"use client";
import React, { useEffect, useRef } from "react";
import { userInputType } from "../../../helpers/interfaces";
import Image from "next/image";
import { addAvatar } from "../../../actions/main";
const Avatar: React.FC<{ user: userInputType }> = ({ user }) => {
  const inpRef = useRef<HTMLInputElement>(null);
  const butRef = useRef<HTMLButtonElement>(null);
  const [avatar, setAvatar] = React.useState<string>(user.avatar);
  const [state, action] = React.useActionState(addAvatar, "");
  console.log(user.email);
  useEffect(() => {
    if (state) {
      setAvatar(state);
    }
  }, [state]);
  return (
    <div>
      <Image
        src={avatar ? avatar : "/avatar.svg"}
        alt="avatar"
        width={134}
        height={134}
        className="rounded-full z-[-10] absolute"
      />
      <div
        className="relative flex justify-center items-center w-[134px] h-[134px] opacity-0 hover:opacity-100 bg-[rgba(0,0,0,0.15)] duration-[350ms] rounded-full cursor-pointer"
        onClick={() => inpRef.current?.click()}
      >
        <form
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-full z-10"
          action={action}
        >
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="hidden"
            ref={inpRef}
            onChange={() => butRef.current?.click()}
          />
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            className="hidden"
          />
          <h1 className="text-white cursor-pointer">Change Avatar</h1>
          <button className="hidden" ref={butRef}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Avatar;
