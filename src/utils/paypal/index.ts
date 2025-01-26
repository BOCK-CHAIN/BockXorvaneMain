import {
  // ApiError,
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
  // logging: {
  //   logLevel: LogLevel.Info,
  //   logRequest: { logBody: true },
  //   logResponse: { logHeaders: true },
  // },
});

const ordersController = new OrdersController(client);
// const paymentsController = new PaymentsController(client);

export const createOrder = async (cart: any) => {
  console.log(cart)
  const payload = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: "100",
          },
        },
      ],
      prefer: "return=minimal",
    },
  };

  try {
    const { body, ...httpResponse } =
      await ordersController.ordersCreate(payload);
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(typeof body === 'string' ? body : ''),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
      // const { statusCode, headers } = error;
      return {
        jsonResponse: JSON.parse((error as Error).message),
        httpStatusCode: 404,
      }
  }
};

export const captureOrder = async (orderID: string) => {
  const collect = {
      id: orderID,
      prefer: "return=minimal",
  };

  try {
      const { body, ...httpResponse } = await ordersController.ordersCapture(
          collect
      );
      // Get more response info...
      // const { statusCode, headers } = httpResponse;
      return {
          jsonResponse: JSON.parse(typeof body === 'string' ? body : ''),
          httpStatusCode: httpResponse.statusCode,
      };
  } catch (error) {
      // if (error instanceof ApiError) {
      //     // const { statusCode, headers } = error;
      //     throw new Error(error.message);
      // }
      return {
        jsonResponse: JSON.parse((error as Error).message),
        httpStatusCode: 404,
      }
  }
};

