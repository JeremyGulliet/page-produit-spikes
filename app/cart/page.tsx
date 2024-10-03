"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CartItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
};

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Fetch cart items from localStorage or an API
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const handleQuantityChange = (id: number, quantity: number) => {
      const updatedCartItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // Émettre l'événement cartUpdated après la mise à jour de la quantité
      const event = new Event("cartUpdated");
      window.dispatchEvent(event);
    };

    const handleRemoveItem = (id: number) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // Émettre l'événement cartUpdated après la mise à jour
      const event = new Event("cartUpdated");
      window.dispatchEvent(event);
    };

    const handleCheckout = () => {
        // Handle checkout logic
        alert('Proceeding to checkout');
    };

    return (
      <main className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Votre panier</h1>
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 rounded border p-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                />
                <div className="flex-1 border-r-2 pr-4">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>{item.description}</p>
                  {item.price !== undefined ? (
                    <p className="text-lg font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-lg font-bold">Prix non disponible</p>
                  )}
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-12 text-center"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="pl-4 text-red-500"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex flex-col items-end">
                <Link href="/" className="mt-2 rounded bg-gray-200 px-4 py-2">
                  Continuer mes achats
                </Link>
              </div>
              <p className="text-xl font-bold">
                Montant total: $
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="rounded bg-[#3AA39F] px-4 py-2 text-white"
              >
                Valider ma commande
              </button>
            </div>
          </div>
        )}
      </main>
    );
}

export default CartPage;