import { Box, Button, Container, Flex, HStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import { House, Phone } from "phosphor-react";
import Link from "next/link";

export default function Menu() {
  return (
    <Fragment>
      <Head>
        <title>Granjeamentos || tem tudo aqui!!!</title>
        <link rel="icon" href="/img/food.svg" type="image/svg" />
      </Head>

      <Box
        bg={"white"}
        h="16"
        shadow={"md"}
        borderBottom="1px"
        borderBottomColor={"green.500"}
        position="fixed"
        top={0}
        right={0}
        left={0}
        zIndex={1000}
      >
        <Container maxW={"6xl"}>
          <Flex align={"center"} justify="space-between" h="16">
            <Box w="12" h="12">
              <Image
                src={"/img/food.svg"}
                width={64}
                height={64}
                layout="responsive"
                alt="Granjeamentos"
              />
            </Box>
            <HStack spacing={5}>
              <Link href={"/"}>
                <Button
                  leftIcon={<House />}
                  variant="outline"
                  colorScheme={"green"}
                >
                  Início
                </Button>
              </Link>
              <Link href={"#contato"}>
                <Button
                  leftIcon={<Phone />}
                  variant="outline"
                  colorScheme={"green"}
                >
                  Contato
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Fragment>
  );
}
