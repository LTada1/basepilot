import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { getPrice } from "./value";


const client = createPublicClient({

chain: base,

transport: http()

});



async function getMetadata(address:string){


const abi:any = [

{
name:"symbol",
type:"function",
stateMutability:"view",
outputs:[{type:"string"}],
inputs:[]
},

{
name:"decimals",
type:"function",
stateMutability:"view",
outputs:[{type:"uint8"}],
inputs:[]
}

];


try{


const symbol:any =
await client.readContract({

address: address as `0x${string}`,

abi,

functionName:"symbol"

});


const decimals:any =
await client.readContract({

address: address as `0x${string}`,

abi,

functionName:"decimals"

});


return {
symbol,
decimals
};


}catch{


return {

symbol:"UNKNOWN",

decimals:18

};


}

}




export async function getTokens(address:string){


const url =
`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;



const response = await fetch(url,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

jsonrpc:"2.0",

method:"alchemy_getTokenBalances",

params:[address],

id:1

})

});



const data = await response.json();


const tokens =
data.result.tokenBalances;



let output = "";



for(const token of tokens.slice(0,10)){


const meta =
await getMetadata(token.contractAddress);



const amount =
Number(token.tokenBalance) /
10 ** Number(meta.decimals);



if(amount <= 0){

continue;

}



const price =
await getPrice(meta.symbol);



const usd =
amount * price;



output += `

${meta.symbol}

Amount:
${amount}

Price:
$${price}

Value:
$${usd.toFixed(2)}

Contract:
${token.contractAddress}

`;

}



return `

Token Portfolio:

Wallet:
${address}


${output}

`;

}
