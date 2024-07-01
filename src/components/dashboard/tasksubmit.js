import {
  Box,
  TextInput,
  Title,
  Flex,
  Text,
  Button,
  Center,
  Loader,
  Notification,
} from "@mantine/core";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { userUrl } from "../../server-url";
import Cookie from "universal-cookie";
import axios from "axios";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

const TaskSubmit = ({ tasks, user }) => {
  const cookie = new Cookie();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const transformFormData = (formData) => {
    const tasksArray = Object.values(formData.tasks);
    return tasksArray;
  };

  const onSubmit = async (formData) => {
    const transformData = transformFormData(formData);
    try {
      await axios.put(
        `${userUrl}/update`,
        { updateUser: transformData },
        { headers: { Authorization: `Bearer ${cookie.get("userAuth")}` } }
      );
      setNotification({
        message: "Tasks submitted successfully",
        type: "success",
      });
      reset();
    } catch (error) {
      setError("root", { message: error.response.data.message });
      setNotification({ message: error.response.data.message, type: "error" });
    }
  };

  if (
    new Date(user?.status?.submissionDeadline).getTime() < new Date().getTime()
  ) {
    return (
      <Box>
        <Notification
          type="error"
          title="Deadline Reached"
          onClose={() => setNotification({ message: "", type: "" })}
          disallowClose
          sx={{ position: "fixed", top: 20, right: 20 }}
          icon={<IconAlertCircle size={18} />}
        >
          Contact us if you have not submitted your task for extension.
        </Notification>
        <Title order={5}>
          Deadline Reached. Contact us if have not submitted your task for
          extension
        </Title>
      </Box>
    );
  }

  if (user?.status?.taskSubmission?.length) {
    return (
      <Box>
        <Notification
          type="info"
          title="Already Submitted"
          onClose={() => setNotification({ message: "", type: "" })}
          disallowClose
          sx={{ position: "fixed", top: 20, right: 20 }}
          icon={<IconCheck size={18} />}
        >
          You have already submitted your tasks.
        </Notification>
      </Box>
    );
  }

  return (
    <Box>
      {tasks ? (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            {tasks.map((task, index) => {
              const taskIndex = `task${index}`; // Unique identifier for each task
              return (
                <Flex key={index} gap="md">
                  <Text>{index + 1}</Text>
                  <Flex gap="md" wrap="wrap">
                    <TextInput
                      label="Task name"
                      defaultValue={task?.taskName}
                      name={`tasks[${taskIndex}].taskName`}
                      {...register(`tasks[${taskIndex}].taskName`)}
                      required
                    />
                    <TextInput
                      required
                      defaultValue={task?.linkedIn}
                      name={`tasks[${taskIndex}].linkedIn`}
                      label="LinkedIn"
                      {...register(`[tasks[${taskIndex}].linkedIn`)}
                    />
                    <TextInput
                      defaultValue={task?.github}
                      name={`tasks[${taskIndex}].github`}
                      label="GitHub"
                      {...register(`tasks[${taskIndex}].github`)}
                    />
                    <TextInput
                      defaultValue={task?.liveLink}
                      name={`tasks[${taskIndex}].liveLink`}
                      label="LiveLink"
                      {...register(`tasks[${taskIndex}].liveLink`)}
                    />
                  </Flex>
                </Flex>
              );
            })}
            {errors.root && (
              <Text component="p" size="sm" color="red">
                {errors.root.message}
              </Text>
            )}
            <Center>
              <Button type="submit">
                {isSubmitting ? <Loader size="sm" color="white" /> : "Submit"}
              </Button>
            </Center>
          </form>
        </Box>
      ) : (
        <Title order={4}>
          Task is not assigned yet. Please wait until you receive the task.
        </Title>
      )}
      {notification.message && (
        <Notification
          type={notification.type === "success" ? "success" : "error"}
          onClose={() => setNotification({ message: "", type: "" })}
          disallowClose
          sx={{ position: "fixed", top: 20, right: 20 }}
          icon={
            notification.type === "success" ? (
              <IconCheck size={18} />
            ) : (
              <IconAlertCircle size={18} />
            )
          }
        >
          {notification.message}
        </Notification>
      )}
    </Box>
  );
};

export default TaskSubmit;
