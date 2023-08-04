import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, memo } from "react";
import { CiDark,CiLight } from "react-icons/ci";

const Navbar= memo(({ setMode ,mode}) => {
  const router = useRouter()
  return (
    <nav
      className={`
      w-full
      h-20
      bg-white
      flex
      items-center
      justify-between
      px-6
      shadow-sm
      fixed
      top-0
      left-0
      z-40
      dark:bg-dark-element
      md:h-16
      lg:px-14
    `}
    >
      <Link href="/"
        className="
        first-letter:capitalize 
        font-bold 
        text-lg
        lg:text-xl
        tracking-wide
        cursor-pointer
        "
        onClick={()=>{
          if(router.pathname !== "/") {
            return router.push("/")
          }
          return router.reload()
        }}
      >
        where in the world?
      </Link>
      <div
        className={`
        flex
        items-center
        gap-2
        cursor-pointer
        `}
        onClick={setMode}
      >
        {mode==="dark"?<CiLight/>:<CiDark />}
        
        <h3 className="
        capitalize 
        cursor-pointer
        text-sm
        ">
          {mode==="dark"?"light mode":"dark mode"}
        </h3>
      </div>
    </nav>
  );
});
Navbar.displayName="Navbar"
export default Navbar;
