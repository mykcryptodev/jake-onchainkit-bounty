import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "~/utils/api";
import '@coinbase/onchainkit/styles.css';

import "~/styles/globals.css";
import { OnchainProviders } from "./providers/OnchainProviders";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <OnchainProviders>
        <Component {...pageProps} />
      </OnchainProviders>
    </div>
  );
};

export default api.withTRPC(MyApp);
