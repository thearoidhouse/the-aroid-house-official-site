import {
  Text,
  Flex,
  Heading,
  Center,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

import { BigButton } from "../components/buttons/BigButton";
import Landing from "../components/Landing";
import { ItemCarousel } from "../components/item/ItemCarousel";

const Index = ({ testimonialImages }) => (
  <Flex
    height="auto"
    direction="column"
    alignItems="center"
    backgroundColor="background"
  >
    <Heading marginTop="20" color="text">
      TheAroidHouse
    </Heading>
    <Flex direction="row" marginTop="5">
      <Heading color="text" fontSize="xl">
        by{""}
      </Heading>
      <ChakraLink href="https://www.instagram.com/marcusonaroids/" isExternal>
        <Heading color="text" fontSize="xl">
          @marcusonaroids
        </Heading>
      </ChakraLink>
    </Flex>

    <Landing marginTop="10" />

    <Text marginTop="4" fontSize="xl" color="text">
      Trying to make gardening simple.
    </Text>

    <Link href="/shop">
      <BigButton marginTop="10" name="Shop now" />
    </Link>

    <Heading marginTop="10" fontSize="2xl" color="text">
      Reviews
    </Heading>
    <Center maxWidth={["100vw", "70vw", "50vw"]} marginTop="10">
      <ItemCarousel images={testimonialImages} />
    </Center>
  </Flex>
);

export default Index;

export async function getStaticProps() {
  const response = await fetch(`${process.env.COSMIC_TESTIMONIAL}`);
  const data = await response.json();
  const cosmicImages = data.objects.metadata.images;

  let testimonialImages = [];
  cosmicImages.map((img) => {
    testimonialImages.push(img.image.imgix_url);
  });

  return {
    props: {
      testimonialImages,
    },
    // incrementally regenerate every 2 hours
    // seconds * minutes * hours
    revalidate: 60 * 60 * 2,
  };
}
