import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { Fragment } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { ShoppingCart } from "phosphor-react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Menu />
      <Box w={"full"} h="60vh" overflow="hidden" position={"relative"} mt="16">
        <Image
          src={"/img/background.svg"}
          layout="fill"
          alt="Granjeamentos"
          objectFit="cover"
          objectPosition={"center"}
        />
        <Box
          w="full"
          h="full"
          bg={"green.500"}
          backdropFilter="auto"
          position={"absolute"}
          backdropBlur="sm"
          opacity={"0.5"}
        />
      </Box>

      <Container maxW={"6xl"} py="16">
        <Center>
          <Heading>Granjeamentos em Destaque</Heading>
        </Center>

        <Grid
          mt="10"
          templateColumns={"repeat(auto-fit, minmax(310px, 310px))"}
          gap="5"
          justifyContent={"center"}
        >
          <Box
            rounded={"md"}
            borderWidth="1px"
            shadow="sm"
            h="fit-content"
            overflow={"hidden"}
          >
            <Box w={"full"} position={"relative"}>
              <Image
                src={"/img/food.jpg"}
                layout="responsive"
                width={1920}
                height={1300}
                alt="Granjeamentos"
                objectFit="cover"
              />
            </Box>
            <Box p="3">
              <Text fontWeight={"bold"} fontSize="large" mb="3">
                Feijoada da congregação Lírio dos Vales
              </Text>
              <Text>
                Data: <strong>10/10/2022</strong>
              </Text>
              <Text>
                Horário: <strong>a partir das 11:00hrs</strong>
              </Text>
              <Text fontSize={"xl"} fontWeight="bold" mt="3">
                R$ 12,00
              </Text>

              <Link href={"/granjeamento"} passHref>
                <Button
                  leftIcon={<ShoppingCart />}
                  mt="3"
                  w="full"
                  colorScheme={"green"}
                >
                  Comprar
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Container>

      <Footer />
    </Fragment>
  );
};

export default Home;
