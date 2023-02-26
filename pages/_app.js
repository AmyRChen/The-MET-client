import "@/styles/globals.css";
import "@/styles/bootstrap.min.css";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}
