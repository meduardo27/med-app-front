import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import MainContainer from "@/components/MainContainer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </ChakraProvider>
  );
}
