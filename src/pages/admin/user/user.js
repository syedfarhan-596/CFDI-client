import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDisclosure } from "@mantine/hooks";
import TaskForm from "./tasks";
import {
  IconBrandCodepen,
  IconClipboardCheck,
  IconFileCertificate,
  IconCircleCheck,
} from "@tabler/icons-react";

import {
  Timeline,
  Text,
  Box,
  Container,
  Code,
  Title,
  Button,
  Flex,
  Space,
  Input,
  Checkbox,
  Paper,
  Modal,
  Loader,
} from "@mantine/core";

import { useForm } from "react-hook-form";
import Cookie from "universal-cookie";
import axios from "axios";
import { adminUrl, server } from "../../../server-url";
const User = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const cookie = new Cookie();
  const token = cookie.get("adminAuth");
  const [user, setUser] = useState();
  const [opened, { open, close }] = useDisclosure(false);
  const [checkTask, { open: taskOpen, close: taskClose }] =
    useDisclosure(false);
  const FetchUser = useCallback(async () => {
    try {
      const { data } = await axios(`${adminUrl}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }, [token, userId]);

  useEffect(() => {
    FetchUser();
  }, [FetchUser]);

  let active = 0;

  if (user) {
    if (user?.status?.completionCertificate) {
      active = 4;
    } else if (user?.status?.taskVerified) {
      active = 3;
    } else if (user?.status?.tasks?.length) {
      active = 2;
    } else if (user?.status?.offerLetter) {
      active = 1;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm();
  const onSubmit = async (formData) => {
    // Assuming user is available from the component's state
    if (!user) {
      return;
    }

    const hasOfferLetter =
      formData.offerletter && formData.offerletter.length > 0;
    const hasTasks = formData.tasks && formData?.tasks?.length > 0;
    const isTaskVerified = formData.taskVerified === true;
    const hasCertificate = formData.certificate;

    // Initialize type based on available fields in user.status
    let type = "";
    if (hasOfferLetter) {
      type = "offerletter";
    } else if (hasTasks) {
      type = "tasks";
    } else if (isTaskVerified) {
      type = "taskVerification";
    } else if (hasCertificate) {
      type = "certificate";
    }

    const makeRequest = async (userId, contentType, formData) => {
      try {
        const { data } = await axios.put(
          `${adminUrl}/user/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": contentType,
            },
          }
        );

        return { data };
      } catch (error) {
        console.log(error);
      }
    };
    switch (type) {
      case "tasks":
        if (formData?.tasks?.length > 0) {
          formData.type = "tasks";
          const response = makeRequest(userId, "application/json", formData);
          response.then(window.location.reload());
        } else {
          setError("root", { message: "Please provide tasks" });
        }

        break;

      case "taskVerification":
        if (formData.taskVerified === true) {
          formData.type = "taskVerification";
          const response = makeRequest(userId, "application/json", formData);
          response.then(window.location.reload());
        } else {
          setError("root", { message: "Please verify the task" });
        }
        break;

      case "certificate":
        formData.certificate = formData?.certificate[0];
        formData.type = "certificate";
        if (formData.certificate) {
          const response = makeRequest(userId, "multipart/form-data", formData);
          response.then(window.location.reload());
        } else {
          setError("root", { message: "Please select certificate" });
        }
        break;
      case "offerletter":
        // Handle offer letter update with startDate and submissionDeadline
        formData.type = "offerletter";
        formData.offerletter = formData.offerletter[0];
        if (
          formData.offerletter &&
          formData.startDate &&
          formData.submissionDeadline
        ) {
          const response = makeRequest(userId, "multipart/form-data", formData);
          response.then(window.location.reload());
        } else {
          setError("root", {
            message: "Please provide Offerletter start date and deadline",
          });
        }

        break;
      default:
        alert("something went wrong");
    }
  };

  return (
    <Container>
      <Box mt={40}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex wrap="wrap" justify="space-evenly">
            <Box style={{ display: "block" }} mb={20}>
              <Title order={3}>First Name:- {user?.name?.first}</Title>
              <Space h="xl"></Space>
              <Title order={3}>Last Name:- {user?.name?.last}</Title>
              <Space h="xl"></Space>
              <Title order={3}>Internship:- {user?.internshipDomain}</Title>
              <Space h="xl"></Space>
              <Title order={3}>Email:{user?.email}</Title>
              <Space h="xl"></Space>

              <Title order={3}>
                Internship:- {new Date(user?.createdAt).getDate()}-
                {new Date(user?.createdAt).getMonth() + 1}-
                {new Date(user?.createdAt).getFullYear()}
              </Title>
              <Link to={`${server}/resume/${user?.resume}`}>Resume</Link>
              <Space h="xl"></Space>
              <Button type="submit" w="100%">
                {isSubmitting ? <Loader /> : "Update"}
              </Button>
              <Space h="xl"></Space>
              <Button w="100%" onClick={() => navigate("/admin/dashboard")}>
                Go Back
              </Button>
            </Box>

            <Timeline active={active}>
              <Timeline.Item
                bullet={<IconBrandCodepen size={12} />}
                title="Offer Letter & Dates"
              >
                {active >= 1 ? (
                  <Text c="green">Done</Text>
                ) : (
                  <Text c="dimmed" size="sm">
                    <Code>Step:1</Code> ? "Upload offer letter Start date and
                    End date"
                    <Box>
                      <label>Offer letter</label>
                      <Input type="file" {...register("offerletter")} />
                    </Box>
                    {user?.status?.offerLetter && (
                      <Text fz="xs" c="green">
                        Check uploaded offer letter{" "}
                        <a
                          href={`${server}/offerletter/${user?.status?.offerLetter}`}
                        >
                          Check here
                        </a>
                      </Text>
                    )}
                    <Flex justify={"space-around"}>
                      <Box>
                        <label>Start Date</label>
                        <Input
                          {...register("startDate")}
                          label="Start date"
                          type="date"
                        />
                      </Box>
                      <Box>
                        <label>End Date</label>
                        <Input
                          {...register("submissionDeadline")}
                          label="End date"
                          type="date"
                        />
                      </Box>
                    </Flex>
                  </Text>
                )}
              </Timeline.Item>
              <Timeline.Item
                bullet={<IconFileCertificate size={12} />}
                title="Task Allocation"
              >
                {active >= 2 ? (
                  <Box>
                    <Code>Step:2</Code>
                    <Text size="sm" c="green">
                      Done
                    </Text>
                    <Text size="sm" c="blue" onClick={taskOpen}>
                      Check task
                    </Text>
                  </Box>
                ) : (
                  <Text c="dimmed" size="sm">
                    <Code>Step:2</Code>
                    "Upload tasks for the user"
                    <Text
                      onClick={open}
                      style={{ cursor: "pointer" }}
                      c="blue"
                      size="xs"
                      mt={4}
                    >
                      Check here
                    </Text>
                  </Text>
                )}
              </Timeline.Item>
              <Timeline.Item
                bullet={<IconClipboardCheck size={12} />}
                title="Verify Tasks"
              >
                {active >= 3 ? (
                  <Box>
                    <Code>Step:3</Code>{" "}
                    <Text size="sm" c="green">
                      Done
                    </Text>
                  </Box>
                ) : (
                  <Text c="dimmed" size="sm">
                    <Flex gap="sm">
                      <Code>Step:3</Code>{" "}
                      <Checkbox
                        {...register("taskVerified")}
                        label="Verify"
                      ></Checkbox>
                    </Flex>
                    "Verify the task"
                  </Text>
                )}
              </Timeline.Item>
              <Timeline.Item
                bullet={<IconCircleCheck size={12} />}
                title="Upload certificate"
              >
                {active >= 4 ? (
                  <Box>
                    <Code>Step:4</Code>
                    <Title c="green" order={4}>
                      Completed
                    </Title>
                  </Box>
                ) : (
                  <Text c="dimmed" size="sm">
                    <Code>Step:4</Code> {"  "}
                    <Box>
                      <label>Certificate</label>
                      <Input type="file" {...register("certificate")} />
                    </Box>
                    {active >= 4
                      ? "Upload certificate"
                      : "Change or Reupload certificate"}
                  </Text>
                )}
              </Timeline.Item>
              {errors?.root && (
                <Text fz="sm" c="red">
                  {errors?.root?.message}
                </Text>
              )}
            </Timeline>
          </Flex>
        </form>
      </Box>

      <Modal opened={opened} onClose={close} title="Give task">
        <TaskForm onSubmit={onSubmit} user={user} />
      </Modal>
      <Modal opened={checkTask} onClose={taskClose} title="Check work">
        <Box>
          {user?.status?.taskSubmission?.map((task) => {
            return (
              <Paper m="md" key={task.taskName} shadow="md">
                <Text c="red">{task.taskName}</Text>
                <hr />
                <a
                  href={task.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <Text size="sm">{task.linkedIn}</Text>
                <hr />
                <a href={task.github} target="_blank" rel="noopener noreferrer">
                  Github
                </a>
                <Text size="sm">{task.github}</Text>
                <hr />
                <a
                  href={task.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Link
                </a>
                <Text size="sm">{task.liveLink}</Text>
              </Paper>
            );
          })}
        </Box>
      </Modal>
    </Container>
  );
};

export default User;
