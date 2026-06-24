export function walletHealth(
balance:number,
tokens:string = ""
){

let score = 100;


// ETH CHECK

if(balance < 0.001){

score -= 20;

}


// TOKEN CHECK

const hasUnknown =
tokens.includes("UNKNOWN");


if(hasUnknown){

score -= 20;

}


// RISK LEVEL

let risk =
score > 70
? "LOW"
: score > 40
? "MEDIUM"
: "HIGH";



return `

WALLET HEALTH REPORT


Score:
${score}/100


Risk Level:
${risk}


Factors:


ETH Balance:
${balance} ETH


Token Risk:
${
hasUnknown
?
"Unknown tokens detected"
:
"No unknown tokens detected"
}


`;

}
