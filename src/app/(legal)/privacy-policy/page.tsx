import React from "react";
import { privacyPolicy } from "./content";
import LegacyMapping from "../legacy";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-900 flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 text-gray-100 min-h-screen w-[80%] px-6 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          <strong>Effective Date:</strong> {privacyPolicy.effectiveDate} |{" "}
          <strong>Last Updated:</strong> {privacyPolicy.lastUpdated}
        </p>

        <LegacyMapping legacy={privacyPolicy}  />
        
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;