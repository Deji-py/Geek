import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-10 px-5 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-white p-1 lg:p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-200 mb-4">Effective Date: 01-06-2024</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-200 mb-2">
            Welcome to Geek.Tools, a part of WISEUP DIGITALLY INTERACTIVE AND
            MEDIA LLP. We are committed to protecting your personal information
            and your right to privacy. If you have any questions or concerns
            about our policy or our practices with regards to your personal
            information, please contact us at{" "}
            <a href="mailto:hello@geek.tools" className="text-blue-500">
              hello@geek.tools
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p className="text-gray-200 mb-2">
            We collect personal information that you voluntarily provide to us
            when you register on the website, express an interest in obtaining
            information about us or our products and services, when you
            participate in activities on the website, or otherwise contact us.
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-200">
            <li>Names</li>
            <li>Email addresses</li>
            <li>Payment information</li>
            <li>Company details</li>
            <li>Job profiles</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Collect Information
          </h2>
          <p className="text-gray-200 mb-2">We collect information through:</p>
          <ul className="list-disc list-inside ml-4 text-gray-200">
            <li>Forms on our website</li>
            <li>Cookies</li>
            <li>Third-party services</li>
            <li>Signup forms</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            4. Use of Your Information
          </h2>
          <p className="text-gray-200 mb-2">
            We use the information we collect or receive:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-200">
            <li>To process payments</li>
            <li>To provide software as a service</li>
            <li>To improve user experience</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            5. Sharing Your Information
          </h2>
          <p className="text-gray-200 mb-2">
            We share your information with third parties to help us use your
            personal information, including:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-200">
            <li>Google Analytics</li>
            <li>Other user experience tools</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Protecting Your Information
          </h2>
          <p className="text-gray-200 mb-2">
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. These measures include:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-200">
            <li>Encryption</li>
            <li>Secure servers</li>
            <li>SSL certificate</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            7. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-200 mb-2">
            We use cookies and similar tracking technologies to access or store
            information. Specific information about how we use such technologies
            and how you can refuse certain cookies is set out in our Cookie
            Policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            8. Retention of Information
          </h2>
          <p className="text-gray-200 mb-2">
            We retain personal information for as long as necessary to fulfill
            the purposes outlined in this privacy policy unless otherwise
            required by law. We will retain and use your personal information to
            the extent necessary to comply with our legal obligations, resolve
            disputes, and enforce our policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">9. User Data Deletion</h2>
          <p className="text-gray-200 mb-2">
            If you wish to delete your account, you can do so by [provide
            instructions on how users can delete their accounts]. Once your
            account is deleted, your data will be removed from our systems
            within a reasonable time frame.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            10. Compliance with Legal Requirements
          </h2>
          <p className="text-gray-200 mb-2">
            We do not currently comply with specific legal requirements or
            standards like GDPR or CCPA as we collect data from across the
            globe.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            11. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-200 mb-2">
            We may update this privacy policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal, or regulatory reasons.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p className="text-gray-200 mb-2">
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by email at
            <a href="mailto:hello@geek.tools" className="text-blue-500">
              hello@geek.tools
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
