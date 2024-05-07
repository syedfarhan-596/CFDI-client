import {
  Box,
  TextInput,
  Title,
  Flex,
  Text,
  Button,
  Center,
  Loader,
} from "@mantine/core";

import { useForm } from "react-hook-form";
import { userUrl } from "../../server-url";
import Cookie from "universal-cookie";
import axios from "axios";

const TaskSubmit = ({ tasks, user }) => {
  const cookie = new Cookie();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

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
      window.location.reload();
    } catch (error) {
      setError("root", { message: error.response.data.message });
    }
  };

  if (
    new Date(user?.status?.submissionDeadline).getTime() < new Date().getTime()
  ) {
    return (
      <Title order={5}>
        Deadline Reached. Contact us if have not submitted your task for
        extension
      </Title>
    );
  }

  if (user?.status?.taskSubmission?.length) {
    return <Title order={5}> Already submitted</Title>;
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
              <Text component="p" size="sm" c="red">
                {errors.root.message}
              </Text>
            )}
            <Center>
              <Button type="submit">
                {isSubmitting ? <Loader /> : "Submit"}
              </Button>
            </Center>
          </form>
        </Box>
      ) : (
        <Title order={4}>
          Task is not given to you, Please wait till you receive task
        </Title>
      )}
    </Box>
  );
};

export default TaskSubmit;
