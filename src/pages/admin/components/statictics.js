import { PieChart } from "@mantine/charts";
import {
  Box,
  Space,
  Title,
  Paper,
  Text,
  Loader,
  Notification,
} from "@mantine/core";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookie from "universal-cookie";
import { adminUrl } from "../../../server-url";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

const colors = [
  "#3498db",
  "#e74c3c",
  "#2ecc71",
  "#e67e22",
  "#9b59b6",
  "#f1c40f",
];

const Statistics = () => {
  const [statData, setStatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const cookie = new Cookie();
  let token = cookie.get("adminAuth");

  const FetchStatData = useCallback(async () => {
    try {
      const { data } = await axios(`${adminUrl}/users/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataWithColors = data?.data?.map((item, index) => ({
        ...item,
        color: colors[index % colors.length],
      }));
      setStatData(dataWithColors);
      setLoading(false);
    } catch (error) {
      setNotification({ message: error.response.data.message, type: "error" });
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    FetchStatData();
  }, [FetchStatData]);

  return (
    <Box>
      <Paper p="xl" shadow="md" radius="md" withBorder>
        <Title order={3} align="center">
          Users Statistics
        </Title>
        <Text align="center" color="dimmed" size="sm" mb="md">
          Overview of user distribution across various stages
        </Text>
        <Space h="md" />
        {loading ? (
          <Loader size="lg" variant="dots" mx="auto" />
        ) : (
          <PieChart size="300" data={statData} withTooltip mx="auto" />
        )}
      </Paper>
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

export default Statistics;
