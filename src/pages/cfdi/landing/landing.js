import React from "react";
import { Container, Text, Title } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import Header from "../../../header/header";
import LandingImage from "../../../assets/landing.png";
import styles from "./landing.module.css";
import Footer from "../../../footer/footer";

const LandingPage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <>
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
