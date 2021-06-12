import { UniqueEntityID } from "types-ddd/dist/src";
import { OrderAggregate, OrderState } from "../aggregates/OrderAggregate";

export interface IOrderRepo {
  // write
  save(order: OrderAggregate): void;
  update(order: OrderAggregate): void;
  delete(order: OrderAggregate): Promise<boolean>;

  // read
  getAll(): Promise<OrderAggregate[]>;
  getOrdersByState(orderState: OrderState): Promise<OrderAggregate[]>;
  getOne(orderID: UniqueEntityID): Promise<OrderAggregate>;
}
