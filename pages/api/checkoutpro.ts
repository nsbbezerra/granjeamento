import type { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";
import { configs } from "../../configs";

type Data = {
  url?: string;
  message?: string;
};

const token = process.env.MP_KEY_PROD || "";

mercadopago.configure({
  access_token: token,
});

export default function generateCheckout(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { order, name, amount, client } = req.body;

  try {
    mercadopago.preferences
      .create({
        external_reference: order,
        notification_url: `${configs.site_url_prod}/api/${order}`,
        items: [
          {
            title: name,
            unit_price: amount,
            quantity: 1,
          },
        ],
        auto_return: "all",
        statement_descriptor: name,
        back_urls: {
          success: `${configs.site_url_prod}/retorno`,
          failure: `${configs.site_url_prod}/retorno`,
          pending: `${configs.site_url_prod}/retorno`,
        },
        payment_methods: {
          excluded_payment_types: [
            {
              id: "paypal",
            },
            { id: "ticket" },
          ],
          installments: 1,
        },
        payer: {
          email: "contato.nk.info@gmail.com",
          name: client,
        },
      })
      .then((response) => {
        //const url = response.body.sandbox_init_point;
        const url = response.body.init_point;

        res.status(200).json({ url });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ message: "Ocorreu um erro ao configurar o checkout" });
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu um erro ao configurar o checkout" });
  }
}
