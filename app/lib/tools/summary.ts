import { getBalance } from "./wallet";
import { getTokens } from "./tokens";
import { analyzeRisk } from "./risk";


export async function getWalletSummary(address:string){


const wallet =
await getBalance(address);


const tokens =
await getTokens(address);


const risk =
await analyzeRisk(address);



return `


BASEPILOT WALLET SUMMARY


Wallet:

${wallet.address}


Network:

Base


ETH Balance:

${wallet.balance} ETH


Token Holdings:


${tokens}


Security:


${risk}



`;

}
