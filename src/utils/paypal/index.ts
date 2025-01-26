"use server";
import {
  ApiError,
  Client,
  Environment,
  // LogLevel,
  OrdersController,
  // PaymentsController,
  CheckoutPaymentIntent,
} from "@paypal/paypal-server-sdk";

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET as string,
  },
  timeout: 0,
  environment: Environment.Sandbox,
});

const ordersController = new OrdersController(client);

interface bodyProps {
  email: string;
  name: string;
  price: number;
  description: string;
}

export const createOrder = async (body: bodyProps) => {
  // console.log(body);
  const payload = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            landing_page: "NO_PREFERENCE",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
          },
          emailAddress: body.email,
          name: {
            givenName: body.name,
          },
        }
      },
      payer: {
        emailAddress: body.email,
        name: {
          givenName: body.name,
        },
      },
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: body.price.toString(),
          },
          description: body.description,
        },
      ],
      prefer: "return=minimal",
    },
  };

  try {
    const { body, ...httpResponse } =
      await ordersController.ordersCreate(payload);
    return {
      jsonResponse: JSON.parse(typeof body === "string" ? body : ""),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    return {
      jsonResponse: JSON.parse((error as Error).message),
      httpStatusCode: 404,
    };
  }
};

export const captureOrder = async (orderID: string) => {
  const collect = {
    id: orderID,
    prefer: "return=representation",
  };
  try {
    const { body, ...httpResponse } =
      await ordersController.ordersCapture(collect);
    return {
      jsonResponse: JSON.parse(typeof body === "string" ? body : ""),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
    return {
      jsonResponse: JSON.parse((error as Error).message),
      httpStatusCode: 404,
    };
  }
};
