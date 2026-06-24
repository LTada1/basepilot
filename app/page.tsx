import ConnectWallet from "./components/ConnectWallet";
import Chat from "./components/Chat";


export default function Home(){

return (

<main className="p-10">


<h1 className="text-4xl font-bold">
BasePilot
</h1>


<p className="mt-4">
AI financial intelligence for the Base ecosystem
</p>


<div className="mt-8">

<ConnectWallet />

</div>


<Chat />


</main>

)

}
