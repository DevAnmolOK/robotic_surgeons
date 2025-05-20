type BlockData = {
  id: number;
  name: string;
  alias: string;
  heading: string;
  sub_heading: string;
  description: string;
  content: string;
  image: string;
}

type HeroSectionProps = {
  bannerData: BlockData;
}

const HeroSection:React.FC<HeroSectionProps> = ({bannerData}) => {

  const { image, heading, sub_heading } = bannerData;

  const imageUrl = image
  ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image}`
  : 'https://placehold.co/700x904.png';

  return (
    <div className="relative h-[55vh] sm:h-heroimge  w-full bg-black/50 p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover   bg-no-repeat "
        style={{
          backgroundImage: `url(${imageUrl})`,
          // backgroundSize: "100%", // Zoom level
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center md:px-4">
        <h1 className="text-psm font-bold  font-playfair">
          {heading ?? ''}
        </h1>
        <p className=" text-pxs tracking-[.25px] font-sans">
         {sub_heading ?? ''}
        </p>
      </div>
    </div>
  );
}

export default HeroSection