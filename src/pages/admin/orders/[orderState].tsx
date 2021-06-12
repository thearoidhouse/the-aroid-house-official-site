import { useRef } from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import useSWR from "swr";

import Wave from "src/components/Wave";
import LeftDrawer from "src/components/admin/LeftDrawer";
import OrderItem from "src/components/OrderItem";

import { OrderAggregate } from "src/domain/models/aggregates/OrderAggregate";

const orderStateColors = {
  PAYMENT_UNCONFIRMED: "blue",
  PAYMENT_CONFIRMED: "orange",
  PACKED: "cyan",
  ON_DELIVERY: "yellow",
  DELIVERED: "green",
  CANCELLED: "red",
};

// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Orders = () => {
  const { orderState } = useRouter().query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const adminControlBtnRef = useRef(null);

  const [session, loading] = useSession();
  const { data, error, mutate } = useSWR(
    session
      ? `/api/order/${orderState}?user=${session.user.name}&email=${session.user.email}`
      : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (loading) return null;
  if (!loading && !session) return <Heading>Only for authorized users</Heading>;
  if (!data)
    return (
      <Flex
        direction="column"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );

  if (data) {
    return (
      <>
        <LeftDrawer
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          adminControlBtnRef={adminControlBtnRef}
        />

        {/* Start of orders page */}
        <Flex direction="column" height="100vh">
          <Box
            position="relative"
            minHeight="225px"
            // @ts-ignore
            background={`${orderStateColors[orderState]}.300`}
          >
            <Wave />
            <Container>
              <Box position="absolute" marginTop="6">
                <Heading fontSize="2xl">{orderState} orders</Heading>

                <Button marginTop="2" ref={adminControlBtnRef} onClick={onOpen}>
                  Admin Control
                </Button>
              </Box>
            </Container>
          </Box>
          <Flex
            direction={["column", "row"]}
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
          >
            {data.map((order: OrderAggregate, i: number) => (
              <OrderItem key={i} order={order} mutate={mutate} />
            ))}
          </Flex>
        </Flex>
      </>
    );
  }
};

export default Orders;
