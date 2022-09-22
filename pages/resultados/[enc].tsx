import {
  Box,
  Container,
  Flex,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Button,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useToast,
  theme,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import {
  FileSearch,
  Clock,
  CurrencyDollar,
  Prohibit,
  Truck,
  ForkKnife,
  Fingerprint,
  SignIn,
} from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { useMutation } from "urql";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import { configs } from "../../configs";
import {
  FIND_ENCROACHMENTS,
  FIND_ORDERS,
  PUBLISH_ORDER,
  UPDATE_PAYMENT,
} from "../../graphql/encroachments";
import { client } from "../../lib/urql";

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
  orders: OrderProps[];
}

interface OrderProps {
  id: string;
  client: string;
  seller: string;
  paymentId: string | null;
  payForm: "on_received" | "money" | "mp";
  phone: string;
  address: string;
  delivery: boolean;
  quantity: number;
  price: number;
  paid: "waiting" | "paid" | "refused";
}

type LoadingProps = {
  id: string;
  loading: boolean;
};

const Resultados: NextPage<Props> = ({ orders }) => {
  const toast = useToast();
  const [modal, setModal] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [myOrders, setMyOrders] = useState<OrderProps[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [test, setTest] = useState<boolean>(false);

  const [updatePaymentResult, updatePayment] = useMutation(UPDATE_PAYMENT);
  const [publishOrderResults, publishOrder] = useMutation(PUBLISH_ORDER);

  const [loading, setLoading] = useState<LoadingProps>({
    id: "",
    loading: false,
  });

  useEffect(() => {
    setMyOrders(orders);
  }, [orders]);

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

  function handleAddress(add: string) {
    setAddress(add);
    openModal();
  }

  function openModal() {
    setModal(true);
  }

  function setPublishOrder(id: string) {
    let variables = { id: id };
    publishOrder(variables).then((response) => {
      if (response.error) {
        showToast(response.error.message, "error", "Erro");
        setLoading({
          id: "",
          loading: false,
        });
      } else if (response.data) {
        showToast("Consulta finalizada", "info", "Informação");
        setLoading({
          id: "",
          loading: false,
        });
      }
    });
  }

  function setUpdatePayment(id: string, paid: string) {
    let variables = { id, paid };

    updatePayment(variables).then((response) => {
      if (response.error) {
        showToast(response.error.message, "error", "Erro");
        setLoading({
          id: "",
          loading: false,
        });
      } else if (response.data) {
        let orderId = response.data.updateOrder.id;
        setPublishOrder(orderId);
      }
    });
  }

  const findPayment = async (payment: string, id: string) => {
    setLoading({
      id: id,
      loading: true,
    });
    let url = test ? "/api/payment" : "/api/paymentpro";
    try {
      const { data } = await axios.post(url, { id: payment });
      if (data.status === "approved") {
        showToast("Pagamento aprovado", "success", "Aprovado");
        setUpdatePayment(id, "paid");
      }
      if (data.status === "pending") {
        showToast("Aguardando pagamento", "warning", "Aguardando");
        setUpdatePayment(id, "waiting");
      }
      if (data.status === "rejected") {
        showToast("Pagamento rejeitado", "error", "Rejeitado");
        setUpdatePayment(id, "refused");
      }
    } catch (error) {
      setLoading({
        id: "",
        loading: false,
      });
      let message = (error as Error).message;
      showToast(message, "error", "Erro");
    }
  };

  function login() {
    if (password === configs.secret) {
      setShow(true);
    } else {
      showToast("Senha incorreta", "error", "Não autorizado");
    }
  }

  function searchByName(text: string) {
    setName(text);
    if (text === "") {
      setMyOrders(orders);
    } else {
      const results = orders.filter((obj) =>
        obj.client.toLowerCase().includes(text.toLowerCase())
      );
      setMyOrders(results);
    }
  }

  function searchByPhone(text: string) {
    setPhone(text);
    if (text === "") {
      setMyOrders(orders);
    } else {
      if (!text.includes("_")) {
        const results = orders.filter((obj) => obj.phone === text);
        setMyOrders(results);
      } else {
        setMyOrders(orders);
      }
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
            src={"/img/background.svg"}
            layout="fill"
            alt="Granjeamentos"
            objectFit="cover"
          />
        </Box>
      </Flex>

      <FormControl
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        mt="5"
      >
        <FormLabel htmlFor="email-alerts" mb="0">
          Modo teste?
        </FormLabel>
        <Switch
          id="email-alerts"
          size={"lg"}
          colorScheme="green"
          defaultChecked={test}
          onChange={(e) => setTest(e.target.checked)}
        />
      </FormControl>

      <Container my="16" maxW={"6xl"}>
        {show ? (
          <Box>
            <Grid
              templateColumns={[
                "1fr",
                "1fr 1fr",
                "1fr 1fr",
                "1fr 1fr",
                "1fr 1fr",
              ]}
              gap={["1", "5", "5", "5", "5"]}
            >
              <FormControl>
                <FormLabel mb={0}>Buscar por nome</FormLabel>
                <Input
                  focusBorderColor="green.500"
                  value={name}
                  onChange={(e) => searchByName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={0}>Buscar por telefone</FormLabel>
                <Input
                  as={ReactInputMask}
                  mask={"(99) 99999-9999"}
                  focusBorderColor="green.500"
                  value={phone}
                  onChange={(e) => searchByPhone(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Box
              w="full"
              maxW={"full"}
              overflowX="auto"
              rounded={"md"}
              borderWidth="1px"
              shadow={"sm"}
              mt="5"
            >
              <Table size={"sm"}>
                <Thead>
                  <Tr bg="gray.100">
                    <Th minW={"180px"}>Cliente</Th>
                    <Th minW={"140px"}>Telefone</Th>
                    <Th>Endereço</Th>
                    <Th>Qtd</Th>
                    <Th minW={"100px"}>Total</Th>
                    <Th>Vendedor</Th>
                    <Th minW={"120px"}>Pagamento</Th>
                    <Th>Pag. ID</Th>
                    <Th textAlign={"center"}>Pago?</Th>
                    <Th textAlign={"center"}>Ent?</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {myOrders.map((ord) => (
                    <Tr key={ord.id}>
                      <Td>{ord.client}</Td>
                      <Td>{ord.phone}</Td>
                      <Td>
                        <Button
                          w="full"
                          leftIcon={<FileSearch />}
                          size="xs"
                          onClick={() => handleAddress(ord.address)}
                        >
                          Visualizar
                        </Button>
                      </Td>
                      <Td>{ord.quantity}</Td>
                      <Td>
                        {ord.price.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Td>
                      <Td>{ord.seller || ""}</Td>
                      <Td>
                        {(ord.payForm === "on_received" && "Na entrega") ||
                          (ord.payForm === "money" && "Dinheiro") ||
                          (ord.payForm === "mp" && "PIX ou Cartão")}
                      </Td>
                      <Td>
                        {!ord.paymentId ? (
                          <Tag
                            w="full"
                            justifyContent={"center"}
                            colorScheme="red"
                          >
                            Ausente
                          </Tag>
                        ) : (
                          <Button
                            w="full"
                            leftIcon={<FileSearch />}
                            size="xs"
                            colorScheme={"green"}
                            onClick={() =>
                              findPayment(ord.paymentId || "", ord.id)
                            }
                            isLoading={
                              loading.id === ord.id && loading.loading === true
                            }
                          >
                            Buscar
                          </Button>
                        )}
                      </Td>
                      <Td textAlign={"center"}>
                        {(ord.paid === "waiting" && (
                          <Tag colorScheme={"yellow"}>
                            <Clock />
                          </Tag>
                        )) ||
                          (ord.paid === "refused" && (
                            <Tag colorScheme={"red"}>
                              <Prohibit />
                            </Tag>
                          )) ||
                          (ord.paid === "paid" && (
                            <Tag colorScheme={"green"}>
                              <CurrencyDollar />
                            </Tag>
                          ))}
                      </Td>
                      <Td textAlign={"center"}>
                        {ord.delivery === false ? (
                          <Tag colorScheme={"yellow"}>
                            <ForkKnife />
                          </Tag>
                        ) : (
                          <Tag colorScheme={"green"}>
                            <Truck />
                          </Tag>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        ) : (
          <Flex justify={"center"} align="center">
            <Flex
              rounded={"md"}
              borderWidth="1px"
              shadow={"sm"}
              maxW="sm"
              w="full"
              p={5}
              direction="column"
              justify={"center"}
              align="center"
            >
              <Fingerprint fontSize={"80"} color={theme.colors.green["500"]} />

              <FormControl mt="5">
                <FormLabel mb={0}>Senha Administrativa</FormLabel>
                <Input
                  size={"lg"}
                  focusBorderColor="green.500"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </FormControl>

              <Button
                leftIcon={<SignIn />}
                colorScheme="green"
                size={"lg"}
                w="full"
                mt="5"
                onClick={() => login()}
              >
                Login
              </Button>
            </Flex>
          </Flex>
        )}
      </Container>

      <Footer />

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Endereço</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Text fontSize={"lg"}>{address}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default Resultados;

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client.query(FIND_ENCROACHMENTS, {}).toPromise();
  const pathsList: EncroachmentsProps[] = result.data.encroachments || [];
  const paths = pathsList.map((enc) => {
    return { params: { enc: enc.id } };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let prms = params?.enc || "";
  const result = await client.query(FIND_ORDERS, { id: prms }).toPromise();
  return {
    props: {
      orders: result.data.orders || [],
    },
    revalidate: 10,
  };
};
