import {
  chakra,
  Image,
  Flex,
  Center,
  Spacer,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { AddMinus } from "../buttons/AddMinus";
import { BigButton } from "../buttons/BigButton";
import { SizeDropDown } from "../buttons/SizeDropDown";
import { CartContext } from "../../context/CartContext";
import React, { useState, useContext, useEffect } from "react";
import { updateTypePredicateNodeWithModifier } from "typescript";

export const ItemDetails = ({ itemName, itemDescription, itemVariants }) => {
  const toast = useToast();

  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useContext(CartContext);

  const updateID = (e) => {
    setID(itemID);
  };

  const updateName = (e) => {
    setName(itemName);
  };

  const updateSize = (size) => {
    // console.log("i was clicked", size);
    setSize(size);
  };

  const updatePrice = (price) => {
    console.log(price);
    setPrice(price);
  };

  const updateQuantity = (quantity) => {
    // setPrice(e.target.value);
    setQuantity(quantity);
    //console.log(quantity);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (size != "") {
      setItems((prevItems) => [
        ...prevItems,
        { id, name, size, quantity, price },
      ]);
      toast({
        title: "Item added",
        description: "Item successfully added to cart",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "No vairant",
        description: "Please select a variant",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };
  //setName(itemName);

  useEffect(() => {
    // setID(itemID);
    setName(itemName);
  }, []);

  useEffect(() => {
    const relevantVariant = itemVariants.find(
      (variant) => variant.variant == size
    );
    if (!relevantVariant) updatePrice(0);
    if (relevantVariant) updatePrice(quantity * relevantVariant.value);
  }, [size, quantity]);

  return (
    <VStack
      direction="column"
      width={["100vw", "60vw"]}
      padding="5"
      //alignSelf="center"
      align={[null, "center"]}
      spacing="4"
    >
      <chakra.h3
        fontStyle="heading"
        color="background"
        fontSize="3xl"
        fontWeight="bold"
        marginTop="5"
      >
        {itemName}
      </chakra.h3>
      <Text color="background" fontSize="xl" paddingTop="5">
        {itemDescription}
      </Text>
      <Text color="background" fontSize="xl" paddingTop="5">
        Variants:
      </Text>
      <Flex direction="column" justify="space-around">
        {itemVariants.map((variant, i) => {
          return (
            <Flex key={i} direction="row">
              <Text color="background" fontSize="xl">
                {variant.variant}
              </Text>
              <Spacer />
              <Text color="background" fontSize="xl">
                S$ {variant.value}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      <Flex
        direction="column"
        //width={["80vw", "20vw"]}
        justify="space-around"
        paddingTop="3"
      >
        <Flex direction="row" align="center">
          <Text color="background" fontSize="lg">
            Quantity
          </Text>
          <Spacer />
          <AddMinus onChange={updateQuantity} />
        </Flex>
        <Flex direction="row" align="center" paddingTop="3">
          <Text color="background" fontSize="lg">
            Variant
          </Text>
          <Spacer />
          <SizeDropDown variants={itemVariants} onChange={updateSize} />
        </Flex>
      </Flex>
      <Center paddingTop="5">
        <BigButton name={"Add to cart"} onClick={addItem} />
      </Center>
    </VStack>
  );
};
