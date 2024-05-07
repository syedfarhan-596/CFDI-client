import { Box, Title, Container, Code, Space, Flex } from "@mantine/core";

import { motivationalQuotes } from "./quotes";

import { monthNames } from "../../monthsNames";

const linkStyle = {
  boxSizing: "border-box",
  cursor: "pointer",
};

const Dashboard = ({ user, setActive }) => {
  const generateRandom = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);

    return motivationalQuotes[randomIndex];
  };

  return (
    <Container>
      <Box>
        <Title order={3}>
          {user?.name?.first?.toUpperCase()} {user?.name?.last?.toUpperCase()}
        </Title>

        <Code>Email:{user?.email}</Code>
        <br></br>
        <Code>PhNo:{user?.number}</Code>
        <br></br>
        <Code>Internship:{user?.internshipDomain}</Code>
      </Box>
      <Space h="xl"></Space>
      <Box ff="mono">
        <Title order={5}>
          {user?.status?.startDate
            ? `Start Date: ${new Date(user?.status?.startDate).getDate()}
          ${
            monthNames[new Date(user?.status?.startDate).getMonth()]
          } ${new Date(user?.status?.startDate).getFullYear()}`
            : "Start Date: We will update you soon"}
        </Title>
        <Space h="xl"></Space>
        <Title order={5}>
          {user?.status?.submissionDeadline
            ? `Submission Deadline: ${new Date(
                user?.status?.submissionDeadline
              ).getDate()}
          ${
            monthNames[new Date(user?.status?.submissionDeadline).getMonth()]
          } ${new Date(user?.status?.submissionDeadline).getFullYear()}`
            : "Submission Date: We will update you soon"}
        </Title>
      </Box>
      <Space h="xl"></Space>
      <Flex gap="xl" justify="flex-start" wrap="wrap">
        <Code onClick={() => setActive("Profile")} p={5} style={linkStyle}>
          Change Name
        </Code>
        <Code onClick={() => setActive("Password")} p={5} style={linkStyle}>
          Change Password
        </Code>
        <Code onClick={() => setActive("Progress")} p={5} style={linkStyle}>
          Check Progress
        </Code>
        <Code p={5} style={linkStyle}>
          About us
        </Code>
        <Code p={5} style={linkStyle}>
          Benifites for you
        </Code>
      </Flex>
      <Space h="xl"></Space>
      <Box ta="center">
        <Title order={2}>Quote of the day</Title>
        <Space h="xl"></Space>
        <Title order={4}>{generateRandom()}</Title>
      </Box>
    </Container>
  );
};

export default Dashboard;
