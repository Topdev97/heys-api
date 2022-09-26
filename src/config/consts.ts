

export const DEPLOYED_NETWORK: number = process.env.DEPLOYED_NETWORK
  ? Number(process.env.DEPLOYED_NETWORK)
  : 80001

export const GATHERING_ADDRESSES = {
  'blockchain-gathering': '0x10593824C9E42aae471BAA008a746D9D1C6E06bE',
}

export const RPC_URLS: Record<number, string> = {
  80001: 'https://rpc-mumbai.maticvigil.com',
}

export const RPC_URL = RPC_URLS[DEPLOYED_NETWORK]