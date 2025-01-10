import React from "react";
import { services } from "./_components/constants";
type Props = {};

export default function Hero({}: Props) {
  return (
    <>
      <div id="hero" className=" snap-center relative bg-gradient-to-br from-white via-gray-100 to-gray-50 text-zinc-800 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white py-8 sm:py-16 lg:py-24 mb-4 w-full h-[85vh] md:h-[90vh]">
        <div className="container mx-auto px-4 sm:px-8 md:px-16 flex gap-8 justify-center ">
          <div className="w-1/4  hidden">l</div>
          <div className="flex flex-col items-center text-center w-3/4 md:w-1/2">
            <h1 className="text-3xl  sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:text-white">
              All-in-One SaaS Solutions for Your Business
            </h1>
            <p className="mt-4 text-md sm:text-lg font-semibold text-gray-600 max-w-2xl dark:text-gray-400">
              Empower your business with a range of tools, including real-time
              video sharing, custom LMS platforms, AI-powered chatbots, and
              more. Scale smarter, not harder.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white  hover:opacity-90 rounded-lg hover:bg-blue-700">
                Get Started
              </button>
              <button className="px-6 py-3 text-blue-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                Learn More
              </button>
            </div>
          </div>
          <div className="hidden  w-1/4">r</div>
        </div>
      </div>
    </>
  );
}
