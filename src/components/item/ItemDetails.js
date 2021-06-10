import {
  chakra,
  Flex,
  Center,
  Spacer,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import "react-medium-image-zoom/dist/styles.css";
import { AddMinus } from "../buttons/AddMinus";
import { BigButton } from "../buttons/BigButton";
import { SizeDropDown } from "../buttons/SizeDropDown";
import { CartContext } from "../../context/CartContext";
import React, { useState, useContext, useEffect } from "react";

export const ItemDetails = ({
  shopItemName,
  shopItemDescription,
  shopItemVariants,
  shopItemSlug,
}) => {
  const toast = useToast();

  const [variant, setVariant] = useState("");
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [_, setItems] = useContext(CartContext);

  const updateID = (e) => {
    setID(itemID);
  };

  const updateVariant = (variant) => {
    setVariant(variant);
  };

  const updateValue = (value) => {
    setValue(value);
  };

  const updateQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const addItem = (e) => {
    if (variant != "") {
      setItems((prevItems) => [
        ...prevItems,
        { shopItemName, variant, quantity, value, shopItemSlug },
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

  useEffect(() => {
    const relevantVariant = shopItemVariants.find(
      (itemVariant) => itemVariant.variant == variant
    );
    if (!relevantVariant) updateValue(0);
    if (relevantVariant) updateValue(quantity * relevantVariant.value);
  }, [variant, quantity]);

  return (
    <VStack
      direction="column"
      width={["100vw", "60vw"]}
      paddingX="10"
      padding="5"
      spacing="4"
      align="null"
    >
      <Text
        fontStyle="heading"
        color="background"
        fontSize="3xl"
        fontWeight="bold"
        marginTop="5"
      >
        {shopItemName}
      </Text>
      <Text color="background" fontSize="xl" paddingTop="5">
        {shopItemDescription}
      </Text>
      <Text color="background" fontSize="xl" paddingTop="5">
        Variants:
      </Text>
      <Flex direction="column" justify="space-around">
        {shopItemVariants.map((variant, i) => {
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
      <Flex direction="column" justify="space-around" paddingTop="3">
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
          <SizeDropDown variants={shopItemVariants} onChange={updateVariant} />
        </Flex>
      </Flex>
      <Center paddingTop="5">
        <BigButton name={"Add to cart"} onClick={addItem} />
      </Center>
    </VStack>
  );
};
