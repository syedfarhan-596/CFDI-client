import { BackgroundImage, Group, Box, Title } from "@mantine/core";
import {
  IconMail,
  IconDashboard,
  IconLogout,
  IconUserCircle,
  IconUsers,
  IconChartArrowsVertical,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import LogoL from "../../../assets/logol.jpg";
import LogoD from "../../../assets/logod.jpg";
import classes from "./nav-bar.module.css";
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";

import BGIMGN from "../../../assets/background-night.jpg";
import BGIMGL from "../../../assets/background-sky.jpg";

const data = [
  { label: "Dashboard", icon: IconDashboard },
  { label: "Admins", icon: IconUserCircle },
  { label: "Users", icon: IconUsers },
  { label: "Statistics", icon: IconChartArrowsVertical },
  { label: "Mails", icon: IconMail },
];

export function AdminNavbar({ active, setActive, match, name }) {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  const cookie = new Cookie();
  const navigate = useNavigate();
  const links = data.map((item) => (
    <p
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </p>
  ));

  const handleLogout = (event) => {
    event.preventDefault();
    cookie.remove("adminAuth");
    cookie.remove(`adminName`);
    navigate("/admin/login");
  };

  return (
    <nav
      style={
        match
          ? { width: "100%", height: "auto" }
          : { width: "30%", height: "100dvh" }
      }
      className={classes.navbar}
    >
      <BackgroundImage
        style={
          match ? { height: "auto" } : { height: "100%", minHeight: "95dvh" }
        }
        src={computedColorScheme === "dark" ? BGIMGN : BGIMGL}
      >
        <Box p="md">
          <Group
            className={classes.header}
            justify={match ? "center" : "space-between"}
          >
            <img
              alt="Code For Digital India"
              src={computedColorScheme === "dark" ? LogoD : LogoL}
              width="100%"
              style={{ borderRadius: "50%", maxWidth: "200px" }}
            />
          </Group>
          <Title order={5}>{name?.toUpperCase()}</Title>
          <div
            style={
              match
                ? {
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }
                : { flex: 1 }
            }
          >
            {links}
          </div>

          <div className={classes.footer}>
            <p onClick={toggleColorScheme} className={classes.link}>
              {computedColorScheme === "dark" ? (
                <>
                  <IconSun className={classes.linkIcon} stroke={1.5} />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <IconMoon className={classes.linkIcon} stroke={1.5} />
                  <span>dark</span>
                </>
              )}
            </p>
            <p className={classes.link} onClick={handleLogout}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </p>
          </div>
        </Box>
      </BackgroundImage>
    </nav>
  );
}
