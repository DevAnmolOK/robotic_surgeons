import About from "@/components/aboutUsPage/about";
import WeAre from "@/components/aboutUsPage/whoWeAre";
import Vision from "@/components/aboutUsPage/vision";
import ChooseUs from "@/components/aboutUsPage/chooseUs";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function () {
  const aboutRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/block/aboutuspageabout`
  );
  const aboutData = await aboutRes.json();
  const { repeater_fields } = aboutData.block_data;
  const aboutItems = JSON.parse(repeater_fields as string);

  return (
    <>
      <div className=" h-full w-full flex items-center justify-center flex-col bg-white">
        {/* hero */}
        <Breadcrumbs title="About Us" bgImage="/homePage/heroimage.jpg" />
        {/* about us */}
        <About aboutItems={aboutItems[0]} />
        {/* who we are */}
        <WeAre aboutItems={aboutItems[1]} />
        {/* vision */}
        <Vision />
        {/* why chose us0 */}
        <ChooseUs />
      </div>
    </>
  );
}
