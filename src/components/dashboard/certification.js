import {
  Box,
  Anchor,
  Flex,
  Container,
  Paper,
  Title,
  BackgroundImage,
} from "@mantine/core";

import { server } from "../../server-url";
import Certificate from "../../assets/certificate.jpg";
import Offerletter from "../../assets/offerletter.jpg";

const Certification = ({ user }) => {
  return (
    <Box>
      <Container>
        <Flex gap="xl" wrap="wrap">
          <Paper ta="center" shadow="xl" p="xl">
            <Title order={4}>OFFER LETTER</Title>
            {user?.status?.offerLetter ? (
              <>
                <BackgroundImage h="150" src={Offerletter}></BackgroundImage>
                <Anchor
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                  fw={500}
                  fz="lg"
                  href={`${server}/offerletter/${user.status.offerLetter}`}
                >
                  DOWNLOAD OFFER LETTER
                </Anchor>
              </>
            ) : (
              <Title order={5}>We are working on it</Title>
            )}
          </Paper>
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
                  href={`${server}/certificate/${user.status.completionCertificate}`}
                >
                  DOWNLOAD CERTIFICATE
                </Anchor>
              </>
            ) : (
              <Title order={5}>We are working on it</Title>
            )}
          </Paper>
        </Flex>
      </Container>
    </Box>
  );
};

export default Certification;
