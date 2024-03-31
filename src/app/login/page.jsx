"use client"
import Image from "next/image"
import login from "./../../assets/login.png"
import Form from "./Form.jsx"
const page=()=>{
    return (
        <div className="flex-1 justify-between items-center pt-[40px] h-screen min-h-full bg-red-900">
            <div className="flex flex-row shadow-md rounded-md min-h-[400px] w-[800px] m-auto bg-white overflow-hidden">
                <div className="flex-1 flex flex-col gap-4 justify-center px-3 text-start">
                    <p className="font-bold text-xl text-start">
                        Authentification
                    </p>
                    <h4>Veuillez saisir vos coordonnées utilsiateur</h4>
                    <div>
                        <Form />
                    </div>
                </div>
                <div className="flex-1">
                    <Image src={login} className="w-full h-full" />
                </div>
            </div>
        </div>
        )
    }
    
    export default page;