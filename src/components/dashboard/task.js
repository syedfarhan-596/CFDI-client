import {
  Container,
  Title,
  Box,
  Paper,
  Text,
  ThemeIcon,
  Code,
  Flex,
  Button,
  Modal,
  Space,
} from "@mantine/core";

import { IconColorSwatch } from "@tabler/icons-react";

import TaskSubmit from "./tasksubmit";

import { useDisclosure } from "@mantine/hooks";

const Task = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <Flex justify={"space-between"}>
        <Title order={3}>Your task</Title>
        <Button onClick={open}>Submit</Button>
      </Flex>
      <Space h="xl"></Space>
      <Flex wrap="wrap">
        {user?.status?.tasks?.length ? (
          user.status.tasks.map((task, index) => {
            return (
              <Box key={index}>
                <Paper shadow="xl" m={10} withBorder radius="md" p={10}>
                  <ThemeIcon
                    size="xl"
                    radius="md"
                    variant="gradient"
                    gradient={{ deg: 0, from: "pink", to: "orange" }}
                  >
                    <IconColorSwatch
                      style={{ width: "rem(28)", height: "rem(28)" }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                  <Text size="xl" fw={500} mt="md">
                    Task:{index + 1} {task.taskName}
                  </Text>
                  {task?.keyPoints?.length && <Code>Key Points</Code>}
                  {task.keyPoints?.map((point, index) => {
                    return (
                      <ul key={index}>
                        <li mt="sm">{point}</li>
                      </ul>
                    );
                  })}
                </Paper>
              </Box>
            );
          })
        ) : (
          <Title ta="center" order={4}>
            Our team is working on it <br></br>You will be given task soon
          </Title>
        )}
      </Flex>
      <Modal size="xl" opened={opened} onClose={close} title="Submit task">
        <TaskSubmit user={user} tasks={user?.status?.tasks} />
      </Modal>
    </Container>
  );
};

export default Task;
