"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

export default function Chat(){

const [message,setMessage] = useState("");
const [reply,setReply] = useState("");
const [loading,setLoading] = useState(false);

const { address } = useAccount();

async function sendMessage(){

setLoading(true);

const res = await fetch("/api/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

message,

address

})

});


const data = await res.json();
console.log("API RESPONSE:", data);
setReply(data.reply);

setLoading(false);

}


return (

<div className="mt-10 max-w-xl">


<h2 className="text-2xl font-bold">
Ask BaseHub Agent
</h2>


<input

className="border p-3 w-full mt-4"

placeholder="Example: Find Base DeFi opportunities"

value={message}

onChange={(e)=>setMessage(e.target.value)}

/>


<button

className="mt-4 bg-blue-600 text-white px-5 py-3 rounded"

onClick={sendMessage}

>

{loading ? "Thinking..." : "Ask Agent"}

</button>


<div className="mt-6 p-4 border rounded">

{reply}

</div>


</div>

)

}
