"use client";
import React from "react";
import { services } from "./_components/constants";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {};

export default function Services({}: Props) {
  const router = useRouter();
  return (
    <section
      id="services"
      className="z-10 snap-center h-full bg-gradient-to-br from-gray-300 to-gray-100 border-gray-200 mx-8 my-8 rounded-3xl dark:bg-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900"
    >
      <div className="max-w-6xl px-4 py-4 mx-auto sm:py-10 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-center sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 sm:text-center sm:text-lg">
            Explore a variety of tools and platforms tailored to meet your
            needs.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 flex flex-col justify-between bg-gray-50 border border-gray-200  dark:bg-zinc-800 dark:border-zinc-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                  <ul className="flex flex-col justify-start mt-4 gap-2">
                    {service.services &&
                      service.services.map((service, index) => (
                        
                          <li
                            className="flex justify-start items-center gap-2"
                            key={index}
                          >
                            <Check />
                            <p>{service}</p>
                          </li>
                      
                      ))}
                  </ul>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    if (service.webUrl) window.open(service.webUrl, "_blank");
                  }}
                  className={cn(
                    "block w-full py-2 mt-8 text-sm font-semibold text-center bg-gray-700 dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-900 dark:hover:bg-zinc-300"
                  )}
                >
                  Check it out
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
