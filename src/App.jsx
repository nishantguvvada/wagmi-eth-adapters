// import { useEffect, useState } from 'react'
// import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// async function getter() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   const response = await data.json();
//   return response;
// }

// function App() {


//   return (
//     <QueryClientProvider client={queryClient}>
//       <div>
//         <Posts/>
//       </div>
//     </QueryClientProvider>
//   )
// }

// function Posts() {
//   const queryClient = useQueryClient();
//   const { data, isLoading, error} = useQuery({ queryKey: ['posts'], queryFn: getter });

//   if(error) {
//     return <div>error while fetching</div>
//   }

//   if(isLoading) {
//     return <div>Loading...</div>
//   }

//   return <div>
//     {JSON.stringify(data)}
//   </div>
// }

// export default App

// import { createPublicClient, http } from "viem";
// import { sepolia } from 'viem/chains'

// const client = createPublicClient({
//   chain: sepolia,
//   transport: http()
// })

// function App() {
//   async function getBalance() {
//     const res = await client.getBalance({address:"0x241DeF622337146443A51D658309ECE06ef51ACE"});
//     console.log(res);
//   }

//   return (
//     <div><button onClick={getBalance}>Get Balance</button></div>
//   )
// }


// export default App

import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, WagmiProvider, useConnect, useAccount, useBalance, useDisconnect, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

const queryClient = new QueryClient()

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected()
  ],
  transports: {
    [sepolia.id]: http()
  },
})

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector/>
        <EthSend/>
        <Address/>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function Address() {
  const { address } = useAccount();
  const balance = useBalance({address});
  const { disconnect } = useDisconnect()

  return (
    <div>
      <div>{address}</div>
      <div>BALANCE {balance?.data?.formatted}</div>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
    
  )
}

function WalletConnector() {
  const { connectors, connect } = useConnect();
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

function EthSend() {
  const { data: hash, sendTransaction } = useSendTransaction()
  async function sendEth() {
      const to = "0x8987bB40C679B9ce469Ec423Ea1ecA29a8aa20c0";
      const value = "0.01";
      sendTransaction({ to, value: parseEther(value) });
  }
  return (
  <div>
    <input type="text"></input>
    <button onClick={sendEth}>Send</button>
  </div>
  )
}

export default App