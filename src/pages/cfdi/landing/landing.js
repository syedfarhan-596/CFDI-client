import React from "react";
import { Container, Grid, Box, Text, Title, Space } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import Header from "../../../header/header";
import LandingImage from "../../../assets/landing.png";
import MSA from "../../../assets/mca.jpeg";
import MSME from "../../../assets/msme.png";
import AICTE from "../../../assets/aicte.png";
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

          <Text w="70%" mt="xl" ta="center">
            At Code for Digital India, we believe in the transformative power of
            technology to drive business growth and societal progress. As a
            software and IT consultancy firm, we are committed to solving the
            challenges faced by businesses, particularly in leveraging
            technology to expand their horizons and enhance their operations.
          </Text>
        </div>
        <Space h="xl"></Space>
        <Container mt="xl" size="lg">
          <Grid>
            <Grid.Col span={6}>
              <Box ta="left">
                <Text fz="h5" c="gray">
                  ACHIEVED OFFICIAL ENDORSEMENT
                </Text>
                <h3 order={3}>
                  Earning trust and validation from top educational,
                  governmental, and professional organizations.
                </h3>
              </Box>
            </Grid.Col>
            <Grid.Col span={6} ta="left">
              <Text fz="h5">
                Our programs are distinguished by an impressive range of
                prestigious certifications, such as MCA and MSME certifications,
                which underscore our dedication to quality and excellence in the
                tech industry. Enhancing our credibility further, we are AICTE
                Approved, reflecting our commitment to educational excellence
                and innovative entrepreneurship.
              </Text>
            </Grid.Col>
          </Grid>
          <Space h="xl"></Space>
          <div className={styles.gridContainer}>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={MSA} alt="msa" className={styles.image2} />
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={MSME} alt="msme" className={styles.image2} />
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={AICTE} alt="aicte" className={styles.image3} />
              </div>
            </div>
          </div>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
