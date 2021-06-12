import type { NextApiRequest, NextApiResponse } from "next";

import { MongoOrderRepository } from "src/domain/infrastructure/MongoOrderRepository";
import { connectToDatabase } from "src/libs/mongodb";

import { UniqueEntityID } from "types-ddd";
import { OrderState } from "src/domain/models/aggregates/OrderAggregate";
import { updateOrderState } from "src/domain/application/order/update-order-state";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const orderRepo = MongoOrderRepository.create(db);

  const { orderID, newOrderState } = request.query as unknown as {
    orderID: UniqueEntityID;
    newOrderState: OrderState;
  };

  const result = await updateOrderState({ orderRepo, orderID, newOrderState });

  return response.status(200).json(result);
};
