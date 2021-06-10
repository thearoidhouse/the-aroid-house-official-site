import Link from "next/link";
import { server } from "config.js";

import { Box, Center, Flex } from "@chakra-ui/react";

import { Header } from "../../components/layout/Header";
import ShopItemCard from "../../components/cards/ShopItemCard";

const Shop = ({ shopItems }) => {
  return (
    <Box height="100vh" backgroundColor="background">
      <Flex direction="column" height="auto" backgroundColor="background">
        <Center>
          <Flex direction="column" width={["100vw", "60vw"]}>
            <Header />
            <Flex
              direction={["column", "row"]}
              justifyContent="space-around"
              flexWrap="wrap"
            >
              {shopItems.map((item, i) => {
                return (
                  <Box key={i} marginBottom="4" marginX="4">
                    <Link href={`/shop/${item.slug}`} passHref>
                      <ShopItemCard
                        itemName={item.name}
                        value={item.value}
                        mossImage={item.images[0]}
                      />
                    </Link>
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        </Center>
      </Flex>
    </Box>
  );
};

export default Shop;

export async function getStaticProps() {
  const response = await fetch(`${server}/api/shop`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let shopItems = await response.json();

  if (!shopItems)
    shopItems = [{ name: "Moss Plant", value: 20, slug: "moss-plant" }];

  return {
    props: { shopItems },
  };
}
