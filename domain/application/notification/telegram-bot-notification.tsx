import { server } from "config";
import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import { CartItem } from "domain/models/entities/CartItem";

interface ITelegramBotNotification {
  orderAggregate: OrderAggregate;
}

export const telegramBotNotification = async ({
  orderAggregate,
}: ITelegramBotNotification) => {
  const craftTextFromOrder = (orderAggregate: OrderAggregate) => {
    let message = `🛍 *New Order*\n⏱ ${new Date().toLocaleString()}\n\n`;

    orderAggregate.cart.cartItems.map((cartItem: CartItem) => {
      message = message.concat(
        `➤ ${cartItem.shopItemName} ${cartItem.variant} x ${cartItem.quantity}\n`
      );
    });
    return message;
  };

  const botMessage = {
    message: {
      chat: {
        id: 12345, // this can be number, we don't care about this
      },
      text: craftTextFromOrder(orderAggregate),
    },
  };

  const response = await fetch(`${server}/api/webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(botMessage),
  });

  return response;
};
