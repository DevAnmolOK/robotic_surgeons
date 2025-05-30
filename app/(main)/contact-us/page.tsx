import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import * as TbIcons from "react-icons/tb";
import { IconType } from "react-icons";
import Breadcrumbs from "@/components/Breadcrumbs";

const getIconComponent = (iconClass: string | null): IconType | null => {
  if (!iconClass) return null;

  const slug = iconClass.split(" ").pop();
  if (!slug) return null;

  const name = slug.replace("ti-brand-", "");
  const pascal = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  const fullIcon = `TbBrand${pascal}`;
  return (TbIcons as Record<string, IconType>)[fullIcon] || null;
};

export default async function ContactUs() {
  const settingRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`);
  const setData = await settingRes.json();

  const socialMenus = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/menus/social`
  );
  const socialLinks = await socialMenus.json();

  const { address, phone, contact_email } = setData.settings;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  return (
    <>
      <div className="h-full w-full flex items-center justify-center  flex-col">
        {/* herosection */}
        <Breadcrumbs title="Contact us" bgImage="/homePage/heroimage.jpg" />

        {/* get into touch   */}
        <div className="md:h-[19rem] h-auto bg-ebg2 w-full pt-[3.25rem]">
          <div className=" flex items-center justify-center flex-col text-black md:max-w-[65vw] max-w-[80vw] w-full mx-auto">
            <h2 className=" text-t2 font-playfair ">Get in Touch</h2>
            <p className="font-normal text-pxl text-center pt-6 mb-[4rem]">
              Thank you for your interest, where advanced robotic surgery meetsa
              compassionate care. Whether you’re looking to schedule a
              consultation, ask a question, or learn more about our procedures,
              we’re here to help you.
            </p>
          </div>
        </div>

        {/* contact section */}
        <div className=" w-full h-auto bg-white pb-[4.75rem]">
          <div className="md:h-[42.5rem] h-auto md:max-w-[72vw] max-w-[85vw] w-full mx-auto bg-white contact-shadow  -mt-[3rem] py-[1.25rem] px-[1.75rem] flex items-center md:flex-row  flex-col-reverse  justify-center   rounded-[1.25rem] ">
            {/* card */}
            <div className=" md:max-w-[37%] text-white h-full w-full bg-theme rounded-[1.25rem] sm:px-[2.25rem] px-[0.5rem] pt-[4rem] sm:pt[2rem] flex flex-col items-center justify-center sm:items-start sm:justify-start">
              <h3 className="text-[1.75rem] font-playfair font-medium mb-[1rem] ">
                Contact Information
              </h3>
              <p className="text-pxl mb-[2.75rem] font-light font-sans text-center sm:text-start">
                Proin eleifend in mi eu efficitur. Sed interdum lectus at
                consequat interdum.
              </p>
              <div className="flex flex-col gap-[2.5rem] text-pxl font-normal font-sans">
                {phone && (
                  <div className="flex items-center gap-[1.5rem]">
                    <div className=" text-[1.5rem]">
                      <PiPhoneCallFill />
                    </div>
                    <Link href={`tel:${phone}`}>{phone}</Link>
                  </div>
                )}

                {contact_email && (
                  <div className="flex items-center gap-[1.5rem]">
                    <div className=" text-[1.5rem]">
                      <MdEmail />
                    </div>
                    <span>
                      <Link href={`mailto:${contact_email}`}>
                        {contact_email}
                      </Link>
                    </span>
                  </div>
                )}

                {address && (
                  <div className="flex items-start gap-[1.5rem]">
                    <div className=" text-[1.65rem] mt-[0.25rem]">
                      <TiLocation />
                    </div>
                    <span className=" leading-[1.75rem]">{address}</span>
                  </div>
                )}
              </div>

              {socialLinks.items && (
                <div className="flex sm:items-center items-start  mt-[3.5rem] gap-[2.75rem]  text-pbase font-normal flex-col sm:flex-row mb-[1.5rem] md:mb-0 ">
                  {socialLinks.items.map((item: any, index: any) => {
                    if (item.title === "X" || item.title === "x") return null;
                    const Icon = getIconComponent(item.icon);
                    if (!Icon) return null;
                    return (
                      <div
                        key={index}
                        className="flex justify-center items-center gap-[.5rem]"
                      >
                        <div className="text-pxl">
                          <Icon
                            className="hover:text-white transition cursor-pointer"
                            size={22}
                          />
                        </div>
                        <span>{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* form */}
            <div className="md:max-w-[62%]  h-full w-full flex items-center md:pl-[4rem] pt-[1.5rem] sm:pt-0 justify-center md:justify-start mb-[2rem] md:mb-0">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* map */}
        {address && (
          <div className="h-[31.938rem] w-full">
            <iframe
              src={mapSrc}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}
