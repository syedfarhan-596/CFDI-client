import {
  Box,
  Container,
  Flex,
  Paper,
  Title,
  Button,
  Modal,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { adminUrl } from "../../../server-url";
import Cookie from "universal-cookie";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Admins = () => {
  const cookie = new Cookie();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [deleteAdmin, setDeleteAdmin] = useState({ id: "", secret: "" });
  const [opened, { open, close }] = useDisclosure(false);

  let token = cookie.get("adminAuth");

  const FetchAllAdmins = useCallback(async () => {
    try {
      const { data } = await axios.get(`${adminUrl}/admins?page=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(data.admins);
    } catch (error) {
      alert(error.response.data.message);
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    FetchAllAdmins();
  }, [FetchAllAdmins]);

  const handleAdminDelete = (admin) => {
    open();
    setDeleteAdmin({ ...deleteAdmin, id: admin._id });
  };

  const handleAdminDeleteRequest = async () => {
    try {
      const { data } = await axios.delete(
        `${adminUrl}/delete/admin/${deleteAdmin.id}/${deleteAdmin.secret}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Box>
      <Container>
        <Flex wrap="wrap">
          {admins.map((item, key) => {
            return (
              <Paper p={10} m={10} shadow="xl">
                <Box lh={4} key={item.id}>
                  <Title order={4}>{item.name} </Title>
                  <Title order={6}>{item.email}</Title>
                  <Button
                    onClick={() => handleAdminDelete(item)}
                    leftSection={<IconTrash size={14} />}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            );
          })}
        </Flex>
      </Container>
      <Modal opened={opened} onClose={close} title="Delete" centered>
        <Box p="xl">
          <TextInput
            label="Secret Admin Key"
            placeholder="Enter your secret key"
            onChange={(e) =>
              setDeleteAdmin({ ...deleteAdmin, secret: e.target.value })
            }
          ></TextInput>
          <Button onClick={handleAdminDeleteRequest}>Confirm Delete</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Admins;
