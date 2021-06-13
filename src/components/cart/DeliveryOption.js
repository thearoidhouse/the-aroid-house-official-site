import { Flex, Spacer, Checkbox, Divider, Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const DeliveryOption = (props) => {
  const [boxIndex, setBoxIndex] = useState(1);

  return (
    <Box>
      <Flex
        direction="column"
        paddingLeft="5"
        width={["80vw", "auto"]}
        paddingTop="2"
        paddingBottom="2"
        paddingRight={["0", "3"]}
      >
        <Flex direction="row">
          <Checkbox
            color="background"
            colorScheme="yellow"
            size="md"
            onChange={() => {
              setBoxIndex(0);
              props.onChange(0);
            }}
            isChecked={boxIndex == 0}
          >
            Self Collect @ Begonia Drive
          </Checkbox>
          <Spacer />
          <Text fontSize="md" color="background" hidden={boxIndex == 1}>
            SGD 0
          </Text>
        </Flex>
        <Flex direction="row">
          <Checkbox
            color="background"
            size="md"
            colorScheme="yellow"
            onChange={() => {
              setBoxIndex(1);
              props.onChange(1);
            }}
            isChecked={boxIndex == 1}
          >
            Delivery
          </Checkbox>
          <Spacer />

          <Text fontSize="md" color="background" hidden={boxIndex == 0}>
            SGD 10
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </Box>
  );
};
export default DeliveryOption;
