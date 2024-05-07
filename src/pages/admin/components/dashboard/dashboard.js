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

import { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import UsersCard from "../../card/users";

const Dashboard = () => {
  const [usersData, setUsersData] = useState();
  const [errors, setErrors] = useState({});
  const [offerLetter, setOfferLetter] = useState({
    count: 0,
    users: [],
    page: 1,
  });
  const [taskPending, setTaskPending] = useState({
    count: 0,
    users: [],
    page: 1,
  });
  const [verification, setVerfication] = useState({
    count: 0,
    users: [],
    page: 1,
  });
  const [certificate, setCertificate] = useState({
    count: 0,
    users: [],
    page: 1,
  });

  const cookie = new Cookie();
  let token = cookie.get("adminAuth");
  useEffect(() => {
    const FetchDetails = async () => {
      try {
        const { data } = await axios.get(`${adminUrl}/count`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsersData(data);
      } catch (error) {
        setErrors({ count: error.response.data.message });
      }
    };
    FetchDetails();
  }, [token]);

  useEffect(() => {
    const FetchOfferLetter = async () => {
      try {
        const { data } = await axios.get(
          `${adminUrl}/users?internshipStatus=offerletter&page=${offerLetter?.page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOfferLetter((prev) => {
          return { ...prev, count: data.count, users: data.users };
        });
      } catch (error) {
        setErrors({ offerLetter: error.response.data.message });
      }
    };

    FetchOfferLetter();
  }, [token, offerLetter?.page]);
  useEffect(() => {
    const FetchTask = async () => {
      try {
        const { data } = await axios.get(
          `${adminUrl}/users?internshipStatus=taskallocation&page=${taskPending?.page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTaskPending((prev) => {
          return { ...prev, count: data.count, users: data.users };
        });
      } catch (error) {
        setErrors({ taskPending: error.response.data.message });
      }
    };

    FetchTask();
  }, [token, taskPending?.page]);

  useEffect(() => {
    const FetchVerification = async () => {
      try {
        const { data } = await axios.get(
          `${adminUrl}/users?internshipStatus=verification&page=${verification?.page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setVerfication((prev) => {
          return { ...prev, count: data.count, users: data.users };
        });
      } catch (error) {
        setErrors({ verification: error.response.data.message });
      }
    };

    FetchVerification();
  }, [token, verification?.page]);

  useEffect(() => {
    const FetchCertificate = async () => {
      try {
        const { data } = await axios.get(
          `${adminUrl}/users?internshipStatus=certificate&page=${certificate?.page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCertificate((prev) => {
          return { ...prev, count: data.count, users: data.users };
        });
      } catch (error) {
        setErrors({ certificate: error.response.data.message });
      }
    };

    FetchCertificate();
  }, [token, certificate?.page]);
  return (
    <Container>
      <>
        <Flex justify="space-between" wrap="wrap">
          <Title order={3}>Total Users Registered:- {usersData?.total}</Title>
          <Title order={3}>
            Total Users Completed:- {usersData?.completed}
          </Title>
          {errors.count && (
            <Text component="p" size="md" c="red">
              {" "}
              {errors.count}
            </Text>
          )}
        </Flex>
      </>
      <Space h="xl"></Space>
      <>
        <Tabs defaultValue="stage1">
          <Tabs.List>
            <Tabs.Tab value="stage1">
              Offer letter({offerLetter?.count})
            </Tabs.Tab>
            <Tabs.Tab value="stage2">
              Task Allocation({taskPending?.count})
            </Tabs.Tab>
            <Tabs.Tab value="stage3">
              Verification({verification?.count})
            </Tabs.Tab>
            <Tabs.Tab value="stage4">
              Certificate({certificate?.count})
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="stage1">
            {offerLetter?.users?.map((user) => {
              return <UsersCard key={user._id} user={user} />;
            })}
            {errors.offerLetter && (
              <Text component="p" size="md" c="red">
                {errors.offerLetter}
              </Text>
            )}
            <Center>
              <Pagination
                value={offerLetter?.page}
                onChange={(e) =>
                  setOfferLetter((prev) => {
                    return { ...prev, page: e };
                  })
                }
                total={Math.ceil(offerLetter?.count / 10)}
              ></Pagination>
            </Center>
          </Tabs.Panel>
          <Tabs.Panel value="stage2">
            {taskPending?.users?.map((user) => {
              return <UsersCard key={user._id} user={user} />;
            })}
            {errors.taskPending && (
              <Text component="p" size="md" c="red">
                {errors.taskPending}
              </Text>
            )}
            <Center>
              <Pagination
                value={taskPending?.page}
                onChange={(e) =>
                  setTaskPending((prev) => {
                    return { ...prev, page: e };
                  })
                }
                total={Math.ceil(taskPending?.count / 10)}
              ></Pagination>
            </Center>
          </Tabs.Panel>
          <Tabs.Panel value="stage3">
            {verification?.users?.map((user) => {
              return <UsersCard key={user._id} user={user} />;
            })}
            {errors.verification && (
              <Text component="p" size="md" c="red">
                {errors.verification}
              </Text>
            )}
            <Center>
              <Pagination
                value={verification?.page}
                onChange={(e) =>
                  setVerfication((prev) => {
                    return { ...prev, page: e };
                  })
                }
                total={Math.ceil(verification?.count / 10)}
              ></Pagination>
            </Center>
          </Tabs.Panel>
          <Tabs.Panel value="stage4">
            {certificate?.users?.map((user) => {
              return <UsersCard key={user._id} user={user} />;
            })}
            {errors.certificate && (
              <Text component="p" size="md" c="red">
                {errors.certificate}
              </Text>
            )}
            <Center>
              <Pagination
                value={certificate?.page}
                onChange={(e) =>
                  setCertificate((prev) => {
                    return { ...prev, page: e };
                  })
                }
                total={Math.ceil(certificate?.count / 10)}
              ></Pagination>
            </Center>
          </Tabs.Panel>
        </Tabs>
      </>
    </Container>
  );
};

export default Dashboard;
