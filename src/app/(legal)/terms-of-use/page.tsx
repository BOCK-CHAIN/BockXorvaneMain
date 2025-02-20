import React from "react";
import { termsAndConditions } from "./contents";
import LegacyMapping from "../legacy";

const TermsAndConditionsPage = () => {
  return (
    <div className="bg-gray-900 flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 text-gray-100 min-h-screen w-[80%] px-6 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">
          Terms and Condition
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          <strong>Effective Date:</strong> {termsAndConditions.effectiveDate} |{" "}
          <strong>Last Updated:</strong> {termsAndConditions.lastUpdated}
        </p>

        <LegacyMapping legacy={termsAndConditions}  />
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;