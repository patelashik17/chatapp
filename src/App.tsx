import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import "./Style.scss";
import Chat from "./pages/chat/Chat";
import SingInWithGoogle from "./pages/sign-in-google/SingInWithGoogle";
import PrivateRoute from "./components/PrivateRoute";
import DrawerAppBar from "./components/DrawerAppBar";
import Room from "./pages/room/Room";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import TermsCondition from "./pages/terms-condition/TermsCondition";
import AboutUs from "./pages/about-us/AboutUs";
import HowItWorks from "./pages/how-it-works/HowItWorks";
import UsageDisclaimer from "./pages/usage-disclaimer/UsageDisclaimer";
import ThemeProvider from "./themeContext/themeProvider";
import ContactUs from "./pages/contact-us/ContactUs";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Tips from "./pages/tips/Tips";
import SuccessfulRegister from "./pages/successful-register/SuccessfulRegister";
import ResetPassword from "./pages/reset-password/ResetPassword";

const App = () => {
  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <div className="v-layout">
          <main className="v-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-condition" element={<TermsCondition />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/usage-disclaimer" element={<UsageDisclaimer />} />
              {/* <Route path="/" element={<SignIn />} /> */}
              <Route path="/sign-google" element={<SingInWithGoogle />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/success" element={<SuccessfulRegister />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/room/:sessionId" element={<Room />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/chat"
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tips"
                element={
                  <PrivateRoute>
                    <Tips />
                  </PrivateRoute>
                }
              />

              <Route path="/drawer" element={<DrawerAppBar />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
