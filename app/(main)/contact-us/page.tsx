import contactData from "../../../fakedata/contact";

import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa6";
import { AiFillYoutube } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
export default async function ContactUs() {
  return (
    <>
      <div className="h-full w-full flex items-center justify-center  flex-col">
        {/* herosection */}
        <div
          className="relative sm:h-[14.5rem] h-[10rem]  w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/homePage/heroimage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-playfair">
            <h1 className="text-white text-p3xl font-bold">Contact us</h1>
          </div>
        </div>

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
            <div className=" md:max-w-[37%]    h-full w-full bg-theme rounded-[1.25rem] sm:px-[2.25rem] px-[0.5rem] pt-[4rem] sm:pt[2rem] flex flex-col items-center justify-center sm:items-start sm:justify-start">
              <h3 className="text-[1.75rem] font-playfair font-medium mb-[1rem] ">
                {contactData.title}
              </h3>
              <p className="text-pxl mb-[2.75rem] font-light font-sans text-center sm:text-start">
                {contactData.description}
              </p>
              <div className="flex flex-col gap-[2.5rem] text-pxl font-normal font-sans ">
                <div className="flex items-center gap-[1.5rem]">
                  <div className=" text-[1.5rem]">
                    <PiPhoneCallFill />
                  </div>
                  <span>{contactData.phone}</span>
                </div>
                <div className="flex items-center gap-[1.5rem]">
                  <div className=" text-[1.5rem]">
                    <MdEmail />
                  </div>
                  <span>{contactData.email}</span>
                </div>
                <div className="flex items-start gap-[1.5rem]">
                  <div className=" text-[1.65rem] mt-[0.25rem]">
                    <TiLocation />
                  </div>
                  <span className=" leading-[1.75rem]">
                    {contactData.address}
                  </span>
                </div>
              </div>
              <div className="flex sm:items-center items-start  mt-[3.5rem] gap-[2.75rem]  text-pbase font-normal flex-col sm:flex-row mb-[1.5rem] md:mb-0 ">
                <div className="flex justify-center items-center gap-[.5rem]">
                  <div className="text-pxl">
                    <FaInstagram />
                  </div>
                  <span>Instagram</span>
                </div>
                <div className="flex justify-center items-center gap-[.5rem]">
                  <div className="text-pxl">
                    <AiFillYoutube />
                  </div>
                  <span>Youtube</span>
                </div>
                <div className="flex justify-center items-center gap-[.5rem]">
                  <div className="text-pxl">
                    <FaLinkedin />
                  </div>
                  <span>LinkedIn</span>
                </div>
              </div>
            </div>
            {/* form */}
            <div className="md:max-w-[62%]  h-full w-full flex items-center md:pl-[4rem] pt-[1.5rem] sm:pt-0 justify-center md:justify-start mb-[2rem] md:mb-0">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* map */}
        <div className="h-[31.938rem] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.681910219594!2d76.81928487621761!3d30.642920989966367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f9345866a0619%3A0xbe98c27e119e1246!2sWebHopers%20Infotech%20Pvt%20Ltd%20%7C%20Digital%20Marketing%20%26%20Web%20Development%20Company%20in%20Chandigarh%20Mohali%20Panchkula!5e0!3m2!1sen!2sin!4v1747983241224!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
