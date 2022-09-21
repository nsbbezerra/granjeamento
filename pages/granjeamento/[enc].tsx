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
  FormHelperText,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import { ForkKnife, ShoppingCart } from "phosphor-react";
import ReactInputMask from "react-input-mask";
import { client } from "../../lib/urql";
import {
  FIND_ENCROACHMENTS,
  FIND_ENCROACHMENTS_BY_ID,
} from "../../graphql/encroachments";
import { useRouter } from "next/router";

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
  encroachments: EncroachmentsProps;
}

const Granjeamento: NextPage<Props> = ({ encroachments }) => {
  const { query } = useRouter();
  const { enc } = query;
  const [rest, setRest] = useState<number>(88);
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [delivery, setDelivery] = useState<boolean>(false);
  const [seller, setSeller] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");

  useEffect(() => {
    let qtd = parseInt(quantity);
    setTotalPrice(encroachments.price * qtd);
  }, [quantity, encroachments.price]);

  const formatDate = (myDate: Date) => {
    const dateformat = new Date(myDate);
    const dia = (dateformat.getDate() + 1).toString().padStart(2, "0");
    const mes = (dateformat.getMonth() + 1).toString().padStart(2, "0");
    const ano = dateformat.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

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
          src={encroachments.image.url}
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
            src={encroachments.image.url}
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
            {encroachments.title}
          </Heading>
        </Center>
        <Center>
          <Text textAlign={"center"} maxW="2xl">
            {encroachments.description}
          </Text>
        </Center>

        <Grid
          templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]}
          gap="10"
          mt="10"
        >
          <Box>
            <Text fontSize={"lg"}>
              <strong>Ingredientes:</strong>
            </Text>
            <List>
              {encroachments.ingredients.map((ing) => (
                <ListItem key={ing} fontSize="lg">
                  <ListIcon as={ForkKnife} color="green.500" />
                  {ing}
                </ListItem>
              ))}
            </List>
            <Box rounded="md" overflow={"hidden"} borderWidth="1px" mt="3">
              <Table size="sm">
                <Thead>
                  <Tr bg="gray.100">
                    <Th>Data</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{formatDate(encroachments.saleDate)}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Table size="sm">
                <Thead>
                  <Tr bg="gray.100">
                    <Th>Horário</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{encroachments.schedule}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Table size="sm">
                <Thead>
                  <Tr bg="gray.100">
                    <Th>Local</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{encroachments.local}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
            <Flex
              mt="3"
              rounded="md"
              shadow="sm"
              justify="center"
              bg="green.50"
            >
              <Text fontSize={"5xl"} fontWeight="bold" color="green.500">
                {encroachments.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </Flex>
          </Box>

          <Box>
            <Grid templateColumns={"repeat(3, 1fr)"} gap="3" mt="3">
              <Box rounded={"md"} borderWidth="1px" shadow={"sm"}>
                <Center fontSize={"3xl"} fontWeight="bold">
                  {encroachments.total}
                </Center>
                <Divider />
                <Box textAlign={"center"} bg="gray.200" fontSize={"sm"}>
                  TOTAL
                </Box>
              </Box>
              <Box rounded={"md"} borderWidth="1px" shadow={"sm"}>
                <Center fontSize={"3xl"} fontWeight="bold">
                  {encroachments.total - rest}
                </Center>
                <Divider />
                <Box textAlign={"center"} bg="gray.200" fontSize={"sm"}>
                  DISPONÍVEIS
                </Box>
              </Box>
              <Box rounded={"md"} borderWidth="1px" shadow={"sm"}>
                <Center fontSize={"3xl"} fontWeight="bold">
                  {rest}
                </Center>
                <Divider />
                <Box textAlign={"center"} bg="gray.200" fontSize={"sm"}>
                  VENDIDAS
                </Box>
              </Box>
            </Grid>

            <Grid templateColumns={"80px 1fr"} gap="3" mt="3">
              <FormControl>
                <FormLabel mb={0}>Qtd</FormLabel>
                <Select
                  focusBorderColor="green.500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
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
                <Input
                  focusBorderColor="green.500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid mt="1" templateColumns={"1fr 1fr"} gap="3">
              <FormControl>
                <FormLabel mb={0}>Telefone</FormLabel>
                <Input
                  focusBorderColor="green.500"
                  as={ReactInputMask}
                  mask="(99) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={0}>Pagamento</FormLabel>
                <Select
                  focusBorderColor="green.500"
                  placeholder="Selecione uma opção"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value={"on_received"}>Pagar na entrega</option>
                  <option value={"money"}>Dinheiro</option>
                  <option value={"mp"}>PIX ou Cartão</option>
                </Select>
              </FormControl>
            </Grid>
            {payment === "money" && (
              <FormControl mt="1">
                <FormLabel mb={0}>Vendedor</FormLabel>
                <Input
                  focusBorderColor="green.500"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
                <FormHelperText mt={0} color="orange.500" fontSize={"xs"}>
                  Caso esteja comprando pra você mesmo, use aqui seu próprio
                  nome.
                </FormHelperText>
              </FormControl>
            )}
            <Grid mt="1" templateColumns={"1fr"} gap="3">
              <FormControl>
                <FormLabel mb={0}>Endereço</FormLabel>
                <Textarea
                  focusBorderColor="green.500"
                  resize={"none"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Checkbox
              mt="1"
              colorScheme={"green"}
              size="lg"
              isChecked={delivery}
              onChange={(e) => setDelivery(e.target.checked)}
            >
              Entrega na minha casa
            </Checkbox>

            <Stat mt="3">
              <StatLabel>Total a pagar:</StatLabel>
              <StatNumber>
                {totalPrice.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </StatNumber>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client.query(FIND_ENCROACHMENTS, {}).toPromise();
  const pathsList: EncroachmentsProps[] = result.data.encroachments || [];
  const paths = pathsList.map((enc) => {
    return { params: { enc: enc.id } };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let prms = params?.enc || "";
  const result = await client
    .query(FIND_ENCROACHMENTS_BY_ID, { id: prms })
    .toPromise();
  return {
    props: {
      encroachments: result.data.encroachment || {},
    },
    revalidate: 60,
  };
};
