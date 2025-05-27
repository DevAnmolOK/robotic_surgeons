"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

type AccordionItem = {
  heading: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };


  return (
    <div className="mx-auto sm:max-w-[68vw] max-w-[85vw] w-full space-y-[1.2rem] text-accordion font-normal text-plg font-sans">
      {items.map((item, index) => (
        <div
          key={index}
          className="accordion-shadow rounded-2xl bg-white px-[1.5rem]"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between  items-center p-[1.25rem] text-left transition"
          >
            {`Question ${index + 1}.${" "} ${" "}${item.heading}`}
            <HiChevronDown
              className={`transform transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
                }`}
              size={24}
            />
          </button>
          {openIndex === index && <div className="p-4">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}
