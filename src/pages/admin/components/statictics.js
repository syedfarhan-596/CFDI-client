import { PieChart } from "@mantine/charts";
import { Box, Space, Title } from "@mantine/core";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookie from "universal-cookie";
import { adminUrl } from "../../../server-url";

const colors = [
  "#3498db",
  "#e74c3c",
  "#2ecc71",
  "#e67e22",
  "#9b59b6",
  "#f1c40f",
];

const Statistics = () => {
  const [statData, setStateData] = useState([]);
  const cookie = new Cookie();
  let token = cookie.get("adminAuth");
  const FetchStatDate = useCallback(async () => {
    try {
      const { data } = await axios(`${adminUrl}/users/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataWithColors = data?.data?.map((item, index) => {
        return { ...item, color: colors[index] };
      });
      setStateData(dataWithColors);
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [token]);

  useEffect(() => {
    FetchStatDate();
  }, [FetchStatDate]);

  return (
    <Box>
      <Title order={3} ta="center">
        Users Statistics
      </Title>
      <Space h="xl"></Space>
      <PieChart size="300" data={statData} withTooltip mx="auto"></PieChart>
    </Box>
  );
};

export default Statistics;
