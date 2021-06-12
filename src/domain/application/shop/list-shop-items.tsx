import { IShopRepo } from "src/domain/models/infrastructure/IShopRepository";
import { ShopAggregate } from "src/domain/models/aggregates/ShopAggregate";

interface IListShopItems {
  shopRepo: IShopRepo;
  shopName: string;
}

export const listShopItems = async ({ shopRepo, shopName }: IListShopItems) => {
  let shop = await shopRepo.getOne(shopName);

  shop = ShopAggregate.create({
    name: shop.name,
    shopItems: shop.shopItems,
  }).getResult();

  return shop.shopItems;
};
