"use client";
import { FaRegHeart } from "react-icons/fa";

import { useEffect, useState } from "react";

type WishlistBtnProps = {
  handleWishlist: () => void;
};

export default function ButonWish({ handleWishlist }: WishlistBtnProps): JSX.Element {
  const [fill, setFill] = useState<string>("none");

  const handleFilling = () => {
    setFill(fill === "none" ? "#3AA39F" : "none");
  };

  useEffect(() => {
    if (localStorage.getItem("wishlist") !== null) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") as string);
      if (wishlist.includes("Meryl Lounge Chair")) {
        setFill("#3AA39F");
      }
    }
  }, []);

  return (
    <div
      className="flex cursor-pointer items-center gap-4 hover:scale-105"
      onClick={() => {
        handleFilling();
        handleWishlist();
      }}
    >
      <FaRegHeart size={24} color="#3AA39F" />
      <p className="text-base text-[#3AA39F]">Add to wishlist</p>
    </div>
  );
};
