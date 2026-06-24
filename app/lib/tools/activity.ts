import { createPublicClient, http } from "viem";
import { base } from "viem/chains";


const client = createPublicClient({

chain: base,

transport: http(
process.env.ALCHEMY_URL
)

});


export async function getActivity(address:string){

try{


const response =
await fetch(
`https://api.basescan.org/api
?module=account
&action=txlist
&address=${address}
&sort=desc`
);


const data =
await response.json();



if(!data.result){

return "Activity data unavailable";

}



return {

count:data.result.length,

latest:
data.result.slice(0,5)

};


}catch(error){


console.log(error);


return "Activity data unavailable";


}

}
