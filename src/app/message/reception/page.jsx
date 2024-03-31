"use client"
import {useState,useEffect} from "react"
import Layout from "./../../../components/layouts/LayoutDashboard"
import {Textarea,Input,Button,Divider} from "@nextui-org/react";
import {postData,getData,deleteData,updateData,profil as getProfil} from "./../../../fcts/helper"
import {Modal,Spin,notification,Alert} from "antd"
import {MailOutlined} from "@ant-design/icons"
import Section from "./../../../components/layouts/section/Section2"
import Section2 from "./../../../components/layouts/section/Section"
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
        // getProfil("idUser",params.reception).then(r=>{
        //     setProfil(r);
        //     setDestinataire(r.nom);
        // })
    },[])
    return(
        <Spin spinning={spinning}>
            {contextHolder}
            <Section titre="Boite de reception" cl="text-xl" titreIcone={<MailOutlined />
            }>
                <div className="flex flex-col gap-4">
                    {/* <div className="flex gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Utilisateur : </span>
                    </div> */}
                    <Divider />
                    <Alert message={<div className="flex gap-4">
                        <div>Boite de reception : [0]</div>
                        <div>Non lus : [0]</div>
                        <div>Lus : [0]</div>
                        <div>Archives : [0]</div> </div>} />
                    <Section2 titre="Vos Messages" bg="bg-gray-50">

                    </Section2>
                </div>
            </Section>
            
        </Spin>
    )
}
export default page