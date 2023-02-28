import type { AppProps } from "next/app";
import "@/styles/reset.css";
import "@/styles/global.css";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { GNB, Footer } from "@/Components/Layouts";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
// import { init } from "@amplitude/analytics-browser";

const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  // Amplitude 실행 시 주석을 풀고 사용하세요.
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, "user@amplitude.com");
  // }, []);

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
              <GNB />
              <Component {...pageProps} />
              <Footer />
            </RecoilRoot>
          </ThemeProvider>
        </SessionContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
export default App;
