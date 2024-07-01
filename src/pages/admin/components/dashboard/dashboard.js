import {
  Container,
  Flex,
  Title,
  Tabs,
  Space,
  Pagination,
  Text,
  Center,
} from "@mantine/core";
import { adminUrl } from "../../../../server-url";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Cookie from "universal-cookie";
import UsersCard from "../../card/users";

const Dashboard = () => {
  const [usersData, setUsersData] = useState();
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState({
    offerLetter: { count: 0, users: [], page: 1 },
    taskPending: { count: 0, users: [], page: 1 },
    verification: { count: 0, users: [], page: 1 },
    certificate: { count: 0, users: [], page: 1 },
  });

  const cookie = new Cookie();
  const token = cookie.get("adminAuth");

  const fetchUsers = useCallback(
    async (status, page) => {
      try {
        const { data } = await axios.get(
          `${adminUrl}/users?internshipStatus=${status}&page=${page}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers((prev) => ({
          ...prev,
          [status]: { count: data.count, users: data.users, page },
        }));
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          [status]: error.response.data.message,
        }));
      }
    },
    [token]
  );

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(`${adminUrl}/count`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsersData(data);
      } catch (error) {
        setErrors({ count: error.response.data.message });
      }
    };
    fetchDetails();
  }, [token]);

  useEffect(() => {
    fetchUsers("offerLetter", users.offerLetter.page);
  }, [token, users.offerLetter.page, fetchUsers]);

  useEffect(() => {
    fetchUsers("taskPending", users.taskPending.page);
  }, [token, users.taskPending.page, fetchUsers]);

  useEffect(() => {
    fetchUsers("verification", users.verification.page);
  }, [token, users.verification.page, fetchUsers]);

  useEffect(() => {
    fetchUsers("certificate", users.certificate.page);
  }, [token, users.certificate.page, fetchUsers]);

  return (
    <Container>
      <Flex justify="space-between" wrap="wrap">
        <Title order={3}>Total Users Registered: {usersData?.total}</Title>
        <Title order={3}>Total Users Completed: {usersData?.completed}</Title>
        {errors.count && (
          <Text component="p" size="md" color="red">
            {errors.count}
          </Text>
        )}
      </Flex>
      <Space h="xl" />
      <Tabs defaultValue="offerLetter">
        <Tabs.List>
          <Tabs.Tab value="offerLetter">
            Offer Letter ({users.offerLetter.count})
          </Tabs.Tab>
          <Tabs.Tab value="taskPending">
            Task Allocation ({users.taskPending.count})
          </Tabs.Tab>
          <Tabs.Tab value="verification">
            Verification ({users.verification.count})
          </Tabs.Tab>
          <Tabs.Tab value="certificate">
            Certificate ({users.certificate.count})
          </Tabs.Tab>
        </Tabs.List>
        {Object.keys(users).map((status) => (
          <Tabs.Panel key={status} value={status}>
            {users[status].users.map((user) => (
              <UsersCard key={user._id} user={user} />
            ))}
            {errors[status] && (
              <Text component="p" size="md" color="red">
                {errors[status]}
              </Text>
            )}
            <Center>
              <Pagination
                value={users[status].page}
                onChange={(page) =>
                  setUsers((prev) => ({
                    ...prev,
                    [status]: { ...prev[status], page },
                  }))
                }
                total={Math.ceil(users[status].count / 10)}
              />
            </Center>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
};

export default Dashboard;
