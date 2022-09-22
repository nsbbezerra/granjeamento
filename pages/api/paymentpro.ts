import type { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";

const token = process.env.MP_KEY_PROD || "";

mercadopago.configure({
  access_token: token,
});

export default function generateCheckout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    mercadopago.payment
      .findById(id)
      .then((response) => {
        let status = response.response.status;
        res.status(200).json({ status });
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
