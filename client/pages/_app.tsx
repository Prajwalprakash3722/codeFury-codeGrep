import "../styles/globals.css";

import { MantineProvider, MantineThemeOverride } from "@mantine/core";

import type { AppProps } from "next/app";
import { AuthProvider } from "../hooks/auth";
import WrapApp from "../components/NavBar";

const theme: MantineThemeOverride = {
  colorScheme: "light",
  primaryColor: "indigo",
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Greycliff CF, sans-serif' },
};



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={theme}
      // Done to avoid Tailwind CSS Class Clashes
      emotionOptions={{ key: "mantinedevcss", prepend: false }}
    >
      <AuthProvider>
          <WrapApp>
            <Component {...pageProps} />
          </WrapApp>
      </AuthProvider>
    </MantineProvider>);
}
export default MyApp;
