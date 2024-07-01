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
          <Container size="sm">
            <BackgroundImage h="400" src={Certificate}></BackgroundImage>
            <Anchor
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              fw={500}
              fz="lg"
              href={user.status.completionCertificate}
            >
              DOWNLOAD CERTIFICATE
            </Anchor>
          </Container>
        ) : (
          <div>
            <Title order={5}>We are working on it</Title>
            <br />
            <Title order={5}>Sample Certificate</Title>
            <img width="70%" alt="certificate " src={Certificate}></img>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Certification;
