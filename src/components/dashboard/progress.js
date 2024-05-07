import {
  IconBrandCodepen,
  IconClipboardCheck,
  IconFileCertificate,
  IconCircleCheck,
  IconCertificate,
  IconChecks,
} from "@tabler/icons-react";

import { Timeline, Text, Box, Container, Code, Space } from "@mantine/core";

const Progress = ({ setActive, user }) => {
  let active = 1;

  if (user) {
    if (user?.status?.completionCertificate) {
      active = 6;
    } else if (user?.status?.taskVerified) {
      active = 5;
    } else if (user?.status?.taskSubmission?.length) {
      active = 4;
    } else if (user?.status?.tasks?.length) {
      active = 3;
    } else if (user?.status?.offerLetter) {
      active = 2;
    }
  }

  return (
    <Container>
      <Box mt="10%">
        <Timeline active={active}>
          <Timeline.Item
            bullet={<IconBrandCodepen size={12} />}
            title="Get Internship"
          >
            <Text component="p" c="dimmed" size="sm">
              <Code>Step:1</Code> {"  "}You&apos;ve created account with
              CodeForDigitalIndia You got internship
            </Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconFileCertificate size={12} />}
            title="Get Offer Letter"
          >
            <Text component="p" c="dimmed" size="sm">
              <Code>Step:2</Code> {"  "}
              You will be given an offer letter of one month period internship
              <br />
              <Text
                onClick={() => setActive("Certification")}
                style={{ cursor: "pointer" }}
                c="blue"
                size="xs"
                mt={4}
                component="span"
              >
                Check here
              </Text>
            </Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconClipboardCheck size={12} />}
            title="Get Tasks"
          >
            <Text component="p" c="dimmed" size="sm">
              <Code>Step:3</Code> {"  "}
              Our team will give you task according to your domain and skills
              <br />
              <Text
                onClick={() => setActive("Your task")}
                style={{ cursor: "pointer" }}
                c="blue"
                size="xs"
                mt={4}
                component="span"
              >
                Check here
              </Text>
            </Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconCircleCheck size={12} />}
            title="Submit Task"
          >
            <Text component="p" c="dimmed" size="sm">
              <Code>Step:4</Code> {"  "}
              You&apos;ve to submit the task within given time
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconChecks size={12} />}
            title="Task Verified"
          >
            <Text component="p" c="dimmed" size="sm">
              <Code>Step:5</Code> {"  "}
              Our team will look and verify your hard work
            </Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconCertificate size={12} />}
            title="Got Certificate"
          >
            <Text component="p" c="dimmed" size="sm">
              <Code>Step:6</Code> {"  "}
              {active === 6
                ? "You got your internship certificate"
                : "You will get internship certificate"}{" "}
              <br />
              <Text
                onClick={() => setActive("Certification")}
                style={{ cursor: "pointer" }}
                c="blue"
                size="xs"
                mt={4}
                component="span"
              >
                Check here
              </Text>
            </Text>
          </Timeline.Item>
        </Timeline>
      </Box>
      <Space h="xl"></Space>
      {active === 6 ? (
        <Text
          ta="center"
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "pink", deg: 90 }}
          component="p"
        >
          Know what's next
        </Text>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Progress;
