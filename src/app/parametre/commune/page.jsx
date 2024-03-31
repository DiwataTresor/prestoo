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
const page=()=>{
    const [data,setData]=useState([]); 
    const [api, contextHolder] = notification.useNotification();
    const [spinning,setSpinning]=useState(false);
    const colones = [
        {name: "ID", uid: "id", sortable: true},
        {name: "DATE INSC", uid: "datecreation" },
        {name: "NOM", uid: "nom",sortable: true},
        {name: "TYPE COMPTE", uid: "typecompte",sortable: true},
        {name: "PROVINCE", uid: "province", sortable: true},
        {name: "TELEPHONE", uid: "telephone"},
        {name: "ADRESSE", uid: "adresse"},
        {name: "WHATSAPP", uid: "whatsapp", sortable: true},
        {name: "ACTIONS", uid: "actions"},
      ];
      const INITIAL_VISIBLE_COLUMNS = ["id","datecreation", "nom","typecompte","province", "telephone","adresse","whatsapp", "actions"];
      const cellule=(ligne,colone)=>{
        const cellValue=ligne[colone];
        switch(colone)
        {
            case "datecreation":
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
                    <Button onPress={()=>{
                        ModalAnt.confirm({
                            title:"Profil",
                            content:`Voulez-vous vraiment ${ligne.enabled==='A'?'bloquer':'debloquer'} ${ligne.nom}?`,
                            okText:`${ligne.enabled==='A'?'Bloquer':'debloquer'}`,
                            cancelText:"Annuler",
                            onOk:()=>{
                               updateData("block",{id:ligne.id,v:ligne.enabled=='A'?'B':'A'}).then(r=>{
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
                    <Link href={`${SITEWEB_URL}${ligne.slug}`} target="_blank"><Button isIconOnly size="md" color={"success"} variant="light"><Eye /></Button></Link>
                    <Link href={`/message/${ligne.idUser}`}><Button isIconOnly size="md" color={"success"} variant="light"><MailIcon /></Button></Link>
                    <Button onPress={()=>{
                        ModalAnt.confirm({
                            title:"Suppression",
                            content:`Voulez-vous vraiment supprimer ${ligne.nom}?`,
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
    const openNotificationError = () => {
        api.error({
        message: 'Mise à jour',
        description:
            'Echec de mise à jour, veuillez reessayer plutard',
        duration: 4,
        });
    };
      const handleBtnNouveau=()=>{
        alert("test");
      }
      const datas=()=>{
        getData("profils").then(r=>{
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
    <Section 
        showRootLink={true} 
        titre={"Gestion des communes"} cl="text-xl" 
        titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
      }>
        <Spin spinning={spinning}>
        <Tableau 
                hideBtnNouveau={true} 
                handleBtnNouveau={handleBtnNouveau} 
                btnnouveauText="Ajouter commune"
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