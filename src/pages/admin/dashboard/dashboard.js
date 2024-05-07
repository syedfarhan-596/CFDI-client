import { Box, Container, Space } from "@mantine/core";
import { AdminNavbar } from "../nav-bar/nav-bar";

import { useEffect, useState } from "react";

import axios from "axios";

import Cookie from "universal-cookie";

import { adminUrl } from "../../../server-url";

import { useNavigate } from "react-router-dom";

import { useMediaQuery } from "@mantine/hooks";

import { jwtDecode } from "jwt-decode";

import Dashboard from "../components/dashboard/dashboard";
import Admins from "../components/admins";
import Users from "../components/users";
import Statistics from "../components/statictics";

const cookie = new Cookie();

const AdminDashboardMain = () => {
  const navigate = useNavigate();
  const match = useMediaQuery("(max-width:710px)");
  const [active, setActive] = useState("Dashboard");
  const [admin, setAdmin] = useState({});
  const conditionalRendering = () => {
    switch (active) {
      case "Dashboard": {
        return <Dashboard />;
      }
      case "Admins": {
        return <Admins />;
      }
      case "Users": {
        return <Users />;
      }
      case "Statistics": {
        return <Statistics />;
      }
      case "Mails": {
        return <h1>Not yet running</h1>;
      }

      default: {
        return <h1>Something went wrong</h1>;
      }
    }
  };

  useEffect(() => {
    if (cookie.get("adminAuth") && cookie.get("adminName")) {
      try {
        jwtDecode(cookie.get("adminAuth"), { header: true });
      } catch (error) {
        navigate("/admin/login");
      }
    } else {
      navigate("/admin/login");
    }
  });

  useEffect(() => {
    const GetAllDetails = async () => {
      try {
        const { data } = await axios.get(`${adminUrl}/admin`, {
          headers: { Authorization: `Bearer ${cookie.get("adminAuth")}` },
        });
        setAdmin(data.admin);
      } catch (error) {
        alert("something went wrong");
        navigate("/admin/login");
      }
    };
    GetAllDetails();
  }, [navigate]);

  return (
    <Container>
      <Box style={match ? { display: "block" } : { display: "flex" }}>
        <AdminNavbar
          name={admin?.name}
          match={match}
          active={active}
          setActive={setActive}
        />

        <Space h="md"></Space>

        <Space h="md"></Space>
        <Box
          style={{
            boxSizing: "border-box",
            padding: "2%",
            width: "100%",
          }}
        >
          {conditionalRendering()}
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboardMain;
