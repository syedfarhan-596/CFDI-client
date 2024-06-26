import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/user/login";

import RegisterPage from "./pages/user/register";

import DashboardMain from "./pages/user/dashboard";

import { ForgotPassword } from "./components/forgot-pass/forgot";

import AdminLoginPage from "./pages/admin/login";

import { AdminRegisterPage } from "./pages/admin/register/register";

import AdminDashboardMain from "./pages/admin/dashboard/dashboard";

import UserComponent from "./pages/admin/user/user";

import LandingPage from "./pages/cfdi/landing/landing";
import About from "./pages/cfdi/about/about";
import Internship from "./pages/cfdi/internship/internship";
import Services from "./pages/cfdi/services/services";
import PrivacyPolicy from "./pages/cfdi/privacy/privacy";
import TermsOfService from "./pages/cfdi/terms/terms";
import VerifyEmail from "./pages/user/verify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Landing routes */}
        <Route path={"/"} element={<LandingPage />}></Route>
        <Route path={"/about"} element={<About />}></Route>
        <Route path={"/privacy"} element={<PrivacyPolicy />}></Route>
        <Route path={"/internship"} element={<Internship />}></Route>
        <Route path={"/services"} element={<Services />}></Route>
        <Route path={"/terms"} element={<TermsOfService />}></Route>

        {/* user routes  */}
        <Route path={"/login"} element={<LoginPage />}></Route>
        <Route path={"/user/verify/:email"} element={<VerifyEmail />}></Route>
        <Route path={"/register"} element={<RegisterPage />}></Route>
        <Route path={"forgot/password"} element={<ForgotPassword />}></Route>
        <Route path={"/dashboard"} element={<DashboardMain />}></Route>
        {/* admin routes */}
        <Route path={"/admin/login"} element={<AdminLoginPage />}></Route>
        <Route path={"/admin/register"} element={<AdminRegisterPage />}></Route>
        <Route
          path={"/admin/dashboard"}
          element={<AdminDashboardMain />}
        ></Route>
        <Route path={"/admin/user/:userId"} element={<UserComponent />}></Route>

        <Route path="*" element={<h1>Resource Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
