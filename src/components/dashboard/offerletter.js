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
          <Container size="md">
            <BackgroundImage h="400" src={Offerletter}></BackgroundImage>
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
          </Container>
        ) : (
          <div>
            <Title order={5}>We are working on it</Title>
            <br />
            <Title order={5}>Sample Offer Letter</Title>
            <img width="70%" alt="offer letter" src={Offerletter}></img>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default OfferLetter;
