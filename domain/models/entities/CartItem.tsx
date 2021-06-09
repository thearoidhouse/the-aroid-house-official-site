import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";

interface CartItemProps extends BaseDomainEntity {
  shopItemName: string;
  shopItemSlug: string;
  quantity: number;
  variant?: string;
  value: number;
}

export class CartItem extends Entity<CartItemProps> {
  public shopItemName: string;
  public shopItemSlug: string;
  public quantity: number;
  public variant?: string;
  public value: number;

  private constructor(props: CartItemProps, id?: UniqueEntityID) {
    super(props, id);
    this.shopItemName = props.shopItemName;
    this.shopItemSlug = props.shopItemSlug;
    this.quantity = props.quantity;
    this.variant = props.variant;
    this.value = props.value;
  }

  public static create(
    props: CartItemProps,
    id?: UniqueEntityID
  ): Result<CartItem> {
    if (
      !props.shopItemName &&
      !props.shopItemSlug &&
      !props.quantity &&
      !props.variant &&
      !props.value
    ) {
      return Result.fail<CartItem>(
        "Required details for cart item is not provided"
      );
    }

    return Result.ok<CartItem>(new CartItem(props, id));
  }
}
