import { IShopRepo } from "src/domain/models/infrastructure/IShopRepository";
import { ShopAggregate } from "src/domain/models/aggregates/ShopAggregate";
import { ShopItem } from "src/domain/models/entities/ShopItem";

interface IListShopItems {
  shopRepo: IShopRepo;
  shopName: string;
}

export const listShopItemSlugs = async ({
  shopRepo,
  shopName,
}: IListShopItems) => {
  const result = await shopRepo.getOne(shopName);

  const shop = ShopAggregate.create({
    name: result.name,
    shopItems: result.shopItems,
  }).getResult();

  const shopItemSlugs = shop.shopItems.map(
    (shopItem: ShopItem) => shopItem.slug
  );

  return shopItemSlugs;
};
