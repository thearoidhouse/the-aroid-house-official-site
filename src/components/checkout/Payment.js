import React, { useContext } from "react";
import { Box, chakra, Divider, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";

import Item from "./Item";
import { PaymentContext } from "../../context/PaymentContext";
import { SmallButton } from "../buttons/SmallButton";

import { Customer } from "domain/models/entities/Customer";

const Payment = (props) => {
  var name = "";
  var email = "";
  var address = "";
  var number = 0;
  var hello = [];

  var delivery = 0;

  const [paymentItem, setPaymentItem] = useContext(PaymentContext);

  const handleOrderSubmit = () => {
    const firstName = paymentItem[1].firstName;
    const lastName = paymentItem[1].lastName;
    const phoneNumber = paymentItem[1].phone;
    const email = paymentItem[1].email;
    const address = paymentItem[1].address;

    const customer = Customer.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
    }).getResult();

    const isSelfCollect = paymentItem[0].deliveryCost == 0;
  };

  const handleRemove = () => {
    const newList = paymentItem.filter(
      (item) => paymentItem.indexOf(item) !== 1
    );

    setPaymentItem(newList);
  };

  if (paymentItem.length == 2) {
    name = paymentItem[1].firstName + " " + paymentItem[1].lastName;
    email = paymentItem[1].email;
    address = paymentItem[1].address;
    number = paymentItem[1].phone;
    delivery = paymentItem[0].deliveryCost;
    hello = paymentItem[0].items;
  }

  return (
    <Flex
      direction="column"
      paddingLeft={["5", "0"]}
      paddingTop="2"
      paddingBottom="2"
      height="full"
      width={["100vw", "55vw"]}
    >
      <Flex direction={["column", "row"]}>
        <chakra.h3 fontSize="lg" color="background" textDecoration="underline">
          Name
        </chakra.h3>
        <Spacer />
        <chakra.h3 fontSize="md" color="background" padding="2">
          {name}
        </chakra.h3>
      </Flex>
      <Flex direction={["column", "row"]}>
        <chakra.h3 fontSize="lg" color="background" textDecoration="underline">
          Contact number
        </chakra.h3>
        <Spacer />
        <chakra.h3 fontSize="md" color="background" padding="2">
          {number}
        </chakra.h3>
      </Flex>
      <Flex direction={["column", "row"]}>
        <chakra.h3 fontSize="lg" color="background" textDecoration="underline">
          Email
        </chakra.h3>
        <Spacer />
        <Box fontSize="md" color="background" padding="2">
          {email}
        </Box>
      </Flex>
      <Flex direction={["column", "row"]}>
        <chakra.h3 fontSize="lg" color="background" textDecoration="underline">
          Address
        </chakra.h3>
        <Spacer />
        <Box fontSize="md" color="background" padding="2">
          {address}
        </Box>
      </Flex>
      <chakra.h3 fontSize="xl" color="background">
        Items
      </chakra.h3>
      <Divider width={["80vw", "55vw"]} />

      {hello.map((item, i) => {
        return <Item item={item} key={i} index={i} />;
      })}
      <Flex direction="row" paddingBottom="2" width={["80vw", "55vw"]}>
        <chakra.h3 color="background" fontSize="lg">
          Delivery
        </chakra.h3>
        <Spacer />
        <chakra.h3 fontSize="md" color="background">
          ${delivery}
        </chakra.h3>
      </Flex>
      <Divider width={["80vw", "55vw"]} />
      <Flex direction="row" paddingTop="2" width={["80vw", "55vw"]}>
        <chakra.h3 fontSize="lg" color="background">
          Total
        </chakra.h3>
        <Spacer />
        <chakra.h3 fontSize="md" color="background">
          $
          {hello.reduce((accumulator, cartItem) => {
            return accumulator + cartItem.value;
          }, 0) + delivery}
        </chakra.h3>
      </Flex>

      <Flex
        direction="row"
        paddingTop="5"
        paddingRight="5"
        justifyContent="space-between"
      >
        <SmallButton
          name={"Back"}
          onClick={() => {
            props.setTabIndex(0);
            handleRemove();
          }}
        />
        <Link href="/thankyou">
          <SmallButton name={"Finish"} onClick={() => handleOrderSubmit()} />
        </Link>
      </Flex>
    </Flex>
  );
};
export default Payment;
