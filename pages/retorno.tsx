import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { CircleWavyCheck, CircleWavyWarning, House } from "phosphor-react";

interface PayProps {
  type: "success" | "warning" | "error";
}

export default function Retorno() {
  const [payHandler, setPayHandler] = useState<PayProps>({
    type: "success",
  });

  function handlerColors() {
    switch (payHandler.type) {
      case "success":
        return {
          bg: "green.500",
          color: "white",
          text: "Sucesso!",
          message:
            "Seu pagamento foi confirmado, aguarde a data do granjeamento",
        };

      case "warning":
        return {
          bg: "yellow.500",
          color: "white",
          text: "Pagamento mal sucedido!",
          message:
            "Ocorrou um problema ao realizar o pagamento, entre em contato conosco",
        };

      case "error":
        return {
          bg: "red.600",
          color: "white",
          text: "Pagamento Recusado!",
          message: "Infelizmente seu pagamento foi recusado",
        };
      default:
        return { bg: "green.500", color: "white" };
    }
  }

  return (
    <Fragment>
      <Menu />
      <Box
        w={"full"}
        h={["30vh", "40vh", "40vh", "40vh", "40vh"]}
        overflow="hidden"
        position={"relative"}
        mt="16"
      >
        <Image
          src={"/img/background.svg"}
          layout="fill"
          alt="Granjeamentos"
          objectFit="cover"
        />

        <Box
          w="full"
          h="full"
          bg={handlerColors().bg}
          backdropFilter="auto"
          position={"absolute"}
          backdropBlur="sm"
          opacity={"0.5"}
        />
      </Box>
      <Flex
        justify={"center"}
        mt={["-80px", "-130px", "-130px", "-130px", "-130px"]}
      >
        <Flex
          w={["150px", "200px", "270px", "270px", "270px"]}
          h={["150px", "200px", "270px", "270px", "270px"]}
          rounded={"full"}
          overflow="hidden"
          position={"relative"}
          borderWidth="5px"
          borderColor={"white"}
          shadow="xl"
          bg={handlerColors().bg}
          justify={"center"}
          align="center"
          fontSize={"9xl"}
          color={handlerColors().color}
        >
          {payHandler.type === "success" ? (
            <CircleWavyCheck />
          ) : (
            <CircleWavyWarning />
          )}
        </Flex>
      </Flex>
      <Container maxW={"3xl"} my="10">
        <Center>
          <Heading color={handlerColors().bg}>{handlerColors().text}</Heading>
        </Center>
        <Center>
          <Text textAlign={"center"} fontSize="xl">
            {handlerColors().message}
          </Text>
        </Center>
        <Center mt="10">
          <Button size="lg" leftIcon={<House />}>
            Ir ao início
          </Button>
        </Center>
      </Container>
      <Footer />
    </Fragment>
  );
}
