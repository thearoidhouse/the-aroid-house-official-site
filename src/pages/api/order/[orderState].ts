import type { NextApiRequest, NextApiResponse } from "next";

import { MongoOrderRepository } from "domain/infrastructure/MongoOrderRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { OrderState } from "domain/models/aggregates/OrderAggregate";
import { listOrdersByState } from "domain/application/order/list-orders-by-state";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    orderState: orderStateQuery,
    user,
    email,
  } = request.query as {
    orderState: string;
    user: string;
    email: string;
  };

  if (user != process.env.USERNAMES)
    return response.status(401).send("only for authorized users");
  if (email != process.env.ADMIN_EMAIL)
    return response.status(401).send("only for authorized users");

  const { db } = await connectToDatabase();
  const orderRepo = MongoOrderRepository.create(db);

  const orderState = orderStateQuery.toUpperCase() as OrderState;

  const result = await listOrdersByState({
    orderRepo,
    orderState,
  });

  if (!result)
    return response.status(404).json(`${orderStateQuery} are not found`);

  return response.status(200).json(result);
};
