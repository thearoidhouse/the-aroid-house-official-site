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

const images = [
  "https://images.unsplash.com/photo-1610906403539-eba004635227?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1458410489211-ba19aa2f2902?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1579256353657-12115ca794b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1591534446608-95420ad57d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1590452676666-2341e3587c18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1598856671883-21156cd776a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1583340161290-5ab7db412816?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1583378733378-3fee25067954?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1598856668774-f3a5f4dfdc89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
];

const Index = () => (
  <Flex
    //height="110vh"
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

    <ChakraLink
      href="https://www.instagram.com/stories/highlights/17915975803718459/"
      isExternal
      _hover=""
    >
      <BigButton marginTop="5" name="Reviews" />
    </ChakraLink>
    <Center maxWidth={["100vw", "70vw", "50vw"]} marginTop="10">
      <ItemCarousel images={images} />
    </Center>
  </Flex>
);

export default Index;
