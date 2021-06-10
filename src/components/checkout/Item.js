import { Flex, Spacer, Text, Divider } from "@chakra-ui/react";

const Item = (props) => {
  return (
    <Flex direction="column" width={["80vw", "55vw"]} marginBottom="2">
      <Flex direction="row" marginLeft="5" align="center">
        <Text color="background" marginTop="2">
          {props.item.variant} {props.item.shopItemName} x {props.item.quantity}
        </Text>
        <Spacer />
        <Text fontSize="md" color="background">
          S$ {props.item.value}
        </Text>
      </Flex>
    </Flex>
  );
};
export default Item;
