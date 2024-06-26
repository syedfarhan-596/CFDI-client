import {
  Code,
  Box,
  TextInput,
  Container,
  Button,
  Loader,
  Text,
  Title,
} from "@mantine/core";

import { useForm } from "react-hook-form";

import { userUrl } from "../../server-url";

import Cookie from "universal-cookie";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  name: z.object({ first: z.string().min(3), last: z.string().min(3) }),
});

const Profile = ({ user, setUser }) => {
  const cookie = new Cookie();
  const {
    register,
    handleSubmit,
    setError,

    formState: { isSubmitting, errors },
  } = useForm({ defaultValues: user, resolver: zodResolver(profileSchema) });

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.put(`${userUrl}/update`, formData, {
        headers: { Authorization: `Bearer ${cookie.get("userAuth")}` },
      });
      setUser(data.user);
    } catch (error) {
      setError("root", { message: error.response.data.message });
    }
  };
  return (
    <Box ta="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title order={4}>Change Name</Title>
        <Container>
          <TextInput
            label="First name"
            required
            placeholder="First name"
            {...register("name.first")}
          ></TextInput>
          {errors.name?.first && (
            <Text component="p" size="sm" c="red">
              {errors.name.first.message}
            </Text>
          )}
          <TextInput
            label="Last name"
            {...register("name.last")}
            required
            placeholder="Last name"
          ></TextInput>
          {errors.name?.last && (
            <Text component="p" size="sm" c="red">
              {errors.name.last.message}
            </Text>
          )}
        </Container>
        <Code>Email:{user?.email}</Code>
        <br></br>
        <Code>PhNo:{user?.number}</Code>
        <br></br>
        <Code>Internship:{user?.internshipDomain}</Code>
        <br></br>
        {errors.root && (
          <Text component="p" size="sm" c="red">
            {errors.root.message}
          </Text>
        )}
        <Button w="100%" type="submit">
          {isSubmitting ? <Loader size="sm" color="white" /> : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
