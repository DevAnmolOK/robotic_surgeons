"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
// import { HiOutlineUserCircle, HiOutlineLogout } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { HiOutlineUserCircle, HiOutlineLogout } from "react-icons/hi";

type ChildMenu = {
  id: number;
  title: string;
  url: string;
  icon: string;
  target: string;
  has_child: number;
  children: ChildMenu[];
};

type MenuItem = {
  id: number;
  title: string;
  url: string;
  icon: string;
  target: string;
  has_child: number;
  children: ChildMenu[];
};

type Menu = {
  id: number;
  name: string;
  slug: string;
  items: MenuItem[];
};

type Logo = {
  value: string;
};

type HeaderProps = {
  mainMenu: Menu;
  logo: Logo[];
};

const Header: React.FC<HeaderProps> = ({ mainMenu, logo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const doctorId = localStorage.getItem("doctor_id");
  //   setIsLoggedIn(!!doctorId);
  // }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const email = localStorage.getItem("doctor_email");
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token && !!email);
    };
    checkLoginStatus();
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctor_id");
    localStorage.removeItem("doctor_name");
    localStorage.removeItem("doctor_email");
    setIsLoggedIn(false);
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Add this line

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside); // Add this line
    };
  }, []);

  const logoImg = logo
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${logo[0].value}`
    : "https://placehold.co/123x46.png";

  return (
    <header className="border-b md:px-6 bg-white text-black">
      <div className="max-w-[85vw] py-3.5 sm:max-w-[75vw]  mx-auto w-full flex justify-between items-center">
        {/* Logo Section */}
        <div className="relative h-lh w-lw">
          <Link href="/">
            <Image
              src={logoImg}
              alt="The best robotic surgeon"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center text-pxl font-normal  font-sans text-black">
          {mainMenu?.items && (
            <>
              {mainMenu?.items?.map((item: any, index: any) => (
                <div
                  className={`capitalize ${item.has_child ? "relative" : ""}`}
                  key={index}
                >
                  {item.has_child ? (
                    <div
                      className="flex items-center justify-center"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span className="mr-2">{item.title}</span>
                      <MdKeyboardArrowDown />
                    </div>
                  ) : (
                    <Link
                      href={item.url ?? "#"}
                      className="capitalize"
                      target={item.target}
                    >
                      {item.title ?? ""}
                    </Link>
                  )}

                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
                    >
                      {item.children &&
                        item.children.map((child: any, index: any) => (
                          <Link
                            key={index}
                            href={child.url ?? "#"}
                            className="block px-4 py-2 capitalize"
                          >
                            {child.title ?? ""}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {isLoggedIn ? (
        <button onClick={handleLogout} className="flex items-center gap-1 text-red-500 hover:cursor-pointer">
          <HiOutlineLogout size={22} />
          Logout
        </button>
      ) : (
        <Link href="/login" className="hover: cursor-pointer">
          <HiOutlineUserCircle size={22} />
        </Link>
      )}
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
