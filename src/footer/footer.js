import React from "react";
import { Container, Text, Paper, Divider, Badge } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTelegram,
} from "@tabler/icons-react";
import styles from "./footer.module.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Paper className={styles.footer} shadow="xl">
      <Container className={styles.container} size="xl" padding="md">
        <div className={styles.row}>
          <div className={styles.column}>
            <Text className={styles.heading} size="lg">
              Contact Us
            </Text>
            <div className={styles.contactInfo}>
              <IconPhone className={styles.icon} />
              <Text>
                <a href="tel:+919494935942">+91 94949 35942</a>
              </Text>
            </div>
            <div className={styles.contactInfo}>
              <IconMail className={styles.icon} />
              <Text>
                <a href="mailto:codefordigitalindai@example.com">
                  codefordigitalindai@example.com
                </a>
              </Text>
            </div>
            <div className={styles.contactInfo}>
              <IconMapPin className={styles.icon} />
              <Text>Hyderabad, Bangalore</Text>
            </div>
          </div>

          <div className={styles.column}>
            <Text className={styles.heading} size="lg">
              Important Links
            </Text>
            <Link to="/about" className={styles.link}>
              About Us
            </Link>
            <Link to="/services" className={styles.link}>
              Services
            </Link>
            <Link to="/internship" className={styles.link}>
              Internship
            </Link>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </div>

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
        <div className={styles.bottomRow}>
          <Text className={styles.copyRight} size="sm">
            © 2024 Code for Digital India. All rights reserved.
          </Text>
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
        </div>
      </Container>
    </Paper>
  );
};

export default Footer;
