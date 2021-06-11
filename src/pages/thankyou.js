import { Flex, Text, Center } from "@chakra-ui/react";

import Link from "next/link";
import { HeaderCheckout } from "../components/layout/HeaderCheckout";
import ThankyouAnimation from "../components/ThankyouAnimation";
import { BigButton } from "../components/buttons/BigButton";

function thankyou() {
  return (
    <Center backgroundColor="background">
      <Flex
        height="100vh"
        direction="column"
        backgroundColor="background"
        direction="column"
        width={["100vw", "60vw"]}
      >
        <HeaderCheckout />
        <Flex
          backgroundColor="text"
          height="full"
          borderRadius="20px 20px 0px 0px"
          direction="column"
          padding="5"
          align="center"
        >
          <Text marginTop="4" fontSize="xl" color="background" align="center">
            Thank you for supporting TheAroidHouse! Marcus will be contacting
            you shortly.
          </Text>

          <ThankyouAnimation />

          <Text marginTop="4" fontSize="xl" color="background">
            Kindly check your email for your invoice.
          </Text>

          <Link href="/shop">
            <BigButton marginTop="10" name={"Back to shop"} />
          </Link>
        </Flex>
      </Flex>
    </Center>
  );
}

export default thankyou;
