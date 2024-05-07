import { BackgroundImage, Group, Box } from "@mantine/core";
import {
  IconDashboard,
  IconCertificate,
  IconLogout,
  IconProgress,
  IconUserCircle,
  IconBrandSamsungpass,
  IconChecklist,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import Logol from "../../assets/logol.jpg";
import LogoD from "../../assets/logod.jpg";
import classes from "./nav-bar.module.css";

import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";

import BGIMGN from "../../assets/background-night.jpg";
import BGIMGL from "../../assets/background-sky.jpg";

import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

const data = [
  { label: "Dashboard", icon: IconDashboard },
  { label: "Your task", icon: IconChecklist },
  { label: "Progress", icon: IconProgress },
  { label: "Certification", icon: IconCertificate },
  { label: "Profile", icon: IconUserCircle },
  { label: "Password", icon: IconBrandSamsungpass },
];

export function Navbar({ active, setActive, match, name }) {
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
    cookie.remove("userAuth");
    cookie.remove(`${name}`);
    navigate("/");
  };

  return (
    <nav
      style={match ? { width: "100%" } : { width: "30%" }}
      className={classes.navbar}
    >
      <BackgroundImage
        style={{ height: "100%" }}
        src={computedColorScheme === "dark" ? BGIMGN : BGIMGL}
      >
        <Box p="md">
          <Group
            className={classes.header}
            justify={match ? "center" : "space-between"}
          >
            <img
              alt="Code For Digital India"
              src={computedColorScheme === "dark" ? LogoD : Logol}
              width="100%"
              style={{ maxWidth: "200px" }}
            />
          </Group>
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
