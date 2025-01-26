import { createOrder } from "@/utils/paypal";
import { NextRequest, NextResponse as res } from "next/server";
// import { NextApiRequest,NextApiResponse } from "next";

export async function POST(req: NextRequest) {
    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        const body = await req.json();
        const { cart } = body;
        const { jsonResponse, httpStatusCode } = await createOrder(cart);
        return res.json({status: httpStatusCode,jsonResponse});
    } catch (error) {
        console.error("Failed to create order:", error);
        return res.json({status: 400, error: "Failed to create order." });
    }
}