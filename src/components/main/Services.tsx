"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { useRouter } from "next/navigation";
import { services } from "../_components/constants";


export default function Services() {
  // const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section
      id="services"
      className="z-10 snap-center min-h-screen flex items-center bg-gradient-to-br from-neutral-100 to-neutral-200 border-neutral-300 mx-4 my-8 rounded-3xl dark:from-neutral-900 dark:to-neutral-800 dark:border-neutral-700"
    >
      <div className="max-w-6xl px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:px-8">
        <motion.div
          className="sm:flex sm:flex-col sm:align-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-center sm:text-5xl"
            variants={itemVariants}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="mt-4 text-neutral-600 dark:text-neutral-400 sm:text-center sm:text-lg"
            variants={itemVariants}
          >
            Explore a variety of tools and platforms tailored to meet your
            needs.
          </motion.p>
          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 flex flex-col justify-between bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                    {service.description}
                  </p>
                  <ul className="flex flex-col justify-start mt-4 gap-2">
                    {service.services &&
                      service.services.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex justify-start items-center gap-2 text-neutral-700 dark:text-neutral-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Check className="text-green-500 dark:text-green-400" />
                          <p>{item}</p>
                        </motion.li>
                      ))}
                  </ul>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    if (service.webUrl) window.open(service.webUrl, "_blank");
                  }}
                  className={cn(
                    "w-full mt-8 bg-neutral-700 text-neutral-100 hover:bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-neutral-300 transition-colors duration-300"
                  )}
                >
                  Check it out
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
