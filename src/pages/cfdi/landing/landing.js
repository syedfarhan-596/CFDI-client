import React from "react";
import { Container, Text, Title } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import Header from "../../../header/header";
import LandingImage from "../../../assets/landing.png";
import styles from "./landing.module.css";
import Footer from "../../../footer/footer";
import { Helmet } from "react-helmet";
const LandingPage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>CodeForDigitalIndia - Internships & Certifications</title>
        <meta
          name="description"
          content="Join CodeForDigitalIndia for internships and certifications. Enhance your skills and gain valuable experience with real-world projects."
        />
        <meta
          name="keywords"
          content="internships, certifications, CodeForDigitalIndia, student internships, skill enhancement webdevelopment graphic designing"
        />
        <meta
          property="og:title"
          content="CodeForDigitalIndia - Internships & Certifications"
        />
        <meta
          property="og:description"
          content="Join CodeForDigitalIndia for internships and certifications. Enhance your skills and gain valuable experience with real-world projects."
        />

        <meta
          property="og:url"
          content="https://codefordigitalindia-syed.netlify.app"
        />

        <meta
          name="twitter:title"
          content="CodeForDigitalIndia - Internships & Certifications"
        />
        <meta
          name="twitter:description"
          content="Join CodeForDigitalIndia for internships and certifications. Enhance your skills and gain valuable experience with real-world projects."
        />
      </Helmet>
      <Header />
      <Container size="xl" className={styles.container}>
        <div className={styles.content}>
          <img
            src={LandingImage}
            alt="code for digital india"
            className={`${styles.image} ${reduceMotion ? "" : styles.animate}`}
          />
          <div className={styles.textContainer}>
            <Title order={2}>Empowering Businesses, Empowering India</Title>
            <Text fz="xl">Welcome to Code for Digital India</Text>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
