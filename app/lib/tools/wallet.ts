import { createPublicClient, http, formatEther } from "viem";
import { base } from "viem/chains";


const client = createPublicClient({

chain: base,

transport: http(
`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
{
timeout: 20000
}
)

});



export async function getBalance(address:string){


try{


const balance =
await client.getBalance({

address: address as `0x${string}`

});


return {

address,

balance: formatEther(balance)

};


}catch(error){


console.log("Balance error:",error);


return {

address,

balance:"0"

};


}

}
