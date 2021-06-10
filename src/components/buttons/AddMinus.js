import { HStack, Button, Input, useNumberInput } from "@chakra-ui/react";

export const AddMinus = (props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      onChange: (_, valueAsNumber) => props.onChange(valueAsNumber),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  return (
    <HStack maxW="180px" borderRadius="5">
      <Button
        backgroundColor="buttonBackground"
        color="background"
        fontWeight="bold"
        {...dec}
      >
        -
      </Button>

      <Input backgroundColor="background" {...input} />

      <Button
        backgroundColor="buttonBackground"
        color="background"
        fontWeight="bold"
        {...inc}
      >
        +
      </Button>
    </HStack>
  );
};
