import React from "react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import PersonalInfo from "@/components/profile/PersonalInfo";
import LangDetails from "@/components/profile/LangDetails";
import Avatar from "@/components/profile/Avatar";
import { redirect } from "next/navigation";
export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/login");
  const email = session?.user?.email;
  const response = await fetch(`${process.env.SERVER_HOST}/auth/get-user`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      {session.user && (
        <>
          <Image
            src="/profile/bg.png"
            alt="background"
            width={1920}
            height={1080}
            className="absolute z-[-10] top-0"
          />
          <div className="w-[84.7916666667%] min-h-[365px] h-fit duration-[350ms] bg-[#8758ae2d] border-[1px] border-[#2b1223b7] border-solid rounded-[16px] flex flex-col p-[15px] gap-[20px]">
            <div className="flex gap-[10px] items-center p-4 h-fit">
              <Avatar user={user} />
              <div>
                <p className="text-[24px] font-thin">Welcome, </p>
                <h1 className="text-[36px] font-extrabold">{user.name}</h1>
              </div>
            </div>
            <div className="flex gap-[12px] justify-center items-center h-fit">
              <PersonalInfo user={user} />
              <LangDetails user={user} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
