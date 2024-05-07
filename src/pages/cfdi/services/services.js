import React from "react";
import { Container, Card, Text } from "@mantine/core";
import {
  IconCode,
  IconCoin,
  IconBook,
  IconFingerprint,
  IconChartPie3,
  IconNotification,
} from "@tabler/icons-react";
import Header from "../../../header/header";
import styles from "./services.module.css";
import Footer from "../../../footer/footer";

const Services = () => {
  return (
    <>
      <Header />
      <Container size="xl" mt="sm">
        <div className={styles.grid}>
          <Card className={styles.card}>
            <IconCode className={styles.icon} />
            <Text className={styles.title} size="lg">
              Web Development
            </Text>
            <Text className={styles.description}>
              Custom website and web application development tailored to your
              business needs.
            </Text>
          </Card>
          <Card className={styles.card}>
            <IconCoin className={styles.icon} />
            <Text className={styles.title} size="lg">
              App Development
            </Text>
            <Text className={styles.description}>
              Crafting innovative mobile applications for Android and iOS
              platforms.
            </Text>
          </Card>
          <Card className={styles.card}>
            <IconBook className={styles.icon} />
            <Text className={styles.title} size="lg">
              IT Consultation
            </Text>
            <Text className={styles.description}>
              Expert guidance and strategic IT consultation to optimize
              technology infrastructure.
            </Text>
          </Card>
          <Card className={styles.card}>
            <IconFingerprint className={styles.icon} />
            <Text className={styles.title} size="lg">
              Data Science
            </Text>
            <Text className={styles.description}>
              Harnessing data analytics and machine learning to drive informed
              decision-making.
            </Text>
          </Card>
          <Card className={styles.card}>
            <IconChartPie3 className={styles.icon} />
            <Text className={styles.title} size="lg">
              Graphics Design
            </Text>
            <Text className={styles.description}>
              Delivering captivating graphic design solutions and visual
              communication strategies.
            </Text>
          </Card>
          <Card className={styles.card}>
            <IconNotification className={styles.icon} />
            <Text className={styles.title} size="lg">
              Cybersecurity
            </Text>
            <Text className={styles.description}>
              Robust cybersecurity measures to protect digital assets and
              safeguard against cyber threats.
            </Text>
          </Card>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Services;
