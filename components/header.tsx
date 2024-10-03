import React from 'react'
import { Cambay, Poppins } from "next/font/google";
import { RiMenu5Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import Link from 'next/link';

const cambay = Cambay({
  weight: ["700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: '400'
});

export default function Header() {

  const navs = ["SHOP", "COLLECTIVE", "DESIGNERS", "ABOUT US", "CONTACT"];
    
    return (
      <header className="flex justify-between h-20 items-center border-b border-[#C9C2C5]">
        <p
          className={`${cambay.className} flex justify-center items-center text-[#17183B] text-2xl font-bold ml-10 mt-1`}
        >
          Cozy<span className="font-normal">®</span>
        </p>
        <nav className={`${poppins.className}flex `}>
          <ul className="flex justify-center items-center gap-10 ">
            {navs.map((nav) => (
              <li
                key={nav}
                className="text-sm font-semibold text-[#17183B] p-2 link relative"
              >
                <Link href="/">{nav}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex h-full justify-between">
          <div className="flex items-center justify-center p-5">
            <RiMenu5Fill size={24} />
          </div>
          <div className="flex items-center justify-center p-5">
            <IoIosSearch size={24} />
          </div>
          <div className="flex items-center justify-center border-l border-solid border-border-[#C9C2C5] p-10">
            <BsCart2 size={24} />
          </div>
        </div>
      </header>
    );
}