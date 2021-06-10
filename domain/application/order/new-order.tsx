import { server } from "config";
import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import { CartItem } from "domain/models/entities/CartItem";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";

interface INewOrder {
  orderRepo: IOrderRepo;
  orderAggregate: OrderAggregate;
}

export const newOrder = async ({ orderRepo, orderAggregate }: INewOrder) => {
  // send telegram message
  const craftTextFromOrder = (orderAggregate: OrderAggregate) => {
    let message = `🛍 *New Order*\n⏱ ${new Date().toLocaleString()}\n\n`;

    orderAggregate.cart.cartItems.map((cartItem: CartItem) => {
      message = message.concat(
        `👉 ${cartItem.shopItemName} ${cartItem.variant} x ${cartItem.quantity}\n`
      );
    });
    return message;
  };

  const botMessage = {
    message: {
      chat: {
        id: 12345,
      },
      text: craftTextFromOrder(orderAggregate),
    },
  };

  fetch(`${server}/api/webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(botMessage),
  });

  // send order confirmation email

  return orderRepo.save(orderAggregate);
};
