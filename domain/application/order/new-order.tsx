import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";
import { telegramBotNotification } from "../notification/telegram-bot-notification";

interface INewOrder {
  orderRepo: IOrderRepo;
  orderAggregate: OrderAggregate;
}

export const newOrder = async ({ orderRepo, orderAggregate }: INewOrder) => {
  telegramBotNotification({ orderAggregate });

  // send order confirmation email

  return orderRepo.save(orderAggregate);
};
