import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Loader,
} from "@mantine/core";
import classes from "./login-form.module.css";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import Cookies from "universal-cookie";

import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm({
  Url,
  auth,
  location,
  registerLocation,
  forgotLocation,
  SaveName,
}) {
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
      } = await axios.post(`${Url}/login`, formData);
      const decoded = jwtDecode(token);
      cookies.set(`${auth}`, token, { expires: new Date(decoded.exp * 1000) });
      cookies.set(`${SaveName}`, name, {
        expires: new Date(decoded.exp * 1000),
      });
      navigate(`${location}`);
    } catch (error) {
      setError("root", {
        message: error?.response?.data?.message,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            <Link className={classes.link} to={registerLocation}>
              Create account
            </Link>
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            required
            {...register("email")}
            label="Email"
            placeholder="you@gmail.com"
          />
          {errors.email && (
            <Text color="red" fz="sm" lh="md">
              {errors.email.message}
            </Text>
          )}
          <PasswordInput
            required
            {...register("password")}
            label="Password"
            placeholder="Your password"
            mt="md"
          />
          {errors.password && (
            <Text color="red" fz="sm" lh="md">
              {errors.password.message}
            </Text>
          )}
          <Group justify="space-between" mt="lg">
            <div></div>
            <Link to={forgotLocation} style={{ textDecoration: "none" }}>
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Link>
          </Group>

          {errors.root && (
            <Text ta="center" color="red" fz="sm" lh="md">
              {errors.root.message}
            </Text>
          )}

          <Button
            disabled={isSubmitting}
            type="submit"
            fullWidth
            style={{ backgroundColor: "rgba(0, 137, 255, 1)" }}
            mt="xl"
          >
            {isSubmitting ? <Loader size="sm" color="white" /> : "Sign in"}
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
