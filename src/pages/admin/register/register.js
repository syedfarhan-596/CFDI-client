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
  Modal,
} from "@mantine/core";

import { Link } from "react-router-dom";

import classes from "./register-form.module.css";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useDisclosure } from "@mantine/hooks";

import { adminUrl } from "../../../server-url";

import axios from "axios";

import { jwtDecode } from "jwt-decode";

import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const schema = z.object({
  email: z.string().email(),
  otp: z.string().min(4).max(4),
  password: z.string().min(8),

  name: z.string(),
});

const sendMailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  secret: z.string(),
  password2: z.string().min(8),
});
export function AdminRegisterPage() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    getValues,
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
      if (error.response.data.message === "Invalid OTP") {
        setError("otp", { message: error.response.data.message });
      }
      setError("root", { message: error.response?.data?.message });
    }
  };

  const sendMail = async (e) => {
    e.preventDefault();
    const { email, password, password2, secret, name } = getValues();

    const validate = sendMailSchema.safeParse({
      email,
      password,
      password2,
      secret,
      name,
    });
    console.log(email, password, password2, secret);
    if (password !== password2) {
      setError("root", {
        message: "Password mismatch",
      });
    } else {
      if (validate.success) {
        try {
          const { data } = await axios.post(`${adminUrl}/sendotp`, {
            email,
            secret,
          });
          if (data.success) {
            alert(data.message);
            open();
          }
        } catch (error) {
          alert(error.response.data.message);
        }
      } else {
        validate.error?.issues?.map((err) => {
          setError(err?.path[0], { message: err.message });
          return 0;
        });
      }
    }
  };

  return (
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
            onClick={sendMail}
            fullWidth
            type="submit"
            mt="lg"
            style={{ backgroundColor: "rgba(0, 137, 255, 1)" }}
          >
            Register
          </Button>
        </Paper>
      </Container>
      <Modal opened={opened} onClose={close} title="Verify email">
        <TextInput
          label="otp"
          placeholder="Enter otp send to email"
          {...register("otp")}
          required
        ></TextInput>
        <Text color="red" fz="sm" lh="md">
          {errors?.otp?.message}
        </Text>
        <Button onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? <Loader /> : " Verify email"}
        </Button>
      </Modal>
    </form>
  );
}
