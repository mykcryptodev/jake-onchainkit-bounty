import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains'; 
import { type ReactNode, useState } from 'react';
import { type State, WagmiProvider } from 'wagmi';
 
import {wagmiConfig} from '~/config/wagmi';
import { env } from '~/env';
 
export function OnchainProviders(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());
 
  return (
    <WagmiProvider config={wagmiConfig} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={env.NEXT_PUBLIC_CDP_API_KEY}
          chain={base}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;