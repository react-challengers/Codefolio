import type { AppProps } from "next/app";
import "@/styles/reset.css";
import "@/styles/global.css";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { GNB, Footer } from "@/Components/Layouts";
import { RecoilRoot } from "recoil";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { init } from "@amplitude/analytics-browser";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // globally default to 60 seconds
      staleTime: 1000 * 60,
    },
  },
});

const App = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
  dehydratedState: DehydratedState;
}>) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, "user@amplitude.com");
  }, []);

  return (
    <>
      <Head>
        <title>Codefolio</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          <ThemeProvider theme={theme}>
            <RecoilRoot>
              <Hydrate state={pageProps.dehydratedState}>
                <GNB />
                <div data-color-mode="dark">
                  <Component {...pageProps} />
                </div>
                <Footer />
                <Analytics />
              </Hydrate>
            </RecoilRoot>
          </ThemeProvider>
        </SessionContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
export default App;
