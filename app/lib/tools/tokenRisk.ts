export async function analyzeTokenRisk(tokens:string){


let risk = 100;


let warnings = [];


if(tokens.includes("UNKNOWN")){

risk -= 20;

warnings.push(
"Unknown token contracts detected"
);

}


if(tokens.includes("0 tokens")){

risk -= 5;

warnings.push(
"Inactive token balances detected"
);

}



const level =
risk >= 80
? "LOW"
:
risk >= 50
? "MEDIUM"
:
"HIGH";



return `

TOKEN SECURITY REPORT


Safety Score:
${risk}/100


Risk Level:
${level}


Warnings:

${warnings.length
?
warnings.map(x=>"- "+x).join("\n")
:
"No major risks detected"
}



Recommendations:

- Verify contracts before interacting
- Avoid approving unknown contracts
- Check liquidity before swapping


`;

}
