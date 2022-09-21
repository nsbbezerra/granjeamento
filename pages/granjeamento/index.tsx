import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
  Select,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Textarea,
  Button,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import { Fragment } from "react";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import { ForkKnife, ShoppingCart } from "phosphor-react";
import ReactInputMask from "react-input-mask";

const Granjeamento: NextPage = () => {
  return (
    <Fragment>
      <Menu />
      <Box
        w={"full"}
        h={["30vh", "40vh", "40vh", "40vh", "40vh"]}
        overflow="hidden"
        position={"relative"}
      >
        <Image
          src={"/img/food.jpg"}
          layout="fill"
          alt="Granjeamentos"
          objectFit="cover"
        />

        <Box
          w="full"
          h="full"
          bg="blackAlpha.500"
          backdropFilter="auto"
          position={"absolute"}
          backdropBlur="sm"
        />
      </Box>
      <Flex
        justify={"center"}
        mt={["-80px", "-130px", "-130px", "-130px", "-130px"]}
      >
        <Box
          w={["150px", "200px", "270px", "270px", "270px"]}
          h={["150px", "200px", "270px", "270px", "270px"]}
          rounded={"full"}
          overflow="hidden"
          position={"relative"}
          borderWidth="5px"
          borderColor={"white"}
          shadow="xl"
        >
          <Image
            src={"/img/food.jpg"}
            layout="fill"
            alt="Granjeamentos"
            objectFit="cover"
          />
        </Box>
      </Flex>

      <Container maxW={"3xl"} mb="16" mt="5">
        <Center>
          <Heading
            textAlign={"center"}
            fontSize={["lg", "lg", "3xl", "3xl", "3xl"]}
          >
            Granjeamento da Congregação Lírio dos Vales
          </Heading>
        </Center>
        <Center>
          <Text textAlign={"center"} maxW="2xl">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </Text>
        </Center>

        <Grid
          templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]}
          gap="10"
          mt="10"
        >
          <Box>
            <Text>
              <strong>Ingredientes:</strong>
            </Text>
            <List>
              <ListItem>
                <ListIcon as={ForkKnife} color="green.500" />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </ListItem>
              <ListItem>
                <ListIcon as={ForkKnife} color="green.500" />
                Assumenda, quia temporibus eveniet a libero incidunt suscipit
              </ListItem>
              <ListItem>
                <ListIcon as={ForkKnife} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
              </ListItem>
            </List>
            <Text mt="3">
              Data: <strong>10/10/2022</strong>
            </Text>
            <Text>
              Horário: <strong>a partir das 11:00 hrs</strong>
            </Text>
            <Text mt="3" fontSize={"5xl"} fontWeight="bold" color="green.500">
              R$ 12,00
            </Text>
          </Box>

          <Box>
            <Grid templateColumns={"repeat(3, 1fr)"} gap="3">
              <Box rounded={"md"} borderWidth="1px" shadow={"sm"}>
                <Center fontSize={"3xl"} fontWeight="bold">
                  12
                </Center>
                <Divider />
                <Box textAlign={"center"} bg="gray.200" fontSize={"sm"}>
                  TOTAL
                </Box>
              </Box>
              <Box rounded={"md"} borderWidth="1px" shadow={"sm"}>
                <Center fontSize={"3xl"} fontWeight="bold">
                  12
                </Center>
                <Divider />
                <Box textAlign={"center"} bg="gray.200" fontSize={"sm"}>
                  DISPONÍVEIS
                </Box>
              </Box>
              <Box rounded={"md"} borderWidth="1px" shadow={"sm"}>
                <Center fontSize={"3xl"} fontWeight="bold">
                  12
                </Center>
                <Divider />
                <Box textAlign={"center"} bg="gray.200" fontSize={"sm"}>
                  VENDIDAS
                </Box>
              </Box>
            </Grid>

            <Grid mt="3" templateColumns={"80px 1fr"} gap="3">
              <FormControl>
                <FormLabel mb={0}>Qtd</FormLabel>
                <Select focusBorderColor="green.500">
                  <option value={"1"}>1</option>
                  <option value={"2"}>2</option>
                  <option value={"3"}>3</option>
                  <option value={"4"}>4</option>
                  <option value={"5"}>5</option>
                  <option value={"6"}>6</option>
                  <option value={"7"}>7</option>
                  <option value={"8"}>8</option>
                  <option value={"9"}>9</option>
                  <option value={"10"}>10</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel mb={0}>Nome</FormLabel>
                <Input focusBorderColor="green.500" />
              </FormControl>
            </Grid>
            <Grid mt="1" templateColumns={"1fr 1fr"} gap="3">
              <FormControl>
                <FormLabel mb={0}>Telefone</FormLabel>
                <Input
                  focusBorderColor="green.500"
                  as={ReactInputMask}
                  mask="(99) 99999-9999"
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={0}>Pagamento</FormLabel>
                <Select
                  focusBorderColor="green.500"
                  placeholder="Selecione uma opção"
                >
                  <option value={"on_received"}>Pagar na hora</option>
                  <option value={"money"}>Dinheiro</option>
                  <option value={"mp"}>PIX ou Cartão</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid mt="1" templateColumns={"1fr"} gap="3">
              <FormControl>
                <FormLabel mb={0}>Endereço</FormLabel>
                <Textarea focusBorderColor="green.500" resize={"none"} />
              </FormControl>
            </Grid>
            <Checkbox mt="1" colorScheme={"green"} size="lg">
              Entrega na minha casa
            </Checkbox>

            <Stat mt="3">
              <StatLabel>Total a pagar:</StatLabel>
              <StatNumber>R$ 12,00</StatNumber>
            </Stat>

            <Button
              leftIcon={<ShoppingCart />}
              w="full"
              mt="3"
              colorScheme={"green"}
              size="lg"
            >
              Comprar
            </Button>
          </Box>
        </Grid>
      </Container>

      <Footer />
    </Fragment>
  );
};

export default Granjeamento;
