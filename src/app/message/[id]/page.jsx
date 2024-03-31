"use client"
import {useState,useEffect} from "react"
import Layout from "./../../../components/layouts/LayoutDashboard"
import {Textarea,Input,Button} from "@nextui-org/react";
import {postData,getData,deleteData,updateData,profil as getProfil} from "./../../../fcts/helper"
import Section from "./../../../components/layouts/section/Section2"
import Section2 from "./../../../components/layouts/section/Section"
import {Modal,Spin,notification} from "antd"
const page=({params})=>{
    const [destinataire,setDestinataire]=useState("...")
    const [api, contextHolder] = notification.useNotification();
    const [spinning,setSpinning]=useState(false);
    const [profil,setProfil]=useState({});
    const handleSubmit=(e)=>{
        e.preventDefault();
       Modal.confirm({
        title:"Message",
        content:"Confirmez-vous l'envoi de ce message ?",
        okText:"Envoyer",
        cancelText:"Annuler",
        onOk:()=>{
           setSpinning(true);
           let dat=Object.fromEntries(new FormData(e.target));
           dat.destinataire=profil.id,
           dat.sender='A';
           dat.senderId=0;
           postData("message",dat).then(r=>{
            if(r.success)
            {
                openNotification();
                document.querySelector("#f").reset();
            }else
            {
                openNotificationError();
            }
           }).catch(r=>openNotificationError())
           .finally(()=>setSpinning(false));
        }

       })
    }
    const openNotification = () => {
        api.success({
        message: 'Mise à jour',
        description:
            'Message bien envoyé',
        duration: 4,
        });
    };
    const openNotificationError = () => {
        api.error({
        message: 'Message',
        description:
            'Echec d\'envoie, veuillez reessayer plutard',
        duration: 4,
        });
    };
    useEffect(()=>{
        getProfil("idUser",params.id).then(r=>{
            setProfil(r);
            setDestinataire(r.nom);
        })
    },[])
    return(
        <Spin spinning={spinning}>
            {contextHolder}
            <Section titre="Nouveau message" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            }>
                <form id="f" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                        <div  className="w-[10%]">
                            From :
                        </div>
                        <div  className="w-[30%] rounded-md py-2 px-2">
                            <Input
                            type="text"
                            label=""
                            labelPlacement={"outside-left"}
                            placeholder={"INDEX RDC - ADMIN"}
                            isReadOnly
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div  className="w-[10%]">
                            Destinataire : 
                        </div>
                        <div  className="w-[30%] rounded-md py-2 px-2">
                            <Input
                            type="text"
                            name="destinataire"
                            label=""
                            labelPlacement={"outside-left"}
                            placeholder={destinataire}
                            isReadOnly
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div  className="w-[10%]">
                            Objet message :
                        </div>
                        <div  className="w-[30%] rounded-md py-2 px-2">
                            <Input
                            name="objet"
                            type="text"
                            label=""
                            labelPlacement={"outside-left"}
                            placeholder="Votre objet"
                            isRequired
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        
                        <div  className="w-full rounded-md py-2 px-2">
                            <Textarea
                                name="message"
                                isRequired
                                label="Votre message"
                                labelPlacement="outside"
                                placeholder="Enter your description"
                                className="max-w-full"
                                minRows={8}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Button color="success" className="text-white" type="submit">Envoyer</Button>
                        <Button variant="light" type="reset">Annuler</Button>
                    </div>
                </div>
                </form>
            </Section>
        </Spin>
    )
}
export default page