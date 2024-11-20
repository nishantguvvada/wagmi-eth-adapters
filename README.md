# ETH ADAPTERS USING TANSTACK, VIEM AND WAGMI:

# TANSTACK:

- npm i @tanstack/react-query
- global getter function
- new QueryClient()
- Wrap using the QueryClientProvider
- useQuery({ queryKey: ['name'], queryFn: getter })

# VIEM: interacts with RPC nodes of the blockchain

- npm i viem
- import client and use getBalance method

```
    import { createPublicClient, http } from "viem";
    import { sepolia } from 'viem/chains'

    const client = createPublicClient({
    chain: sepolia,
    transport: http()
    })
```

# WAGMI:

- npm add wagmi viem@2.x @tanstack/react-query
- Create a config (projectId not required)
- Wrap the app inside the providers (Both QueryClientProvider and WagmiProvider)
- Create a WalletOptions component (const { connectors, connect } = useConnect())

WAGMI imports :
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, WagmiProvider, useConnect, useAccount, useBalance, useDisconnect, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
