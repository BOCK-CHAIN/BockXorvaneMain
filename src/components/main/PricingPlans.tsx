"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Laptop, Users, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { services } from "../_components/constants";

type BillingInterval = "year" | "month";

export default function PricingPlans() {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");
  const router = useRouter();

  return (
    <section
      id="pricing"
      className="bg-background min-h-[90vh] mx-4 my-8 rounded-3xl flex flex-col items-center justify-center px-4 py-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent sm:text-5xl mb-2">
          Pricing Plan
        </h1>
        <p className="text-sm text-white/90">Choose the perfect plan for your needs</p>
      </div>

      <div className="relative flex bg-white/10 backdrop-blur-sm rounded-full p-1 mb-10">
        <button
          onClick={() => setBillingInterval("month")}
          className={cn(
            "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
            billingInterval === "month" ? "bg-white text-black shadow" : "text-white"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingInterval("year")}
          className={cn(
            "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
            billingInterval === "year" ? "bg-white text-black shadow" : "text-white"
          )}
        >
          Yearly
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-5xl px-2">
        {services.map((service) => {
          const price =
            billingInterval === "month"
              ? service.monthly_price
              : service.yearly_price;

          const yearlyEquivalent = service.monthly_price * 12;
          const saved = yearlyEquivalent - service.yearly_price;

          const monthlyEquivalent = (service.yearly_price / 12).toFixed(2);
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(price);

          const Icon = service.icon;

          return (
            <div
              key={service.id}
              className={cn(
                "w-full sm:max-w-sm transition-all group border border-black hover:border-transparent bg-black rounded-2xl hover:bg-gradient-to-r p-[2px]",
                `hover:${service.gradientColor}`
              )}
            >
              <div className="bg-black text-white rounded-[calc(1rem-2px)] p-6 transition-all group-hover:scale-[1.01]">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold">{service.name}</h2>
                </div>
                <p className="text-sm text-white/80 mb-4">{service.description}</p>

                {billingInterval === "year" ? (
                  <>
                    <p className={cn("text-3xl font-bold", service.textColor)}>
                      ${monthlyEquivalent}
                      <span className="text-base font-medium"> /month</span>
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      Billed yearly at {formattedPrice}
                    </p>
                    {saved > 0 && (
                      <p className={`text-xs mt-1 ${service.textColor}`}    >
                        You save ${saved.toFixed(2)} a year
                      </p>
                    )}
                  </>
                ) : (
                  <p className={cn("text-3xl font-bold", service.textColor)}>
                    {formattedPrice}
                    <span className="text-base font-medium"> /month</span>
                  </p>
                )}

                <ul className="mt-4 mb-6 text-sm space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2">
                  <a
                    href={service.webUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-white text-black hover:bg-white/90">
                      Check it out
                    </Button>
                  </a>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
