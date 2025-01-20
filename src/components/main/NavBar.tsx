"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ToggleTheme } from "../_components/ToggleTheme";
import NavButton from "../_components/NavButton";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  // const { user } = useUser();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          const topOffset =
            section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
        router.replace(pathname, undefined);
      } else {
        setActiveSection("hero");
      }
    }
  }, [pathname, router]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) {
      router.push(`/#${id}`);
    }
    if (section) {
      const topOffset =
        section.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "sticky top-0 z-50 w-full text-black dark:text-white border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border"
        )}
      >
        <div className="flex justify-between px-4 lg:px-0 lg:justify-around items-center">
          <div className="flex justify-center items-center md:gap-2 lg:gap-8 py-2">
            <Image
              src={'/Xorvane-svg.svg'}
              width={100}
              height={140}
              alt="BockLogo"
              className="object-cover object-center py-4 cursor-pointer"
              onClick={() => router.push('/')}
            />
            <ul className="hidden md:flex justify-center items-center font-medium text-[#09090bcc] dark:text-[#fafafacc]">
              <li
                className={cn(
                  "px-3 py-2 rounded-full dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer",
                  activeSection === "hero"
                    ? "bg-zinc-200 dark:bg-accent text-accent-foreground"
                    : ""
                )}
                onClick={() => scrollToSection("hero")}
              >
                Home
              </li>
              <li
                className={cn(
                  "px-3 py-2 rounded-full dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer",
                  activeSection === "services"
                    ? "bg-zinc-200 dark:bg-accent text-accent-foreground"
                    : ""
                )}
                onClick={() => scrollToSection("services")}
              >
                Services
              </li>
              <li
                className={cn(
                  "px-3 py-2 rounded-full dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer",
                  activeSection === "pricing"
                    ? "bg-zinc-200 dark:bg-accent text-accent-foreground"
                    : ""
                )}
                onClick={() => scrollToSection("pricing")}
              >
                Pricing
              </li>
              <li
                className={cn(
                  "px-3 py-2 rounded-full dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer",
                  activeSection === "footer"
                    ? "bg-zinc-200 dark:bg-accent text-accent-foreground"
                    : ""
                )}
                onClick={() => scrollToSection("footer")}
              >
                Contact Us
              </li>
            </ul>
          </div>
          <div className="flex gap-6 items-center justify-center">
            <div className="hidden md:flex justify-center items-center gap-3">
              {true ? (
                <>
                  <NavButton
                    variant={"outline"}
                    text={"Login"}
                    href={"/auth/sign-in"}
                  />
                  <NavButton
                    text={"Get Started"}
                    variant="default"
                    href={"/auth/sign-up"}
                  />
                </>
              ) : (
                <>
                  <div>
                    <div className="px-4 py-2 rounded-full border border-input bg-background shadow-sm hover:bg-zinc-200 dark:bg-accent hover:text-accent-foreground">
                      <SignOutButton redirectUrl="/" />
                    </div>
                  </div>
                </>
              )}
              <ToggleTheme />
            </div>
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 min-h-fit bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="pt-16 pb-6 px-4 space-y-4">
            {["hero", "services", "pricing", "footer"].map((id) => (
              <button
                key={id}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded-md text-base font-medium",
                  activeSection === id
                    ? "bg-zinc-200 dark:bg-accent text-accent-foreground"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => scrollToSection(id)}
              >
                {id === "hero" ? "Home" : id === "footer" ? "Contact Us" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                {true ? (
                  <>
                    <NavButton
                      variant={"outline"}
                      text={"Login"}
                      href={"/auth/sign-in"}
                    />
                    <NavButton
                      variant={"default"}
                      text={"Sign-Up"}
                      href={"/auth/sign-up"}
                    />
                  </>
                ) : (
                  <div className="px-4 py-2 rounded-full border border-input bg-background shadow-sm hover:bg-zinc-200 dark:bg-accent hover:text-accent-foreground">
                    <SignOutButton redirectUrl="/" />
                  </div>
                )}
                <ToggleTheme />
              </div>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

