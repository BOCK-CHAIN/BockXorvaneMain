import React from "react";
import { privacyPolicy } from "./content";

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

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            Introduction
          </h2>
          <p className="leading-relaxed">
            {privacyPolicy.introduction.description}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.informationWeCollect.title}
          </h2>
          {privacyPolicy.informationWeCollect.sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl text-indigo-200 mb-2">
                {section.subtitle}
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.howWeUseYourInformation.title}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {privacyPolicy.howWeUseYourInformation.content.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.sharingYourInformation.title}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {privacyPolicy.sharingYourInformation.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.cookiesAndTrackingTechnologies.title}
          </h2>
          <p className="leading-relaxed">
            {privacyPolicy.cookiesAndTrackingTechnologies.description}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.dataSecurity.title}
          </h2>
          <p className="leading-relaxed">
            {privacyPolicy.dataSecurity.description}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.yourRights.title}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {privacyPolicy.yourRights.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.dataRetention.title}
          </h2>
          <p className="leading-relaxed">
            {privacyPolicy.dataRetention.description}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.thirdPartyLinks.title}
          </h2>
          <p className="leading-relaxed">
            {privacyPolicy.thirdPartyLinks.description}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.childrensPrivacy.title}
          </h2>
          <p className="leading-relaxed">
            {privacyPolicy.childrensPrivacy.description}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.updatesToPolicy.title}
          </h2>
          <p className="leading-relaxed">
            {privacyPolicy.updatesToPolicy.description}
          </p>
        </section>

        {/* Contact Information Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
            {privacyPolicy.contactInformation.title}
          </h2>
          <p>
            <strong>Email:</strong> {privacyPolicy.contactInformation.email}
          </p>
          <p>
            <strong>Address:</strong> {privacyPolicy.contactInformation.address}
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
