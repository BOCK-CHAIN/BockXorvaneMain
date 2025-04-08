import { Laptop, Zap, Users } from 'lucide-react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

// export const prices = [
//   {
//     id: "1",
//     interval: "month",
//     currency: "INR",
//     unit_amount: 20000,
//   },
//   {
//     id: "2",
//     interval: "year",
//     currency: "INR",
//     unit_amount: 200000,
//   }
// ];

export const services =[
  {
    id: "webbuild",
    name: "WebBuild",
    description: "Custom websites built fast and beautifully.",
    monthly_price: Number(process.env.NEXT_PUBLIC_WEBBUILD_MONTHLY),
    yearly_price: Number(process.env.NEXT_PUBLIC_WEBBUILD_YEARLY),
    webUrl: process.env.NEXT_PUBLIC_WEBBUILD_URL,
    icon: Laptop,
    features: [
      "Drag & drop funnel builder",
      "User access control",
      "Marketing integrations",
    ],
    gradientColor: "from-blue-600 via-purple-600 to-pink-600",
    textColor: "text-blue-400",
  },
  {
    id: "workman",
    name: "Workman",
    description: "Manage projects and teams effortlessly.",
    monthly_price: Number(process.env.NEXT_PUBLIC_WORKMAN_MONTHLY),
    yearly_price: Number(process.env.NEXT_PUBLIC_WORKMAN_YEARLY),
    webUrl: process.env.NEXT_PUBLIC_WORKMAN_URL,
    icon: Users,
    features: [
      "Unlimited workspaces",
      "Video storage & annotations",
      "Team collaboration",
    ],
    gradientColor: "from-green-600 via-teal-500 to-cyan-500",
    textColor: "text-green-400",
  },
];

export const FooterItems = [
  {
    title: "Company",
    items: [
      {
        comp: "About Us",
        href: "https://bockbharath.com/aboutus.html",
      },
      {
        comp: "Employees & SOPs",
        href: "https://bockbharath.com/sop.html",
      },
      {
        comp: "Progress",
        href: "https://bockbharath.com/progress.html",
      },
    ],
  },
  {
    title: "Businesses",
    items: [
      {
        comp: "Bock Automotive",
        href: "https://automotive.bockbharath.com/",
      },
      {
        comp: "Bock Foods",
        href: "https://foods.bockbharath.com/",
      },
      {
        comp: "Bock Space",
        href: "https://space.bockbharath.com/",
      },
      {
        comp: "Bock AI",
        href: "https://ai.bockbharath.com/",
      },
      {
        comp: "Bock Health",
        href: "https://health.bockbharath.com/",
      },
      {
        comp: "Bock Chain",
        href: "https://chain.bockbharath.com/",
      },
    ],
  },
  {
    title: "Join Us",
    items: [
      {
        comp: "Internships",
        href: "https://bockbharath.com/bock-internship-program.html",
      },
      {
        comp: "Procedure",
        href: "https://bockbharath.com/joinus.html",
      },
      {
        comp: "Recruitment",
        href: "https://bockbharath.com/joinus.html",
      },
      {
        comp: "Benefits",
        href: "https://bockbharath.com/joinus.html",
      },
      {
        comp: "Jobs",
        href: "https://bockbharath.com/joinus.html",
      },
      {
        comp: "FAQ's",
        href: "https://bockbharath.com/joinus.html",
      },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        comp: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        comp: "Terms of Use",
        href: "/terms-of-use",
      },
      {
        comp: "Refund and Cancellation Policy",
        href: "/refund-and-cancellation",
      },
      {
        comp: "Shipping And Delivery Policy",
        href: "/shipping-and-delivery",
      }
    ],
  }
];

export const socialMedia = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/bockbharath",
    color:
      "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FDCB58] dark:hover:from-[#833AB4] dark:hover:via-[#B71A1A] dark:hover:to-[#CBAA44]",
  },
  {
    name: "X",
    icon: FaXTwitter,
    href: "https://x.com/BockBH",
    color: "hover:bg-[#1DA1F2] dark:hover:bg-[#1DA1F2]",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/bockbharath/",
    color: "hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2]",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://www.youtube.com/@bockbharath",
    color: "hover:bg-[#FF0000] dark:hover:bg-[#FF0000]",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "https://www.facebook.com/bockbharath/",
    color: "hover:bg-[#1877F2] dark:hover:bg-[#1877F2]",
  },
];


