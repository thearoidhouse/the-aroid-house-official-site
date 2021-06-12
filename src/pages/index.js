import { Text, Flex, Heading } from "@chakra-ui/react";
import { React } from "react";
import Link from "next/link";
import { Link as Link2 } from "@chakra-ui/react";

import { BigButton } from "../components/buttons/BigButton";
import Landing from "../components/Landing";

const Index = () => (
  <Flex
    height="110vh"
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

    <Landing marginTop="10" />

    <Text marginTop="4" fontSize="xl" color="text">
      Trying to make gardening simple.
    </Text>

    <Link href="/shop">
      <BigButton marginTop="10" name="Shop now" />
    </Link>

    <Link2
      href="https://www.instagram.com/stories/highlights/17915975803718459/"
      isExternal
      _hover=""
    >
      <BigButton marginTop="5" name="Reviews" />
    </Link2>
  </Flex>
);

export default Index;
