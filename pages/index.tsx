import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { Fragment } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { ShoppingCart } from "phosphor-react";
import Link from "next/link";
import { client } from "../lib/urql";
import { FIND_ENCROACHMENTS } from "../graphql/encroachments";

type Image = {
  id: string;
  url: string;
};

interface EncroachmentsProps {
  id: string;
  description: string;
  ingredients: string[];
  image: Image;
  title: string;
  total: number;
  schedule: string;
  local: string;
  saleDate: Date;
  price: number;
}

interface Props {
  encroachments: EncroachmentsProps[];
}

const formatDate = (myDate: Date) => {
  const dateformat = new Date(myDate);
  const dia = (dateformat.getDate() + 1).toString().padStart(2, "0");
  const mes = (dateformat.getMonth() + 1).toString().padStart(2, "0");
  const ano = dateformat.getFullYear();

  return `${dia}/${mes}/${ano}`;
};

const Home: NextPage<Props> = ({ encroachments }) => {
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
          <Heading
            borderBottomWidth={"2px"}
            borderBottomColor="green.500"
            textAlign={"center"}
          >
            Granjeamentos em Destaque
          </Heading>
        </Center>

        <Grid
          mt="10"
          templateColumns={"repeat(auto-fit, minmax(310px, 310px))"}
          gap="5"
          justifyContent={"center"}
        >
          {encroachments.map((enc) => (
            <Box
              key={enc.id}
              rounded={"md"}
              borderWidth="1px"
              shadow="sm"
              h="fit-content"
              overflow={"hidden"}
            >
              <Box w={"full"} position={"relative"}>
                <Image
                  src={enc.image.url}
                  layout="responsive"
                  width={1920}
                  height={1300}
                  alt="Granjeamentos"
                  objectFit="cover"
                />
              </Box>
              <Box p="3">
                <Text fontWeight={"bold"} fontSize="large" mb="3">
                  {enc.title}
                </Text>
                <Text>
                  Data: <strong>{formatDate(enc.saleDate)}</strong>
                </Text>
                <Text>
                  Horário: <strong>{enc.schedule}</strong>
                </Text>
                <Text fontSize={"xl"} fontWeight="bold" mt="3">
                  {enc.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>

                <Link href={`/granjeamento/${enc.id}`} passHref>
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
          ))}
        </Grid>
      </Container>

      <Footer />
    </Fragment>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const result = await client.query(FIND_ENCROACHMENTS, {}).toPromise();

  return {
    props: {
      encroachments: result.data.encroachments || [],
    },
    revalidate: 60,
  };
};
