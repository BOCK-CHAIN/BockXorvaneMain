export const plans = [
  {
    id: "P-6WK35549G56037716M6J3NQQ",
    product_id: "PROD-24V58764T48586836",
    name: "Xorvane Saas",
    description: "Monthly Subscription plan for Saas",
    billing_cycles: [
      {
        pricing_scheme: {
          fixed_price: {
            currency_code: "USD",
            value: "4.99",
          },
        },
        frequency: {
          interval_unit: "MONTH",
          interval_count: 1,
        },
      },
    ],
    payee: {
      merchant_id: "8N4L6U55BJPQS",
      display_data: {
        business_email: "cs-sb-hqrwu32961312@business.example.com",
      },
    },
    links: [
      {
        href: "https://api.sandbox.paypal.com/v1/billing/plans/P-6WK35549G56037716M6J3NQQ",
        rel: "self",
        method: "GET",
        encType: "application/json",
      },
    ],
  },
  {
    id: "P-45F06999RU4075905M6J3QWA",
    product_id: "PROD-24V58764T48586836",
    name: "Xorvane Saas",
    description: "Yearly Subscription plan for Saas",
    billing_cycles: [
      {
        pricing_scheme: {
          fixed_price: {
            currency_code: "USD",
            value: "47.88",
          },
        },
        frequency: {
          interval_unit: "YEAR",
          interval_count: 1,
        },
        tenure_type: "REGULAR",
      },
    ],
    payee: {
      merchant_id: "8N4L6U55BJPQS",
      display_data: {
        business_email: "cs-sb-hqrwu32961312@business.example.com",
      },
    },
    links: [
      {
        href: "https://api.sandbox.paypal.com/v1/billing/plans/P-45F06999RU4075905M6J3QWA",
        rel: "self",
        method: "GET",
        encType: "application/json",
      },
    ],
  },
];

export const products = [
  {
    id: "PROD-24V58764T48586836",
    name: "Xorvane Subscription",
    description: "Saas Applications",
    create_time: "2025-01-24T15:43:39Z",
    links: [
      {
        href: "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-24V58764T48586836",
        rel: "self",
        method: "GET",
      },
    ],
  },
];
