import Image from "next/image";
import Stars from "../../public/assets/Stars.png";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
});

type ProductDetailsProps = {
  title: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  price,
  rating,
  reviews,
  description,
}) => {
  return (
    <div className={`${poppins.className}flex flex-col gap-10 w-2/3 ml-20`}>
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl font-bold leading-loose text-[#17183B]">
          {title}
        </h1>
        <div className="flex items-center justify-between">
          <h2 className="title-medium text-[#17183B]">${price}</h2>
          <div className="flex gap-3">
            <Image src={Stars} alt="Stars rate" width={86} height={14} />
            <p className="body-large text-[#17183B]">
              {rating} / 5.0 <span className="text-cool-grey">({reviews})</span>
            </p>
          </div>
        </div>
      </div>
      <p className="text-base text-[#17183B] w-11/12">{description}</p>
    </div>
  );
};

export default ProductDetails;
