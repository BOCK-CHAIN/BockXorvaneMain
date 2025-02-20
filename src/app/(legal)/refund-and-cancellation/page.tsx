import React from "react";
import { refundAndCancellationPolicy } from "./content";
import LegacyMapping from "../legacy";

const RefundAndCancellationPolicyPage = () => {
  return (
    <div className="bg-gray-900 flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 text-gray-100 min-h-screen w-[80%] px-6 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">
          Refund and Cancellation Policy
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          <strong>Effective Date:</strong> {refundAndCancellationPolicy.effectiveDate} |{" "}
          <strong>Last Updated:</strong> {refundAndCancellationPolicy.lastUpdated}
        </p>

        <LegacyMapping legacy={refundAndCancellationPolicy}  />
        
      </div>
    </div>
  );
};

export default RefundAndCancellationPolicyPage;