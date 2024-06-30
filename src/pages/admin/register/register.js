import {
  Container,
  Title,
  Anchor,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Loader,
} from "@mantine/core";

import { Link } from "react-router-dom";

import classes from "./register-form.module.css";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { adminUrl } from "../../../server-url";

import axios from "axios";

import { jwtDecode } from "jwt-decode";

import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";
import Footer from "../../../footer/footer";
import Header from "../../../header/header";

const cookies = new Cookies();

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  secret: z.string(),
  name: z.string(),
});

export function AdminRegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const {
        data: { token, name },
      } = await axios.post(`${adminUrl}/register`, formData);
      const decode = jwtDecode(token);
      cookies.set("adminAuth", token, {
        expires: new Date(decode.exp * 1000),
      });
      cookies.set("adminName", name, { expires: new Date(decode.exp * 1000) });
      navigate("/admin/dashboard");
    } catch (error) {
      setError("root", { message: error.response?.data?.message });
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container size={520} my={40}>
          <Title className={classes.title} ta="center">
            Get Started As Admin
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{" "}
            <Anchor size="sm" component="button">
              <Link className={classes.link} to="/admin/login">
                Login here
              </Link>
            </Anchor>
          </Text>
          <Paper withBorder mt={30} p={30} radius="md" shadow="md">
            <TextInput
              required
              label="Full name"
              {...register("name")}
              placeholder=" Your first name"
            />
            {errors.name && (
              <Text color="red" fz="sm" lh="md">
                first name:-{errors.name.message}
              </Text>
            )}
            <TextInput
              {...register("email")}
              required
              label="Email"
              placeholder="Your email"
            />
            <Text color="red" fz="sm" lh="md">
              {errors?.email?.message}
            </Text>
            <PasswordInput
              {...register("password")}
              required
              label="Password"
              placeholder="password"
            />
            <Text color="red" fz="sm" lh="md">
              {errors?.password?.message}
            </Text>
            <PasswordInput
              {...register("password2")}
              required
              label="Confirm Password"
              placeholder="Confirm password"
            />{" "}
            <Text color="red" fz="sm" lh="md">
              {errors?.password2?.message}
            </Text>
            <PasswordInput
              {...register("secret")}
              required
              label="Enter secret key"
              placeholder="Enter admin secret access key"
            />{" "}
            <Text color="red" fz="sm" lh="md">
              {errors?.secret?.message}
            </Text>
            {errors.root && (
              <Text ta="center" color="red" fz="sm" lh="md">
                {errors.root.message}
              </Text>
            )}
            <Button
              fullWidth
              type="submit"
              mt="lg"
              style={{ backgroundColor: "rgba(0, 137, 255, 1)" }}
            >
              {isSubmitting ? <Loader color="white" /> : "Register"}
            </Button>
          </Paper>
        </Container>
      </form>
      <Footer />
    </>
  );
}
