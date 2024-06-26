import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  Modal,
  PasswordInput,
  Loader,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./ForgotPassword.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "react-hook-form";
import axios from "axios";
import { userUrl } from "../../server-url";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function ForgotPassword() {
  const OTPValidate = z.string().min(4).max(4);
  const PasswordValidate = z.string().min(8);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const {
    register,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const handleSendMailAndOpenModal = async () => {
    const { email } = getValues();
    try {
      const { data } = await axios.post(`${userUrl}/sendotp`, {
        email,
      });
      alert(data.message);
      open();
    } catch (error) {
      setError("root", { message: error.response.data.message });
    }
  };
  const handleReset = async () => {
    const { email, otp, password, password2 } = getValues();
    const validateOtp = OTPValidate.safeParse(otp);
    const validatePassword = PasswordValidate.safeParse(password);

    if (validateOtp.success && validatePassword.success) {
      if (password !== password2) {
        setError("root", { message: "password mismatch" });
      } else {
        try {
          const { data } = await axios.post(`${userUrl}/reset/password`, {
            otp,
            email,
            password,
          });

          alert(data.message);
          navigate("/login");
        } catch (error) {
          setError("root", { message: error.response.data.message });
        }
      }
    } else {
      setError("root", {
        message:
          "OTP must be 4 character and Password must contain minimun 8 characters",
      });
    }
  };

  return (
    <>
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to reset
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            {...register("email")}
            placeholder="me@gmail.com"
            required
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box onClick={() => navigate("/login")} ml={5}>
                  Back to the login page
                </Box>
              </Center>
            </Anchor>
            <Button
              onClick={handleSendMailAndOpenModal}
              className={classes.control}
            >
              Reset password
            </Button>
          </Group>
        </Paper>
      </Container>
      <Modal
        style={{ backgroundColor: "whitesmoke" }}
        opened={opened}
        onClose={close}
        title="Password reset"
      >
        <form>
          <TextInput
            placeholder="Check email for OTP"
            {...register("otp")}
            label="OTP"
          ></TextInput>
          <PasswordInput
            placeholder="Enter your new password"
            {...register("password")}
            label="password"
          ></PasswordInput>
          <PasswordInput
            {...register("password2")}
            placeholder="Confirm your new password"
            label="confirm password"
          ></PasswordInput>

          {errors.root && (
            <Text component="p" c="red" size="sm">
              {errors.root.message}
            </Text>
          )}
          <Button onClick={handleReset}>
            {isSubmitting ? <Loader /> : "Reset"}
          </Button>
        </form>
      </Modal>
    </>
  );
}
