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
  ) {
    createOrder(
      data: {
        encroachment: { connect: { id: $id } }
        client: $client
        phone: $phone
        address: $address
        delivery: $delivery
        quantity: $quantity
        price: $price
        payForm: $payForm
        seller: $seller
      }
    ) {
      id
    }
  }
`;

export { FIND_ENCROACHMENTS, FIND_ENCROACHMENTS_BY_ID, CREATE_ORDER };
