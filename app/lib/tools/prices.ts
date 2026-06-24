export async function getTokenPrice(symbol:string){


try{


const response = await fetch(
`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
);


const data = await response.json();


return data[symbol]?.usd || 0;


}catch{


return 0;


}


}
