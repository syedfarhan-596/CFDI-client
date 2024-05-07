import React from "react";
import { Container, Text } from "@mantine/core";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";

const TermsOfService = () => {
  return (
    <>
      <Header />
      <Container size="xl" mt="sm">
        <Text size="lg" style={{ fontWeight: "bold" }}>
          Terms of Service
        </Text>
        <Text>
          Welcome to Code for Digital India. By accessing our website and using
          our services, you agree to comply with and be bound by the following
          Terms of Service. Please read these terms carefully before using our
          services.
        </Text>
        <Text>
          <strong>Use of Services:</strong> You may use our services only for
          lawful purposes and in accordance with these Terms of Service.
        </Text>
        <Text>
          <strong>Intellectual Property:</strong> The content, features, and
          functionality of our services are the property of Code for Digital
          India and are protected by copyright, trademark, and other laws.
        </Text>
        <Text>
          <strong>Limitation of Liability:</strong> Code for Digital India shall
          not be liable for any indirect, incidental, special, or consequential
          damages arising out of or in any way connected with the use of our
          services.
        </Text>
        <Text>
          <strong>Termination:</strong> We may terminate or suspend your access
          to our services at any time, without prior notice or liability, for
          any reason whatsoever.
        </Text>
        <Text>
          <strong>Changes to This Agreement:</strong> We reserve the right to
          modify or replace these Terms of Service at any time. Any changes will
          be effective immediately upon posting.
        </Text>
        <Text>
          If you have any questions about our Terms of Service, please contact
          us at terms@codefordigitalindia.com.
        </Text>
      </Container>
      <Footer />
    </>
  );
};

export default TermsOfService;
