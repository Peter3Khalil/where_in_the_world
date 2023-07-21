import Link from "next/link";
import React, { FC } from "react";
import { CiDark,CiLight } from "react-icons/ci";

const Navbar= ({ setMode ,mode}) => {
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
      <Link href={`/`}
        className="
        first-letter:capitalize 
        font-bold 
        text-lg
        lg:text-xl
        tracking-wide
        "
      >
        where in the world?
      </Link>
      <div
        className={`
        flex
        items-center
        gap-2
        `}
      >
        {mode==="dark"?<CiLight/>:<CiDark />}
        
        <h3 className="
        capitalize 
        cursor-pointer
        text-sm
        " onClick={setMode}>
          {mode==="dark"?"light mode":"dark mode"}
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
