import React from 'react'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

type ProductHeaderProps = {
  category: string;
  name: string;
};

const ProductHeader: React.FC<ProductHeaderProps> = ({ category, name }) => {
  return (
    <div className={`${poppins.className} flex gap-2 text-[#17183B] ml-8 md:ml-20`}>
      <p className="opacity-40">{category}</p>
      <p className="font-semibold text-sm">/</p>
      <p>{name}</p>
    </div>
  );
};

export default ProductHeader;
