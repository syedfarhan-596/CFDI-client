import { Divider, Title, Text, Container, Grid, Button } from "@mantine/core";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
import { Helmet } from "react-helmet";
import { useComputedColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";

// Custom SVG Icons for Sections
const MissionSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    {/* Custom SVG design for Mission */}
    <circle cx="50" cy="50" r="40" fill="#FF5722" />
    <path
      d="M20,50 L50,80 L80,50 L50,20 Z"
      fill="none"
      stroke="#FFF"
      strokeWidth="5"
    />
  </svg>
);

const TeamSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    {/* Custom SVG design for Team */}
    <circle cx="50" cy="50" r="40" fill="#2196F3" />
    <rect x="35" y="35" width="30" height="30" fill="#FFF" />
  </svg>
);

const ProcessSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    {/* Custom SVG design for How It Works */}
    <rect x="20" y="20" width="60" height="60" fill="#4CAF50" />
    <path
      d="M10,50 L50,90 L90,50 L50,10 Z"
      fill="none"
      stroke="#FFF"
      strokeWidth="5"
    />
  </svg>
);

const ValuesSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    {/* Custom SVG design for Values */}
    <polygon points="50,10 90,90 10,90" fill="#9C27B0" />
    <circle cx="50" cy="50" r="30" fill="#FFF" />
  </svg>
);

const ContactSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    {/* Custom SVG design for Contact */}
    <path d="M10,30 Q50,-20 90,30 Q50,80 10,30 Z" fill="#FF9800" />
    <circle cx="50" cy="50" r="30" fill="#FFF" />
  </svg>
);

const About = () => {
  const computedColorScheme = useComputedColorScheme("light");

  return (
    <>
      <Helmet>
        <title>About CodeForDigitalIndia</title>
        <meta
          name="description"
          content="Learn more about CodeForDigitalIndia. Our mission, values, and the team that drives our initiatives in providing internships and certifications."
        />
        <meta
          name="keywords"
          content="about us, CodeForDigitalIndia, mission, values, team"
        />
        <meta property="og:title" content="About CodeForDigitalIndia" />
        <meta
          property="og:description"
          content="Learn more about CodeForDigitalIndia. Our mission, values, and the team that drives our initiatives in providing internships and certifications."
        />
        <meta
          property="og:url"
          content="https://codefordigitalindia-syed.netlify.app/about"
        />

        <meta name="twitter:title" content="About CodeForDigitalIndia" />
        <meta
          name="twitter:description"
          content="Learn more about CodeForDigitalIndia. Our mission, values, and the team that drives our initiatives in providing internships and certifications."
        />
      </Helmet>
      <Header />

      <Container size="xl" mt="sm">
        <div>
          <Divider
            my="xs"
            fs="xl"
            labelPosition="center"
            label={
              <Title
                c={computedColorScheme === "light" ? "black" : "white"}
                order={3}
              >
                About Code For Digital India
              </Title>
            }
          />
          <Container mt="lg">
            <Text ta="center">
              At Code for Digital India, we believe in the transformative power
              of technology to drive business growth and societal progress. As a
              software and IT consultancy firm, we are committed to solving the
              challenges faced by businesses, particularly in leveraging
              technology to expand their horizons and enhance their operations.
            </Text>
          </Container>
        </div>
        <div>
          <Container mt="lg">
            <Divider
              my="xs"
              fs="xl"
              labelPosition="left"
              label={
                <div>
                  <MissionSVG />

                  <Title
                    c={computedColorScheme === "light" ? "black" : "white"}
                    order={3}
                  >
                    Our Mission
                  </Title>
                </div>
              }
            />
            <Text ta="left">
              Our mission is twofold: firstly, we are dedicated to fostering
              business development by providing innovative solutions tailored to
              the unique needs of each client. Whether it's streamlining
              processes, implementing cutting-edge software, or enhancing online
              presence, we aim to propel businesses forward in the digital age.
            </Text>
            <Text ta="left">
              Secondly, we are passionate about nurturing talent through our
              internship program. We understand the challenges faced by skilled
              yet inexperienced individuals in entering the workforce. Our
              internship program provides a platform for students, freshers, and
              job seekers to hone their skills, gain practical experience, and
              kickstart their careers in the tech industry.
            </Text>
          </Container>
        </div>
        <div>
          <Container mt="lg">
            <Divider
              my="xs"
              fs="xl"
              labelPosition="right"
              label={
                <div>
                  <ProcessSVG />
                  <Title
                    c={computedColorScheme === "light" ? "black" : "white"}
                    order={3}
                  >
                    How It Works
                  </Title>
                </div>
              }
            />
            <Text ta="right">
              Interns enrolled in our program are assigned tasks and projects
              designed to enhance their expertise and confidence. Through
              hands-on experience and mentorship from industry professionals,
              they develop a solid foundation for future success. Moreover, when
              our company secures new business opportunities, we prioritize
              engaging these interns, offering them valuable real-world
              experience on live projects.
            </Text>
          </Container>
        </div>
        <div>
          <Container mt="lg">
            <Divider
              my="xs"
              fs="xl"
              labelPosition="center"
              label={
                <div>
                  <ValuesSVG />

                  <Title
                    c={computedColorScheme === "light" ? "black" : "white"}
                    order={3}
                  >
                    Our Values
                  </Title>
                </div>
              }
            />
            <Grid cols={3} gutter="lg">
              <div>
                <Text ta="center">
                  <strong>Quality:</strong> We prioritize quality in every
                  solution and service we deliver.
                </Text>
              </div>
              <div>
                <Text ta="center">
                  <strong>Innovation:</strong> We constantly innovate to provide
                  cutting-edge solutions.
                </Text>
              </div>
              <div>
                <Text ta="center">
                  <strong>Integrity:</strong> We uphold the highest ethical
                  standards in all our interactions.
                </Text>
              </div>
            </Grid>
          </Container>
        </div>
        <div>
          <Container mt="lg">
            <Divider
              my="xs"
              fs="xl"
              labelPosition="left"
              label={
                <div>
                  <TeamSVG />
                  <Title
                    c={computedColorScheme === "light" ? "black" : "white"}
                    order={3}
                  >
                    Client Testimonials
                  </Title>
                </div>
              }
            />
            <Grid cols={2} gutter="md">
              <div>
                <Text ta="left">
                  "Code for Digital India transformed our business with their
                  expert IT consultancy. Highly recommended!"
                </Text>
                <Text ta="right">- John Doe, CEO of Example Corp</Text>
              </div>
              <div>
                <Text ta="left">
                  "Their internship program gave me invaluable experience and
                  kickstarted my career in tech."
                </Text>
                <Text ta="right">- Jane Smith, Intern at Example Corp</Text>
              </div>
            </Grid>
          </Container>
        </div>
        <div>
          <Container mt="lg">
            <Divider
              my="xs"
              fs="xl"
              labelPosition="right"
              label={
                <div>
                  <ContactSVG />
                  <Title
                    c={computedColorScheme === "light" ? "black" : "white"}
                    order={3}
                  >
                    Get in Touch
                  </Title>
                </div>
              }
            />
            <Text ta="right">
              Ready to take your business to the next level? Partner with Code
              for Digital India today. Contact us to learn more about our
              services and how we can help you achieve your goals.
            </Text>
            <Container mt="md" align="center">
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Button size="lg" variant="outline" radius="xl">
                  Contact Us
                </Button>
              </Link>
            </Container>
          </Container>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default About;
