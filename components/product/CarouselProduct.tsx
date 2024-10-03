import React, { useState } from 'react'
import dataImage from './dataImage.json';
import Image, { StaticImageData } from 'next/image';
import chevronLeft from "../../public/assets/chevron-left.png";
import chevronRight from "../../public/assets/chevron-right.png";

export default function Carousel(): JSX.Element {
  const images = dataImage.map(
    (img) => img.image as unknown as StaticImageData
  );
  const [currentImage, setCurrentImage] = useState<StaticImageData>(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const handleImageChange = (image: StaticImageData) => {
    if (image === currentImage) return;
    const index = images.indexOf(image);
    const mainImage = document.getElementById("main-image");

    if (mainImage) {
      const direction = index > currentIndex ? -1 : 1;

      mainImage.style.transition = "transform 0.4s ease";
      mainImage.style.transform = `translateX(${direction * 100}%)`;

      setTimeout(() => {
        mainImage.style.transition = "none";
        mainImage.style.transform = `translateX(${direction * -100}%)`;
      }, 400);

      setTimeout(() => {
        setCurrentIndex(index);
        setCurrentImage(image);

        mainImage.style.transition = "transform 0.4s ease";
        mainImage.style.transform = "translateX(0%)";
      }, 500);
    }
  };

  const handleNextImage = () => {
    const mainImage = document.getElementById("main-image");
    if (mainImage) {
      mainImage.style.transition = "transform 0.4s ease";
      mainImage.style.transform = "translateX(-100%)";

      setTimeout(() => {
        mainImage.style.transition = "none";
        mainImage.style.transform = "translateX(100%)";
      }, 400);

      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setCurrentImage(images[nextIndex]);

        mainImage.style.transition = "transform 0.4s ease";
        mainImage.style.transform = "translateX(0%)";
      }, 500);
    }
  };

  const handlePreviousImage = () => {
    const mainImage = document.getElementById("main-image");

    if (mainImage) {
      mainImage.style.transition = "transform 0.4s ease";
      mainImage.style.transform = "translateX(100%)";

      setTimeout(() => {
        mainImage.style.transition = "none";
        mainImage.style.transform = "translateX(-100%)";
      }, 400);

      setTimeout(() => {
        const previousIndex =
          currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(previousIndex);
        setCurrentImage(images[previousIndex]);

        mainImage.style.transition = "transform 0.4s ease";
        mainImage.style.transform = "translateX(0%)";
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-1/2">
      <div className="flex w-full flex-col items-end gap-4 ">
        <div className="flex items-baseline gap-3 pr-7 ">
          <p className="headline-medium text-space-cadet">
            0{currentIndex + 1}
          </p>
          <p className="title-medium text-cool-grey">/ 05</p>
        </div>
        <div className="flex gap-20 ">
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
        <div className="relative h-[469.5px] w-[844px] overflow-hidden ">
          <Image
            priority
            src={currentImage}
            alt="Meryl Lounge Chair"
            id="main-image"
            width={500}
            height={461}
          />
        </div>
      </div>

      <div className="flex items-end gap-6 ">
        {images.map((image) => (
          <Image
            key={image.src}
            src={image}
            width={104}
            height={104}
            className={`object-cover cursor-pointer rounded-[5px] border-2 border-solid p-2 ${
              currentImage === image ? "border-[#3AA39F]" : "border-[#D1D1D8]"
            }`}
           
            onClick={() => handleImageChange(image)}
            alt={""}
          />
        ))}
      </div>
    </div>
  );
};