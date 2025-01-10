export const products = [
  {
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
    services: [
      "Realtime Video Sharing",
      "LMS with Custom Domains",
      "Website Builder",
    ],
  },
  {
    id: "4",
    title: "Enterprise",
    description: "Custom solutions for large enterprises with diverse needs.",
    prices: [
      {
        interval: "month",
        currency: "INR",
        unit_amount: 100000,
      },
      {
        interval: "year",
        currency: "INR",
        unit_amount: 1000000,
      },
    ],
    services: [
      "Realtime Video Sharing",
      "LMS with Custom Domains",
      "AI Chatbot",
      "Automation Builder",
      "Website Builder",
      "Notion",
    ],
  },
  {
    id: "2",
    title: "Professional",
    description:
      "Ideal for small teams or startups looking for enhanced capabilities.",
    prices: [
      {
        interval: "month",
        currency: "INR",
        unit_amount: 50000,
      },
      {
        interval: "year",
        currency: "INR",
        unit_amount: 500000,
      },
    ],
    services: [
      "Realtime Video Sharing",
      "LMS with Custom Domains",
      "AI Chatbot",
      "Automation Builder",
    ],
  },
  // {
  //   id: "3",
  //   title: "Business",
  //   description: "Designed for businesses requiring comprehensive SaaS solutions.",
  //   prices: [
  //     {
  //       interval: "month",
  //       currency: "INR",
  //       unit_amount: 10000,
  //     },
  //     {
  //       interval: "year",
  //       currency: "INR",
  //       unit_amount: 100000,
  //     },
  //   ],
  //   services: [
  //     "Realtime Video Sharing",
  //     "LMS with Custom Domains",
  //     "AI Chatbot",
  //     "Automation Builder",
  //     "Website Builder",
  //   ],
  // },
];

export const services = [
  {
    id: "1",
    title: "RealTimeShare",
    description:
      "Perfect for collaborative video streaming.",
    prices: [
      {
        interval: "month",
        currency: "INR",
        unit_amount: 2900,
      },
      {
        interval: "year",
        currency: "INR",
        unit_amount: 29000,
      },
    ],
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
    title: "EduDomain",
    description:
      "SaaS LMS with Custom Domains",
    prices: [
      {
        interval: "month",
        currency: "INR",
        unit_amount: 4900,
      },
      {
        interval: "year",
        currency: "INR",
        unit_amount: 49000,
      },
    ],
    services: ["Custom domains", "Quiz builder", "Progress tracking"],
    features: [
      "Unlimited courses",
      "Up to 50 students",
      "Branded certificates",
    ],
    webUrl: "http://localhost:3005",
  },
  {
    id: "3",
    title: "ChatGenie",
    description:
      "Businesses with smart AI assistants.",
    prices: [
      {
        interval: "month",
        currency: "INR",
        unit_amount: 3500,
      },
      {
        interval: "year",
        currency: "INR",
        unit_amount: 35000,
      },
    ],
    services: [
      "Custom AI chatbots",
      "Multilingual support",
      "API integrations",
    ],
    webUrl: "http://localhost:3006",
    features: ["Real-time responses", "No-code editor", "Analytics dashboard"],
  },
  {
    id: "4",
    title: "FlowAutomator",
    description: "Automate your workflows effortlessly.",
    prices: [
      {
        interval: "month",
        currency: "INR",
        unit_amount: 5900,
      },
      {
        interval: "year",
        currency: "INR",
        unit_amount: 59000,
      },
    ],
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
    prices: [
      {
        interval: "month",
        currency: "INR",
        unit_amount: 1999,
      },
      {
        interval: "year",
        currency: "INR",
        unit_amount: 19999,
      },
    ],
    webUrl: "http://localhost:3002",
    services: ["Custom templates", "SEO tools", "E-commerce integration"],
    features: ["Drag-and-drop editor", "Responsive designs", "24/7 support"],
  },
  {
    id: "6",
    title: "NotionFlow",
    description:
      "Organize your work and projects seamlessly.",
    prices: [
      {
        interval: "month",
        currency: "INR",
        unit_amount: 2500,
      },
      {
        interval: "year",
        currency: "INR",
        unit_amount: 25000,
      },
    ],
    webUrl: "http://localhost:3004",
    services: ["Custom databases", "Collaboration tools", "Templates"],
    features: ["Unlimited pages", "Markdown support", "Cross-platform syncing"],
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
