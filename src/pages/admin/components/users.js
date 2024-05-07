import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Pagination,
  Select,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";
import Cookie from "universal-cookie";
import { useEffect, useState, useCallback } from "react";
import { adminUrl } from "../../../server-url";
import { useForm, Controller } from "react-hook-form";
import UsersCard from "../card/users";
const Users = () => {
  const { register, handleSubmit, control, getValues } = useForm();
  const cookie = new Cookie();
  let token = cookie.get("adminAuth");
  const [users, setUsers] = useState({ users: [], count: 0, page: 1 });
  const FetchUsers = useCallback(
    async (formData, page = 1) => {
      let query = "";
      if (formData?.internshipDomain) {
        query += `internshipDomain=${formData?.internshipDomain}&`;
      }
      if (formData?.internshipStatus) {
        query += `internshipStatus=${formData?.internshipStatus}&`;
      }
      if (formData?.email) {
        query += `email=${formData?.email}`;
      }

      try {
        const { data } = await axios.get(
          `${adminUrl}/users?page=${page}&${query}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers((prev) => {
          return {
            ...prev,
            users: data?.users,
            count: data?.count,
            page: page,
          };
        });
      } catch (error) {}
    },
    [token]
  );
  useEffect(() => {
    FetchUsers();
  }, [FetchUsers]);

  const onSubmit = (formData) => {
    FetchUsers(formData);
  };

  const handlePageChange = (e) => {
    let formData = {};
    const { email, internshipDomain, internshipStatus } = getValues();
    if (email) {
      formData = { ...formData, email };
    }
    if (internshipDomain) {
      formData = { ...formData, internshipDomain };
    }
    if (internshipStatus) {
      formData = { ...formData, internshipStatus };
    }
    setUsers((prev) => {
      return { ...prev, page: e };
    });
    FetchUsers(formData, e);
  };

  return (
    <Box>
      <Center>
        <Title order={2}>Search Users</Title>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="space-around" wrap="wrap">
          <Controller
            control={control}
            name="internshipDomain"
            render={({ field: { onChange } }) => (
              <Select
                label="Internship domain"
                onChange={onChange}
                placeholder="Pick internship domain "
                data={[
                  "Web development",
                  "Data Science",
                  "Andriod app development",
                  "Python developer",
                  "NodeJS developer",
                  "Graphics desining",
                ]}
              ></Select>
            )}
          />
          <Controller
            control={control}
            name="internshipStatus"
            render={({ field: { onChange } }) => (
              <Select
                label="Internship status"
                onChange={onChange}
                placeholder="Pick internship status "
                data={[
                  "offerletter",
                  "taskallocation",
                  "verification",
                  "certificate",
                ]}
              ></Select>
            )}
          />
        </Flex>

        <TextInput
          {...register("email")}
          label="Searc by email"
          placeholder="Enter yours email"
        />
        <Space h="md"></Space>
        <Center>
          <Button type="submit">Search</Button>
        </Center>
      </form>
      <Divider
        my="xs"
        label={`Users (${users?.count})`}
        labelPosition="center"
      />
      <Box>
        {users?.users?.map((user) => {
          return <UsersCard key={user._id} user={user} />;
        })}
      </Box>
      <Center>
        <Pagination
          onChange={handlePageChange}
          value={users?.page}
          total={Math.ceil(users?.count / 10)}
        ></Pagination>
      </Center>
    </Box>
  );
};

export default Users;
