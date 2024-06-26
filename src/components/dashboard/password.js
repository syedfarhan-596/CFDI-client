import {
  Container,
  Box,
  PasswordInput,
  Button,
  Text,
  Space,
  Loader,
  Title,
} from "@mantine/core";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import Cookie from "universal-cookie";

import axios from "axios";

import { userUrl } from "../../server-url";

const schema = z.object({
  password: z.string().min(8),
  password2: z.string().min(8),
});

const Password = ({ setUser }) => {
  const cookie = new Cookie();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    if (formData.password !== formData.password2) {
      setError("root", {
        message: "Password mismatch",
      });
    } else {
      try {
        const { data } = await axios.put(
          `${userUrl}/update`,
          { password: formData.password },
          {
            headers: { Authorization: `Bearer ${cookie.get("userAuth")}` },
          }
        );
        setUser(data.user);
        alert("updated successfully");
      } catch (error) {
        setError("root", { message: error.response.data.message });
      }
    }
  };

  return (
    <Box ta="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title order={4}>Change Password</Title>
        <Container>
          <PasswordInput
            label="Password"
            placeholder="Enter new password"
            {...register("password")}
          ></PasswordInput>
          {errors.password && (
            <Text component="p" color="red" fz="sm" lh="md">
              {errors.password.message}
            </Text>
          )}
          <PasswordInput
            label="Confirm Password"
            {...register("password2")}
            placeholder="Confirm password"
          ></PasswordInput>
          {errors.password2 && (
            <Text component="p" color="red" fz="sm" lh="md">
              {errors.password2.message}
            </Text>
          )}
          {errors.root && (
            <Text component="p" ta="center" color="red" fz="sm" lh="md">
              {errors.root.message}
            </Text>
          )}
          <Space h="xl"></Space>
          <Button w="100%" type="submit">
            {" "}
            {isSubmitting ? <Loader size="sm" color="white" /> : "Save"}
          </Button>
        </Container>
      </form>
    </Box>
  );
};

export default Password;
