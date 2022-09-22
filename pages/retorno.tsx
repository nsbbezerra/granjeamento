import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { CircleWavyCheck, CircleWavyWarning, House } from "phosphor-react";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import { UPDATE_ORDER } from "../graphql/encroachments";
import Link from "next/link";

interface PayProps {
  type: "success" | "warning" | "error";
}

export default function Retorno() {
  const { query } = useRouter();
  const toast = useToast();

  const { status, external_reference, payment_id } = query;

  const [payHandler, setPayHandler] = useState<PayProps>({
    type: "success",
  });

  const [updateOrderResult, updateOrder] = useMutation(UPDATE_ORDER);

  const { fetching } = updateOrderResult;

  function showToast(
    message: string,
    status: "error" | "info" | "warning" | "success" | undefined,
    title: string
  ) {
    toast({
      title: title,
      description: message,
      status: status,
      position: "top-right",
      duration: 8000,
      isClosable: true,
    });
  }

  function setUpdateOrder() {
    let variables = { id: external_reference, paymentId: payment_id };
    updateOrder(variables).then((response) => {
      if (response.error) {
        showToast(response.error.message, "error", "Erro");
      } else if (response.data) {
        showToast("Compra finalizada", "success", "Sucesso");
      }
    });
  }

  useEffect(() => {
    if (payment_id) {
      setUpdateOrder();
    }
  }, [payment_id]);

  useEffect(() => {
    if (status === "approved") {
      setPayHandler({ type: "success" });
    } else if (status === "rejected") {
      setPayHandler({ type: "error" });
    } else {
      setPayHandler({ type: "warning" });
    }
  }, [status]);

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
          text: "Pagamento em aberto!",
          message:
            "Estamos aguardando a confirmação do pagamento, aguarde alguns minutos, não esqueça de guardar o seu comprovante, ou envie para o número de contato logo abaixo no site.",
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
          {fetching ? (
            <Spinner size={"xl"} />
          ) : (
            <Link href={"/"}>
              <Button size="lg" leftIcon={<House />}>
                Ir ao início
              </Button>
            </Link>
          )}
        </Center>
      </Container>
      <Footer />
    </Fragment>
  );
}
