interface TestimonialCardProps {
  testimonial: any;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-black text-white p-6 rounded-lg mb-5 shadow-lg   shadow-theme ">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-16 h-16   rounded-full"
        />
      </div>
      <div className="py-1">
        <div className="font-semibold text-lg">{testimonial.name}</div>
      </div>
      <p className=" text-lg font-extralight">“{testimonial.quote}”</p>
    </div>
  );
}
