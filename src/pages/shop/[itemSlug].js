import { useRouter } from "next/router";
import useSWR from "swr";

import { Center, Flex, Box, Spinner } from "@chakra-ui/react";

import { Header } from "../../components/layout/Header";
import { ItemCarousel } from "../../components/item/ItemCarousel";
import { ItemDetails } from "../../components/item/ItemDetails";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function ItemSlug() {
  const { itemSlug } = useRouter().query;
  const { data, error } = useSWR(`/api/shop/${itemSlug}`, fetcher);

  if (error) return <div>failed to load</div>;
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

  if (data)
    return (
      <Center backgroundColor="background">
        <Flex
          height="100vh"
          direction="column"
          //alignContent="center"
          backgroundColor="background"
          width={["100vw", "60vw"]}
        >
          <Header />
          <Center>
            <ItemCarousel />
          </Center>
          <Flex
            backgroundColor="text"
            height="full"
            borderRadius="20px 20px 0px 0px"
            direction="column"
            //padding="5"
            //marginTop="10"
          >
            <ItemDetails
              shopItemName={data.name}
              shopItemDescription={data.description}
              shopItemVariants={data.variants}
              shopItemSlug={data.slug}
            />
          </Flex>
        </Flex>
      </Center>
    );
}

export default ItemSlug;
