"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { products } from "./_components/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

type BillingInterval = "lifetime" | "year" | "month";
type Props = {};

export default function PricingPlans({}: Props) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const currentPath = usePathname();
  return (
    <>
      <section
        id="pricing"
        className="bg-background snap-center h-screen dark:bg-background dark:text-white mx-8 my-8 rounded-3xl"
      >
        <div className="max-w-6xl px-4 py-4 mx-auto sm:py-10 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-black dark:text-white sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            {/* <p className="max-w-2xl m-auto mt-5 text-xl text-black dark:text-white sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p> */}
            <div className="relative self-center mt-6 bg-zinc-100  dark:bg-black rounded-lg p-0.5 flex sm:mt-8 border dark:border-zinc-800">
              <button
                onClick={() => setBillingInterval("month")}
                type="button"
                className={`${
                  billingInterval === "month"
                    ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-black dark:text-zinc-400"
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none  sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingInterval("year")}
                type="button"
                className={`${
                  billingInterval === "year"
                    ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-black dark:text-zinc-400"
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            </div>
          </div>
          <div className="mt-8 space-y-0 sm:mt-10 flex flex-wrap justify-center gap-10  lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {products.map((product) => {
              const price = product?.prices?.find(
                (price) => price.interval === billingInterval
              );
              if (!price) return null;
              const priceString = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: price.currency!,
                minimumFractionDigits: 0,
              }).format((price?.unit_amount || 0) / 100);
              return (
                <div
                  key={product.id}
                  className={cn(
                    "flex flex-col justify-between px-3 pb-5 rounded-2xl shadow-sm divide-y divide-zinc-600 bg-zinc-100  dark:bg-zinc-900",
                    {
                      "border-2 border-orange dark:border-cyan-400":
                        product.title === "Starter",
                    },
                    "flex-1",
                    "basis-1/3",
                    "max-w-xs"
                  )}
                >
                  <div className="p-6 text-black dark:text-zinc-300">
                    <h2 className="text-2xl font-semibold leading-6 ">
                      {product.title}
                    </h2>
                    <p className="mt-4 ">{product.description}</p>
                    <ul className="flex flex-col justify-start mt-4 gap-2">
                      {product.services &&
                        product.services.map((service, index) => (
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
                  <div>
                    <p className="mt-4">
                      <span className="text-5xl font-extrabold white ">
                        {priceString}
                      </span>
                      <span className="text-base font-medium ">
                        /{billingInterval}
                      </span>
                    </p>
                    <Button
                      type="button"
                      className={cn(
                        "block w-full py-2 mt-8 text-sm font-semibold text-center bg-gray-700 dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-900 dark:hover:bg-zinc-300",
                        {
                          "bg-orange text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-black hover:bg-orange-600 ":
                            product.title === "Enterprise",
                        }
                      )}
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
