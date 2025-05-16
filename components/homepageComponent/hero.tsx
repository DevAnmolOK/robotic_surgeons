export default function HeroSection() {
  return (
    <div className="relative md:h-[65vh] h-[45vh]  w-full bg-black/50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover  bg-no-repeat"
        style={{ backgroundImage: "url('/homePage/heroimage.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl sm:text-6xl lg:text-psm font-bold mb-4 font-playfair">
          Healthcare at Your Fingertips
        </h1>
        <p className=" text-base md:text-lg lg:text-pxs  tracking-wide font-sans">
          Book an online consultation and get medical advice in just a few
          clicks.
        </p>
      </div>
    </div>
  );
}
