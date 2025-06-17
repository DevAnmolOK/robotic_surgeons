"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type MembershipCardProps = {
  id: string,
  price: string,
  heading: string;
  short_description: string,
  description: string;
}
export default function MembershipCard({ id, heading, price, short_description, description }: MembershipCardProps) {

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const modifiedDescription = description.replace(
    /<ul>/g,
    '<ul class="space-y-2 list-disc list-inside text-plg font-normal leading-[2rem] pb-[1rem]">'
  );


  const handleCheckout = async () => {

    const doctorId = localStorage.getItem("doctor_id");
    const email = localStorage.getItem("doctor_email");

    if (!doctorId || !email) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: id,
          email: email,
          doctor_id: parseInt(doctorId),
        }),
      });

      const json = await response.json();

      if (!json.success || !json.data?.url) {
        alert("Failed to create checkout session");
      }
      window.location.href = json.data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div
        className={`group flex md:h-[32.5rem] max-h-[38.5rem] md:max-w-[23rem] max-w-[28rem] w-full hover:h-[34.813rem] hover:max-w-[23rem] border border-[#E3E3E3] hover:bg-theme hover:text-white text-black flex-col p-[2.25rem] rounded-[2.375rem] transition-all duration-400`}
      >
        <div>
          <h2 className=" font-semibold text-p3xl mb-[0.5rem] font-playfair leading-[2rem]">
            {heading ?? ''}
          </h2>
          <p className="mb-[1.5rem] font-normal text-pbase leading-[1.625rem] font-sans">
            {short_description ?? ''}
          </p>
          <div className="flex justify-start items-baseline mb-[1.5rem]">
            <span className="mr-2 text-3xl font-extrabold">${price.replace('.00', '')}</span>
          </div>
          <button
            onClick={handleCheckout}
            className={`py-2 px-5 leading-[1.625rem] rounded-full h-[2.813rem] w-fit font-normal text-pxl ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black"} text-white group-hover:bg-white group-hover:text-black transition-all duration-300 hover:cursor-pointer`}
          >
            {loading ? "Please wait..." : "Get Started"}
          </button>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-pbase leading-[1.625rem] font-sans">
            What Included
          </h3>

          <div dangerouslySetInnerHTML={{ __html: modifiedDescription }} />
        </div>
      </div>
    </>
  );
}
