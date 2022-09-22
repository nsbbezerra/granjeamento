import { gql } from "urql";

const FIND_ENCROACHMENTS = gql`
  query Find {
    encroachments {
      id
      description
      ingredients
      image {
        id
        url
      }
      saleDate
      title
      total
      schedule
      local
      price
    }
  }
`;

const FIND_ENCROACHMENTS_BY_ID = gql`
  query Find($id: ID!) {
    encroachment(where: { id: $id }) {
      id
      description
      ingredients
      image {
        id
        url
      }
      saleDate
      title
      total
      schedule
      local
      price
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder(
    $client: String!
    $phone: String!
    $address: String!
    $delivery: Boolean!
    $quantity: Int!
    $price: Float!
    $payForm: String!
    $seller: String!
    $encroachment: ID!
    $paid: Paid!
    $description: String!
  ) {
    createOrder(
      data: {
        encroachment: { connect: { id: $encroachment } }
        client: $client
        phone: $phone
        address: $address
        delivery: $delivery
        quantity: $quantity
        price: $price
        payForm: $payForm
        seller: $seller
        paid: $paid
        description: $description
      }
    ) {
      id
    }
  }
`;

const PUBLISH_ORDER = gql`
  mutation PublishOrder($id: ID!) {
    publishOrder(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $paymentId: String!) {
    updateOrder(where: { id: $id }, data: { paymentId: $paymentId }) {
      id
    }
  }
`;

const FIND_ORDERS = gql`
  query FindOrders($id: ID!) {
    orders(where: { encroachment: { id: $id } }, first: 200) {
      id
      client
      seller
      paymentId
      payForm
      phone
      address
      delivery
      quantity
      price
      paid
      description
    }
  }
`;

const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($id: ID!, $paid: Paid!) {
    updateOrder(where: { id: $id }, data: { paid: $paid }) {
      id
    }
  }
`;

export {
  FIND_ENCROACHMENTS,
  FIND_ENCROACHMENTS_BY_ID,
  CREATE_ORDER,
  PUBLISH_ORDER,
  UPDATE_ORDER,
  FIND_ORDERS,
  UPDATE_PAYMENT,
};
