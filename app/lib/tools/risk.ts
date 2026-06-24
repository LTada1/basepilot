import { getTokens } from "./tokens";


export async function analyzeRisk(address:string){


const tokens = await getTokens(address);



let riskScore = 100;

let warnings:string[] = [];



// Check unknown tokens

if(tokens.includes("UNKNOWN")){

riskScore -= 30;

warnings.push(
"Unknown tokens detected"
);

}



// Check empty portfolio

if(!tokens || tokens.length === 0){

riskScore -= 20;

warnings.push(
"No major token holdings detected"
);

}



// ETH warning

warnings.push(
"Maintain ETH for Base network gas fees"
);



// Build report


return `

RISK ANALYSIS


Wallet:

${address}


Safety Score:

${riskScore}/100


Warnings:

${warnings.map(
(item)=>"- "+item
).join("\n")}


Recommendation:

- Verify unknown contracts before interacting
- Avoid approving suspicious tokens
- Monitor wallet activity


`;

}
