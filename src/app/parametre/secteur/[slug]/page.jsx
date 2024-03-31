"use client"
import {useEffect,useState} from "react";
import Tableau from "./../../../../components/table/Tableau"
import Layout from "./../../../../components/layouts/LayoutDashboard"
import moment from "moment"
import {postData,getData,deleteData,updateData,SITEWEB_URL, secteurs as getSecteurs} from "./../../../../fcts/helper"
import {Button} from "@nextui-org/react"
import {Edit} from "./../../../../components/icons/Edit"
import {Delete} from "./../../../../components/icons/Delete"
import {Eye} from "./../../../../components/icons/Eye"
import {MailIcon} from "./../../../../components/icons/MailIcon"
import Link from "next/link"
import {Modal as ModalAnt,Spin,notification} from "antd"
import {LockOutlined,UnlockOutlined} from "@ant-design/icons"
import Section from "./../../../../components/layouts/section/Section2"
import {Select, SelectItem,Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Input,useDisclosure,Checkbox} from "@nextui-org/react"

const page=({params})=>{
    const [data,setData]=useState([]); 
    const [nomSecteur,setNomSecteur]=useState(""); 
    const [api, contextHolder] = notification.useNotification();
    const [spinning,setSpinning]=useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [feedBack,setFeedBack]=useState("");
    const [isLoading,setIsLoading]=useState(false)
    const [isSaving,setIsSaving]=useState(false);

    const colones = [
        {name: "UTILISATEUR", uid: "utilisateurNom" },
        {name: "VILLE", uid: "utilisateurVille",sortable: true},
        {name: "ADRESSE", uid: "utilisateurAdresse",sortable: true},
        {name: "WHATSAPP", uid: "whatsapp",sortable: true},
        {name: "TELEPHONE", uid: "utilisateurTelephone",sortable: true},
        {name: "SITE WEB", uid: "siteweb",sortable: true},
        {name: "ACTIONS", uid: "actions"},
      ];
      const INITIAL_VISIBLE_COLUMNS = ["utilisateurNom", "utilisateurVille","utilisateurAdresse",'whatsapp',"utilisateurTelephone","siteweb","actions"];
      const cellule=(ligne,colone)=>{
        const cellValue=ligne[colone];
        switch(colone)
        {
            
            case "secteur":
                return(
                    <div className="text-center items-center justify-center">
                        {ligne.secteur} 
                    </div>
                )
            break;
            case "slug":
                return(
                    <div className="text-center items-center justify-center">
                        {ligne.slug} 
                    </div>
                )
            break;
            case "actions":
                return (<div className="flex flex-row gap-3 justify-center items-center">
                    <Button onPress={()=>{
                        ModalAnt.confirm({
                            title:"Profil",
                            content:`Voulez-vous vraiment ${ligne.entrepriseEnabled==='A'?'bloquer':'debloquer'} ${ligne.utilisateurNom}?`,
                            okText:`${ligne.entrepriseEnabled==='A'?'Bloquer':'debloquer'}`,
                            cancelText:"Annuler",
                            onOk:()=>{
                               updateData("utilisateurStatut",{id:ligne.id,statut:ligne.entrepriseEnabled=='A'?'B':'A'}).then(r=>{
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
                    }} isIconOnly size="md" color={"primary"} variant="light">{ligne.enabled==='A'?<LockOutlined />:<UnlockOutlined style={{color:"red"}} />}</Button>
                    <Link href={`${SITEWEB_URL}${ligne.entrepriseSlug}`} target="_blank"><Button isIconOnly size="md" color={"success"} variant="light"><Eye /></Button></Link>
                    <Button onPress={()=>{
                        ModalAnt.confirm({
                            title:"Suppression",
                            content:`Voulez-vous vraiment supprimer ${ligne.utilisateurNom}?`,
                            okText:"Supprimer",
                            cancelText:"Annuler",
                            onOk:()=>{
                               deleteData("profil",{id:ligne.id}).then(r=>{
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
      const openNotification = () => {
        api.success({
        message: 'Mise à jour',
        description:
            'Modification bien éffectuée',
        duration: 4,
        });
    };
    const openNotificationError = (msg="") => {
        api.error({
        message: 'Mise à jour',
        description:
            msg==""?'Echec de mise à jour, veuillez reessayer plutard':msg,
        duration: 4,
        });
    };
    const handleBtnNouveau=()=>{
        onOpen();
    }
    const handleAdd=(e)=>{
       e.preventDefault();
       ModalAnt.confirm({
        title:"Ajout secteur",
        content:"Voulez-vous vraiment ajouter ce secteur ?",
        okText:"Ajouter",
        cancelText:"Annuler",
        onOk:()=>{
            setIsSaving(true);
            let data=Object.fromEntries(new FormData(e.target));
            onOpen();
            postData("creationSecteur",data).then(r=>{
                if(r.success){
                    setIsSaving(false);
                    openNotification();
                    onOpenChange();
                    datas();
                    document.querySelector("#f").reset();
                }else
                {
                    openNotificationError(r.msg);
                    onOpen();
                }
            }).finally(()=>{
                setIsSaving(false);
            })
        }
       })
    }

    const datas=()=>{
        getData("secteurBySlug&slug="+params.slug).then(r=>{
            setNomSecteur(r.data?.[0]?.secteur);
            setData(r.data?.[0].id==null?[]:r.data);
        })
    }
    useEffect(()=>{
        datas();
    },[]);
  return(
    <>
    {contextHolder}
    <Section 
        showRootLink={true} 
        
        titre={"Secteur "+nomSecteur} cl="text-xl" 
        titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>}
    >
        <Spin spinning={spinning}>
        <Tableau 
                hideBtnNouveau={true} 
                handleBtnNouveau={handleBtnNouveau} 
                btnnouveauText="Nouveau secteur"
                coloneSearch={"utilisateurNom"} 
                columns={colones} 
                datas={data} 
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} 
                cellule={cellule} />
        </Spin>
    </Section>
    
    </>
    );
}
export default page