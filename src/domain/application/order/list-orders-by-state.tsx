import { OrderState } from "src/domain/models/aggregates/OrderAggregate";
import { IOrderRepo } from "src/domain/models/infrastructure/IOrderRepository";

interface IListOrdersByState {
  orderRepo: IOrderRepo;
  orderState: OrderState;
}

export const listOrdersByState = async ({
  orderRepo,
  orderState,
}: IListOrdersByState) => {
  return orderRepo.getOrdersByState(orderState);
};
