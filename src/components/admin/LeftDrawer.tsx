import { FC } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";

import Link from "next/link";

const orderStateColors = {
  PAYMENT_UNCONFIRMED: "blue",
  PAYMENT_CONFIRMED: "orange",
  PACKED: "cyan",
  ON_DELIVERY: "yellow",
  DELIVERED: "green",
  CANCELLED: "red",
};

type Props = {
  isOpen;
  onOpen;
  onClose;
  adminControlBtnRef;
};

const LeftDrawer: FC<Props> = ({
  isOpen,
  onOpen,
  onClose,
  adminControlBtnRef,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={adminControlBtnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Admin Control</DrawerHeader>

        <DrawerBody>
          <VStack alignItems="flex-start">
            {Object.keys(orderStateColors).map((oState: string, i: number) => {
              return (
                <Link key={i} href={`/admin/orders/${oState}`} replace>
                  <Button
                    colorScheme={orderStateColors[oState]}
                    onClick={onClose}
                  >
                    {oState}
                  </Button>
                </Link>
              );
            })}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default LeftDrawer;
