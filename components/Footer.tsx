import React from "react";
import Link from "next/link";
import { AiOutlineInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
type FooterLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};
export const footerData: FooterSection[] = [
  {
    title: "About us",
    links: [
      { label: "Find a Doctor", href: "#" },
      { label: "Categories", href: "#" },
      { label: "Membership", href: "#" },
      { label: "Blogs", href: "#" },
      { label: "For Doctors", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Find a Physician", href: "#" },
      { label: "Bariatric", href: "#" },
      { label: "Cardiac", href: "#" },
      { label: "General Surgery", href: "#" },
      { label: "Gynecology", href: "#" },
      { label: "Head & Neck", href: "#" },
      { label: "Urology", href: "#" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Surgeons", href: "#" },
      { label: "Hospital Executives", href: "#" },
      { label: "Referring Physicians", href: "#" },
      { label: "Academics", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "#", icon: <AiOutlineInstagram /> },
      { label: "X", href: "#", icon: <RiTwitterXFill /> },
      { label: "YouTube", href: "#", icon: <FaYoutube /> },
      { label: "LinkedIn", href: "#", icon: <FaLinkedin /> },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <footer className="bg-black text-white">
        <div className="max-w-[85vw] sm:max-w-[75vw]  mx-auto w-full px-4 py-10 flex flex-wrap gap-5 justify-between ">
          {footerData.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
              <ul className="space-y-2 text-base text-gray-300">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 hover:text-white transition"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="bg-blue-600 text-white text-sm py-4 px-4 ">
          <div className="max-w-[75vw] mx-auto w-full flex flex-col sm:flex-row justify-between items-center">
            <p>© 2016–2024, The Best Robotic Surgeon. All Rights Reserved.</p>
            <div className="mt-2 sm:mt-0">
              <Link href="#" className="hover:underline">
                Term & Condition
              </Link>
              <span className="mx-2">|</span>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
