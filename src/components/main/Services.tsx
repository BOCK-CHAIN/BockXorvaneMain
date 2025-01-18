"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { services } from "../_components/constants";

export default function Services() {
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
      className="z-10 snap-center min-h-[90vh] flex items-center bg-gradient-to-br from-neutral-100 to-neutral-200 border-neutral-300 mx-4 my-8 rounded-3xl dark:from-neutral-900 dark:to-neutral-800 dark:border-neutral-700"
    >
      <div className="max-w-7xl px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:px-8">
        <motion.div
          className="sm:flex sm:flex-col sm:align-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-center sm:text-5xl"
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
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                      {service.title}
                    </h3>
                    <service.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {service.description}
                  </p>
                  <h4 className="font-semibold mt-4 mb-2 text-neutral-700 dark:text-neutral-300">
                    Key Features:
                  </h4>
                  <ul className="flex flex-col justify-start gap-2">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex justify-start items-center gap-2 text-neutral-700 dark:text-neutral-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Check className="text-green-500 dark:text-green-400 flex-shrink-0" />
                        <p>{feature}</p>
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
                    "w-full mt-8 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
                  )}
                >
                  Try {service.title}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

