import type { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";
import { client } from "../../lib/urql";
import { UPDATE_PAYMENT } from "../../graphql/encroachments";

const token = process.env.MP_KEY_PROD || "";

mercadopago.configure({
  access_token: token,
});

async function update(status: string, order: string | string[] | undefined) {
  const variables = { id: order, paid: status };
  await client.mutation(UPDATE_PAYMENT, variables).toPromise();
}

export default async function generateCheckout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { order } = req.query;
    const { data } = req.body;

    if (data) {
      mercadopago.payment
        .findById(data.id)
        .then((data) => {
          const { response } = data;
          const status = response.status;

          if (status === "approved") {
            update("paid", order);
          }
          if (status === "pending") {
            update("waiting", order);
          }
          if (status === "rejected") {
            update("refused", order);
          }
        })
        .catch((error) => {
          res.status(400).json({ message: "Ocorreu um erro" });
        });
    }

    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(400).json({ message: "Ocorreu um erro" });
  }
}
