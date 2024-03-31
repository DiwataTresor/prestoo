"use client"
import {useState,useEffect} from "react"
import Tableau from "./../../../components/table/Tableau"
import Layout from "./../../../components/layouts/LayoutDashboard"
import {Textarea,Input,Button} from "@nextui-org/react";
import {postData,getData,deleteData,updateData,profil as getProfil} from "./../../../fcts/helper"
import {Modal,Spin,notification,Modal as ModalAnt} from "antd"
import {MailOutlined} from "@ant-design/icons"
import {Divider,Chip} from "@nextui-org/react"

import {Edit} from "./../../../components/icons/Edit"
import {Delete} from "./../../../components/icons/Delete"
import {Eye} from "./../../../components/icons/Eye"
import {MailIcon} from "./../../../components/icons/MailIcon"
import moment from "moment"
import Link from "next/link"
import {LockOutlined,UnlockOutlined} from "@ant-design/icons"
import Section from "./../../../components/layouts/section/Section2"
import Section2 from "./../../../components/layouts/section/Section"
import Cookies from "js-cookie";
const page=({params})=>{
    const [messages,setMessages]=useState([])
    const [api, contextHolder] = notification.useNotification();
    const [spinning,setSpinning]=useState(false);
    const [profil,setProfil]=useState({});
    const colones = [
        {name: "DATE ENV", uid: "datemsg" },
        {name: "DEST", uid: "dest",sortable: true},
        {name: "OBJET", uid: "objet",sortable: true},
        {name: "MESSAGE", uid: "message", sortable: true},
        
        {name: "ACTIONS", uid: "actions"},
      ];
    const INITIAL_VISIBLE_COLUMNS = ["datemsg", "dest","objet","message", "actions"];
    const cellule=(ligne,colone)=>{
        const cellValue=ligne[colone];
        switch(colone)
        {
            case "datemsg":
                return(
                    <div className="text-sm items-center text-center justify-center flex">
                        {moment(ligne[colone]).format("DD/MM/YYYY HH:mm:ss")}
                    </div>
                )
            break;
            case "dest":
                return(
                    <div className="text-sm items-center text-center justify-center flex">
                        {
                            ligne?.nom===null?
                            <span className="bg-orange-300 px-2 py-1 rounded-md text-white">Tous</span>:
                            <span>{ligne.nom} {ligne.postnom} {ligne.prenom} </span> 
                        }
                    </div>
                )
            break;
            case "dest":
                return(
                    <div className="text-sm items-center text-center justify-center flex">
                        {ligne.message?.substr(0,100)}  
                    </div>
                )
            break;
            case "actions":
                return (<div className="text-sm flex flex-row gap-3 justify-center items-center">
                   <Button isIconOnly size="md" color={"success"} variant="light" onPress={
                    ()=>{
                        
                    }
                   }>
                        <Link href={`/message/envoye/detail/?id=${ligne.id}`}><Eye /></Link>
                   </Button>

                    {/* <Link href={`/message/${ligne.idUser}`}><Button isIconOnly size="md" color={"success"} variant="light"><MailIcon /></Button></Link> */}
                    <Button onPress={()=>{
                        ModalAnt.confirm({
                            title:"Suppression",
                            content:`Voulez-vous vraiment supprimer ce message?`,
                            okText:"Supprimer",
                            cancelText:"Annuler",
                            onOk:()=>{
                               deleteData("messageEnvoyeAdmin",{id:ligne.id}).then(r=>{
                                if(r.success)
                                {
                                    datas();
                                    openNotification();
                                }else
                                {
                                    openNotificationError();
                                }
                               }).catch(r=>{
                                
                               }).finally(()=>{
                                setSpinning(false);
                               })
                            }
                        })
                    }} isIconOnly size="md" color={"danger"} variant="light"><Delete /></Button>
                </div>);
            break;
            default:
                return <div className="text-center items-center justify-center">{cellValue}</div>
        }

      }
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
    const datas=()=>{
        getData("adminMessageEnvoye").then(r=>{
            setMessages(r.data);
            
        })
    }
    useEffect(()=>{
        datas();
    },[])
    return(
        <Spin spinning={spinning}>
            {contextHolder}
            {/* <ModalAnt({
                            title:"Message",
                            content:<div>
                                <Textarea
                                name="message"
                                isRequired
                                label="Votre message"
                                labelPlacement="outside"
                                value={ligne.message}
                                className="max-w-full"
                                minRows={8}
                            />
                                </div>
                        }) */}
            <Section titre="Message(s) envoyé(s)" cl="text-lg" titreIcone={<MailOutlined />
            }>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 text-blue-800 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Utilisateur : {JSON.parse(Cookies.get("profil")).nom}</span>
                    </div>
                    
                    
                    
                    <Section2 titre={
                        <div className="flex gap-4">
                            <div className="font-bold flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                                <span>Message(s) envoyé(s) : <Chip color="danger">{messages?.length}</Chip></span>
                            </div>
                        </div>
                    }>
                        {
                            messages?.length==0?
                                <div>Aucun message dans la boîte d'envoi</div>:
                                <Tableau 
                                    hideBtnNouveau={true} 
                                    handleBtnNouveau={""} 
                                    btnnouveauText="Nouvelle dépense"
                                    coloneSearch={"message"} 
                                    columns={colones} 
                                    showStatus={false}
                                    datas={messages} 
                                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} 
                                    cellule={cellule} />
                        }
                    </Section2>
                </div>
            </Section>
        </Spin>
    )
}
export default page