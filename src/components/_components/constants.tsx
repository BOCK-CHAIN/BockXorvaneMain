
import { BsInstagram, BsTwitter, BsX, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

export const products = [{
  id: "1",
  title: "Pro",
  description: "Perfect for individuals getting started with SaaS solutions.",
  prices: [
    {
      interval: "month",
      currency: "INR",
      unit_amount: 20000,
    },
    {
      interval: "year",
      currency: "INR",
      unit_amount: 200000,
    },
  ],
  services: ["Realtime Video Sharing", "Automation Builder", "Website Builder"],
}];

export const services = [
  {
    id: "1",
    title: "RealTimeShare",
    description: "Perfect for collaborative video streaming.",
    services: [
      "Realtime video streaming",
      "Screen sharing",
      "Collaborative recording",
    ],
    webUrl: "http://localhost:3003",
    features: ["Low latency", "Cloud recording", "Up to 10 participants"],
  },
  {
    id: "2",
    title: "FlowAutomator",
    description: "Automate your workflows effortlessly.",
    services: [
      "Drag-and-drop automation",
      "Workflow templates",
      "Integration library",
    ],
    webUrl: "http://localhost:3001",
    features: ["Unlimited workflows", "Team collaboration", "Error tracking"],
  },
  {
    id: "3",
    title: "WebStudio",
    description: "Design and launch websites with ease.",
    webUrl: "http://localhost:3002",
    services: ["Custom templates", "SEO tools", "E-commerce integration"],
    features: ["Drag-and-drop editor", "Responsive designs", "24/7 support"],
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
    ],
  }
];

export const socialMedia=[
  {
    name: "Instagram",
    icon: BsInstagram,
    href: "https://www.instagram.com/bockbharath",
  },
  {
    name: "X",
    icon: BsX,
    href: "https://x.com/BockBH",
  },
  {
    name: "LinkedIn",
    icon: LiaLinkedin,
    href: "https://www.linkedin.com/company/bockbharath/",
  },  
  {
    name: "YouTube",
    icon: BsYoutube,
    href: "https://www.youtube.com/@bockbharath",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "https://www.facebook.com/bockbharath/",
  },
]
