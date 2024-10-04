import React from 'react'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type ButtonAddProps = {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  quantity: number;
};

const ButtonAdd: React.FC<ButtonAddProps> = ({
  productId,
  productName,
  productDescription,
  productPrice,
  productImage,
  quantity,
}) => {
  type CartItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  };
  
  const handleAddToCart = () => {
    const cartItems = localStorage.getItem("cartItems");
    let updatedCartItems: CartItem[] = [];

    if (cartItems) {
      updatedCartItems = JSON.parse(cartItems);
    }

    const existingItemIndex = updatedCartItems.findIndex(
      (item: CartItem) => item.id === productId,
    );

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity += quantity;
    } else {
      updatedCartItems.push({
        id: productId,
        name: productName,
        description: productDescription,
        price: productPrice,
        quantity: quantity,
        image: productImage,
      });
    }

    // Mise à jour du localStorage avec les nouveaux articles du panier
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Émission de l'événement personnalisé 'cartUpdated' pour notifier le panier
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  return (
    <button
      className={`${poppins.className} bg-[#3AA39F] text-xs text-white font-semibold md:w-44 gap-4 rounded-[4px] px-10 py-4`}
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default ButtonAdd;