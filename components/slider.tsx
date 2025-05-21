"use client";
import dynamic from "next/dynamic";

// const ComponentSliderCard = dynamic(() => import("./SliderCard"));
import TestimonialCard from "./testimonailCard";
// import { Icon } from "@iconify/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface SlickSliderProps {
  products: any;
}

export default function SlickSlider({ products }: SlickSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    className: "center max-w-[90vw]  ",
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1440, // for tablets and smaller laptops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // for tablets and smaller laptops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // for mobile landscape and small tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480, // for mobile portrait
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center text-red-500">No products available</div>
    );
  }

  return (
    <div className="sm:max-w-[70vw] mx-auto p-4">
      <Slider {...settings}>
        {products?.map((data, index) => (
          <div
            key={index}
            className="h-full flex items-stretch px-2 sm:px-3 md:px-4 lg:px-5  "
          >

            <div className="bg-black text-white h-[22.5rem] p-8 rounded-lg mb-5 shadow-lg flex flex-col  shadow-theme">
              <div className="flex items-center mb-4 relative w-fit">
                <Image
                  src={
                    data.image
                      ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${data.image}`
                      : 'https://placehold.co/16x16.png'
                  }
                  alt={data.heading ?? ''}
                  width={64}
                  height={64}
                  className="rounded-full object-contain"
                />
                <Image
                  src="/mark.png"
                  alt={data.heading ?? ''}
                  width={22}
                  height={22}
                  className="rounded-full object-contain absolute right-0 top-0"
                />
              </div>
              <div className="py-1">
                <div className="font-semibold text-base sm:text-lg">
                  {data.heading ?? ''}
                </div>
              </div>
              <p className="text-plg font-light font-inter line-clamp-6 ">
                “{data.content ?? ''}”
              </p>
            </div>
            {/* <TestimonialCard testimonial={data} /> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}
