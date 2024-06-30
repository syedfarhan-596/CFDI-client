import React from "react";
import { Container, Card, Text } from "@mantine/core";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import styles from "./services.module.css";

// Import SVG components from ServiceIcons.jsx
import {
  WebDevelopmentIcon,
  AppDevelopmentIcon,
  ITConsultationIcon,
  DataScienceIcon,
  GraphicsDesignIcon,
  CybersecurityIcon,
} from "./svg";

const Services = () => {
  return (
    <>
      <Header />
      <Container size="xl" mt="sm">
        <div className={styles.grid}>
          <Card className={styles.card}>
            <WebDevelopmentIcon className={styles.icon} />
            <Text className={styles.title} size="lg">
              Web Development
            </Text>
            <Text className={styles.description}>
              Custom website and web application development tailored to your
              business needs. We focus on scalability and user experience.
            </Text>
          </Card>
          <Card className={styles.card}>
            <AppDevelopmentIcon className={styles.icon} />
            <Text className={styles.title} size="lg">
              App Development
            </Text>
            <Text className={styles.description}>
              Crafting innovative mobile applications for Android and iOS
              platforms, emphasizing usability and modern design principles.
            </Text>
          </Card>
          <Card className={styles.card}>
            <ITConsultationIcon className={styles.icon} />
            <Text className={styles.title} size="lg">
              IT Consultation
            </Text>
            <Text className={styles.description}>
              Expert guidance and strategic IT consultation to optimize
              technology infrastructure, ensuring efficiency and security.
            </Text>
          </Card>
          <Card className={styles.card}>
            <DataScienceIcon className={styles.icon} />
            <Text className={styles.title} size="lg">
              Data Science
            </Text>
            <Text className={styles.description}>
              Harnessing data analytics and machine learning to drive informed
              decision-making and business insights.
            </Text>
          </Card>
          <Card className={styles.card}>
            <GraphicsDesignIcon className={styles.icon} />
            <Text className={styles.title} size="lg">
              Graphics Design
            </Text>
            <Text className={styles.description}>
              Delivering captivating graphic design solutions and visual
              communication strategies that enhance brand identity.
            </Text>
          </Card>
          <Card className={styles.card}>
            <CybersecurityIcon className={styles.icon} />
            <Text className={styles.title} size="lg">
              Cybersecurity
            </Text>
            <Text className={styles.description}>
              Robust cybersecurity measures to protect digital assets and
              safeguard against cyber threats, ensuring data integrity and
              privacy.
            </Text>
          </Card>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Services;
