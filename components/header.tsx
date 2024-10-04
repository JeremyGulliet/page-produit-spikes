"use client"

import { Cambay, Poppins } from "next/font/google";
import { RiMenu5Fill, RiShoppingBag3Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { FaInfoCircle, FaUsers } from "react-icons/fa";
import { MdContactMail, MdDesignServices } from "react-icons/md";

const cambay = Cambay({
  weight: ["700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const CartIconWithDropdown = () => {
  interface CartItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleCartUpdate = () => {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    };

    // Écoute de l'événement personnalisé 'cartUpdated'
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Chargement initial des articles du panier au montage du composant
    handleCartUpdate();

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Fonction pour supprimer un article du panier
  const handleRemoveItem = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Émettre l'événement 'cartUpdated' pour mettre à jour le panier dans l'ensemble de l'application
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center justify-center">
          <BsCart2 size={24} />
          {cartItems.length > 0 && (
            <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-red-100">
              {cartItems.length}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 bg-white p-4">
        {cartItems.length === 0 ? (
          <DropdownMenuItem className="justify-center">
            Votre panier est vide.
          </DropdownMenuItem>
        ) : (
          cartItems.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="flex items-center space-x-4 py-2"
            >
              <Image src={item.image} alt={item.name} width={100} height={50} />
              <div className="flex-1">
                <h2 className="text-sm font-semibold">{item.name}</h2>
                <p className="text-xs">
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-xs text-red-500"
              >
                Supprimer
              </button>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuItem asChild>
          <Link
            href="/cart"
            className="hover: mt-4 flex w-full items-center justify-center rounded-xl bg-[#3AA39F] py-2 text-white"
          >
            Voir le panier
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ResponsiveMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navs = ["SHOP", "COLLECTIVE", "DESIGNERS", "ABOUT US", "CONTACT"];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
      <button className="flex items-center justify-center p-5 lg:hidden">
        <RiMenu5Fill size={24} />
      </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4 sm:max-w-sm">
      <SheetHeader></SheetHeader>
      <nav className="mt-8">
        <ul className="flex flex-col space-y-4">
        {navs.map((nav) => (
          <li key={nav} className="flex items-center text-lg font-semibold text-[#17183B]">
          <span className="mr-2">
            {nav === "SHOP" && <RiShoppingBag3Fill size={20} />}
            {nav === "COLLECTIVE" && <FaUsers size={20} />}
            {nav === "DESIGNERS" && <MdDesignServices size={20} />}
            {nav === "ABOUT US" && <FaInfoCircle size={20} />}
            {nav === "CONTACT" && <MdContactMail size={20} />}
          </span>
          <Link href="/" onClick={() => setIsOpen(false)}>
            {nav}
          </Link>
          </li>
        ))}
        </ul>
      </nav>
      </SheetContent>
    </Sheet>
  );
};

export default function Header() {
  const navs = ["SHOP", "COLLECTIVE", "DESIGNERS", "ABOUT US", "CONTACT"];

  return (
    <header className="flex h-20 items-center justify-between border-b border-[#C9C2C5]">
      <p
        className={`${cambay.className} ml-10 mt-1 flex items-center justify-center text-2xl font-bold text-[#17183B]`}
      >
        Cozy<span className="font-normal">®</span>
      </p>
      <nav className={`${poppins.className} flex`}>
        <ul className="hidden items-center justify-center gap-10 lg:flex">
          {navs.map((nav) => (
            <li
              key={nav}
              className="link relative p-2 text-sm font-semibold text-[#17183B]"
            >
              <Link href="/">{nav}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex h-full justify-between">
        <div className="flex items-center justify-center p-5">
          <ResponsiveMenu />
        </div>
        <div className="flex items-center justify-center p-5">
          <IoIosSearch size={24} />
        </div>
        <div className="border-border-[#C9C2C5] flex items-center justify-center border-l border-solid p-10">
          <CartIconWithDropdown />
        </div>
      </div>
    </header>
  );
}