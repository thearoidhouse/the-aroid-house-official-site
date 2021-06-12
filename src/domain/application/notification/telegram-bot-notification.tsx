import { MongoTelegramRepo } from "src/domain/infrastructure/MongoTelegramRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { OrderAggregate } from "src/domain/models/aggregates/OrderAggregate";
import { CartItem } from "src/domain/models/entities/CartItem";

interface ITelegramBotNotification {
  orderAggregate: OrderAggregate;
}

export const telegramBotNotification = async ({
  orderAggregate,
}: ITelegramBotNotification) => {
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;
  const { db } = await connectToDatabase();
  const telegramRepo = MongoTelegramRepo.create(db);

  const craftTextFromOrder = (orderAggregate: OrderAggregate) => {
    let message = `🛍 *New Order*\n⏱ ${new Date().toLocaleString()}\n\n`;

    orderAggregate.cart.cartItems.map((cartItem: CartItem) => {
      message = message.concat(
        `➤ ${cartItem.shopItemName} ${cartItem.variant} x ${cartItem.quantity}\n`
      );
    });
    return message;
  };

  // Send message to telegram bot users
  const telegramUsers = await telegramRepo.getAllUsers();
  telegramUsers.forEach(async (user: { chatID: string }) => {
    const message = {
      chat_id: user.chatID,
      text: craftTextFromOrder(orderAggregate),
      parse_mode: "Markdown",
    };

    await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  });

  return Promise.resolve("success");
};
