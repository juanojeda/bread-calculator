import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/Layout";

export default function App({Component, pageProps}: AppProps) {
  
    return (
      <>
        <Head>
          <title>Bread Calculator</title>
          <meta name="theme-color" content="#ffffff" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,400;0,800;1,100;1,400;1,800&family=Merriweather:ital,wght@0,300;0,400;0,900;1,300;1,400;1,900&display=swap" rel="stylesheet" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
}
