import Accordion from "@/components/Accordion";
const items = [
  {
    question: "What is the meaning of Lorem ipsum?",
    answer:
      "Lorem Ipsum is placeholder text commonly used in the design and publishing industry. It has no real meaning and is derived from a scrambled Latin text.",
  },
  {
    question: "Why is Lorem Ipsum Dolor used?",
    answer:
      "It is used to focus attention on the design and layout elements rather than the content. This allows designers to assess visual aesthetics without distraction.",
  },
  {
    question: "What is the most used version?",
    answer:
      "The most commonly used version begins with 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'. This version has been widely adopted across publishing tools.",
  },
  {
    question: "What are the origins of Lorem Ipsum Dolor Sit?",
    answer:
      "The text originates from a work by Cicero written in 45 BC, titled 'de Finibus Bonorum et Malorum'. It was altered and used in typesetting as early as the 1500s.",
  },
  {
    question: "What is the original text of Lorem Ipsum Dolor Sit Amet?",
    answer:
      "The original Latin text from Cicero reads: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'",
  },
  {
    question: "What is the meaning of Lorem ipsum?",
    answer:
      "It doesn’t carry a literal meaning. Instead, it serves as a standard filler text for previewing layouts and mockups.",
  },
  {
    question: "What are the origins of Lorem Ipsum Dolor Sit?",
    answer:
      "Its origins trace back to classical Latin literature, specifically from Cicero’s philosophical works, repurposed over centuries in printing and digital design.",
  },
  {
    question: "Why is Lorem Ipsum Dolor used?",
    answer:
      "It helps avoid distraction from actual content, allowing designers to present clean and distraction-free layouts to stakeholders and clients.",
  },
  {
    question: "What is the most used version?",
    answer:
      "The standard 'Lorem ipsum dolor sit amet...' version is most frequently used due to its balance of character distribution and visual appeal.",
  },
  {
    question: "What are the origins of Lorem Ipsum Dolor Sit?",
    answer:
      "Lorem Ipsum was extracted from the Latin work 'de Finibus Bonorum et Malorum', which was a treatise on ethics and philosophy.",
  },
  {
    question: "What is the original text of Lorem Ipsum Dolor Sit Amet?",
    answer:
      "The original phrase translates roughly as 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'",
  },
  {
    question: "What is the meaning of Lorem ipsum?",
    answer:
      "Though it appears Latin, the text has been jumbled and doesn’t convey a coherent meaning. It serves purely as placeholder content.",
  },
  {
    question: "What are the origins of Lorem Ipsum Dolor Sit?",
    answer:
      "Its roots lie in a 1st-century BC Latin manuscript. It gained widespread use during the 1500s when an unknown printer scrambled it to make a type specimen book.",
  },
];

export default function () {
  return (
    <>
      <div className=" h-full w-full flex items-center justify-center flex-col bg-white">
        {/* hero */}
        <div
          className="relative sm:h-[14.5rem] h-[10rem]  w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/homePage/heroimage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-playfair">
            <h1 className="text-white text-p3xl font-bold">FAQs</h1>
          </div>
        </div>
        <div className=" sm:max-w-[75vw] max-w-[85vw] w-full flex flex-col items-center">
          <div className=" pt-[3rem] pb-[2.25rem]">
            <h2 className="text-t2 font-bold font-playfair text-black">
              Frequently Asked Questions
            </h2>
          </div>
          <div className=" w-full mb-[4.5rem]">
            <Accordion items={items} />
          </div>
        </div>
      </div>
    </>
  );
}
