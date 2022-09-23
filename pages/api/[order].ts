import type { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";
import { client } from "../../lib/urql";
import { UPDATE_PAYMENT_AND_PAY_ID } from "../../graphql/encroachments";

const token = process.env.MP_KEY_PROD || "";

interface Data {
  message: string;
}

mercadopago.configure({
  access_token: token,
});

async function update(
  status: string,
  order: string | string[] | undefined,
  payId: string
) {
  const variables = { id: order, paid: status, paymentId: payId };
  await client.mutation(UPDATE_PAYMENT_AND_PAY_ID, variables).toPromise();
}

export default function generateCheckout(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { order } = req.query;
    const { data } = req.body;
    if (data) {
      mercadopago.payment
        .findById(data.id)
        .then((result) => {
          const id = data.id;
          const { response } = result;
          const status = response.status;
          if (status === "approved") {
            update("paid", order, id);
          }
          if (status === "pending") {
            update("waiting", order, id);
          }
          if (status === "rejected") {
            update("refused", order, id);
          }
          res.status(200).json({ message: "OK" });
        })
        .catch((error) => {
          res.status(400).json({ message: "Ocorreu um erro interno" });
        });
    }
  } catch (error) {
    res.status(400).json({ message: "Ocorreu um erro" });
  }
}
