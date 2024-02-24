import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import "./Style.scss";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Header />
      <div className="privacy-container">
        <h1>privacy policy</h1>
        <ol>
          <li>
            <h3> Introduction</h3>
            <p>
              Welcome to Gaiia, an AI-driven therapy chatbot. We are committed
              to protecting the privacy of our users. This Privacy Policy
              outlines the types of information we collect, how we use it, and
              the steps we take to safeguard your information.
            </p>
          </li>
          <li>
            <h3>Information We Collect</h3>
            <ul>
              <li>
                2.1 Personal Information: This might include your name, email
                address, and any other data you provide during registration or
                profile setup.
              </li>
              <li>
                2.2 Chat Data: Conversations you have with Gaiia, including
                feedback and any inputs you give.
              </li>
              <li>
                2.3 Technical Data: Like IP addresses, device type, browser
                type, and other relevant technical details.
              </li>
            </ul>
          </li>
          <li>
            <h3>How We Use Your Information</h3>
            <ul>
              <li>
                {" "}
                3.1 Provide Services: To provide and improve the chatbot
                service.
              </li>
              <li>
                3.2 Research & Development: Anonymized and aggregated data may
                be used to improve Gaiia's algorithms and performance.
              </li>
              <li>
                3.3 Communication: To communicate updates, offers, and relevant
                information about Gaiia.
              </li>
            </ul>
          </li>
          <li>
            <h3>Data Protection & Storage</h3>
            <ul>
              <li>
                {" "}
                4.1 Encryption: All data is encrypted during transit and at
                rest.
              </li>
              <li>
                4.2 Data Retention: Chat data is stored for 90 days, after which
                it's permanently deleted.
              </li>
              <li>
                4.3 Data Location: All user data is stored on servers located in
                the United Kingdom.
              </li>
            </ul>
          </li>
          <li>
            <h3>Sharing of Information</h3>

            <p>
              We do not sell, rent, or share personal data with third parties
              except as necessary to provide our services or as required by law.
            </p>
          </li>
          <li>
            <h3>User Rights</h3>
            <ul>
              <li>
                {" "}
                6.1 Access: You can request a copy of the data we have on you.
              </li>
              <li>
                6.2 Deletion: At any time, you can ask us to delete your data.
              </li>
              <li>
                6.3 Correction: If you believe any information we have on you is
                incorrect, you can request corrections.
              </li>
            </ul>
          </li>
          <li>
            <h3>Cookies and Tracking</h3>
            <p>
              Gaiia uses cookies and other tracking mechanisms to enhance user
              experience and for performance metrics.
            </p>
          </li>
          <li>
            <h3>Children's Privacy</h3>
            <p>
              Gaiia is not intended for use by children under the age of 16,
              depending on your region. We do not knowingly collect personal
              information from children under this age.
            </p>
          </li>
          <li>
            <h3>Changes to This Policy</h3>
            <p>
              We may update our Privacy Policy occasionally. Any changes will be
              posted on this page, and we advise users to review it regularly.
            </p>
          </li>
          <li>
            <h3> Contact Us</h3>
            <p>
              For any questions or concerns regarding this Privacy Policy,
              please contact us at <a href="#">info@gaiia.chat</a>
            </p>
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
