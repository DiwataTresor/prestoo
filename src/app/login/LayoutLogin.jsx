"use client"
import Image from "next/image"
import login from "./../../assets/login.png"
import Form from "./Form.jsx"
import logoRva from "./../../assets/logoRva.png"
import { SITEWEB_URL } from "../../fcts/helper"
import { infoApp } from "../utils/helper"
const LayoutLogin=()=>{
    return (
        <div className="flex-1 justify-between items-center pt-[40px]">
            <h2 className="text-white text-3xl text-center uppercase">{infoApp.nomApp}</h2>
            <div className="text-center">{infoApp.description}</div>
            <div className="flex flex-row shadow-sm rounded-md min-h-[400px] w-[800px] m-auto bg-white overflow-hidden mt-4">
                <div className="flex-1 flex flex-col gap-4 justify-center px-3 text-center bg-gradient-to-r from-cyan-500 via-blue-200 to-blue-500">
                    <div className="items-center justify-center align-center p-auto w-full">
                        {/* <Image src={SITEWEB_URL+"logo_sans_fond.png"} width={240} height={130} className="m-auto" /> */}
                        
                    </div>
                    <p className="font-bold text-xl text-center">
                        Authentification
                    </p>
                    <h4 className="text-center">Veuillez saisir vos coordonnées utilisateur</h4>
                    <div className="items-center">
                        <Form />
                    </div>
                </div>
                <div className="flex-1">
                    <img src={"/fondLogin.avif"} className="w-full h-full" />
                </div>
            </div>
            <p className="text-sm text-center text-white mt-4">2023 © TDL </p>
        </div>
        )
    }
    
    export default LayoutLogin;