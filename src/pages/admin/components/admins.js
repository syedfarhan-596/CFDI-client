import {
  Box,
  Container,
  Flex,
  Paper,
  Title,
  Button,
  Modal,
  TextInput,
  Group,
  Notification,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { adminUrl } from "../../../server-url";
import Cookie from "universal-cookie";
import { IconTrash, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Admins = () => {
  const cookie = new Cookie();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [deleteAdmin, setDeleteAdmin] = useState({ id: "", secret: "" });
  const [opened, { open, close }] = useDisclosure(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  let token = cookie.get("adminAuth");

  const FetchAllAdmins = useCallback(async () => {
    try {
      const { data } = await axios.get(`${adminUrl}/admins?page=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(data.admins);
    } catch (error) {
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
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
      setNotification({ message: data.message, type: "success" });
      FetchAllAdmins();
      close();
    } catch (error) {
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Container>
        <Flex wrap="wrap" justify="center">
          {admins.map((item) => (
            <Paper
              key={item.id}
              p="lg"
              m="md"
              shadow="xl"
              radius="md"
              withBorder
              style={{ maxWidth: 300 }}
            >
              <Box>
                <Title order={4} align="center">
                  {item.name}
                </Title>
                <Title order={6} align="center" color="dimmed" mb="sm">
                  {item.email}
                </Title>
                <Group position="center">
                  <Button
                    color="red"
                    leftIcon={<IconTrash size={16} />}
                    onClick={() => handleAdminDelete(item)}
                  >
                    Delete
                  </Button>
                </Group>
              </Box>
            </Paper>
          ))}
        </Flex>
      </Container>
      <Modal opened={opened} onClose={close} title="Confirm Delete" centered>
        <Box p="md">
          <TextInput
            label="Secret Admin Key"
            placeholder="Enter your secret key"
            value={deleteAdmin.secret}
            onChange={(e) =>
              setDeleteAdmin({ ...deleteAdmin, secret: e.target.value })
            }
            mb="md"
          />
          <Group position="right">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button color="red" onClick={handleAdminDeleteRequest}>
              Confirm Delete
            </Button>
          </Group>
        </Box>
      </Modal>
      {notification.message && (
        <Notification
          icon={
            notification.type === "success" ? (
              <IconCheck size={18} />
            ) : (
              <IconAlertCircle size={18} />
            )
          }
          color={notification.type === "success" ? "green" : "red"}
          title={notification.type === "success" ? "Success" : "Error"}
          onClose={() => setNotification({ message: "", type: "" })}
          disallowClose
          sx={{ position: "fixed", top: 20, right: 20 }}
        >
          {notification.message}
        </Notification>
      )}
    </Box>
  );
};

export default Admins;
