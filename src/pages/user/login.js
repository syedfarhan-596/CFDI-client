import { LoginForm } from "../../components/login-form/login-form";
import { userUrl } from "../../server-url";

const LoginPage = () => {
  return (
    <>
      <LoginForm
        Url={userUrl}
        auth="userAuth"
        location="/dashboard"
        registerLocation="/register"
        forgotLocation="/forgot/password"
        SaveName="name"
      />
    </>
  );
};

export default LoginPage;
