import { PayPalButtons } from '@paypal/react-paypal-js'
import React from 'react'


export default function PaypalPayments() {

    async function createOrder() {
        console.log("Creating Order")
        try {
            const response = await fetch("/api/paypal/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cart: [
                        {
                            sku: "1blwyeo8",
                            quantity: 2,
                        },
                    ],
                }),
            });
            const resp = await response.json();
            const orderData = resp.jsonResponse;
            console.log(orderData)

            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            return `Could not initiate PayPal Checkout...${error}`;
        }
    }

    async function onApprove(data: any, actions: any) {
        console.log(data)
        try {
            console.log(actions)
            const response = await fetch(
                `/api/paypal/capture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderID: data.orderID,
                    }),
                }
            );

            const resp = await response.json();
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message
            const orderData = resp.jsonResponse;
            console.log(orderData)
            const transaction =
                orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
            const errorDetail = orderData?.details?.[0];

            if (
                errorDetail ||
                !transaction ||
                transaction.status === "DECLINED"
            ) {
                // (2) Other non-recoverable errors -> Show a failure message
                let errorMessage;
                if (transaction) {
                    errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
                } else if (errorDetail) {
                    errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
                } else {
                    errorMessage = JSON.stringify(orderData);
                }

                throw new Error(errorMessage);
            } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                );
                // return `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`;
                console.log("Transaction completed by " + transaction.id);
                return
            }
        } catch (error) {
            // return `Sorry, your transaction could not be processed...${error}`;
            console.log("Error", error);
            return
        }
    }

    function onError(error: any) {
        console.log(error)
        // Do something with the error from the SDK
    }


    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{
                shape: "rect",
                layout: "vertical",
                color: "gold",
                label: "paypal",
            }}
        />
    )
}