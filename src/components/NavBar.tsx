"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ToggleTheme } from "./_components/ToggleTheme";
import { useUser } from "@clerk/nextjs";
import NavButton from "./_components/NavButton";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";


export default function NavBar() {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        console.log(section)
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      console.log(currentSection)
      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/") {
      const hash = window.location.hash.replace("#", ""); // Get the hash without the `#`
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          const topOffset =
            section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
        router.replace(pathname, undefined);
      }else{
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
        section.getBoundingClientRect().top + window.scrollY-30;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={cn(
          "sticky top-0 z-50 w-full text-black dark:text-white border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border"
        )}
      >
        <div className="flex justify-between px-2 lg:px-0 lg:justify-around items-center  ">
          <div className="flex justify-center items-center md:gap-2 lg:gap-8 py-2">
            <Image
              src={'/Xorvane-svg.svg'}
              width={100}
              height={140}
              alt="BockLogo"
              className="object-cover object-center py-4 "
              onClick={()=>router.push('/')}
            />
            <ul className="hidden md:flex justify-center items-center font-medium text-[#09090bcc] dark:text-[#fafafacc]">
              <li
                className={cn(
                  "px-3 py-2 rounded-full dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer",
                  activeSection === "hero"
                    ? "bg-accent text-accent-foreground"
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
                    ? "bg-accent text-accent-foreground"
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
                    ? "bg-accent text-accent-foreground"
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
                    ? "bg-accent text-accent-foreground"
                    : ""
                )}
                onClick={() => scrollToSection("footer")}
              >
                Contact Us
              </li>
            </ul>
          </div>
          <div className="flex gap-6 items-center justify-center">
            <div className="flex justify-center items-center gap-3">
              {!user ? (
                <>
                  <NavButton
                    variant={"outline"}
                    text={"Login"}
                    href={"/sign-in"}
                  />
                  <NavButton
                    text={"Get Started"}
                    variant="default"
                    href={"/sign-up"}
                  />
                </>
              ) : (
                <>
                  <div>
                    <div className=" px-4 py-2 rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ">
                      <SignOutButton redirectUrl="/" />
                    </div>
                  </div>
                </>
              )}

              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
