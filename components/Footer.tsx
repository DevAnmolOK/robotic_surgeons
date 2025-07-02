import React from "react";
import Link from "next/link";
import * as TbIcons from 'react-icons/tb';
import { IconType } from 'react-icons';

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
}[];

type Logo = {
  value: string;
};

type FooterProps = {
  footerMenu: Menu;
  footerData: {
    settings: {
      copyright: string;
      site_description: string;
    };
  };
};

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

const Footer: React.FC<FooterProps> = ({ footerMenu, footerData }) => {
  const orderById: Record<number, number> = {
    3: 1, // About us
    4: 2, // Patients
    5: 3, // Products
    2: 4, // Social
  };

  const slugify = (text: string): string =>
    text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const staticPatientLinks = [
    "Physician",
    "Bariatric",
    "Cardiac",
    "General Surgery",
    "Gynecology",
    "Head & Neck",
    "Urology",
  ];

  const customLinksMap = {
    4: staticPatientLinks.map(title => ({
      title,
      url: `doctors?search=${slugify(title)}`,
      icon: null,
    })),
  };

  const sortedArray = footerMenu.sort((a, b) => {
    return (orderById[a.id] || 999) - (orderById[b.id] || 999);
  });

  return (
    <>
      <footer className="bg-black text-white">
        <div className="max-w-[85vw] sm:max-w-[75vw]  mx-auto w-full px-4 py-10 flex flex-wrap gap-5 justify-between font-sans">
          {sortedArray.map((menu, index) => {
            const customItems = customLinksMap[menu.id];
            const itemsToRender = customItems ?? menu.items;

            return (
              <div key={index}>
                <p className="font-semibold text-pxl mb-3">{menu?.name}</p>
                <ul className="space-y-2 font-normal text-pbase text-white">
                  {itemsToRender.map((item: any, key: any) => {
                    const Icon = getIconComponent(item.icon);
                    return (
                      <li key={key}>
                        <Link
                          href={item.url}
                          className="flex items-center gap-2 hover:text-white transition"
                        >
                          {Icon && (
                            <span>
                              <Icon size={20} />
                            </span>
                          )}
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="bg-blue-600 text-white text-sm py-4 px-4 ">
          <div className="max-w-[75vw] mx-auto w-full flex flex-col sm:flex-row text-pbase font-normal   justify-between items-center">
            {footerData?.settings?.copyright && (
              <p>{footerData?.settings?.copyright}</p>
            )}
            <div className="mt-2 sm:mt-0">
              <Link href="#" className="hover:underline">
                Term & Condition
              </Link>
              <span className="mx-2">|</span>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
