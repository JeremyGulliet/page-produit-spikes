"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import minus from "../../public/assets/minus.png";
import plus from "../../public/assets/plus.png";

type QuantityProps = {
  handleQuantityChange: (value: number) => void;
};

const Quantity: React.FC<QuantityProps> = ({ handleQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 999) {
      setQuantity(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) <= 999) {
      setQuantity(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    handleQuantityChange(quantity);
  }, [handleQuantityChange, quantity]);

  return (
    <div className="relative flex h-[52px] w-40 ml-20 select-none items-center justify-center rounded-[4px] border border-cool-grey">
      <Image
        src={minus}
        alt="Minus button"
        className="absolute left-3 size-5 cursor-pointer"
        onClick={handleDecrement}
      />
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        className="label-large w-12 border-none text-center focus:outline-none"
      />
      <Image
        src={plus}
        alt="Plus button"
        className="absolute right-3 size-5 cursor-pointer"
        onClick={handleIncrement}
      />
    </div>
  );
};

export default Quantity;
