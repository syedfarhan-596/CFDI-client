import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../../header/header";
import {
  TextInput,
  Button,
  Box,
  Container,
  Title,
  Text,
  Group,
  Loader,
} from "@mantine/core";
import { useParams } from "react-router-dom";

import Cookies from "universal-cookie";

import { jwtDecode } from "jwt-decode";

import axios from "axios";

import { userUrl } from "../../server-url";

import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const otpSchema = z.object({
  otp: z
    .string()
    .min(4, { message: "OTP must be 4 digits" })
    .max(4, { message: "OTP must be 4 digits" }),
});

const VerifyOTP = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (formData) => {
    formData.email = email;
    try {
      const {
        data: { token, name },
      } = await axios.post(`${userUrl}/register`, formData);
      const decoded = jwtDecode(token);
      cookies.set("userAuth", token, { expires: new Date(decoded.exp * 1000) });
      cookies.set("name", name, {
        expires: new Date(decoded.exp * 1000),
      });
      navigate("/dashboard");
    } catch (error) {
      setError("root", {
        message: error?.response?.data?.message,
      });
    }
  };

  const handleResendOTP = async () => {
    try {
      const { data } = await axios.post(`${userUrl}/sendotp`, { email });

      alert(data.message);
    } catch (error) {
      setError("root", {
        message: error?.response?.data?.message,
      });
    }
  };

  return (
    <>
      <Header />
      <Container size="xs" mt="xl" px="xs">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <Title order={2} align="center" mb="lg">
            Verify OTP
          </Title>
          <Text align="center" mb="md">
            An OTP has been sent to your email: {email}
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="OTP"
              placeholder="Enter OTP"
              {...register("otp")}
              error={errors.otp?.message}
              sx={{ width: "100%" }}
            />
            <Button type="submit" fullWidth mt="md">
              {isSubmitting ? <Loader color="white" /> : "Verify"}
            </Button>
          </form>
          {errors.root && (
            <Text color="red" size="sm" mt="sm">
              {errors.root?.message}
            </Text>
          )}
          <Group position="center" mt="lg">
            <Button variant="outline" onClick={handleResendOTP}>
              Resend OTP
            </Button>
          </Group>
        </Box>
      </Container>
    </>
  );
};

export default VerifyOTP;
