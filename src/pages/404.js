import { Text, Flex, Heading, Link as Link2 } from "@chakra-ui/react";
import Link from "next/link";

import { BigButton } from "../components/buttons/BigButton";
import NotFoundAnimation from "../components/NotFoundAnimation";

const Custom404 = () => (
  <Flex
    height="100vh"
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
      <Link2 href="https://www.instagram.com/marcusonaroids/" isExternal>
        <Heading color="text" fontSize="xl">
          @marcusonaroids
        </Heading>
      </Link2>
    </Flex>

    <NotFoundAnimation marginTop="10" />

    <Text marginTop="4" fontSize="xl" color="text">
      We can't find the page you are trying to visit
    </Text>

    <Link href="/shop">
      <BigButton marginTop="10" name="To shop" />
    </Link>
  </Flex>
);

export default Custom404;
