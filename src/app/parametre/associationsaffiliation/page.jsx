"use client"
import { useEffect, useState } from "react";
import Tableau from "./../../../components/table/Tableau"
import Layout from "./../../../components/layouts/LayoutDashboard"
import moment from "moment"
import { postData, getData, deleteData, updateData, SITEWEB_URL, secteurs as getSecteurs, API_URL, BACKEND_URL } from "./../../../fcts/helper"
import { Avatar, Button } from "@nextui-org/react"
import { Edit } from "./../../../components/icons/Edit"
import { Delete } from "./../../../components/icons/Delete"
import { Eye } from "./../../../components/icons/Eye"
import { MailIcon } from "./../../../components/icons/MailIcon"
import Link from "next/link"
import { Alert, Modal as ModalAnt, Spin, message, notification } from "antd"
import { LockOutlined, UnlockOutlined } from "@ant-design/icons"
import Section from "./../../../components/layouts/section/Section2"
import { Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Checkbox,Image } from "@nextui-org/react"
import Cookies from "js-cookie"

const page = () => {
    const [data, setData] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [association,setAssociation] = useState();
    const [spinning, setSpinning] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [feedBack, setFeedBack] = useState("");
    const [isLoading, setIsLoading] = useState(false)  
    const [isSaving, setIsSaving] = useState(false);
    const [logo,setLogo]=useState("");
    const [isUpdate,setIsUpdate]=useState(true);
    const [ligneSelected,setLigneSelected] = useState({
        id:"",
        association:"",
        description:""
    })

    const colones = [
        { name: "ID", uid: "id", sortable: true },
        { name: "ASSOCIATION", uid: "association"},
        { name: "DESCRIPTION", uid: "description"},
        { name: "ACTIONS", uid: "actions" },
    ];
    const INITIAL_VISIBLE_COLUMNS = ["id", "association","description", "actions"];
    const cellule = (ligne, colone) => {
        const cellValue = ligne[colone];
        switch (colone) {
            case "actions":
                return (<div className="flex flex-row gap-3 justify-center items-center">
                    <Button onPress={() => {
                        setLigneSelected({
                            id:ligne.id,
                            association:ligne.association,
                            description:ligne.description
                        })
                        onOpen();
                    }} isIconOnly size="md" color={"success"} variant="light"><Edit /></Button>                    
                    <Button onPress={() => {
                        ModalAnt.confirm({
                            title: "Suppression",
                            content: `Voulez-vous vraiment supprimer cette association ${ligne.association}?`,
                            okText: "Supprimer",
                            cancelText: "Annuler",
                            onOk: () => {
                                deleteData("association", { id: ligne.id }).then(r => {
                                    if (r.success) {
                                        datas();
                                        openNotification();
                                    } else {
                                        openNotificationError();
                                    }
                                }).catch(r => {

                                }).finally(() => {
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
    const openNotificationError = (msg = "") => {
        api.error({
            message: 'Mise à jour',
            description:
                msg == "" ? 'Echec de mise à jour, veuillez reessayer plutard' : msg,
            duration: 4,
        });
    };
   
    const handleAdd = (e) => {
        e.preventDefault();
        ModalAnt.confirm({
            title: ` ${isUpdate?"Modification":"Ajout"} association`,
            content: `Voulez-vous vraiment ${isUpdate?"modifier":"ajouter"} cette association ?`,
            okText: ` ${isUpdate?"Modifier":"Ajouter"}`,
            cancelText: "Annuler",
            onOk: () => {
                setFeedBack("");
                setIsSaving(true);
                onOpen();
                let f=new FormData();
                f.append("update","association");
                f.append("data",JSON.stringify(ligneSelected));
                const options = {
                    method: 'POST',
                    body: f,
                };
                fetch(API_URL, options)
                    .then(r=>r.json())
                    .then(r => {
                        if (r.success) {
                            setIsSaving(false);
                            openNotification();
                            onOpenChange();
                            datas();
                            document.querySelector("#f").reset();
                        } else {
                            openNotificationError(r.msg);
                            onOpen();
                        }
                    }).finally(() => {
                        setIsSaving(false);
                    })
            }
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let f=Object.fromEntries(new FormData(e.target));
        console.clear()
        ModalAnt.confirm({
            title:"Association",
            content:"Voulez-vous vraiment enregistrer",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setSpinning(true);
                postData("association",f).then((r)=>{
                    if(r.success)
                    {
                        message.success("Association bien ajoutée");
                        datas();
                    }else
                    {
                        message.error("Impossible d'enregistrement pour l'instant, une erreur s'est produuite dans le système")
                    }
                }).finally(()=>{
                    setSpinning(false);
                });
            }
        })
    }
    
    const handleBtnNouveau=() => {}
    const datas = () => {
        getData("getAssociations").then(r => {
            setData(r.data);
        })
    }
    useEffect(() => {
        datas();
    }, []);
    return (
        <>
            {contextHolder}
           
            <Section
                showRootLink={true}
                titre={"Association d'affiliation"} cl="text-xl"
                titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>}
            >
                <Spin spinning={spinning}>
                    <div className="flex justify-start items-start w-full">
                        <div className="border rounded-md p-4 w-full flex flex-col gap-4 justify-center items-center mx-10">
                            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-7 w-full">
                                <Input isRequired name="association" label="Nom de l'association" value={association}  labelPlacement="outside" />
                                <Input name="description" label="Description de l'association"  labelPlacement="outside" />
                                <Button type="submit" color="success" variant="flat">Enregistrer</Button>
                            </form>
                        </div>
                    </div>
                   
                    <Tableau
                        hideBtnNouveau={true}
                        handleBtnNouveau={handleBtnNouveau}
                        hideSearchColone={true}
                        btnnouveauText="Nouvelle Association"
                        coloneSearch={"association"}
                        columns={colones}
                        datas={data}
                        nbOfRows={15}
                        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                        cellule={cellule} />
                </Spin>
            </Section>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size="3xl"
            >
                <ModalContent>
                    {(onClose) => (
                       
                        <form id="f" onSubmit={handleAdd}>
                            {
                               
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Modification</ModalHeader>
                                    <ModalBody className="">
                                        <div className="flex gap-3">
                                            <div className="flex flex-col gap-8 flex-1 min-w-[400px] pt-10">
                                        
                                                <Input
                                                    isRequired
                                                    name="association"
                                                    type="text"
                                                    label="Nom association"
                                                    labelPlacement="outside"
                                                    value={ligneSelected.association}
                                                    onChange={(e)=>{
                                                        setLigneSelected({...ligneSelected,association:e.target.value})
                                                    }}
                                                />
                                                <Input
                                                    name="description"
                                                    type="text"
                                                    label="Description"
                                                    labelPlacement="outside"
                                                    value={ligneSelected.description}
                                                    onChange={(e)=>{
                                                        setLigneSelected({...ligneSelected,description:e.target.value})
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center items-center">{feedBack}</div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <div className="flex flex-row gap-4 w-full">
                                            {/* <div className="flex-1">{feedBack}</div> */}
                                            <div className="w-fit">
                                                <Button isLoading={isSaving} type="submit" color="primary">
                                                    Enregistrer
                                                </Button>
                                                <Button type="reset" variant="light" color="danger">
                                                    Annuler
                                                </Button>
                                            </div>
                                        </div>
                                    </ModalFooter>
                                </>

                            }
                           
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
export default page