import React from "react";
import { Container, Card, Image, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Header from "../../../header/header";
import WebInternshipImage from "../../../assets/web-internship.jpg";
import AppInternshipImage from "../../../assets/app-internship.jpg";
import DataScienceInternshipImage from "../../../assets/datascience-internship.jpg";
import GraphicsInternshipImage from "../../../assets/graphics-internship.jpg";
import styles from "./internship.module.css";
import Footer from "../../../footer/footer";

const Internship = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
      <Container size="xl" mt="md">
        <div className={styles.grid}>
          <Card className={styles.card}>
            <Image
              src={WebInternshipImage}
              alt="Web Internship"
              className={styles.image}
            />
            <div className={styles.details}>
              <Text className={styles.title}>Web Development Internship</Text>
              <Text className={styles.description}>
                Learn the ins and outs of web development with hands-on
                projects.
              </Text>
              <Button
                onClick={handleRegister}
                className={styles.button}
                fullWidth
                variant="light"
              >
                Register Now
              </Button>
            </div>
          </Card>
          <Card className={styles.card}>
            <Image
              src={AppInternshipImage}
              alt="App Internship"
              className={styles.image}
            />
            <div className={styles.details}>
              <Text className={styles.title}>App Development Internship</Text>
              <Text className={styles.description}>
                Get experience in building mobile applications for Android and
                iOS.
              </Text>
              <Button
                onClick={handleRegister}
                className={styles.button}
                fullWidth
                variant="light"
              >
                Register Now
              </Button>
            </div>
          </Card>
          <Card className={styles.card}>
            <Image
              src={DataScienceInternshipImage}
              alt="Data Science Internship"
              className={styles.image}
            />
            <div className={styles.details}>
              <Text className={styles.title}>Data Science Internship</Text>
              <Text className={styles.description}>
                Explore data analysis, machine learning, and data visualization
                techniques.
              </Text>
              <Button
                onClick={handleRegister}
                className={styles.button}
                fullWidth
                variant="light"
              >
                Register Now
              </Button>
            </div>
          </Card>
          <Card className={styles.card}>
            <Image
              src={GraphicsInternshipImage}
              alt="Graphics Internship"
              className={styles.image}
            />
            <div className={styles.details}>
              <Text className={styles.title}>Graphics Design Internship</Text>
              <Text className={styles.description}>
                Learn to create captivating designs for various digital
                platforms.
              </Text>
              <Button
                onClick={handleRegister}
                className={styles.button}
                fullWidth
                variant="light"
              >
                Register Now
              </Button>
            </div>
          </Card>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Internship;
