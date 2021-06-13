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

  let telegramBotSubscribers = [];
  const cursor = await telegramRepo.getAllUsers();
  await cursor.forEach((user: {}) => {
    telegramBotSubscribers.push(user);
  });

  telegramBotSubscribers.map(async (subscriber: { chatID: string }) => {
    const botMessage = {
      chat_id: subscriber.chatID,
      text: craftTextFromOrder(orderAggregate),
      parse_mode: "Markdown",
    };

    await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(botMessage),
    });
  });

  return Promise.resolve("OK");
};
