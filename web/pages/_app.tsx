import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import WrapApp from "../components/Layout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const tailWindCache = createEmotionCache({
    key: "mantinedevcss",
    prepend: false,
  });
  return (
    <>
      <Head>
        <title>Auction House</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link rel="manifest" href="site.webmanifest" />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
          primaryColor: "indigo",
          fontFamily: "sans-serif",
        }}
        emotionCache={tailWindCache}
      >
        <WrapApp>
          <Component {...pageProps} />
        </WrapApp>
      </MantineProvider>
    </>
  );
}
