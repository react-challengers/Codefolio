import type { AppProps } from "next/app";
import "@/styles/reset.css";
import "@/styles/global.css";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import GNB from "@/Components/Layouts/GNB";
import { RecoilRoot } from "recoil";

const App = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider theme={theme}>
        <GNB />
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </SessionContextProvider>
  );
};
export default App;
