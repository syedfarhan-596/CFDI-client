import { Button, Box, Flex, Paper, Space, Text } from "@mantine/core";
import { monthNames } from "../../../monthsNames";
import { useNavigate } from "react-router-dom";

const UsersCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Paper shadow="md" m="md" p="md">
      <Flex wrap="wrap" justify="space-between">
        <Text fz="xs">
          created on:- {new Date(user?.createdAt).getDate()}-
          {monthNames[new Date(user?.createdAt).getMonth() - 1]}-
          {new Date(user?.createdAt).getFullYear()}
        </Text>
        <Text fz="xs">
          Start:-
          {user?.status?.startDate ? (
            <>
              {new Date(user?.status?.startDate).getDate()} -
              {monthNames[new Date(user?.status?.startDate).getMonth() - 1]} -
              {new Date(user?.status?.startDate).getFullYear()}
            </>
          ) : (
            "Not Selected"
          )}
          <Space h="sm"></Space>
          End:-
          {user?.status?.submissionDeadline ? (
            <>
              {new Date(user?.status?.submissionDeadline).getDate()} -
              {
                monthNames[
                  new Date(user?.status?.submissionDeadline).getMonth() - 1
                ]
              }{" "}
              -{new Date(user?.status?.submissionDeadline).getFullYear()}
            </>
          ) : (
            "Not Selected"
          )}
        </Text>
      </Flex>
      <Flex wrap="wrap" justify="space-between">
        <Text fz="xs">Internship:- {user?.internshipDomain}</Text>
        <Text fz="xs">Number:- {user?.number}</Text>
      </Flex>
      <Flex justify="space-between" wrap="wrap">
        <Box>
          <Text>
            Name:- {user?.name?.first} {user?.name?.last}
          </Text>

          <Text>Email:- {user?.email}</Text>
        </Box>
        <Button onClick={() => navigate(`/admin/user/${user._id}`)}>
          Update State
        </Button>
      </Flex>
    </Paper>
  );
};

export default UsersCard;
