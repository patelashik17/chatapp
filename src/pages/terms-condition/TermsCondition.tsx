import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import "./Style.scss";
import { useEffect } from "react";

const TermsCondition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Header />
      <div className="terms-condition">
        <h1>terms & conditions</h1>
        <ol>
          <li>
            <h3> Introduction</h3>
            <p>
              Welcome to Gaiia, a leading AI chatbot designed to engage, assist,
              and educate. By accessing or using Gaiia, you agree to abide by
              these terms and conditions. If you disagree with any part of these
              terms, please refrain from using our platform.
            </p>
          </li>
          <li>
            <h3>Definitions</h3>
            <ul>
              <li>
                "Service" refers to the chatbot platform provided by Gaiia.
              </li>
              <li>
                "User," "You," and "Your" refer to any individual who accesses
                or uses the Service.
              </li>
            </ul>
          </li>
          <li>
            <h3>User Obligations</h3>
            <ul>
              <li>
                {" "}
                You must be at least 16 years old/your specific age requirement
                to use the Service.
              </li>
              <li>
                You agree not to misuse the platform or assist anyone in doing
                so.
              </li>
            </ul>
          </li>
          <li>
            <h3>Intellectual Property</h3>
            <ul>
              <li>
                All content, software, and intellectual properties related to
                Gaiia belong to Dazl Media Ltd.
              </li>
              <li>
                Unauthorized reproduction, distribution, or use is prohibited.
              </li>
            </ul>
          </li>
          <li>
            <h3>Privacy Policy</h3>
            <ul>
              <li>
                By using Gaiia, you agree to our Privacy Policy, which is a
                separate document detailing how we collect, use, and store your
                data.
              </li>
            </ul>
          </li>
          <li>
            <h3> Restrictions</h3>
            <ul>
              <li>
                {" "}
                Users are not allowed to reverse engineer, tamper with, or
                extract the underlying code of Gaiia.
              </li>
              <li>
                Sending automated queries without prior approval is prohibited.
              </li>
            </ul>
          </li>
          <li>
            <h3>Disclaimers</h3>
            <ul>
              <li>
                Gaiia is provided "as is" without warranties of any kind, either
                express or implied.
              </li>
              <li>
                We do not guarantee that the Service will always be secure or
                error-free.
              </li>
            </ul>
          </li>
          <li>
            <h3> Limitation of Liability</h3>
            <ul>
              <li>
                In no event shall Gaiia be liable for any direct, indirect, or
                consequential damages arising from the use or inability to use
                the Service.
              </li>
            </ul>
          </li>
          <li>
            <h3> Termination</h3>
            <ul>
              <li>
                We reserve the right to suspend or terminate your access to
                Gaiia if you violate these terms.
              </li>
            </ul>
          </li>
          <li>
            <h3>Changes to These Terms</h3>
            <ul>
              <li>
                Gaiia reserves the right to amend these terms at any time. Users
                will be notified of any significant changes and continued use of
                the Service implies acceptance.
              </li>
            </ul>
          </li>
          <li>
            <h3>Governing Law</h3>
            <ul>
              <li>
                These terms are governed by the laws of the United Kingdom and
                any disputes shall be resolved in the jurisdiction of the courts
                of England and Wales.
              </li>
            </ul>
          </li>
          <li>
            <h3>Contact</h3>
            <ul>
              <li>
                For any questions or concerns about these terms, please contact
                us at <a>info@gaiia.chat</a>
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
};

export default TermsCondition;
