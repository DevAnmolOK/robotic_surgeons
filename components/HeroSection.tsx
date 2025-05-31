interface HeroSection {
  pageName: string;
}
export default function HeroSection({ pageName }: HeroSection) {
  return (
    <>
      <div
        className="relative sm:h-[14.5rem] h-[10rem]  w-full bg-cover bg-center "
        style={{ backgroundImage: "url('/homePage/heroimage.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-playfair">
          <h1 className="text-white text-p3xl font-bold">{pageName}</h1>
        </div>
      </div>
    </>
  );
}
