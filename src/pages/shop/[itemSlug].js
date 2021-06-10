import { server } from "config.js";
import { Center, Flex } from "@chakra-ui/react";

import { Header } from "../../components/layout/Header";
import { ItemCarousel } from "../../components/item/ItemCarousel";
import { ItemDetails } from "../../components/item/ItemDetails";

function ItemSlug({ itemDetails }) {
  return (
    <Center backgroundColor="background">
      <Flex
        direction="column"
        backgroundColor="background"
        width={["100vw", "60vw"]}
      >
        <Header />

        <Center>
          <ItemCarousel images={itemDetails.images} />
        </Center>

        <Flex
          backgroundColor="text"
          height="full"
          borderRadius="20px 20px 0px 0px"
          direction="column"
          paddingBottom="8"
          marginTop="4"
        >
          <ItemDetails
            shopItemName={itemDetails.name}
            shopItemDescription={itemDetails.description}
            shopItemVariants={itemDetails.variants}
            shopItemSlug={itemDetails.slug}
          />
        </Flex>
      </Flex>
    </Center>
  );
}

export default ItemSlug;

export async function getStaticPaths() {
  const response = await fetch(`${server}/api/shop/getShopItemSlugs`);
  const slugs = await response.json();

  const paths = slugs.map((slug) => ({ params: { itemSlug: slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`${server}/api/shop/${params.itemSlug}`);
  const itemDetails = await response.json();

  return { props: { itemDetails } };
}
