import React from "react";
import { Container, Text, Button, TextInput, Group, Flex } from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTelegram,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import styles from "./contact.module.css";
import axios from "axios";
import { userUrl } from "../../../server-url";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().nonempty("Message is required"),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${userUrl}/mail`, { data });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Container p="xl" size="md">
        <Flex
          wrap="wrap"
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "center" }}
        >
          <div className={styles.contactDetails}>
            <Text size="xl" weight={700} className={styles.sectionTitle}>
              Contact Us
            </Text>
            <div className={styles.contactInfo}>
              <IconPhone width={40} height={40} />
              <Text size="md">
                <a
                  href="tel:+919494935942"
                  className={styles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 94949 35942
                </a>
              </Text>
            </div>
            <div className={styles.contactInfo}>
              <IconMail width={40} height={40} />

              <Text size="md">
                <a
                  href="mailto:codefordigitalindia@gmail.com"
                  className={styles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  codefordigitalindia@gmail.com
                </a>
              </Text>
            </div>
            <div className={styles.contactInfo}>
              <IconMail width={40} height={40} />

              <Text size="md">
                <a
                  href="mailto:info@codefordigitalindia.in"
                  className={styles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@codefordigitalindia.in
                </a>
              </Text>
            </div>
            <div className={styles.contactInfo}>
              <IconMapPin width={40} height={40} />
              <Text size="md">Hyderabad, Bangalore</Text>
            </div>
            <Text size="xl" weight={700} className={styles.sectionTitle}>
              Follow Us
            </Text>
            <Group className={styles.socialLinks}>
              <a
                href="https://www.instagram.com/code_for_digital_india/"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandInstagram />
              </a>
              <a
                href="https://t.me/CodeForDigitallIndia"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandTelegram />
              </a>
              <a
                href="https://www.linkedin.com/company/codefordigitalindia/"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandLinkedin />
              </a>
            </Group>
          </div>

          <form
            className={styles.contactForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Text size="xl" weight={700} className={styles.sectionTitle}>
              Send Us a Message
            </Text>
            <TextInput
              {...register("name")}
              placeholder="Your Name"
              variant="filled"
              size="lg"
              fullWidth
              mb="sm"
              className={styles.inputField}
              error={errors.name?.message}
            />
            <TextInput
              {...register("email")}
              placeholder="Your Email"
              variant="filled"
              size="lg"
              fullWidth
              mb="sm"
              className={styles.inputField}
              error={errors.email?.message}
            />
            <TextInput
              {...register("message")}
              placeholder="Message"
              variant="filled"
              size="lg"
              fullWidth
              multiline
              rows={5}
              mb="lg"
              className={styles.inputField}
              error={errors.message?.message}
            />
            <Button
              type="submit"
              size="lg"
              variant="outline"
              radius="xl"
              fullWidth
              className={styles.submitButton}
            >
              Send Message
            </Button>
          </form>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
