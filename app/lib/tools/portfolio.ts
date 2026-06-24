import { getBalance } from "./wallet";
import { getTokens } from "./tokens";


export async function analyzePortfolio(address:string){


const wallet = await getBalance(address);


const tokens = await getTokens(address);



return `

Portfolio Analysis:

Wallet:
${wallet.address}


ETH Balance:
${wallet.balance} ETH


Network:
Base


Token Holdings:

${tokens}


Current Status:
Wallet analysis completed successfully.


Recommendations:
- Maintain ETH for transaction fees
- Review token allocations
- Explore Base DeFi opportunities
- Monitor yield opportunities

`;

}
