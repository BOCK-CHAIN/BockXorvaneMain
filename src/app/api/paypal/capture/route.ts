import { captureOrder } from "@/utils/paypal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json(); // Parse the JSON body
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID); // Call the PayPal capture utility

    return NextResponse.json(
      { jsonResponse },
      { status: httpStatusCode } // Properly set the HTTP status code
    );
  } catch (error) {
    console.error("Failed to capture order:", error);

    return NextResponse.json(
      { error: "Failed to capture order." },
      { status: 400 } // Set the error status code
    );
  }
}
