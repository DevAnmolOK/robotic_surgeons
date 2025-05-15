// export default function Header() {
//   return (
//     <>
//       <div className=" bg-white text-black py flex item-center justify-center">
//         <div className=" py-2">Header</div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b px-4 py-4 md:px-8 bg-white text-black">
      <div className=" max-w-[75vw] mx-auto w-full flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center ">
          <Image
            src="/logo.png"
            alt="The best robotic surgeon"
            height={50}
            width={140}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center text-base xl:text-xl font-medium text-gray-800">
          {/* <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1">Find a Doctor</span>
            <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border rounded shadow-lg z-">
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                Nearby Doctors
              </Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                Specialties
              </Link>
            </div>
          </div> */}
          <Link href="#">
            <div className=" flex  items-center justify-center">
              <span className="mr-2">Find a Doctor</span>
              <MdKeyboardArrowDown/>
            </div>
          </Link>
          <Link href="#">Categories</Link>
          <Link href="#">Membership</Link>
          <Link href="#">Blogs</Link>
          <Link href="#">
            <FaRegUserCircle size={24}/>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-sm font-medium text-gray-800">
          <div className="border-t pt-3">
            <span className="block mb-2">Find a Doctor</span>
            <Link
              href="#"
              className="block px-2 py-1 hover:bg-gray-100 rounded"
            >
              Nearby Doctors
            </Link>
            <Link
              href="#"
              className="block px-2 py-1 hover:bg-gray-100 rounded"
            >
              Specialties
            </Link>
          </div>
          <Link href="#">Categories</Link>
          <Link href="#">Membership</Link>
          <Link href="#">Blogs</Link>
          <Link href="#">
            <span className="inline-flex items-center gap-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A10.95 10.95 0 0112 15c2.5 0 4.847.836 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Account
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
