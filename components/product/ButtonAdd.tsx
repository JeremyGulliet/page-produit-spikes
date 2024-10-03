import React from 'react'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ButtonAdd() {
  return (
    <button className={`${poppins.className} bg-[#3AA39F] text-white font-semibold w-44 gap-4 rounded-[4px] px-10 py-4`}>
      Add to Cart
    </button>
  );
}
