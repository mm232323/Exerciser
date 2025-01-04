"use client";
import React from "react";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getUser } from "../../../actions/main";
import { GoSignOut } from "react-icons/go";
const Header: React.FC = () => {
  const [avatar, setAvatar] = React.useState<string>("");
  const { data: session } = useSession();
  const pathname = usePathname();
  React.useEffect(() => {
    async function getAvatar() {
      if (session?.user) {
        setAvatar((await getUser(session.user.email as string)).avatar);
      }
    }
    getAvatar();
  }, [session]);
  const handleSignOut = () => {
    signOut();
    redirect("/");
  };
  return (
    <center>
      <header className="flex items-center p-4 max-w-fit mt-4 gap-[30px]">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <div className="flex space-x-[40px] p-[30px] bg-[#E4E3E3] rounded-[10px] border-[#49243ea8] border-[.2px]">
          <Link href="/">
            <h1
              className={`text-[20px] hover:opacity-70 duration-300 ${
                pathname === "/" ? "opacity-70" : "cursor-pointer"
              }`}
            >
              Home
            </h1>
          </Link>
          <Link href="/dashboard">
            <h1
              className={`text-[20px] hover:opacity-70 duration-300 ${
                pathname === "/dashboard" ? "opacity-70" : "cursor-pointer"
              }`}
            >
              Dashboard
            </h1>
          </Link>
          <Link href="/practice">
            <h1
              className={`text-[20px] hover:opacity-70 duration-300 ${
                pathname === "/practise" ? "opacity-70" : "cursor-pointer"
              }`}
            >
              Practice
            </h1>
          </Link>
          <Link href="/create">
            <h1
              className={`text-[20px] hover:opacity-70 duration-300 ${
                pathname === "/create" ? "opacity-70" : "cursor-pointer"
              }`}
            >
              Create
            </h1>
          </Link>
        </div>
        <div>
          <div className="flex space-x-4">
            {!session?.user ? (
              <>
                <Link href="/login">
                  <button className="text-[25px] font-thin bg-[#49243E] flex items-center justify-center w-[130px] h-[65px] rounded-[10px] text-white">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="text-[25px] font-thin border-[.5px] border-[#49243E] flex items-center justify-center w-[130px] h-[65px] rounded-[10px]">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Image
                  src={avatar ? avatar : "/avatar.svg"}
                  alt="avatar"
                  width={65}
                  height={65}
                  className="rounded-full"
                />
                <div
                  className="flex items-center justify-center w-[65px] h-[65px] bg-[rgba(0,0,0,.06)] rounded-full cursor-pointer"
                  onClick={handleSignOut}
                >
                  <GoSignOut size={26} color="#49243E" />
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </center>
  );
};

export default Header;