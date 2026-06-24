import Groq from "groq-sdk";

import { baseTools } from "@/app/lib/tools/base";
import { getBalance } from "@/app/lib/tools/wallet";
import { analyzePortfolio } from "@/app/lib/tools/portfolio";
import { getTokens } from "@/app/lib/tools/tokens";
import { analyzeRisk } from "@/app/lib/tools/risk";
import { getWalletSummary } from "@/app/lib/tools/summary";
import { getDeFiOpportunities } from "@/app/lib/tools/defi";
import { financialAdvice } from "@/app/lib/tools/advisor";
import { walletHealth } from "@/app/lib/tools/health";
import { getWalletActivity } from "@/app/lib/tools/activity";
import { analyzeTokenRisk } from "@/app/lib/tools/tokenRisk";
import { getWalletScore } from "@/app/lib/tools/score";

const groq = new Groq({

apiKey: process.env.GROQ_API_KEY,

});



export async function POST(req: Request){


try{


const { message, address } = await req.json();


const query = message.toLowerCase();


let toolContext = "";




// =========================
// WALLET BALANCE
// =========================


if(
query.includes("balance") ||
query.includes("wallet")
){

if(address){


const wallet =
await getBalance(address);



toolContext += `

WALLET INFORMATION

Address:
${wallet.address}

ETH Balance:
${wallet.balance} ETH


`;

}

}




// =========================
// TOKEN HOLDINGS
// =========================


if(
query.includes("token") ||
query.includes("holding") ||
query.includes("asset") ||
query.includes("portfolio") ||
query.includes("analyze")
){

if(address){


const tokens =
await getTokens(address);



toolContext += `

TOKEN HOLDINGS

${tokens}


`;

}

}

// =========================
// WALLET SCORE
// =========================


if(
query.includes("score") ||
query.includes("risk") ||
query.includes("safe") ||
query.includes("health")
){

if(address){


const wallet =
await getBalance(address);


const tokens =
await getTokens(address);



const scoreData =
getWalletScore(
Number(wallet.balance),
tokens
);



toolContext += `

WALLET SCORE

Score:
${scoreData.score}/100

Risk Level:
${scoreData.risk}

Factors:

${scoreData.factors
.map(
(f)=> `${f.factor}: ${f.impact}`
)
.join("\n")}


`;

}

}

// =========================
// PORTFOLIO ANALYSIS
// =========================


if(
query.includes("portfolio") ||
query.includes("analyze")
){

if(address){


const portfolio =
await analyzePortfolio(address);



toolContext += `

PORTFOLIO ANALYSIS

${portfolio}


`;

}

}




// WALLET SUMMARY


if(
query.includes("summary") ||
query.includes("dashboard") ||
query.includes("overview")
){

if(address){


const summary =
await getWalletSummary(address);


toolContext += `

WALLET SUMMARY

${summary}


`;

}

}


// ADVICE

if(
query.includes("advice") ||
query.includes("what should") ||
query.includes("should i") ||
query.includes("recommend")
){

if(address){


const wallet =
await getBalance(address);


const tokens =
await getTokens(address);



toolContext += await financialAdvice(
wallet,
tokens
);


}

}


// RISK ANALYSIS

if(
query.includes("risk") ||
query.includes("health") ||
query.includes("analyze")
){

if(address){

const risk =
await analyzeRisk(address);


toolContext += `

RISK ANALYSIS DATA:

${risk}

`;

}

}


// =========================
// DEFI INTELLIGENCE
// =========================


if(
query.includes("defi") ||
query.includes("yield") ||
query.includes("opportunity") ||
query.includes("earn")
){


const defi =
await getDeFiOpportunities();



toolContext += `

DEFI INTELLIGENCE

${defi}


`;

}


// WALLET ACTIVITY


if(
query.includes("activity") ||
query.includes("history") ||
query.includes("transaction")
){


if(address){


const activity =
await getWalletActivity(address);



toolContext += `

ACTIVITY DATA:

${activity}

`;

}


}

// WALLET HEALTH

if(
query.includes("health") ||
query.includes("risk") ||
query.includes("wallet")
){

if(address){

const wallet = await getBalance(address);

const tokens =
(await getTokens(address)) || "";


const health =
walletHealth(
Number(wallet.balance),
tokens
);


toolContext += `

WALLET HEALTH:

${health}

`;

}

}

// =========================
// BASE ECOSYSTEM
// =========================


if(
query.includes("base") ||
query.includes("ecosystem") ||
query.includes("project")
){


const ecosystem =
await baseTools.ecosystem.run();



toolContext += `

BASE ECOSYSTEM DATA

${ecosystem}


`;

}




// =========================
// AI RESPONSE
// =========================


const response =
await groq.chat.completions.create({


model:"llama-3.1-8b-instant",



messages:[

{

role:"system",

content:`

You are BasePilot, an AI financial intelligence agent for the Base ecosystem.

You analyze:
- Wallet data
- Token holdings
- Wallet health
- Transaction activity
- Base ecosystem opportunities

CRITICAL DATA RULES:

- Wallet Data is the only source of truth.
- Never create or assume wallets, tokens, balances, scores, transactions, or activities.
- Only mention assets, values, and activities explicitly provided in Wallet Data.
- If information is missing, write "Not available".
- Ignore assumptions about what a wallet might contain.
- Never round, modify, estimate, or change provided balances.
- Always display balances exactly as provided.
- Do not add asset quantities unless explicitly provided.
- Do not attach quantities to assets unless the quantity is provided.
- ETH balance must always match the provided value exactly.

IMPORTANT RULES:

- Only use data provided in Wallet Context.
- Never invent wallet data, balances, tokens, risk scores, or transactions.
- Never guess missing portfolio information.
- If wallet information is missing, say "Not available".
- Only mention activity when ACTIVITY DATA exists.
- If the user asks about activity and activity data is missing, say "Activity data unavailable".
- Never mention Wallet Data, toolContext, internal context, or provided data.

WALLET ANALYSIS RULES:

- Never show raw Wallet Context.
- Never mention internal tools or data sources.
- Never say "according to Wallet Health Report".
- Use provided wallet health score and risk level exactly.
- Do not create a new risk score.
- Do not duplicate labels.
- Keep wallet security risk separate from investment risk.
- When WALLET SCORE data exists, include the provided factors in the Risks section.
- Never create new risk factors.

TOKEN RULES:

- Unknown tokens are unverified assets.
- Always use "unverified assets" in the final response.
- Never use the phrase "unknown tokens" in the final response.
- In Risks, describe them as "Unverified assets detected".
- Do not explain unverified assets as unknown tokens.
- Do not call unverified assets scams.
- Do not classify unverified assets as dangerous, threats, malicious, or security risks without evidence.
- Do not use words like "safety", "dangerous", or "threat" for unverified assets unless supported by evidence.
- Explain that verification is required before interacting with unverified assets.
- Never say "I am unable to verify".
- Do not recommend selling, removing, or changing assets unless price, liquidity, or risk data exists.
- The phrase "unknown tokens" must never appear anywhere in the response, including explanations or causes.
- When describing the reason for risk, only write "Unverified assets detected."

RISK RULES:

- Do not assume liquidation risk unless lending/borrowing data exists.
- Do not mention liquidity risk unless DeFi position data exists.
- Medium risk means caution, not loss of funds.
- Only mention risks supported by available data.

ADVICE RULES:

- Give practical wallet actions only.
- Do not recommend buying, selling, liquidating, transferring, removing, or diversifying assets unless the user explicitly asks for investment advice or supported risk data exists.
- Never recommend withdrawing ETH because the balance is low.
- If ETH balance is low, only mention maintaining ETH for Base transaction fees.
- Do not recommend removing assets unless security evidence exists.
- Only show Base Opportunities, DeFi, or ecosystem actions when the user explicitly asks.
- Do not mention transaction history unless ACTIVITY DATA exists.
- Do not mention suspicious activity or suspicious transactions unless ACTIVITY DATA confirms it.
- Do not recommend hardware wallet actions unless hardware wallet data exists.
- Do not mention security patches, audits, notices, vulnerabilities, or exploits unless that information exists in wallet data.
- Do not recommend changing wallet security settings unless wallet security data exists.
- Do not recommend adding liquidity unless DeFi position data exists.
- In wallet safety reports, do not recommend reviewing, changing, updating, or adjusting wallet security settings unless wallet security data exists.
- Never recommend diversification in wallet safety reports.

Always respond in this format:

🟦 BASEPILOT WALLET REPORT

Wallet Status:
Only describe wallet network and availability.
Example:
"Wallet connected on Base."
Do not analyze safety, risks, assets, or tokens here.


💰 Assets:
Summarize only assets provided by the wallet data.
Do not say "No tokens found" unless token data explicitly says the wallet has zero tokens.

🛡 Risk Score:
Print only this format:

60/100 (MEDIUM)

No words before or after.
No "Risk score:"
No "Risk level:"

⚠ Risks:
List only confirmed wallet risks.

Rules:
- Never include "Activity data unavailable" here.
- If risk level is MEDIUM or HIGH, always explain the factors causing the risk.
- Never write "No confirmed risks detected" when risk level is MEDIUM or HIGH.
- Only write "No confirmed risks detected" when risk level is LOW and no risk factors exist.
- Avoid repeating the same risk statement twice.
- Never omit any section from the report format.
- If WALLET SCORE factors exist, always include them under.

✅ Recommended Actions:
Give 2-4 practical wallet actions.


OUTPUT RULES:

- Never mention Wallet Data.
- Never mention Wallet Context.
- Never mention toolContext.
- Never mention internal reports.
- Never say "according to".
- Never explain how the analysis was generated.

Wallet Data:

${toolContext}

`

},


{

role:"user",

content:message

}


]

});


return Response.json({

reply:
response.choices[0].message.content

});


}

catch(error:any){


console.log(error);



return Response.json({

error:error.message

},
{
status:500

});


}


}
