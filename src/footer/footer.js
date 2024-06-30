import React from "react";
import { Container, Text, Paper, Divider, Badge, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTelegram,
} from "@tabler/icons-react";
import styles from "./footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Paper className={styles.footer} shadow="xl">
      <Container size="md" padding="md">
        <Group position="apart" direction="column">
          <div className={styles.row}>
            <div className={styles.column}>
              <Text className={styles.heading} size="lg">
                Follow Us
              </Text>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.instagram.com/code_for_digital_india/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandInstagram className={styles.socialIcon} />
                </a>
                <a
                  href="https://t.me/CodeForDigitallIndia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandTelegram className={styles.socialIcon} />
                </a>
                <a
                  href="https://www.linkedin.com/company/codefordigitalindia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandLinkedin className={styles.socialIcon} />
                </a>
              </div>
            </div>
          </div>
          <Divider margin="md" />
          <Group position="apart" align="middle">
            <Text className={styles.copyRight} size="sm">
              © 2024 Code for Digital India. All rights reserved.
            </Text>
            <Group>
              <Badge
                onClick={() => navigate("/privacy")}
                className={styles.badge}
                color="teal"
                variant="outline"
              >
                Privacy Policy
              </Badge>
              <Badge
                onClick={() => navigate("/terms")}
                className={styles.badge}
                color="teal"
                variant="outline"
              >
                Terms of Service
              </Badge>
            </Group>
          </Group>
        </Group>
      </Container>
    </Paper>
  );
};

export default Footer;
