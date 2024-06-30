import {
  Anchor,
  Container,
  Paper,
  Title,
  BackgroundImage,
} from "@mantine/core";

import Certificate from "../../assets/certificate.jpg";
const Certification = ({ user }) => {
  return (
    <Container>
      <Paper ta="center" shadow="xl" p="xl">
        <Title order={4}>CERTIFICATE</Title>
        {user?.status?.completionCertificate ? (
          <>
            <BackgroundImage h="150" src={Certificate}></BackgroundImage>
            <Anchor
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              fw={500}
              fz="lg"
              href={user.status.completionCertificate}
            >
              DOWNLOAD CERTIFICATE
            </Anchor>
          </>
        ) : (
          <div>
            <Title order={5}>We are working on it</Title>
            <br />
            <Title order={5}>Sample Certificate</Title>
            <BackgroundImage
              w="400"
              h="400"
              src={Certificate}
            ></BackgroundImage>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Certification;
