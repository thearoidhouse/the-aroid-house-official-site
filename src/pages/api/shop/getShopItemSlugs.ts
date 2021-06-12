import type { NextApiRequest, NextApiResponse } from "next";

import { MongoShopRepository } from "src/domain/infrastructure/MongoShopRepository";
import { connectToDatabase } from "src/libs/mongodb";
import { listShopItemSlugs } from "src/domain/application/shop/list-shop-item-slugs";

module.exports = async (_: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const shopRepo = MongoShopRepository.create(db);

  const result = await listShopItemSlugs({
    shopRepo,
    shopName: "TheAroyHouse",
  });

  response.status(200).json(result);
};
