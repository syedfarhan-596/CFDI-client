import { LoginForm } from "../../components/login-form/login-form";
import { adminUrl } from "../../server-url";
import Header from "../../header/header";
import Footer from "../../footer/footer";
const AdminLoginPage = () => {
  return (
    <>
      <Header />
      <LoginForm
        Url={adminUrl}
        auth="adminAuth"
        location="/admin/dashboard"
        registerLocation="/admin/register"
        forgotLocation="/admin/forgot/password"
        SaveName="adminName"
      />
      <Footer />
    </>
  );
};

export default AdminLoginPage;
