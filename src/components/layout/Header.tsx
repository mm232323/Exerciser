"use client";
import React, { useState } from "react";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getUser } from "../../../actions/main";
import { GoSignOut } from "react-icons/go";
import { CgMenuRightAlt } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
const Header: React.FC = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
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
      <header className="flex items-center p-4 w-fit max-[910px]:w-9/12 max-[910px]:max-w-10/12 max-[910px]:justify-between mt-4 min-[909px]:gap-[30px]">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>
        <div className="flex space-x-[40px] p-[30px] bg-[#E4E3E3] rounded-[10px] border-[#49243ea8] border-[.2px] max-[910px]:hidden">
          <Link href="/how-to-use">
            <h1
              className={`text-[20px] hover:opacity-70 duration-300 max-[950px]:text-[18px] ${
                pathname === "/how-to-use" ? "opacity-70" : "cursor-pointer"
              }`}
            >
              How
            </h1>
          </Link>
          <Link href="/profile">
            <h1
              className={`text-[20px] hover:opacity-70 duration-300 max-[950px]:text-[18px] ${
                pathname === "/profile" ? "opacity-70" : "cursor-pointer"
              }`}
            >
              Dashboard
            </h1>
          </Link>
          <Link href="/practice">
            <h1
              className={`text-[20px] hover:opacity-70 duration-300 max-[950px]:text-[18px] ${
                pathname === "/practice" ? "opacity-70" : "cursor-pointer"
              }`}
            >
              Practice
            </h1>
          </Link>
          <Link href="/create">
            <h1
              className={`text-[20px] hover:opacity-70 duration-300 max-[950px]:text-[18px] ${
                pathname === "/create" ? "opacity-70" : "cursor-pointer"
              }`}
            >
              Create
            </h1>
          </Link>
        </div>
        <CgMenuRightAlt
          color="#49243e"
          size={17}
          className="hidden max-[910px]:block cursor-pointer"
          onClick={() => setShowMenu((prevTog) => !prevTog)}
        />
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="w-full h-fit hidden max-[910px]:flex flex-col justify-center items-center gap-[20px] absolute left-0 top-0 bg-black/15 p-[10px] backdrop-blur-lg shadow-2xl"
              variants={{
                hidden: { opacity: 0, filter: "blur(6px)", y: -200 },
                visible: { opacity: 1, filter: "blur(0)", y: 0 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "keyframes", duration: 0.45 }}
            >
              <motion.div
                variants={{ rotate: { rotate: 360 }, fixed: { rotate: 0 } }}
                initial="rotate"
                animate="fixed"
                exit="rotate"
                transition={{ duration: 0.4 }}
              >
                <IoCloseCircle
                  color="#49243e"
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setShowMenu(false)}
                />
              </motion.div>
              <Link href="/how-to-use">
                <h1 className="text-[20px] font-normal hover:text-[21px] duration-300">
                  How
                </h1>
              </Link>
              <Link href="/profile">
                <h1 className="text-[20px] font-normal hover:text-[21px] duration-300">
                  Dashboard
                </h1>
              </Link>
              <Link href="/practice">
                <h1 className="text-[20px] font-normal hover:text-[21px] duration-300">
                  Practice
                </h1>
              </Link>
              <Link href="/Create">
                <h1 className="text-[20px] font-normal hover:text-[21px] duration-300">
                  Create
                </h1>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="max-[910px]:hidden">
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
                <Link href="/profile">
                  <Image
                    src={avatar ? avatar : "/avatar.svg"}
                    alt="avatar"
                    width={65}
                    height={65}
                    className="rounded-full"
                  />
                </Link>
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
