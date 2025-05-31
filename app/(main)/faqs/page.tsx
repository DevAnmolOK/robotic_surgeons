import Accordion from "@/components/Accordion";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function () {
  const faqRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/block/faqsaccordian`
  );
  const faqsData = await faqRes.json();

  const { heading, repeater_fields } = faqsData.block_data;

  const faqItems = JSON.parse(repeater_fields as string);

  return (
    <>
      <div className=" h-full w-full flex items-center justify-center flex-col bg-white">
        {/* hero */}

        <Breadcrumbs title="FAQs" bgImage="/homePage/heroimage.jpg" />

        <div className=" sm:max-w-[75vw] max-w-[85vw] w-full flex flex-col items-center">
          <div className=" pt-[3rem] pb-[2.25rem]">
            <h2 className="text-t2 font-bold font-playfair text-black capitalize">
              {heading ?? ""}
            </h2>
          </div>
          <div className=" w-full mb-[4.5rem]">
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </>
  );
}
