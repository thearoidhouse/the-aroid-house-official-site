import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "domain/models/infrastructure/IOrderRepository";
import { sendGridEmailNotification } from "domain/application/notification/sendgrid-email-notification";
import { telegramBotNotification } from "domain/application/notification/telegram-bot-notification";

interface INewOrder {
  orderRepo: IOrderRepo;
  orderAggregate: OrderAggregate;
}

export const newOrder = async ({ orderRepo, orderAggregate }: INewOrder) => {
  //no matter what save order first
  await orderRepo.save(orderAggregate);

  // send order confirmation email
  await sendGridEmailNotification({ orderAggregate });

  return telegramBotNotification({ orderAggregate });

  // await orderRepo
  //   .save(orderAggregate)
  //   .then((hi) => sendGridEmailNotification({ orderAggregate }))
  //   .then((bye) => telegramBotNotification({ orderAggregate }));

  // // send order confirmation email

  // return;
};
