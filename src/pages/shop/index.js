import Link from "next/link";
import { Box, Center, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Header } from "../../components/layout/Header";
import ShopItemCard from "../../components/cards/ShopItemCard";

const MotionBox = motion(Box);

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
                  <MotionBox
                    key={i}
                    marginBottom="4"
                    marginX="4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link href={`/shop/${item.slug}`} passHref>
                      <ShopItemCard
                        itemName={item.name}
                        value={item.value}
                        mossImage={item.images[0]}
                      />
                    </Link>
                  </MotionBox>
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
  const response = await fetch(
    `https://api.cosmicjs.com/v2/buckets/the-aroid-house-offficial-site-production/objects?pretty=true&query=%7B%22type%22%3A%22shopitems%22%7D&read_key=ah5230JxP2Sp8G6QyEhWrxXdsdwHQPP8rPTPMY5Rfq3RBHnPP7&limit=20&props=slug,metadata,`
  );
  const data = await response.json();
  const objects = data.objects;

  let shopItems = [];
  objects.map((obj) => {
    shopItems.push({
      images: obj.metadata.images.map((imageObj) => imageObj.image.imgix_url),
      name: obj.metadata.name,
      description: obj.metadata.description,
      slug: obj.slug,
      variants: obj.metadata.variants,
      value: obj.metadata.value,
    });
  });

  return {
    props: {
      shopItems,
    },
    // incrementally regenerate every 2 hours
    // seconds * minutes * hours
    revalidate: 60 * 60 * 2,
  };
}
