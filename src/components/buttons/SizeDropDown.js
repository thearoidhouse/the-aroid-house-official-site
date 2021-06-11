import { FormControl, Select } from "@chakra-ui/react";

export const SizeDropDown = (props) => {
  return (
    <FormControl id="variant" borderRadius="5" width="auto">
      <Select
        placeholder="Select size"
        backgroundColor="buttonBackground"
        color="text"
        fontWeight="bold"
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.variants.map((variant, i) => {
          return (
            <option value={variant.variant} key={i}>
              {variant.variant}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};
