import { LoginForm } from "../../components/login-form/login-form";
import { userUrl } from "../../server-url";
import Header from "../../header/header";
import Footer from "../../footer/footer";

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginForm
        Url={userUrl}
        auth="userAuth"
        location="/dashboard"
        registerLocation="/register"
        forgotLocation="/forgot/password"
        SaveName="name"
      />
      <Footer />
    </>
  );
};

export default LoginPage;
