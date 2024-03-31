"use client"
import {useEffect,useState} from "react";
import Tableau from "./../../../components/table/Tableau"
import Layout from "./../../../components/layouts/LayoutDashboard"
import moment from "moment"
import {postData,getData,deleteData,updateData,provinces as getProvinces,SITEWEB_URL} from "./../../../fcts/helper"
import {Button} from "@nextui-org/react"
import {Edit} from "./../../../components/icons/Edit"
import {Delete} from "./../../../components/icons/Delete"
import {Eye} from "./../../../components/icons/Eye"
import Link from "next/link"
import {Modal as ModalAnt,Spin,notification} from "antd"
import {LockOutlined,UnlockOutlined,OrderedListOutlined} from "@ant-design/icons"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "./../../../components/ui/select"
  import Section from "./../../../components/layouts/section/Section2"
const page=()=>{
    const [data,setData]=useState([]); 
    const [provinces,setProvinces]=useState([]); 
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
                        {moment(ligne[colone])?.format("DD/MM/YYYY")}
                    </div>
                )
            break;
            case "nom":
                return(
                    <div>
                        {ligne?.nom} {ligne?.postnom} {ligne?.prenom}  
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
      const datas=(province)=>{
        getData("profilssorted&sortby=province&valeur="+province).then(r=>{
            setData(r.data);
         }).catch(err=>{
             console.log("erreur : ",err);
         })
      }

    useEffect(()=>{
        datas(null);
        getProvinces().then(r=>{console.log(r);setProvinces(r)});
    },[]);
  return(
    <>
    {contextHolder}
    <Section titre={"Profils par province"} cl="text-xl" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>}>
        <Spin spinning={spinning}>
        <form onSubmit={(e)=>{
            e.preventDefault();
            
            let dat=Object.fromEntries(new FormData(e.target));
            datas(dat.province);

        }}>
        <div className="flex gap-4 justify-center items-center">
        <span>Selectionner la province</span>
        <Select name="province">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Province" />
            </SelectTrigger>
            <SelectContent>
               
                    {provinces?.map(r=>{
                        return(
                            <SelectItem value={`${r.id}`}>{r.province}</SelectItem>
                        )
                        })
                    }
               
            </SelectContent>
        </Select>
        <Button type="submit" onPress={()=>{

        }} color="success" className="text-white" endContent={<OrderedListOutlined />}>Afficher</Button>
        </div>
        </form>
        <Tableau 
                hideBtnNouveau={false} 
                handleBtnNouveau={handleBtnNouveau} 
                btnnouveauText="Nouvelle dépense"
                coloneSearch={"nom"} 
                columns={colones} 
                datas={data||[]} 
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} 
                cellule={cellule} />
        </Spin>
    </Section>
    </>
    );
}
export default page