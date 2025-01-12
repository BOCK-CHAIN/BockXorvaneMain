'use client'

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

type Props = {};

export default function Hero({}: Props) {
  return (
    <div id="hero" className="relative bg-gradient-to-br from-white via-gray-100 to-gray-50 text-zinc-800 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white py-16 sm:py-24 lg:py-32 w-full min-h-[100vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-1/4 hidden">l</div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          >
            All-in-One SaaS Solutions for Your Business
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg sm:text-xl font-medium text-gray-600 max-w-2xl dark:text-gray-300"
          >
            Empower your business with a range of tools, including real-time
            video sharing, custom LMS platforms, AI-powered chatbots, and
            more. Scale smarter, not harder.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 pr-4 py-6 pl-6">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800 px-6 py-6">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      <div className="w-1/4 hidden">l</div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
    </div>
  );
}
