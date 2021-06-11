import React from "react";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export const BigButton = React.forwardRef(function BigButton(props, ref) {
  return (
    <span href={props.href} ref={ref}>
      <MotionButton
        backgroundColor="buttonBackground"
        textColor="background"
        fontSize="lg"
        width={["50vw", "25vw"]}
        _hover={{
          backgroundColor: "buttonBackgroundHover",
        }}
        padding="7"
        borderRadius="5"
        whileHover={{ scale: 1.1 }}
        fontWeight="bold"
        {...props}
      >
        {props.name}
      </MotionButton>
    </span>
  );
});
