import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { CartProvider } from "../context/CartContext";
import { PaymentProvider } from "../context/PaymentContext";

import "@fontsource/lora";
import "@fontsource/merriweather";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <PaymentProvider>
        <CartProvider>
          <ChakraProvider resetCSS theme={theme}>
            <ColorModeProvider
              options={{
                useSystemColorMode: true,
              }}
            >
              <Component {...pageProps} />
            </ColorModeProvider>
          </ChakraProvider>
        </CartProvider>
      </PaymentProvider>
    </Provider>
  );
}

export default MyApp;
