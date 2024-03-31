"use client"
import {useEffect,useState} from "react";
import Tableau from "./../../../components/table/Tableau"
import Layout from "./../../../components/layouts/LayoutDashboard"
import moment from "moment"
import {postData,getData,deleteData,updateData,SITEWEB_URL} from "./../../../fcts/helper"
import {Button} from "@nextui-org/react"
import {Edit} from "./../../../components/icons/Edit"
import {Delete} from "./../../../components/icons/Delete"
import {Eye} from "./../../../components/icons/Eye"
import {MailIcon} from "./../../../components/icons/MailIcon"
import Link from "next/link"
import {Modal as ModalAnt,Spin,notification} from "antd"
import {LockOutlined,UnlockOutlined} from "@ant-design/icons"
import Section from "./../../../components/layouts/section/Section2"
import Cookies from "js-cookie"
const page=()=>{
    const [data,setData]=useState([]); 
    const [api, contextHolder] = notification.useNotification();
    const [spinning,setSpinning]=useState(false);
    const colones = [
        {name: "ID", uid: "id", sortable: true},
        {name: "DATE DEMANDE", uid: "dateDemande" },
        {name: "PROFIL", uid: "nom",sortable: true},
       
        {name: "VILLE", uid: "villeDetail", sortable: true},
        {name: "TELEPHONE", uid: "telephone"},
        {name: "WHATSAPP", uid: "whatsapp", sortable: true},
        {name: "ACTIONS", uid: "actions"},
      ];
      const INITIAL_VISIBLE_COLUMNS = ["dateDemande", "nom","villeDetail", "telephone","whatsapp", "actions"];
      const cellule=(ligne,colone)=>{
        const cellValue=ligne[colone];
        switch(colone)
        {
            case "dateDemande":
                return(
                    <div>
                        {moment(ligne[colone]).format("DD/MM/YYYY")}
                    </div>
                )
            break;
            case "nom":
                return(
                    <div>
                        {ligne.nom} {ligne.postnom} {ligne.prenom}  
                    </div>
                )
            break;
            case "actions":
                return (<div className="flex flex-row gap-3 justify-center items-center">
                    
                    <Link href={`/profil/demandecertification/${ligne?.idCertificationCrypte}`} target="_self"><Button isIconOnly size="md" color={"success"} variant="light"><Eye /></Button></Link>
                    <Button onPress={()=>{
                        ModalAnt.confirm({
                            title:"Suppression",
                            content:`Voulez-vous vraiment annuler cette demande ?`,
                            okText:"Supprimer",
                            cancelText:"Annuler",
                            onOk:()=>{
                               deleteData("demandecertification",{idCertification:ligne.idCertification}).then(r=>{
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
    const openNotificationError = () => {
        api.error({
        message: 'Mise à jour',
        description:
            'Echec de mise à jour, veuillez reessayer plutard',
        duration: 4,
        });
    };
      const handleBtnNouveau=()=>{
        // alert("test");
      }
      const datas=()=>{
        getData("demandescertification").then(r=>{
            setData(r.data);
         }).catch(err=>{
             console.log("erreur : ",err);
         })
      }
    useEffect(()=>{
        datas();
    },[]);
  return(
    <>
    {contextHolder}
    <Section showRootLink={true} titre={"Demandes certification"} cl="text-xl" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>}>
        <Spin spinning={spinning}>
        <Tableau 
                hideBtnNouveau={true} 
                handleBtnNouveau={handleBtnNouveau} 
                btnnouveauText="Nouvelle dépense"
                coloneSearch={"nom"} 
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