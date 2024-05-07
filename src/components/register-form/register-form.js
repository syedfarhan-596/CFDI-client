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
  Modal,
} from "@mantine/core";

import { Link } from "react-router-dom";

import classes from "./register-form.module.css";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";

import { userUrl } from "../../server-url";

import axios from "axios";

import { jwtDecode } from "jwt-decode";

import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

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
  otp: z.string().max(4).min(4),
  name: z.object({ first: z.string(), last: z.string() }),
});

const sendMailSchema = z.object({
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
  const [opened, { open, close }] = useDisclosure(false);

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
    } else {
      try {
        const {
          data: { token, name },
        } = await axios.post(`${userUrl}/register`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const decode = jwtDecode(token);
        cookies.set("userAuth", token, {
          expires: new Date(decode.exp * 1000),
        });
        cookies.set("name", name, { expires: new Date(decode.exp * 1000) });
        navigate("/dashboard");
      } catch (error) {
        if (error.response.data.message === "Invalid OTP") {
          setError("otp", { message: error.response.data.message });
        }
        setError("root", { message: error.response?.data?.message });
      }
    }
  };

  const sendMail = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
      password2,
      internshipDomain,
      resumeFile,
      name,
      number,
    } = getValues();

    const validate = sendMailSchema.safeParse({
      email,
      password,
      password2,
      internshipDomain,
      resumeFile,
      name,
      number,
    });

    if (password !== password2) {
      setError("root", {
        message: "Password mismatch",
      });
    } else if (!resumeFile.length || resumeFile[0].type !== "application/pdf") {
      setError("resumeFile", { message: "Upload valid resume in pdf format" });
    } else {
      if (validate.success) {
        try {
          const { data } = await axios.post(`${userUrl}/sendotp`, { email });
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
              />
            </>
            <>
              <TextInput
                {...register("name.last")}
                required
                label="Last name"
                placeholder="Your last name"
              />
            </>
          </Flex>
          {errors.name?.first && (
            <Text color="red" fz="sm" lh="md">
              first name:-{errors.name.first.message}
            </Text>
          )}
          {errors.name?.last && (
            <Text color="red" fz="sm" lh="md">
              last name:-{errors.name.last.message}
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
          <TextInput
            type="number"
            {...register("number")}
            required
            label="Phone number"
            placeholder="Your phone number"
          />
          <Text color="red" fz="sm" lh="md">
            {errors?.number?.message}
          </Text>
          <Controller
            control={control}
            name="internshipDomain"
            render={({ field: { onChange } }) => (
              <Select
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
            />
            <Text size="sm" c="dimmed">
              Upload your lastest resume
            </Text>
          </Flex>
          <Text color="red" fz="sm" lh="md">
            {errors?.resumeFile?.message}
          </Text>
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
            <Text ta="center" color="red" fz="sm" lh="md">
              {errors.root.message}
            </Text>
          )}
          <Button
            onClick={sendMail}
            fullWidth
            type="submit"
            disabled={isChecked ? false : true}
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
