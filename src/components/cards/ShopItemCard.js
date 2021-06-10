import React from "react";
import { Image, Box, Flex, chakra, Text } from "@chakra-ui/react";

const ShopItemIndividualCard = React.forwardRef(function ShopItemIndividualCard(
  { itemName, value, mossImage, onClick, href },
  ref
) {
  return (
    <span href={href} onClick={onClick} ref={ref}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="2xs"
        mx="auto"
        _hover={{ cursor: "pointer" }}
      >
        <chakra.span
          bg="gray.300"
          h="full"
          w="full"
          rounded="lg"
          shadow="md"
          overflow="hidden"
        >
          <Image width="100%" height="100%" src={mossImage} />
        </chakra.span>

        <Box
          width="auto"
          marginTop={-10}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          backgroundColor="background"
        >
          <chakra.h3
            px={4}
            py={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing={1}
            textColor="text"
          >
            {itemName}
          </chakra.h3>

          <Flex
            justifyContent="center"
            px={4}
            py={2}
            backgroundColor="secondaryBackground"
          >
            <Text fontWeight="bold" textColor="text">
              From S${value}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </span>
  );
});

export default ShopItemIndividualCard;
