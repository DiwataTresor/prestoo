import { Button } from "@nextui-org/react";
import {Modal, Spin, message} from "antd"
import { useState } from "react";
import { postData } from "../utils/helper";

export const add = async (e, data = {}, startAction = false, callback) => {

    e.preventDefault();
    // console.log(e.target.name);
    let resultat = { success: true }
    console.clear()
    console.log(data);

    return (resultat)
}

export const Add = ({ children,formulaire,callback }) => {
    const [spinning,setSpinning]=useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        Modal.confirm({
            title:"Enregistrement",
            content:"Voulez-vous vraiment enregistrer ?",
            okText:"Oui",
            cancelText:"Non",
            onOk:()=>{
                let data=Object.fromEntries(new FormData(e.target));
                setSpinning(true);
                postData(formulaire,data).then((r)=>{
                    if(r.success)
                    {
                        message.success("Bien enregistrer");
                        document.getElementById(formulaire).reset();
                        callback({success:true})
                    }else
                    {
                        message.error("Echec d'enregistrement");
                        console.log(r.msg);
                        callback({success:false})
                    }
                }).finally(()=>{
                    setSpinning(false);
                })
            }
        })
       
        console.log(Object.fromEntries(new FormData(e.target)));
       
        // message.success("Bien enregistrer")

    }
    return (
        <form name={formulaire} onSubmit={handleSubmit}>
            <Spin spinning={spinning}>
            <div>
                <div className="flex flex-col mt-8">
                    <div className="flex flex-col gap-9">{children}</div>
                    <div className="mt-8 text-center border-t py-3 flex gap-4 items-center justify-center">
                        <Button type="submit" color="primary" radius="md">Enregistrer</Button>
                        <Button type="reset" color="danger" radius="md">Annuler</Button>
                    </div>
                </div>
            </div>
            </Spin>
        </form>
    )
}

// export const add={
//      abonne:(e)=>{
//         e.preventDefault();
//         alert("ok")
//      }
// }