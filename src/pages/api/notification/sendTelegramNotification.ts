import type { NextApiRequest, NextApiResponse } from "next";

import { MongoTelegramRepo } from "domain/infrastructure/MongoTelegramRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import { CartItem } from "domain/models/entities/CartItem";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;
  const { db } = await connectToDatabase();
  const telegramRepo = MongoTelegramRepo.create(db);

  let { body } = request;
  const orderAggregate = OrderAggregate.create(body, body._id).getResult();

  const craftTextFromOrder = (orderAggregate: OrderAggregate) => {
    let message = `🛍 *New Order*\n⏱ ${new Date().toLocaleString()}\n\n`;

    orderAggregate.cart.cartItems.map((cartItem: CartItem) => {
      message = message.concat(
        `➤ ${cartItem.shopItemName} ${cartItem.variant} x ${cartItem.quantity}\n`
      );
    });
    return message;
  };

  const telegramBotSubscribers = await telegramRepo.getAllUsers();
  await Promise.all(
    telegramBotSubscribers.forEach((user: { chatID: string }) => {
      const message = {
        chat_id: user.chatID,
        text: craftTextFromOrder(orderAggregate),
        parse_mode: "Markdown",
      };

      fetch(TELEGRAM_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
    })
  );

  return response.status(200).json("OK");
};
