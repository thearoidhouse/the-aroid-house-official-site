import { Flex, chakra, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { SmallButton } from "../buttons/SmallButton";

const Details = (props) => {
  return (
    <Flex
      direction={["column", "row"]}
      flexWrap="wrap"
      //paddingLeft="2"
      width={["80vw", "60vw"]}
      paddingTop="2"
      paddingBottom="2"
      height="full"
    >
      <chakra.h3 marginTop="2" fontSize="xl" color="background">
        Contact details
      </chakra.h3>
      <FormControl marginTop="2" id="first-name" isRequired>
        <FormLabel>First name</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="First name"
          value={props.firstName}
          onChange={(e) => props.updateFirstName(e.target.value)}
          color="text"
        />
      </FormControl>
      <FormControl marginTop="2" id="last-name" isRequired>
        <FormLabel>Last name</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="Last name"
          value={props.LastName}
          onChange={(e) => props.updateLastName(e.target.value)}
          color="text"
        />
      </FormControl>
      <FormControl marginTop="2" id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="Email"
          value={props.email}
          onChange={(e) => props.updateEmail(e.target.value)}
          color="text"
        />
      </FormControl>
      <FormControl marginTop="2" id="address" isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="Address"
          value={props.address}
          onChange={(e) => props.updateAddress(e.target.value)}
          color="text"
        />
      </FormControl>
      <FormControl marginTop="2" id="phone" isRequired>
        <FormLabel>Phone Number (91234567)</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="91234567"
          value={props.phone}
          onChange={(e) => props.updatePhone(e.target.value)}
          color="text"
        />
      </FormControl>
      <Flex paddingTop="5" justifyContent="flex-end">
        <SmallButton
          onClick={() => {
            props.addPaymentItem();
          }}
          name={"Next"}
        />
      </Flex>
    </Flex>
  );
};
export default Details;
