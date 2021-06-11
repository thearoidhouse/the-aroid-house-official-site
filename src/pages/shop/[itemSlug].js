import { Center, Flex, Box } from "@chakra-ui/react";

import { Header } from "../../components/layout/Header";
import { ItemCarousel } from "../../components/item/ItemCarousel";
import { ItemDetails } from "../../components/item/ItemDetails";

function ItemSlug({ itemDetails }) {
  return (
    <Box backgroundColor="background">
      <Center>
        <Flex
          direction="column"
          backgroundColor="background"
          width={["100vw", "60vw"]}
          height="auto"
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
    </Box>
  );
}

export default ItemSlug;

export async function getStaticPaths() {
  const response = await fetch(
    "https://api.cosmicjs.com/v2/buckets/the-aroid-house-offficial-site-production/objects?pretty=true&query=%7B%22type%22%3A%22shopitems%22%7D&read_key=ah5230JxP2Sp8G6QyEhWrxXdsdwHQPP8rPTPMY5Rfq3RBHnPP7&limit=20&props=slug"
  );
  const data = await response.json();
  const slugs = data.objects.map((item) => item.slug);

  const paths = slugs.map((slug) => ({ params: { itemSlug: slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://api.cosmicjs.com/v2/buckets/the-aroid-house-offficial-site-production/objects?pretty=true&read_key=ah5230JxP2Sp8G6QyEhWrxXdsdwHQPP8rPTPMY5Rfq3RBHnPP7&query=%7B%22slug%22%3A%22${params.itemSlug}%22%7D&props=slug,metadata`
  );
  const data = await response.json();
  const metadata = data.objects[0].metadata;
  const itemDetails = {
    images: metadata.images.map((imageObj) => imageObj.image.imgix_url),
    name: metadata.name,
    description: metadata.description,
    slug: params.itemSlug,
    variants: metadata.variants,
    value: metadata.value,
  };

  return { props: { itemDetails } };
}
