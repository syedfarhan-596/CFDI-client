import {
  Anchor,
  Container,
  Paper,
  Title,
  BackgroundImage,
} from "@mantine/core";

import Offerletter from "../../assets/offerletter.jpg";
const OfferLetter = ({ user }) => {
  return (
    <Container>
      <Paper ta="center" shadow="xl" p="xl">
        <Title order={4}>OFFER LETTER</Title>
        {user?.status?.offerLetter ? (
          <>
            <BackgroundImage w="50%" src={Offerletter}></BackgroundImage>
            <Anchor
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              fw={500}
              fz="lg"
              href={user.status.offerLetter}
              target="_blank"
              rel="noreferrer"
            >
              DOWNLOAD OFFER LETTER
            </Anchor>
          </>
        ) : (
          <div>
            <Title order={5}>We are working on it</Title>
            <br />
            <Title order={5}>Sample Offer Letter</Title>
            <BackgroundImage
              w="400"
              h="400"
              src={Offerletter}
            ></BackgroundImage>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default OfferLetter;
