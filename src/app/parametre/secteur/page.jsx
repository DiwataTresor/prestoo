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
import { Alert, Modal as ModalAnt, Spin, notification } from "antd"
import { LockOutlined, UnlockOutlined } from "@ant-design/icons"
import Section from "./../../../components/layouts/section/Section2"
import { Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Checkbox,Image } from "@nextui-org/react"
import Cookies from "js-cookie"

const page = () => {
    const [data, setData] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [feedBack, setFeedBack] = useState("");
    const [isLoading, setIsLoading] = useState(false)  
    const [isSaving, setIsSaving] = useState(false);
    const [logo,setLogo]=useState("");
    const [isUpdate,setIsUpdate]=useState(false);
    const [ligneSelected,setLigneSelected] = useState({
        id:"",
        secteur:"",
        slug:"",
        img:""
    })

    const colones = [
        { name: "ID", uid: "id", sortable: true },
        { name: "SECTEUR", uid: "secteur" },
        { name: "SLUG", uid: "slug", sortable: true },
        { name: "NOMBRE UTILISATEURS", uid: "secteurNb", sortable: true },
        { name: "IMG", uid: "img", sortable: true },

        { name: "ACTIONS", uid: "actions" },
    ];
    const INITIAL_VISIBLE_COLUMNS = ["id", "secteur", "slug", "img", 'secteurNb', "actions"];
    const cellule = (ligne, colone) => {
        const cellValue = ligne[colone];
        switch (colone) {

            case "secteur":
                return (
                    <div className="text-center items-center justify-center">
                        {ligne.secteur}
                    </div>
                )
                break;
            case "slug":
                return (
                    <div className="text-center items-center justify-center">
                        {ligne.slug}
                    </div>
                )
                break;
            case "img":
                return (
                    // <div className="text-center items-center justify-center w-[60px] h-[60px] bg-blue-400 rounded-full overflow-hidden">
                        <Avatar size="lg" src={BACKEND_URL+ligne.img}  />
                    // </div> */}
                )
                break;
            case "actions":
                return (<div className="flex flex-row gap-3 justify-center items-center">
                    <Button onPress={() => {
                        ModalAnt.confirm({
                            title: "Profil",
                            content: `Voulez-vous vraiment ${ligne.enabled === 'A' ? 'bloquer' : 'debloquer'} le secteur ${ligne.secteur}?`,
                            okText: `${ligne.enabled === 'A' ? 'Bloquer' : 'debloquer'}`,
                            cancelText: "Annuler",
                            onOk: () => {
                                updateData("adminBlockSecteur", { id: ligne.id, v: ligne.enabled == 'A' ? 'B' : 'A' }).then(r => {
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
                    }} isIconOnly size="md" color={"primary"} variant="light">{ligne.enabled === 'A' ? <LockOutlined /> : <UnlockOutlined style={{ color: "red" }} />}</Button>
                    <Link href={`/parametre/secteur/${ligne.slug}`}><Button isIconOnly size="md" color={"success"} variant="light"><Eye /></Button></Link>
                    <Button onPress={() => {
                        setIsUpdate(true);
                        setLigneSelected({
                            id:ligne.id,
                            secteur:ligne.secteur,
                            slug:ligne.slug,
                            img:ligne.img
                        });
                       setLogo(BACKEND_URL+ligne.img)
                        onOpen();
                    }} isIconOnly size="md" color={"success"} variant="light"><Edit /></Button>                    
                    <Button onPress={() => {
                        ModalAnt.confirm({
                            title: "Suppression",
                            content: `Voulez-vous vraiment supprimer le secteur ${ligne.secteur}?`,
                            okText: "Supprimer",
                            cancelText: "Annuler",
                            onOk: () => {
                                deleteData("secteur", { id: ligne.id }).then(r => {
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
    const handleBtnNouveau = () => {
        setIsUpdate(false);
        setLogo("");
        setFeedBack("");
        onOpen();
    }
    const handleAdd = (e) => {
        e.preventDefault();
        ModalAnt.confirm({
            title: ` ${isUpdate?"Modification":"Ajout"} secteur`,
            content: `Voulez-vous vraiment ${isUpdate?"modifier":"ajouter"} ce secteur ?`,
            okText: ` ${isUpdate?"Modifier":"Ajouter"}`,
            cancelText: "Annuler",
            onOk: () => {
                setFeedBack("");
                setIsSaving(true);

                let data = Object.fromEntries(new FormData(e.target));
                let fichier=document.querySelector("#photo");
                console.log(fichier);
                onOpen();
                
                let f=new FormData();
                isUpdate?f.append("update","creationSecteur"):f.append("add","creationSecteur");
                // f.append("add","creationSecteur");
                f.append('file', fichier.files[0]); 
                f.append("data",JSON.stringify(data));
                f.append('idSecteur', ligneSelected.id);
                const options = {
                    method: 'POST',
                    body: f,
                    // headers: {
                    //   // Ajouter les en-têtes nécessaires, par exemple pour spécifier le type de contenu
                    //   'Content-Type': 'multipart/form-data'
                    // }
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
                            setFeedBack(<Alert message="Bien ajouté" type="success" showIcon />)
                        } else {
                            openNotificationError(r.msg);
                            onOpen();
                            setFeedBack(<Alert message="Echec de l'operation" type="error" showIcon />)
                        }
                    }).finally(() => {
                        setIsSaving(false);
                    })

                // postData("creationSecteur", data).then(r => {
                //     if (r.success) {
                //         setIsSaving(false);
                //         openNotification();
                //         onOpenChange();
                //         datas();
                //         document.querySelector("#f").reset();
                //     } else {
                //         openNotificationError(r.msg);
                //         onOpen();
                //     }
                // }).finally(() => {
                //     setIsSaving(false);
                // })
            }
        })
    }
    const selectLogo=(e)=>{
        
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            const imageProperties = {
            name: file.name,
            type: file.type,
            size: file.size,
            dataURL: event.target.result
            };
            setLogo(imageProperties.dataURL);

            // Ajoutez l'élément image à votre page HTML où vous le souhaitez
        });

        reader.readAsDataURL(file);
    }
    const saveLogo=(e)=>{
        try
        {
            let pr=JSON.parse(Cookies.get("profil"));
        }catch(e) {
            let pr={}
        }
        let fichier=document.querySelector("#logo");
        const formData = new FormData();
        formData.append("add","logo");
        formData.append('file', fichier.files[0]); 
        formData.append('utilisateur',pr.id);
        const options = {
            method: 'POST',
            body: formData,
            // headers: {
            //   // Ajouter les en-têtes nécessaires, par exemple pour spécifier le type de contenu
            //   'Content-Type': 'multipart/form-data'
            // }
        };
        setIsLoadingLogo(true);
        fetch(API_URL, options)
            .then(r=>r.json()).then(response => {
                openNotification();
            })
            .catch(error => {
                // Gérer les erreurs de la requête
                openNotificationError();
            }).finally(()=>{
                setIsLoadingLogo(false);
            })
    }

    const datas = () => {
        getData("secteursAll").then(r => {
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
                titre={"Gestion des secteurs"} cl="text-xl"
                titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>}
            >
                <Spin spinning={spinning}>
                    <Tableau
                        hideBtnNouveau={false}
                        handleBtnNouveau={handleBtnNouveau}
                        btnnouveauText="Nouveau secteur"
                        coloneSearch={"secteur"}
                        columns={colones}
                        datas={data}
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
                                !isUpdate ? 
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Nouveau secteur</ModalHeader>
                                    <ModalBody className="">
                                        <div className="flex gap-3">
                                            <div className="flex flex-col gap-8 flex-1 min-w-[400px] pt-10">
                                        
                                                <Input
                                                    isRequired

                                                    name="secteur"
                                                    type="text"
                                                    label="Nom secteur"
                                                    labelPlacement="outside"
                                                />
                                                <Input
                                                    isRequired

                                                    name="slug"
                                                    type="text"
                                                    label="Slug"
                                                    labelPlacement="outside"

                                                />
                                                <Input
                                                    
                                                    className="file:bg-slate-400 hidden"
                                                    name="photo"
                                                    id="photo"
                                                    type="file"
                                                    label="Image"
                                                    labelPlacement="outside-left"
                                                    onChange={selectLogo}

                                                />
                                            </div>
                                            <div className="w-[300px] p-4 flex flex-col items-center justify-center gap-5">
                                                <h1 className="text-center font-bold">Icone/image</h1>
                                                <div className="rounded-full h-[200px] w-[200px] overflow-hidden bg-slate-200 justify-center items-center flex">
                                                    {
                                                        logo!==""?
                                                            <div>
                                                                <Image className="rounded-full h-[200px] w-[200px]" isZoomed width="200" height="200" src={logo} />
                                                            
                                                            </div>:
                                                            <Button color="primary" onPress={()=>{
                                                                setFeedBack("");
                                                                setLogo("");
                                                                document.getElementById("photo").click()}
                                                            }>Selectionner</Button>
                                                    }
                                                </div>
                                                {
                                                    logo!=="" &&  <Button color="warning" variant="ghost" onPress={()=>setLogo("")}>Effacer</Button>
                                                }
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
                                                <Button type="reset" variant="light" color="danger" onPress={()=>{setLogo(""); setFeedBack("")}}>
                                                    Annuler
                                                </Button>
                                            </div>
                                        </div>
                                    </ModalFooter>
                                </>:
                                 <>
                                 <ModalHeader className="flex flex-col gap-1">Modification secteur</ModalHeader>
                                 <ModalBody className="">
                                     <div className="flex gap-3">
                                         <div className="flex flex-col gap-8 flex-1 min-w-[400px] pt-10">
                                     
                                             <Input
                                                 isRequired
                                                 name="secteur"
                                                 type="text"
                                                 label="Nom secteur"
                                                 labelPlacement="outside"
                                                 defaultValue={ligneSelected.secteur}
                                             />
                                             <Input
                                                 isRequired
                                                 name="slug"
                                                 type="text"
                                                 label="Slug"
                                                 labelPlacement="outside"
                                                 defaultValue={ligneSelected.slug}

                                             />
                                             <Input
                                                 className="file:bg-slate-400 hidden"
                                                 name="photo"
                                                 id="photo"
                                                 type="file"
                                                 label="Image"
                                                 labelPlacement="outside-left"
                                                 onChange={selectLogo}

                                             />
                                         </div>
                                         <div className="w-[300px] p-4 flex flex-col items-center justify-center gap-5">
                                             <h1 className="text-center font-bold">Icone/image</h1>
                                             <div className="rounded-full h-[200px] w-[200px] overflow-hidden bg-slate-200 justify-center items-center flex">
                                                 {
                                                     logo!==""?
                                                         <div>
                                                             <Image className="rounded-full h-[200px] w-[200px]" isZoomed width="200" height="200" src={logo} />
                                                         
                                                         </div>:
                                                         <Button color="primary" onPress={()=>{
                                                             setFeedBack("");
                                                             setLogo("");
                                                             document.getElementById("photo").click()}
                                                         }>Selectionner</Button>
                                                 }
                                             </div>
                                             {
                                                 logo!=="" &&  
                                                 <div className="gap-3 flex items-center justify-center">
                                                    <Button color="primary" variant="ghost" onPress={()=>{
                                                        setFeedBack("");
                                                        setLogo("");
                                                        document.getElementById("photo").click()
                                                    }}>Selectionner</Button>
                                                    <Button color="warning" variant="ghost" onPress={()=>setLogo("")}>Effacer</Button>
                                                 </div>
                                             }
                                         </div>
                                     </div>
                                     <div className="text-center items-center">{feedBack}</div>
                                 </ModalBody>
                                 <ModalFooter>
                                     <div className="flex flex-row gap-4 w-full">
                                         {/* <div className="flex-1">{feedBack}</div> */}
                                         <div className="w-fit">
                                             <Button isLoading={isSaving} type="submit" color="primary">
                                                 Modifier
                                             </Button>
                                             <Button type="reset" variant="light" color="danger" onPress={()=>{setLogo(""); setFeedBack("")}}>
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