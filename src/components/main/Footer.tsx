import Link from "next/link";
import Image from "next/image";
import { FooterItems, socialMedia } from "../_components/constants";

export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-white dark:bg-zinc-900">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 w-full lg:px-8">
        <div className="flex w-full flex-col md:flex-row justify-between py-12 border-b transition-colors duration-150 border-gray-300 dark:border-zinc-600">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 w-full md:w-1/5">
            <Link href="/" className="flex items-center font-bold">
              <span className="border rounded-full border-gray-300 dark:border-zinc-700 px-4 py-2">
                <Image
                  src="/Xorvane-svg.svg"
                  width={100}
                  height={50}
                  alt="BockLogo"
                  className="h-7 w-24"
                />
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap justify-between w-full">
            {FooterItems.map((item, index) => (
              <div key={index} className="w-full sm:w-auto mb-8 md:mb-0 md:ml-8">
                <p className="font-bold text-gray-800 dark:text-white mb-4">
                  {item.title}
                </p>
                <ul className="space-y-2">
                  {item.items.map((name, ind) => (
                    <li key={ind}>
                      <Link
                        href={name.href || "/"}
                        target={item.title === "Legal" ? "_self" : "_blank"}
                        rel={item.title === "Legal" ? undefined : "noopener noreferrer"}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition duration-150 ease-in-out"
                      >
                        {name.comp}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="w-full sm:w-auto mb-8 md:mb-0 md:ml-8">
              <p className="font-bold text-gray-800 dark:text-white mb-4">
                Follow Us
              </p>
              <div className="flex space-x-4">
                {socialMedia.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-600 transition duration-150 ease-in-out"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center py-8 space-y-4">
          <span className="text-gray-600 dark:text-white text-sm">
            &copy; {new Date().getFullYear()} BOCK. All rights reserved.
          </span>
          <span className="text-gray-600 dark:text-white text-sm">
            Octakaigon Bock Private Limited
          </span>
        </div>
      </div>
    </footer>
  );
}

