import { Divider, Title, Text, Container } from "@mantine/core";
import Header from "../../../header/header";
import Footer from "../../../footer/footer";
const About = () => {
  return (
    <>
      <Header />

      <Container size="xl" mt="sm">
        <div>
          <Divider
            my="xs"
            fs="xl"
            labelPosition="center"
            label={
              <Title c="black" order={3}>
                About Code For Digital India
              </Title>
            }
          ></Divider>
          <Container>
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
          <Container>
            <Divider
              my="xs"
              fs="xl"
              labelPosition="left"
              label={
                <Title c="black" order={3}>
                  Our mission
                </Title>
              }
            ></Divider>
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
          <Container>
            <Divider
              my="xs"
              fs="xl"
              labelPosition="right"
              label={
                <Title c="black" order={3}>
                  How It Works
                </Title>
              }
            ></Divider>
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
          <Container>
            <Divider
              my="xs"
              fs="xl"
              labelPosition="center"
              label={
                <Title c="black" order={3}>
                  Our Approach
                </Title>
              }
            ></Divider>
            <Text ta="center">
              At Code for Digital India, we understand the importance of
              affordability, especially for small businesses and low-cost
              companies. That's why we strive to be cost-efficient in our
              services, ensuring that even organizations with limited resources
              can access top-notch technological solutions.
            </Text>
          </Container>
        </div>
        <div>
          <Container>
            <Divider
              my="xs"
              fs="xl"
              labelPosition="left"
              label={
                <Title c="black" order={3}>
                  Why Choose Us
                </Title>
              }
            ></Divider>
            <ul>
              <li>
                <Text ta="left">
                  Expertise: Our team comprises skilled professionals with a
                  wealth of experience in software development and IT
                  consultancy.
                </Text>
              </li>
              <li>
                <Text>
                  Innovation: We stay at the forefront of technological
                  advancements, offering innovative solutions tailored to each
                  client's needs.
                </Text>
              </li>
              <li>
                <Text>
                  Affordability: We believe that cost should not be a barrier to
                  accessing quality services. Our cost-efficient approach makes
                  us the ideal partner for businesses of all sizes.
                </Text>
              </li>
              <li>
                <Text>
                  Commitment to Talent: Through our internship program, we are
                  committed to nurturing the next generation of tech talent,
                  empowering them to succeed in the industry.
                </Text>
              </li>
            </ul>
          </Container>
        </div>
        <div>
          <Container>
            <Divider
              my="xs"
              fs="xl"
              labelPosition="right"
              label={
                <Title c="black" order={3}>
                  Get in Touch
                </Title>
              }
            ></Divider>
            <Text ta="right">
              Ready to take your business to the next level? Partner with Code
              for Digital India today. Contact us to learn more about our
              services and how we can help you achieve your goals.
            </Text>
          </Container>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default About;
