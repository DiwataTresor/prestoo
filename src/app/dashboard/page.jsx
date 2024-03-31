"use client";
import {useTransition,useState} from "react"
const page=()=>{
    const [isPending,startTransition]=useTransition();
    const [nb,setNb]=useState([]);
    
    const c = async ()=>{
       startTransition(()=>{
        for(let i=1;i<1000000;i++)
        {
            setNb(nb.push(i));
        }
    })
    await console.log(nb);
    }
return (
    <div>
        Je suis dashboard
        <p><button onClick={()=>c()}>Simulation</button></p>
        <p>{isPending?"traitement en cours...":"Bien faite"} </p>
    </div>
    )
}

export default page;