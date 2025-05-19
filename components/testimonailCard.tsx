interface TestimonialCardProps {
  testimonial: any;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-black text-white h-[22.5rem] p-8 rounded-lg mb-5 shadow-lg flex flex-col  shadow-theme">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-16 h-16   rounded-full"
        />
      </div>
      <div className="py-1">
        <div className="font-semibold text-base sm:text-lg">
          {testimonial.name}
        </div>
      </div>
      <p className="text-plg font-light font-inter line-clamp-6 ">
        “{testimonial.quote}”
      </p>
    </div>
  );
}
