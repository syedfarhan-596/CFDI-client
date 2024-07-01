import { useParams, useNavigate } from "react-router-dom";
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
  Title,
  Button,
  Flex,
  Input,
  Checkbox,
  Paper,
  Modal,
  Notification,
  Anchor,
} from "@mantine/core";

import { useForm } from "react-hook-form";
import Cookie from "universal-cookie";
import axios from "axios";
import { adminUrl } from "../../../server-url";

const User = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const cookie = new Cookie();
  const token = cookie.get("adminAuth");
  const [user, setUser] = useState();
  const [opened, { open, close }] = useDisclosure(false);
  const [checkTask, { open: taskOpen, close: taskClose }] =
    useDisclosure(false);
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
    type: "info", // info, success, warning, error
  });

  const showNotification = useCallback(
    (message, type = "info") => {
      setNotification({ message, visible: true, type });
      setTimeout(() => {
        setNotification({ ...notification, visible: false });
      }, 5000); // Auto-hide after 5 seconds
    },
    [notification]
  );
  const FetchUser = useCallback(async () => {
    try {
      const { data } = await axios(`${adminUrl}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user);
    } catch (error) {
      showNotification(error.response.data.message, "error");
    }
  }, [token, userId, showNotification]);

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

        showNotification(data.message, "success");
        setUser(data.user);
      } catch (error) {
        showNotification(error.response.data.message, "error");
      }
    };

    switch (type) {
      case "tasks":
        if (formData?.tasks?.length > 0) {
          formData.type = "tasks";
          makeRequest(userId, "application/json", formData).then(() => close());
        } else {
          setError("root", { message: "Please provide tasks" });
        }
        break;

      case "taskVerification":
        if (formData.taskVerified === true) {
          formData.type = "taskVerification";
          makeRequest(userId, "application/json", formData);
        } else {
          setError("root", { message: "Please verify the task" });
        }
        break;

      case "certificate":
        formData.certificate = formData?.certificate[0];
        formData.type = "certificate";
        if (formData.certificate) {
          makeRequest(userId, "multipart/form-data", formData);
        } else {
          setError("root", { message: "Please select certificate" });
        }
        break;

      case "offerletter":
        formData.type = "offerletter";
        formData.offerletter = formData.offerletter[0];
        if (
          formData.offerletter &&
          formData.startDate &&
          formData.submissionDeadline
        ) {
          await makeRequest(userId, "multipart/form-data", formData);
        } else {
          setError("root", {
            message: "Please provide Offerletter start date and deadline",
          });
        }
        break;

      default:
        showNotification("Something went wrong", "error");
    }
  };

  const handleUserDelete = async (userId) => {
    if (window.confirm("Sure want to delete?")) {
      try {
        await axios.delete(`${adminUrl}/delete/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("user deleted");
        navigate("/admin/dashboard");
      } catch (error) {
        setNotification(error.response.data.message, "error");
      }
    }
  };

  const handleDelete = async (type) => {
    if (window.confirm("Sure want to delete?")) {
      try {
        const { data } = await axios.delete(
          `${adminUrl}/delete/${userId}/${type}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(data?.user);
        showNotification(`Deleted users ${type}`, "success");
      } catch (error) {
        showNotification(error.response.data.message, "error");
      }
    }
  };

  return (
    <Container>
      <Box mt={40}>
        {notification.visible && (
          <Notification
            title={notification.type === "error" ? "Error" : "Notification"}
            c={notification.type === "error" ? "red" : "green"}
            onClose={() => setNotification({ ...notification, visible: false })}
            shadow="sm"
            style={{ marginBottom: "20px" }}
          >
            {notification.message}
          </Notification>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex wrap="wrap" justify="space-evenly">
            <Box style={{ display: "block" }} mb={20}>
              <Title m="md" order={3}>
                First Name: {user?.name?.first}
              </Title>
              <Title m="md" order={3}>
                Last Name: {user?.name?.last}
              </Title>
              <Title m="md" order={3}>
                Internship: {user?.internshipDomain}
              </Title>
              <Title m="md" order={3}>
                Email: {user?.email}
              </Title>
              <Title m="md" order={3}>
                Internship Date:{" "}
                {new Date(user?.createdAt).toLocaleDateString()}
              </Title>

              <Anchor href={user?.resume} target="_blank" rel="noreferrer">
                <Button fullWidth m="md">
                  DownLoad Resume
                </Button>
              </Anchor>
              <br />
              <Button m="md" onClick={taskOpen} fullWidth>
                Check tasks
              </Button>

              <Button
                m="md"
                fullWidth
                onClick={() => navigate("/admin/dashboard")}
              >
                Go Back
              </Button>

              <Button m="md" type="submit" loading={isSubmitting} fullWidth>
                Update
              </Button>
              <Button m="md" fullWidth onClick={() => handleUserDelete(userId)}>
                Delete User
              </Button>
            </Box>

            <Timeline active={active}>
              <Timeline.Item
                bullet={<IconBrandCodepen size={12} />}
                title="Offer Letter & Dates"
              >
                {active >= 1 ? (
                  <div>
                    <Text c="green" fz="small">
                      Completed
                    </Text>
                    <Button onClick={() => handleDelete("offer")}>
                      Delete
                    </Button>
                  </div>
                ) : (
                  <Box>
                    <Text color="dimmed">
                      Step 1: Upload offer letter, start date, and end date
                    </Text>
                    <Input type="file" {...register("offerletter")} />

                    <Flex justify="space-between">
                      <Input
                        {...register("startDate")}
                        label="Start Date"
                        type="date"
                      />
                      <Input
                        {...register("submissionDeadline")}
                        label="End Date"
                        type="date"
                      />
                    </Flex>
                  </Box>
                )}
              </Timeline.Item>

              <Timeline.Item
                bullet={<IconFileCertificate size={12} />}
                title="Task Allocation"
              >
                {active >= 2 ? (
                  <Box>
                    <Text c="green" fz="sm">
                      Completed
                    </Text>
                    <Button onClick={() => handleDelete("task")}>Delete</Button>
                  </Box>
                ) : (
                  <Box>
                    {active >= 1 ? (
                      <Box>
                        <Text color="dimmed">
                          Step 2: Upload tasks for the user
                          <Text
                            onClick={open}
                            color="blue"
                            style={{ cursor: "pointer" }}
                          >
                            Check here
                          </Text>
                        </Text>
                      </Box>
                    ) : (
                      <Text c="dimmed">
                        Offer letter and dates has be specified
                      </Text>
                    )}
                  </Box>
                )}
              </Timeline.Item>

              <Timeline.Item
                bullet={<IconClipboardCheck size={12} />}
                title="Verify Tasks"
              >
                {active >= 3 ? (
                  <Box>
                    <Text c="green" fz="small">
                      Completed
                    </Text>
                    <Button onClick={() => handleDelete("verification")}>
                      Delete
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    {active >= 2 ? (
                      <Box>
                        <Checkbox
                          {...register("taskVerified")}
                          label="Verify"
                        />
                        <Text color="dimmed">Verify the task</Text>
                      </Box>
                    ) : (
                      <Text c="dimmed">Submit Task Before Verification</Text>
                    )}
                  </Box>
                )}
              </Timeline.Item>

              <Timeline.Item
                bullet={<IconCircleCheck size={12} />}
                title="Upload Certificate"
              >
                {active >= 4 ? (
                  <Box>
                    <Text c="green" fz="sm">
                      Completed
                    </Text>
                    <Button onClick={() => handleDelete("certificate")}>
                      Delete
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    {active >= 3 ? (
                      <Box>
                        <Input type="file" {...register("certificate")} />
                        <Text c="dimmed">Upload certificate</Text>
                      </Box>
                    ) : (
                      <Box>
                        <Text c="dimmed">
                          Verify the Task Before giving Certificate
                        </Text>
                      </Box>
                    )}
                  </Box>
                )}
              </Timeline.Item>

              {errors?.root && <Text color="red">{errors?.root?.message}</Text>}
            </Timeline>
          </Flex>
        </form>
      </Box>

      <Modal opened={opened} onClose={close} title="Give Task">
        <TaskForm onSubmit={onSubmit} />
      </Modal>

      <Modal opened={checkTask} onClose={taskClose} title="Check Work">
        <Box>
          {user?.status?.taskSubmission?.map((task) => (
            <Paper
              key={task.taskName}
              shadow="md"
              style={{ marginBottom: "10px" }}
            >
              <Text color="red">{task.taskName}</Text>
              <a href={task.linkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <Text size="sm">{task.linkedIn}</Text>
              <a href={task.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <Text size="sm">{task.github}</Text>
              <a href={task.liveLink} target="_blank" rel="noopener noreferrer">
                Live Link
              </a>
              <Text size="sm">{task.liveLink}</Text>
            </Paper>
          ))}
        </Box>
        <Button onClick={() => handleDelete("submittedtask")}>
          Delete Submitted Task
        </Button>
      </Modal>
    </Container>
  );
};

export default User;
