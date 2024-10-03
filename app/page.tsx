/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ButtonBack from "@/components/ButonBack";
import ButtonAdd from "@/components/product/ButtonAdd";
import ButonWish from "@/components/product/ButtonWhish";
import CarouselProduct from "@/components/product/CarouselProduct";
import ProductDetails from "@/components/product/ProductDetails";
import ProductHeader from "@/components/product/ProductHeader";
import Quantity from "@/components/product/Quantity";
import Social from "@/components/product/Social";
import SwitchColor from "@/components/product/SwitchColor";
import { useState } from "react";

export default function Home() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };
  const handleWishlist = () => {
    if (localStorage.getItem("wishlist") === null) {
      localStorage.setItem("wishlist", JSON.stringify(["Meryl Lounge Chair"]));
    } else {
      localStorage.removeItem("wishlist");
    }
  };
  return (
    <main className="text-space-cadet flex items-center justify-center">
      <div className="flex w-1/2 flex-col gap-12 ">
        <div className="flex flex-col gap-4">
          <ButtonBack />
          <ProductHeader category="Chair" name="Meryl Lounge Chair" />
        </div>
        <ProductDetails
          title="Merly Lounge Chair"
          price={149.99}
          rating={4.6}
          reviews={556}
          description="The gently curved lines accentuated by sewn details are kind to your body and pleasant to look at. Also, there’s a tilt and height-adjusting mechanism that’s built to outlast years of ups and downs."
        />
        <SwitchColor
          colors={["#C1BDB3", "#58737D", "#545454", "#CBA5A5"]}
          selectedColor="#C1BDB3"
        />
        <div className="flex gap-6">
          <Quantity handleQuantityChange={handleQuantityChange} />
          <ButtonAdd />
        </div>
        <p className="ml-20">
          Free 3-5 day shipping • Tool-free assembly • 30-day trial
        </p>
        <div className="ml-20 flex justify-between items-center mb-20 w-2/3">
          <ButonWish handleWishlist={handleWishlist} />
          <Social />
        </div>
      </div>
      
      <CarouselProduct />
    </main>
  );
}
