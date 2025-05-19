export default function HeroSection() {
  return (
    // <div className="relative sm:h-heroimge  h-auto  w-full bg-black/50">
    <div className="relative h-[55vh] sm:h-heroimge  w-full bg-black/50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover   bg-no-repeat "
        style={{
          backgroundImage: "url('/homePage/heroimage.jpg')",
          // backgroundSize: "100%", // Zoom level
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center md:px-4">
        <h1 className="text-psm font-bold  font-playfair">
          Healthcare at Your Fingertips
        </h1>
        <p className=" text-pxs tracking-[.25px] font-sans">
          Book an online consultation and get medical advice in just a few
          clicks.
        </p>
      </div>
    </div>
  );
}
