import { ShopAggregate } from "src/domain/models/aggregates/ShopAggregate";
import { IShopRepo } from "src/domain/models/infrastructure/IShopRepository";

interface IAddShop {
  shopRepo: IShopRepo;
  shop: ShopAggregate;
}

export const addShop = async ({ shopRepo, shop }: IAddShop) => {
  return await shopRepo.save(shop);
};
