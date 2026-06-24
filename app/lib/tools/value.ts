export async function getPrice(symbol:string){


try{


const id = symbol.toLowerCase();


const response = await fetch(

`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`

);


const data = await response.json();


return data[id]?.usd || 0;


}catch{


return 0;


}


}
