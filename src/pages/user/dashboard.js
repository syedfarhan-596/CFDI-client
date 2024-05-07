import { Box, Container, Space } from "@mantine/core";
import { Navbar } from "../../components/nav-bar/nav-bar";

import { useEffect, useState } from "react";

import axios from "axios";

import Cookie from "universal-cookie";

import { userUrl } from "../../server-url";

import Dashboard from "../../components/dashboard/dashboard";

import Progress from "../../components/dashboard/progress";

import Task from "../../components/dashboard/task";

import Certification from "../../components/dashboard/certification";

import Profile from "../../components/dashboard/profile";

import Password from "../../components/dashboard/password";

import { useNavigate } from "react-router-dom";

import { useMediaQuery } from "@mantine/hooks";

import { jwtDecode } from "jwt-decode";

const cookie = new Cookie();

const DashboardMain = () => {
  const navigate = useNavigate();
  const match = useMediaQuery("(max-width:710px)");
  const [active, setActive] = useState("Dashboard");
  const [user, setUser] = useState({});
  const conditionalRendering = () => {
    switch (active) {
      case "Dashboard": {
        return <Dashboard setActive={setActive} user={user} />;
      }
      case "Progress": {
        return <Progress setActive={setActive} user={user} />;
      }
      case "Your task": {
        return <Task user={user} />;
      }
      case "Certification": {
        return <Certification user={user} />;
      }
      case "Profile": {
        return <Profile setUser={setUser} user={user} />;
      }
      case "Password": {
        return <Password setUser={setUser} />;
      }
      default: {
        return <h1>Something went wrong</h1>;
      }
    }
  };

  useEffect(() => {
    if (cookie.get("userAuth") && cookie.get("name")) {
      try {
        jwtDecode(cookie.get("userAuth"), { header: true });
      } catch (error) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  });

  useEffect(() => {
    const GetAllDetails = async () => {
      try {
        const { data } = await axios.get(`${userUrl}/user`, {
          headers: { Authorization: `Bearer ${cookie.get("userAuth")}` },
        });
        setUser(data.user);
      } catch (error) {
        alert("something went wrong");
        navigate("/login");
      }
    };
    GetAllDetails();
  }, [navigate]);

  return (
    <Container>
      <Box style={match ? { display: "block" } : { display: "flex" }}>
        <Navbar
          match={match}
          name="name"
          active={active}
          setActive={setActive}
        />

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

export default DashboardMain;
