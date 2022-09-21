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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FileSearch } from "phosphor-react";
import { Fragment, useState } from "react";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import { FIND_ENCROACHMENTS, FIND_ORDERS } from "../../graphql/encroachments";
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
  paid: boolean | null;
}

const Resultados: NextPage<Props> = ({ orders }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  function handleAddress(add: string) {
    setAddress(add);
    openModal();
  }

  function openModal() {
    setModal(true);
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

      <Container my="16" maxW={"6xl"}>
        <Box w="full" maxW={"full"} overflowX="auto">
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
                <Th>Pago?</Th>
                <Th>Ent?</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((ord) => (
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
                    <Button
                      w="full"
                      leftIcon={<FileSearch />}
                      size="xs"
                      colorScheme={"green"}
                    >
                      Buscar
                    </Button>
                  </Td>
                  <Td>
                    {ord.paid === null || ord.paid === false ? (
                      <Tag colorScheme={"red"}>Não</Tag>
                    ) : (
                      <Tag colorScheme={"green"}>Sim</Tag>
                    )}
                  </Td>
                  <Td>
                    {ord.delivery === false ? (
                      <Tag colorScheme={"red"}>Não</Tag>
                    ) : (
                      <Tag colorScheme={"green"}>Sim</Tag>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>

      <Footer />

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Endereço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table size="sm">
              <Thead>
                <Tr bg="gray.100">
                  <Th>Endereço</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{address}</Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setModal(false)}>Fechar</Button>
          </ModalFooter>
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
    revalidate: 30,
  };
};
