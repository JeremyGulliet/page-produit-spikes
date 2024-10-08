import React, { useState, } from "react";
import dataImage from "./dataImage.json";
import Image, { StaticImageData } from "next/image";
import chevronLeft from "../../public/assets/chevron-left.png";
import chevronRight from "../../public/assets/chevron-right.png";

export default function Carousel(): JSX.Element {
  const images = dataImage.map(
    (img) => img.image as unknown as StaticImageData,
  );
  const [currentImage, setCurrentImage] = useState<StaticImageData>(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const transitionImage = (newIndex: number, direction: number) => {
    const mainImage = document.getElementById("main-image");
    if (mainImage) {
      mainImage.style.transition = "transform 0.4s ease";
      mainImage.style.transform = `translateX(${direction * 100}%)`;

      setTimeout(() => {
        mainImage.style.transition = "none";
        mainImage.style.transform = `translateX(${direction * -100}%)`;
      }, 400);

      setTimeout(() => {
        setCurrentIndex(newIndex);
        setCurrentImage(images[newIndex]);

        mainImage.style.transition = "transform 0.4s ease";
        mainImage.style.transform = "translateX(0%)";
      }, 500);
    }
  };

  const handleImageChange = (image: StaticImageData) => {
    if (image === currentImage) return;
    const index = images.indexOf(image);
    const direction = index > currentIndex ? -1 : 1;
    transitionImage(index, direction);
  };

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    transitionImage(nextIndex, -1);
  };

  const handlePreviousImage = () => {
    const previousIndex =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    transitionImage(previousIndex, 1);
  };

  return (
    <div className="flex w-full flex-col items-center gap-8 p-4 md:p-10 xl:w-1/2 xl:py-10 xl:pr-10">
      <div className="flex w-full flex-col items-end gap-4">
        <div className="flex items-baseline gap-3 pr-7">
          <p className="headline-medium text-space-cadet">
            0{currentIndex + 1}
          </p>
          <p className="title-medium text-cool-grey">/ 05</p>
        </div>
        <div className="flex gap-10 md:gap-20">
          <Image
            src={chevronLeft}
            alt="Left arrow"
            className="cursor-pointer"
            onClick={handlePreviousImage}
          />
          <Image
            src={chevronRight}
            alt="Right arrow"
            className="cursor-pointer"
            onClick={handleNextImage}
          />
        </div>
        <div className="relative h-[200px] w-[300px] overflow-hidden sm:h-[250px] sm:w-[400px] md:h-[300px] md:w-[500px] lg:h-[350px] lg:w-[600px] xl:h-[469.5px] xl:w-[844px]">
          <Image
            priority
            src={currentImage}
            alt="Meryl Lounge Chair"
            id="main-image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="flex flex-col items-end gap-6 md:flex-row">
        {images.map((image) => (
          <Image
            key={image.src}
            src={image}
            width={64}
            height={64}
            className={`cursor-pointer rounded-[5px] border-2 border-solid object-cover p-2 ${
              currentImage === image ? "border-[#3AA39F]" : "border-[#D1D1D8]"
            } md:h-[104px] md:w-[104px]`}
            onClick={() => handleImageChange(image)}
            alt={""}
          />
        ))}
      </div>
    </div>
  );
}
