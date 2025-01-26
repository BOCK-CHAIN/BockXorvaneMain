// import paypal from '@paypal/paypal-server-sdk';
// import { NextRequest, NextResponse } from 'next/server';

// // Configure the PayPal client
// const client = new paypal.Client({
//     clientCredentialsAuthCredentials: {
//         oAuthClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
//         oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET as string,
//     },
//     timeout: 0,
//     environment: paypal.Environment.Sandbox, // Change to `paypal.Environment.Live` for production
// });

// // Initialize PayPal controllers
// const ordersController = new paypal.OrdersController(client);
// const paymentsController = new paypal.PaymentsController(client);

// export default async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         if (!body) {
//             return NextResponse.json({ status: 400, error: 'Invalid request body' });
//         }

//         const { name, description, frequency, interval, price } = body;

//         // Create a PayPal billing plan (subscription plan)
//         const plan = {
//             product_id: 'YOUR_PRODUCT_ID', // Replace with your actual PayPal product ID
//             name,
//             description,
//             billing_cycles: [
//                 {
//                     frequency: {
//                         interval_unit: interval, // "MONTH" or "YEAR"
//                         interval_count: frequency, // Interval count, e.g., 1 for one month
//                     },
//                     tenure_type: 'REGULAR',
//                     sequence: 1,
//                     total_cycles: 0, // Infinite billing
//                     pricing_scheme: {
//                         fixed_price: {
//                             value: price,
//                             currency_code: 'USD', // You can change the currency code
//                         },
//                     },
//                 },
//             ],
//             payment_preferences: {
//                 auto_bill_outstanding: true,
//                 setup_fee_failure_action: 'CONTINUE',
//                 payment_failure_threshold: 3,
//             },
//         };

//         // Create the subscription plan
//         const request = new ();
//         request.requestBody(plan);

//         const response = await plansController.create(request);

//         // Handle the response and send back the approval URL for the subscription
//         const approvalUrl = response.result.links.find(
//             (link: any) => link.rel === 'approve'
//         )?.href;

//         if (approvalUrl) {
//             return NextResponse.json({ approvalUrl });
//         } else {
//             return NextResponse.json({ status: 500, error: 'Failed to retrieve approval URL' });
//         }
//     } catch (error) {
//         console.error('Error creating subscription plan:', error);
//         return NextResponse.json({ status: 500, error: error.message });
//     }
// }

