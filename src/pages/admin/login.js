import { LoginForm } from "../../components/login-form/login-form";
import { adminUrl } from "../../server-url";
const AdminLoginPage = () => {
  return (
    <>
      <LoginForm
        Url={adminUrl}
        auth="adminAuth"
        location="/admin/dashboard"
        registerLocation="/admin/register"
        forgotLocation="/admin/forgot/password"
        SaveName="adminName"
      />
    </>
  );
};

export default AdminLoginPage;
