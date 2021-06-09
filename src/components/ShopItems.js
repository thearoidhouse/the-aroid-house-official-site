import Link from "next/link";
import { Container, SimpleGrid } from "@chakra-ui/react";

import ShopItemCard from "./cards/ShopItemCard";

const ShopItems = () => {
  return (
    <Container marginTop="6">
      <SimpleGrid
        alignItems="center"
        justifyContent="center"
        columns={[1, 2, 2]}
        spacingX="350"
        spacingY="6"
        marginRight={["0", "80"]}
      >
        <Link href="/shop/itemTitle" passHref>
          <ShopItemCard />
        </Link>
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
        <ShopItemCard />
      </SimpleGrid>
    </Container>
  );
};

export default ShopItems;
