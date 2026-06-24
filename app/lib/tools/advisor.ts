export async function financialAdvice(
wallet:any,
tokens:string
){

return `

FINANCIAL ADVISOR REPORT


Wallet:

${wallet.address}


ETH:

${wallet.balance} ETH


Token Data:

${tokens}


Advice:

1. Maintain ETH balance for Base transactions.

2. Review unknown tokens before interacting.

3. Avoid approving unknown contracts.

4. Explore Base DeFi carefully.

5. Monitor portfolio changes.


`;

}
