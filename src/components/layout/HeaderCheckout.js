import { Flex, Spacer, Heading } from "@chakra-ui/react";

export const HeaderCheckout = () => {
  return (
    <Flex direction="row" padding="5" align="center">
      <Heading fontSize="xl" color="text">
        TheAroidHouse
      </Heading>

      <Spacer />
      <Heading fontSize="lg" color="text">
        Check Out
      </Heading>
    </Flex>
  );
};
