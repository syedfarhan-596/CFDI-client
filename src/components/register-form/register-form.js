import {
  Container,
  Title,
  Anchor,
  Text,
  Paper,
  Flex,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Center,
  Select,
  Input,
  Loader,
} from "@mantine/core";

import { Link } from "react-router-dom";

import classes from "./register-form.module.css";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useState } from "react";

import { userUrl } from "../../server-url";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const validInternhsipDomains = [
  "Web development",
  "Data Science",
  "Andriod app development",
  "Python developer",
  "NodeJS developer",
  "Graphics desining",
];

const schema = z.object({
  email: z.string().email(),
  number: z.string().min(10),
  internshipDomain: z.enum(validInternhsipDomains),
  password: z.string().min(8),
  password2: z.string().min(8),
  resumeFile: z.any(),
  name: z.object({ first: z.string(), last: z.string() }),
});

export function RegisterForm() {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    formData.resumeFile = formData.resumeFile[0];
    if (formData.password !== formData.password2) {
      setError("root", {
        message: "Password mismatch",
      });
    } else if (!formData.resumeFile) {
      setError("resumeFile", { message: "Please upload file less then 2mb" });
    } else {
      try {
        const { data } = await axios.post(
          `${userUrl}/temp/register`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data.success) {
          navigate(`/user/verify/${getValues("email")}`);
        }
      } catch (error) {
        setError("root", { message: error.response?.data?.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container size={520} my={40}>
        <Title className={classes.title} ta="center">
          Get Started
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component="button">
            <Link className={classes.link} to="/login">
              Login here
            </Link>
          </Anchor>
        </Text>
        <Paper withBorder mt={30} p={30} radius="md" shadow="md">
          <Flex
            mih={50}
            justify="space-between"
            align="flex-start"
            direction="row"
            wrap="wrap"
            gap="md"
          >
            <>
              <TextInput
                required
                label="First name"
                {...register("name.first")}
                placeholder=" Your first name"
                error={errors?.name?.first?.message}
                withErrorStyles={true}
              />
            </>
            <>
              <TextInput
                {...register("name.last")}
                required
                label="Last name"
                placeholder="Your last name"
                error={errors?.name?.last?.message}
                withErrorStyles={true}
              />
            </>
          </Flex>
          <TextInput
            {...register("email")}
            required
            label="Email"
            placeholder="Your email"
            error={errors?.email?.message}
            withErrorStyles={true}
          />
          <TextInput
            type="number"
            {...register("number")}
            required
            label="Phone number"
            placeholder="Your phone number"
            error={errors?.number?.message}
            withErrorStyles={true}
          />
          <Controller
            control={control}
            name="internshipDomain"
            required
            render={({ field: { onChange } }) => (
              <Select
                error={errors?.internshipDomain?.message}
                label="Internship domain"
                onChange={onChange}
                placeholder="Pick internship domain "
                data={validInternhsipDomains}
              ></Select>
            )}
          />
          <PasswordInput
            {...register("password")}
            required
            label="Password"
            placeholder="password"
            error={errors?.password?.message}
            withErrorStyles={true}
          />
          <PasswordInput
            {...register("password2")}
            required
            label="Confirm Password"
            placeholder="Confirm password"
            error={errors?.password2?.message}
            withErrorStyles={true}
          />
          <Text size="sm" fw={600}>
            Resume
          </Text>
          <Flex justify="space-evenly">
            <Input
              type="file"
              {...register("resumeFile", {
                required: "Pdf file is Required",
                validate: {
                  fileType: (file) =>
                    ["pdf"].includes(
                      file[0].type.split("/")[1].toLowerCase()
                    ) || "The file type should be PDF",

                  fileSize: (file) =>
                    file[0].size / (1024 * 1024) < 2 ||
                    "The file size should be less than 2MB",
                },
              })}
              error={errors?.resumeFile?.message}
              withErrorStyles={true}
            />
            <Text size="sm" c="dimmed">
              Upload your lastest resume
            </Text>
          </Flex>
          <Center>
            <Checkbox
              defaultChecked
              onChange={() => setIsChecked(!isChecked)}
              mt="lg"
              label={
                <>
                  I accept <Anchor inherit>terms and conditions</Anchor>
                </>
              }
            />
          </Center>
          {errors.root && (
            <Text ta="center" c="red" fz="sm" lh="md">
              {errors.root.message}
            </Text>
          )}
          <Button
            fullWidth
            type="submit"
            disabled={isChecked ? false : true}
            mt="lg"
            style={{ backgroundColor: "rgba(0, 137, 255, 1)" }}
          >
            {isSubmitting ? <Loader color="white" /> : "Register"}
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
