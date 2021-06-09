import Link from "next/link";
import { server } from "config.js";

import { Container, Center, Flex, SimpleGrid } from "@chakra-ui/react";

import { Header } from "../../components/layout/Header";
import ShopItemCard from "../../components/cards/ShopItemCard";

const Shop = ({ shopItems }) => {
  return (
    <Center backgroundColor="background">
      <Flex
        direction="column"
        width={["100vw", "60vw"]}
        backgroundColor="background"
      >
        <Header />
        <Container marginTop="6">
          <SimpleGrid
            //direction={["column", "row"]}
            //w={["100vw"]}
            alignItems="center"
            justifyContent="center"
            //spacing="6"
            columns={[1, 2, 2]}
            spacingX="350"
            spacingY="6"
            marginRight={["0", "80"]}
          >
            {shopItems.map((item, i) => {
              return (
                <Link href={`/shop/${item.slug}`} key={i} passHref>
                  <ShopItemCard itemName={item.name} value={item.value} />
                </Link>
              );
            })}
          </SimpleGrid>
        </Container>
      </Flex>
    </Center>
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
  const shopItems = await response.json();

  return {
    props: { shopItems },
  };
}
