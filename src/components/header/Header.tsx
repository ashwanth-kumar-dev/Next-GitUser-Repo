import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="bg-[#2980b9] text-center w-screen h-11 mb-4 pt-2 flex">
        <Link href="/" className="ml-2"><Image src='/GitHub-Symbol.png' alt="logo.png"  width={60} height={40}/></Link>
        
        <h1 className="text-2xl  font-bold inline text-white grow">
          GitHub User Profile App
        </h1>
      </div>
    </header>
  );
};

export default Header;
