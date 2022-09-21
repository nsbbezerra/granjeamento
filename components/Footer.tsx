import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Fragment } from "react";

export default function Footer() {
  return (
    <Fragment>
      <Flex
        bg="gray.900"
        py="10"
        direction={"column"}
        align="center"
        justify={"center"}
        gap="2"
        id="contato"
      >
        <Box w="20" h="20">
          <Image
            src={"/img/food.svg"}
            width={64}
            height={64}
            layout="responsive"
            alt="Granjeamentos"
          />
        </Box>
        <Heading color={"whiteAlpha.700"}>GRANJEAMENTOS</Heading>
        <Text color={"whiteAlpha.900"} textAlign="center">
          Produto NK Informática | © Todos os direitos reservados
        </Text>
        <Text color={"whiteAlpha.900"} textAlign="center">
          Contato: (63) 99971-1716
        </Text>
      </Flex>
    </Fragment>
  );
}
