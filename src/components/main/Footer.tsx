import Link from "next/link";
import Image from "next/image";
import { FooterItems } from "../_components/constants";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="mx-auto snap-center h-full w-full px-6 bg-white dark:bg-zinc-900"
    >
      <div className="flex flex-wrap w-full justify-between md:grid grid-cols-1 md:gap-8 py-12 pb-0 border-b md:grid-cols-12 transition-colors duration-150 border-gray-300 dark:border-zinc-600">
        <div className="col-span-1 md:col-span-2 w-full md:w-fit">
          <Link
            href="/"
            className="flex items-center flex-initial font-bold lg:mr-24"
          >
            <span className="mr-2 border rounded-full border-gray-300 dark:border-zinc-700">
              <Image
                src={"/Xorvane-svg.svg"}
                width={80}
                height={40}
                alt="BockLogo"
                className="object-cover object-center dark:invert"
              />
            </span>
          </Link>
        </div>
        {FooterItems.map((item, index) => {
          return (
            <>
              <div
                className="col-span-1 md:col-span-2 w-1/2 md:w-fit my-2"
                key={index}
              >
                  <p className="py-3 md:py-0 md:pb-4 font-bold text-gray-800 dark:text-white transition duration-150 ease-in-out hover:text-gray-500 dark:hover:text-zinc-200">
                    {item.title}
                  </p>
                <ul className="flex flex-col flex-initial md:flex-1">
                  {item.items.map((name, ind) => {
                    return (
                      <>
                        <Link
                          key={ind}
                          href={name.href || "/"}
                          className="py-3 md:py-0 md:pb-3 font-normal text-gray-800 dark:text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 dark:hover:text-zinc-200"
                        >
                          {name.comp}
                        </Link>
                      </>
                    );
                  })}
                </ul>
              </div>
            </>
          );
        })}
        <div className="flex items-start col-span-1 lg:col-span-6 lg:justify-end"></div>
      </div>
      <div className="flex flex-col items-center justify-between py-12 space-y-4   dark:bg-zinc-900">
        <span className="text-gray-600 dark:text-white">
          &copy; {new Date().getFullYear()} BOCK. All rights reserved.
        </span>
        <span className="text-gray-600 dark:text-white">
          Octakaigon Bock Private Limited
        </span>
      </div>
    </footer>
  );
}
