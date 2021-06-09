import { Box, Icon } from "@chakra-ui/react";
import { ImCross } from "react-icons/im";

const DeleteButton = (props) => {
  return (
    <Box color="background" as="button" onClick={props.onClick}>
      <Icon as={ImCross} w="3" h="3" />
    </Box>
  );
};
export default DeleteButton;
