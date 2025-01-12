export const products = [{
  id: "1",
  title: "Starter",
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
    id: "4",
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
    id: "5",
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
        href: "/about",
      },
      {
        comp: "Employees & SOPs",
        href: "/employees-sops",
      },
      {
        comp: "Progress",
        href: "/progress",
      },
    ],
  },
  {
    title: "Businesses",
    items: [
      {
        comp: "Bock Automotive",
        href: "/bock-automotive",
      },
      {
        comp: "Bock Foods",
        href: "/bock-foods",
      },
      {
        comp: "Bock Space",
        href: "/bock-space",
      },
      {
        comp: "Bock AI",
        href: "/bock-ai",
      },
      {
        comp: "Bock Health",
        href: "/bock-health",
      },
      {
        comp: "Bock Chain",
        href: "/bock-chain",
      },
    ],
  },
  {
    title: "Join Us",
    items: [
      {
        comp: "Internships",
        href: "/internships",
      },
      {
        comp: "Procedure",
        href: "/procedure",
      },
      {
        comp: "Recruitment",
        href: "/recruitment",
      },
      {
        comp: "Benefits",
        href: "/benefits",
      },
      {
        comp: "Jobs",
        href: "/jobs",
      },
      {
        comp: "FAQ's",
        href: "/faqs",
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
  },
];
