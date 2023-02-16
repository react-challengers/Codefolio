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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <GNB />
            <Component {...pageProps} />
          </RecoilRoot>
        </ThemeProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
};
export default App;
