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
  const response = await fetch(
    `https://api.cosmicjs.com/v2/buckets/danny-testing/objects/60c764902169a900086ca935?pretty=true&read_key=83i3GSGW9cqnXYFv3gp9ijljgUcNIjB7lXEp2JIVYaykZTpuB7&props=metadata,`
  );
  const data = await response.json();
  const cosmicImages = data.object.metadata.images;

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
