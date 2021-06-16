import {
  Flex,
  chakra,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

import { SmallButton } from "../buttons/SmallButton";

import { PaymentContext } from "../../context/PaymentContext";
import React, { useState, useContext } from "react";

const Details = () => {
  const toast = useToast();

  const [setPaymentItem] = useContext(PaymentContext);

  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const updateFirstName = (firstName) => {
    setFirstName(firstName);
  };
  const updateLastName = (lastName) => {
    setLastName(lastName);
  };
  const updateEmail = (email) => {
    setEmail(email);
  };
  const updateAddress = (address) => {
    setAddress(address);
  };
  const updatePhone = (phone) => {
    setPhone(phone);
  };

  const addPaymentItem = (e) => {
    if (lastName === "") {
      toast({
        title: "Last name empty",
        description: "Please fill in your last name",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    } else if (email === "") {
      toast({
        title: "Email empty",
        description: "Please fill in your email",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    } else if (address === "") {
      toast({
        title: "Address empty",
        description: "Please fill in your address",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    } else if (phone === "") {
      toast({
        title: "Phone empty",
        description: "Please fill in your phone number",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    } else if (phone !== "") {
      const validPhoneNumber = /[8|9][0-9]{7}$/;
      if (!phone.match(validPhoneNumber)) {
        toast({
          title: "Phone empty",
          description: "Phone number must start with 9 or 8 and have 8 digits",
          status: "warning",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      } else {
        setPaymentItem((prevItems) => [
          ...prevItems,
          { lastName, email, address, phone },
        ]);
      }
    } else {
      toast({
        title: "Something went wrong",
        description:
          "Something went wrong please message marcus on instagram instead",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Flex
      direction="column"
      width={["full", "auto"]}
      height="full"
      paddingX="5"
    >
      <chakra.h3 marginTop="2" fontSize="xl" color="background">
        Contact details
      </chakra.h3>
      <FormControl marginTop="2" id="last-name" isRequired>
        <FormLabel>Full name</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="name"
          value={lastName}
          onChange={(e) => updateLastName(e.target.value)}
          color="text"
        />
      </FormControl>
      <FormControl marginTop="2" id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="Email"
          value={email}
          onChange={(e) => updateEmail(e.target.value)}
          color="text"
        />
      </FormControl>
      <FormControl marginTop="2" id="address" isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="Address"
          value={address}
          onChange={(e) => updateAddress(e.target.value)}
          color="text"
        />
      </FormControl>
      <FormControl marginTop="2" id="phone" isRequired>
        <FormLabel>Phone Number (91234567)</FormLabel>
        <Input
          backgroundColor="background"
          placeholder="91234567"
          value={phone}
          onChange={(e) => updatePhone(e.target.value)}
          color="text"
        />
      </FormControl>
      <Flex marginTop="5" justifyContent="flex-end">
        <SmallButton
          onClick={() => {
            addPaymentItem();
          }}
          name="Next"
        />
      </Flex>
    </Flex>
  );
};
export default Details;
