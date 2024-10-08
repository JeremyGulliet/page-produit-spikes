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
    <main className="text-space-cadet flex flex-col xl:flex-row items-center justify-center p-4 md:p-8">
      <div className="flex w-full xl:w-1/2 flex-col gap-12">
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
      <div className="flex flex-col md:flex-row gap-6">
        <Quantity handleQuantityChange={handleQuantityChange} />
        <ButtonAdd
        productId={0}
        productName="Merly Lounge Chair"
        productPrice={149.99}
        productImage="/assets/Meryl_Lounge_Chair_Teal_3 1.png"
        quantity={quantity}
        productDescription="The gently curved lines accentuated by sewn details are kind to your body and pleasant to look at. Also, there’s a tilt and height-adjusting mechanism that’s built to outlast years of ups and downs."
        />
      </div>
      <p className="flex text-justify ml-4 md:ml-20 text-sm md:text-base">
        Free 3-5 day shipping • Tool-free assembly • 30-day trial
      </p>
      <div className="pb-10 xl:mb-20 px-4 md:px-8 md:ml-20 flex md:w-2/3 items-center justify-between border-b-2 lg:border-none">
        <ButonWish handleWishlist={handleWishlist} />
        <Social />
      </div>
      </div>

      <CarouselProduct />
    </main>
  );
}
