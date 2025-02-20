import React from "react";

const RefundAndCancellationPolicyPage = () => {
    return (
        <div className="bg-gray-900 flex justify-center items-center min-h-screen">
            <div className="bg-gray-900 text-gray-100 min-h-screen w-[80%] px-6 py-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">Shipping and Delivery Policy</h1>
                <p className="mt-2 text-lg text-indigo-300">Last Updated: 17/02/2025</p>
                <p className="mt-4 text-lg text-gray-200">
                    Welcome to <span className="text-blue-500 hover:text-blue-700"><a href="#">Bock Xorvane</a></span>, a subsidiary of OCTAKAIGON BOCK PRIVATE LIMITED, operating under the Bock Chain program. This Shipping and Delivery Policy outlines the procedures, timelines, and terms related to the shipment and delivery of products and services offered on our platform. By using Bock Xorvane, you acknowledge and agree to the shipping and delivery terms outlined in this policy. If you have any questions, please contact our customer support team before placing an order.
                </p>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-indigo-400 ml-4">1. Scope of Shipping and Delivery</h2>
                    <div className="ml-6">
                        <p className="mt-2 text-lg text-indigo-300 ml-4">1.1. Applicability</p>
                        <ul className="list-disc ml-8 mt-2 text-lg text-gray-200">
                            <li>Physical products ordered through Bock Xorvane.</li>
                            <li>Digital services and software solutions with electronic delivery mechanisms.</li>
                            <li>Business and enterprise solutions that involve shipment of hardware, software keys, or documents.</li>
                        </ul>
                        <p className="mt-4 text-lg text-indigo-300 ml-4">1.2. Shipping Locations</p>
                        <ul className="list-disc ml-8 mt-2 text-lg text-gray-200">
                            <li>Domestic (India): All major cities and states, including metropolitan and rural areas.</li>
                            <li>International Shipping: Selected countries where our logistics partners operate.</li>
                        </ul>
                    </div>
                    <p className="mt-4 text-lg text-gray-200 ml-4">Certain regions may be restricted due to legal, regulatory, or logistical constraints. Users are encouraged to check availability before placing an order.</p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-indigo-400 ml-4">2. Order Processing and Dispatch</h2>
                    <div className="ml-6">
                        <p className="mt-2 text-lg text-indigo-300 ml-4">2.1. Order Confirmation</p>
                        <p className="mt-2 text-lg text-gray-200 ml-4">After placing an order, users receive a confirmation email/SMS with order details. The order status can be tracked in the Bock Xorvane dashboard.</p>
                        <p className="mt-4 text-lg text-indigo-300 ml-4">2.2. Processing Time</p>
                        <ul className="list-disc ml-8 mt-2 text-lg text-gray-200">
                            <li>Standard Processing: Orders are typically processed within 1-5 business days from confirmation.</li>
                            <li>Custom or Bulk Orders: Processing may take up to 5-10 business days, depending on complexity.</li>
                            <li>Pre-Orders & Backorders: If a product is out of stock, estimated processing times will be displayed on the order page.</li>
                        </ul>
                        <p className="mt-4 text-lg text-indigo-300 ml-4">2.3. Verification Requirements</p>
                        <p className="mt-2 text-lg text-gray-200 ml-4">Orders may be subject to identity verification or additional documentation for high-value transactions. Business clients may need to submit company details and GST information before shipping.</p>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-indigo-400 ml-4">3. Shipping Methods and Delivery Timelines</h2>
                    <div className="ml-6">
                        <p className="mt-2 text-lg text-indigo-300 ml-4">3.1. Domestic Shipping (India)</p>
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full text-lg text-gray-200 border-collapse">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-2 text-left">Shipping Method</th>
                                        <th className="px-4 py-2 text-left">Estimated Delivery Time</th>
                                        <th className="px-4 py-2 text-left">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-4 py-2">Standard Shipping</td>
                                        <td className="px-4 py-2">5-7 business days</td>
                                        <td className="px-4 py-2">Free (on orders above ₹5,000)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-4 py-2">Express Shipping</td>
                                        <td className="px-4 py-2">2-4 business days</td>
                                        <td className="px-4 py-2">₹200 - ₹500</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-4 py-2">Same-Day Delivery</td>
                                        <td className="px-4 py-2">Available in select cities</td>
                                        <td className="px-4 py-2">₹600+</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-4 py-2">Bulk Business Orders</td>
                                        <td className="px-4 py-2">7-14 business days</td>
                                        <td className="px-4 py-2">Custom Pricing</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-lg text-gray-200 ml-4">
                            Standard and Express shipping use trusted logistics partners (e.g., Blue Dart, Delhivery, DTDC, etc.). Same-day delivery is only available for specific pin codes and is subject to availability.
                        </p>
                        <h2 className="text-lg mt-4 font-semibold text-indigo-300 ml-4">3.2. International Shipping</h2>
                        <p className="mt-2 text-lg text-gray-200 ml-4">Delivery timelines depend on the destination country and customs regulations. Estimated delivery time: 10-25 business days. International shipping charges vary based on location, weight, and customs duties. Customers may be required to pay import duties, taxes, or customs clearance fees as per local laws.</p>

                        <h2 className="text-lg font-semibold text-indigo-300 ml-4 mt-4">3.3. Digital Product Delivery</h2>
                        <p className="mt-2 text-lg text-gray-200 ml-4">Software licenses, activation keys, or digital documents are delivered instantly via email after payment verification. For custom-built software, delivery timelines depend on project scope and will be communicated separately.</p>
                    </div>

                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-indigo-400 ml-4">4. Tracking Orders</h2>
                    <div className="ml-6">

                        <p className="mt-2 text-lg text-indigo-300 ml-4">4.1. Tracking Information</p>
                        <p className="mt-2 text-lg text-gray-200 ml-4">Once an order is shipped, a tracking ID and link will be sent via email/SMS. Users can track their shipments in real time on the Bock Xorvane website or partner courier website.</p>

                        <p className="mt-4 text-lg text-indigo-300 ml-4">4.2. Delivery Attempts</p>
                        <p className="mt-2 text-lg text-gray-200 ml-4">If a delivery attempt fails, the courier service will attempt redelivery up to 3 times. If the package remains undelivered, it will be returned to the warehouse, and refund/re-shipment options will be provided.</p>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-indigo-400 ml-4">5. Delivery Issues</h2>
                    <div className="ml-6">

                        <p className="mt-2 text-lg text-indigo-300 ml-4">5.1. Missing or Damaged Products</p>
                        <p className="mt-2 text-lg text-gray-200 ml-4">If products are missing or damaged upon delivery, please contact our support team within 48 hours for assistance. You may be asked to provide photographic evidence for the claim.</p>

                        <p className="mt-4 text-lg text-indigo-300 ml-4">5.2. Late Deliveries</p>
                        <p className="mt-2 text-lg text-gray-200 ml-4">If a delivery is delayed beyond the estimated delivery time, we will provide a new estimated delivery date and offer compensation where applicable, such as a partial refund or discount on future orders.</p>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-indigo-400 ml-4">6. Returns and Refunds</h2>
                    <div className="ml-6">

                        <p className="mt-2 text-lg text-indigo-300 ml-4">6.1. Return Policy</p>
                        <p className="mt-2 text-lg text-gray-200 ml-4">Products can be returned within 30 days of delivery, provided they are unused and in original packaging. The return shipping cost will be borne by the customer unless the product was defective or damaged upon arrival.</p>

                        <p className="mt-4 text-lg text-indigo-300 ml-4">6.2. Refund Process</p>
                        <p className="mt-2 text-lg text-gray-200 ml-4">Refunds will be processed to the original payment method within 7-14 business days after receiving the returned product. A refund confirmation will be sent to the customer via email.</p>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-indigo-400 ml-4">7. Contact Us</h2>
                    <p className="mt-2 text-lg text-indigo-300 ml-4">If you have any questions regarding our shipping and delivery policy, please contact us:</p>
                    <p className="mt-2 text-lg text-gray-200 ml-4">Email: support@bockxorvane.com</p>
                    <p className="mt-2 text-lg text-gray-200 ml-4">Phone: +91-123-456-7890</p>
                </section>
            </div>
        </div>
    );
};

export default RefundAndCancellationPolicyPage;
