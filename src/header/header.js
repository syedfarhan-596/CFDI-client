import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Container,
} from "@mantine/core";
import LogoL from "../assets/logol.png";
import LogoD from "../assets/logod.png";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconSun,
  IconMoon,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

const mockdata = [
  {
    icon: IconCode,
    title: "Web Development Services",
    description:
      "Offering custom website and web application development tailored to your business needs and goals.",
  },
  {
    icon: IconCoin,
    title: "App Development Services",
    description:
      "Crafting innovative mobile applications for Android and iOS platforms, designed to enhance user experience and engagement.",
  },
  {
    icon: IconBook,
    title: "IT Consultation Services",
    description:
      "Providing expert guidance and strategic IT consultation to help businesses optimize their technology infrastructure and processes.",
  },
  {
    icon: IconFingerprint,
    title: "Data Science Solutions",
    description:
      "Harnessing the power of data analytics and machine learning to extract valuable insights and drive informed decision-making.",
  },
  {
    icon: IconChartPie3,
    title: "Graphics Design Services",
    description:
      "Delivering captivating graphic design solutions, including branding, digital artistry, and visual communication strategies.",
  },
  {
    icon: IconNotification,
    title: "Cybersecurity Solutions",
    description:
      "Ensuring robust cybersecurity measures to protect your digital assets and safeguard against cyber threats and vulnerabilities.",
  },
];

function Header() {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color={theme.colors.blue[6]}
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Container size="xl" mt="sm">
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Link to="/">
              <img
                src={computedColorScheme === "dark" ? LogoD : LogoL}
                width={200}
                alt="code for digital india"
              />
            </Link>

            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <Link to="/services" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Services
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                      />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Services</Text>
                    <Link to="/services" fz="xs">
                      View all
                    </Link>
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid
                    onClick={() => navigate("/services")}
                    cols={2}
                    spacing={0}
                  >
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group justify="space-between">
                      <div>
                        <Text fw={500} fz="sm">
                          Get started
                        </Text>
                        <Text size="xs" c="dimmed">
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button
                        onClick={() => navigate("/register")}
                        variant="default"
                      >
                        Get started
                      </Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <Link to="/about" className={classes.link}>
                About
              </Link>
              <Link to="/internship" className={classes.link}>
                Internship
              </Link>
              <Button onClick={toggleColorScheme} variant="link">
                {computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
              </Button>
            </Group>

            <Group visibleFrom="sm">
              <Button onClick={() => navigate("/login")} variant="default">
                Log in
              </Button>
              <Button onClick={() => navigate("/register")}>Sign up</Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="70%"
          padding="md"
          title={
            <img
              src={computedColorScheme === "dark" ? LogoD : LogoL}
              width={100}
              alt="code for digital india"
            />
          }
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            <Link to="/" className={classes.link}>
              Home
            </Link>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Services
                </Box>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            <Link to="/internship" className={classes.link}>
              Internship
            </Link>
            <Button onClick={toggleColorScheme} variant="link">
              {computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
            </Button>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Button onClick={() => navigate("/login")} variant="default">
                Log in
              </Button>
              <Button onClick={() => navigate("/register")}>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </Container>
  );
}

export default Header;
