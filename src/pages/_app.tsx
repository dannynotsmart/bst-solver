import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet='UTF-8'/>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
      <link rel="icon" href="/assets/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>;
}
