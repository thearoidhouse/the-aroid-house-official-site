import {
  Flex,
  Center,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { HeaderCheckout } from "../components/layout/HeaderCheckout";
import Details from "../components/checkout/Details";
import Payment from "../components/checkout/Payment";
import { PaymentContext } from "../context/PaymentContext";
import React, { useState, useContext } from "react";

function checkout() {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index) => setTabIndex(index);
  const [paymentItem] = useContext(PaymentContext);

  return (
    <Center backgroundColor="background">
      <Flex width={["full", "60vw"]} height="100vh" direction="column">
        <HeaderCheckout />
        <Flex
          backgroundColor="text"
          height="150vh"
          width="auto"
          borderRadius="20px 20px 0px 0px"
          direction="column"
        >
          <Tabs
            variant="enclosed"
            isFitted
            index={paymentItem.length != 1 ? 1 : 0}
            onChange={handleTabsChange}
          >
            <TabList>
              <Tab
                textColor="background"
                _selected={{ color: "background", bg: "text" }}
                backgroundColor="secondaryBackground"
                borderRadius="20px 0px 0px 0px"
                isDisabled={tabIndex == 1}
              >
                Contact
              </Tab>
              <Tab
                textColor="background"
                _selected={{ color: "background", bg: "text" }}
                backgroundColor="secondaryBackground"
                borderRadius="0px 20px 0px 0px"
                isDisabled={tabIndex == 0}
              >
                Payment
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel color="background">
                <Details />
              </TabPanel>
              <TabPanel color="background" backgroundColor="text">
                <Center>
                  <Payment setTabIndex={setTabIndex} />
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Center>
  );
}

export default checkout;
