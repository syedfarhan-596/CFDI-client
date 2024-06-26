import React from "react";
import { Container, Text } from "@mantine/core";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import styles from "./privacy.module.css"; // Import your CSS module for styling

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <Container size="xl" mt="xl">
        <div className={styles.privacyPolicy}>
          <Text className={styles.title} size="lg">
            Privacy Policy
          </Text>
          <Text className={styles.section}>
            At Code for Digital India, we are committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and
            disclose your personal information when you use our website and
            services.
          </Text>
          <Text className={styles.section}>
            <strong>Information We Collect:</strong> We may collect personal
            information such as your name, email address, phone number, and
            other details when you interact with us or use our services.
          </Text>
          <Text className={styles.section}>
            <strong>How We Use Your Information:</strong> We use the information
            we collect to provide and improve our services, communicate with
            you, and personalize your experience.
          </Text>
          <Text className={styles.section}>
            <strong>Information Sharing:</strong> We may share your information
            with trusted third parties to help us deliver our services and
            improve your experience.
          </Text>
          <Text className={styles.section}>
            <strong>Security:</strong> We take appropriate measures to protect
            your personal information from unauthorized access, use, or
            disclosure.
          </Text>
          <Text className={styles.section}>
            <strong>Changes to This Policy:</strong> We may update our Privacy
            Policy from time to time. Any changes will be posted on this page.
          </Text>
          <Text className={styles.contact}>
            If you have any questions about our Privacy Policy, please contact
            us at{" "}
            <a href="mailto:info@codefordigitalindia.com">
              info@codefordigitalindia.com
            </a>
            .
          </Text>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
