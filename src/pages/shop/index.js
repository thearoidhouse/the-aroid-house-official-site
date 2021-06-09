import Link from "next/link";

import { Container, Center, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";

import { Header } from "../../components/layout/Header";
import ShopItemCard from "../../components/cards/ShopItemCard";

const Shop = ({ shopItems }) => {
  if (error) return <div>Error</div>;
  if (!shopItems)
    return (
      <Flex
        direction="column"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );

  if (shopItems)
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
