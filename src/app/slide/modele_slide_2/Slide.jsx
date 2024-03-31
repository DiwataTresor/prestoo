"use client"
import { Tabs, Slider, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import Section from '../../../components/layouts/section/Section'
import thumb1 from "./thumb.png"
import user1 from "./user.png"
import thumb2 from "./thumb.png"

import Image from 'next/image'
import { Edit, EyeOff, PencilIcon, PictureInPictureIcon } from 'lucide-react'
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL, BACKEND_URL, getData, postData } from '../../../fcts/helper'
import Section2 from '../../../components/layouts/section/Section2'


const Slide = ({ idSlide, mode }) => {

    const [spinning, setSpinning] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [contenu, setContenu] = useState("");
    const [fontSize, setFontSize] = useState(1);
    const [bg, setBg] = useState("");
    const [newBg, setNewBg] = useState("");
    const [imgUser, setImgUser] = useState(user1);
    const [_slide1Elt, set_Slide1Elt] = useState(
        {
            background: {
                showing: true,
                value: "default"
            },
            user: { value: "default" },
            text: {
                txt1: {
                    display: true,
                    content: "Text de base",
                },
                txt2: {
                    display: true,
                    content: "Dramatically simplify",
                },
                txt3: {
                    display: true,
                    content: "Compellingly morph viral action items vis-a-vis unique data. ",
                },

            },
            btn: {
                btn1: {
                    display: true,
                    content: "Mon entrepr",
                    color: "primary",
                    variant: "solid"
                },
                btn2: {
                    display: true,
                    content: "Mon entreprise",
                    color: "default",
                    variant: "ghost",
                    style: "text-white"
                }
            }
        }
    )
    const [selected, setSelected] = useState({ id: null, type: null });
    const [slide1Elt, setSlide1Elt] = useState(
        {
            background: {
                showing: true,
                value: "default",
                lien: "https://images.unsplash.com/photo-1526897515823-424cd784315f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGJsYWNrbWFuJTIwYm9zc3xlbnwwfHwwfHx8MA%3D%3D",
                properties: {}
            },
            user: { value: "default", showing: true },
            text: {
                txt1: {
                    display: true,
                    content: "Text de base",
                    bold: false,
                    italic: false,
                    fontsize: 10
                },
                txt2: {
                    display: true,
                    content: "Dramatically simplify",
                    bold: true,
                    italic: false,
                    fontsize: 10
                },
                txt3: {
                    display: true,
                    content: "Compellingly morph viral action items vis-a-vis unique data. ",
                    bold: false,
                    italic: false,
                    fontsize: 10
                },

            },
            btn: {
                btn1: {
                    display: true,
                    content: "Mon entrepr",
                    color: "primary",
                    variant: "solid",
                    hidden: true,
                    properties: {},
                    lien: ""
                },
                btn2: {
                    display: true,
                    content: "Mon entrepris",
                    color: "default",
                    variant: "ghost",
                    style: "text-white",
                    hidden: false,
                    properties: {},
                    lien: ""
                }
            }
        }
    )
    const [properties, setProperties] = useState({
        bold: true,
        italic: false,
        fontSize: 16,
        textContent: ""
    });
    let idSelected = {
        id: null,
        type: null
    }
    const selectModel = ({ id }) => {

        onOpen();
    }

    const edit = ({ id, type, text, textContent }) => {

        idSelected = { id: id, type: type };
        setSelected({ id: id, type: type });

        const contenu = "";
        switch (type) {
            case "img":
                setContenu(
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <div>
                            <div className='flex flex-col gap-4'>

                                <div className='flex-1'>
                                    <Button startContent={<PictureInPictureIcon />} onClick={() => {
                                        document.getElementById("photo").click()
                                    }}>Selectionner</Button>

                                </div>
                            </div>
                        </div>
                    </form>
                );
                break;
            case "text":
                setContenu(
                    <div>
                        <div>
                            <p className='flex gap-4 flex-wrap'>
                                <Checkbox value="buenos-aires" onChange={(e) => { setBold(e.target.checked) }}>B</Checkbox>
                                <Checkbox value="buenos-aires" onChange={(e) => { setItalic(e.target.checked) }}>I</Checkbox>
                            </p>
                            <div>
                                <Slider
                                    min={1}
                                    max={20}
                                    onChange={changeFontSize}
                                    value={properties.fontSize}
                                />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <Input defaultValue={textContent} onChange={(e) => { setTextContent(e.target.value) }} />
                        </div>
                    </div>
                );
                break;
            case "btn":

                setContenu(
                    <div>
                        <div className='flex flex-col gap-4'>
                            <p className='flex gap-4 flex-wrap'>
                                <Checkbox value="buenos-aires" onChange={(e) => { setHidden(e.target.checked) }}>Cacher</Checkbox>
                            </p>
                            <p className='flex gap-4 flex-wrap'>
                                <Select defaultValue={slide1Elt?.btn[idSelected.id]["color"]} label="Couleur" labelPlacement='outside-left' onChange={(e) => { setBtnColor(e.target.value) }}>
                                    <SelectItem key={"default"} value={"default"}>default</SelectItem>
                                    <SelectItem key={"primary"} value={"primary"}>primary</SelectItem>
                                    <SelectItem key={"secondary"} value={"secondary"}>secondary</SelectItem>
                                    <SelectItem key={"success"} value={"success"}>successfull</SelectItem>
                                    <SelectItem key={"warning"} value={"warning"}>warning</SelectItem>
                                    <SelectItem key={"danger"} value={"danger"}>danger</SelectItem>
                                </Select>
                            </p>

                        </div>
                        <div className='mt-5'>
                            <Input label="Text" defaultValue={textContent} onChange={(e) => { setBtnText(e.target.value) }} />
                        </div>
                        <div className='mt-5'>
                            <Input label="lien" defaultValue={slide1Elt.btn[id].lien} onChange={(e) => { setBtnLien(e.target.value) }} />
                        </div>
                    </div>
                );
                break;
            case "bg":
                setContenu(
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <div>
                            <div className='flex flex-col gap-4'>

                                <div className='flex-1'>
                                    <Button startContent={<PictureInPictureIcon />} onClick={() => {
                                        document.getElementById("photo").click()
                                    }}>Selectionner</Button>

                                </div>
                            </div>
                        </div>
                    </form>
                );
                break;
            default:
                break;
        }
        onOpen();
    }

    const changeFontSize = (v) => {
        const newProperties = { ...properties };
        newProperties.fontSize = v;
        setProperties(newProperties);
    }
    const setBold = (v) => {
        const newProperties = { ...slide1Elt };
        newProperties.text[idSelected.id]["bold"] = v;
        setSlide1Elt({ ...newProperties });
    }
    const setItalic = (v) => {
        const newProperties = { ...slide1Elt };
        newProperties.text[idSelected.id]["italic"] = v;
        setSlide1Elt({ ...newProperties });
    }
    const setTextContent = (v) => {

        let _id = idSelected.id;
        let newProperties = { ...slide1Elt };
        console.log(newProperties);
        newProperties.text[_id]["content"] = v;
        setSlide1Elt(newProperties);

    }
    const setBtnText = (v) => {
        const newProperties = { ...slide1Elt };
        newProperties.btn[idSelected.id]["content"] = v;
        setSlide1Elt({ ...newProperties });
    }
    const setBtnLien = (v) => {
        const newProperties = { ...slide1Elt };
        newProperties.btn[idSelected.id]["lien"] = v;
        setSlide1Elt({ ...newProperties });
    }
    const setBtnColor = (v) => {
        const newProperties = { ...slide1Elt };
        newProperties.btn[idSelected.id]["color"] = v;
        setSlide1Elt({ ...newProperties });
    }
    const setHidden = (v) => {
        const newProperties = { ...slide1Elt };
        newProperties.btn[idSelected.id]["hidden"] = v;
        setSlide1Elt({ ...newProperties });
    }
    const saveEdit = () => {

        toast.success("Bien enregistré")
        onOpenChange();
    }
    const listeSlide = [];
    const saveSlide = () => {

        setSpinning(true);
        let fichier = document.querySelector("#photo");

        let f = new FormData();
        let dataToSend = {
            detail: JSON.stringify(slide1Elt),
            ordre: 2,
            idSlide: idSlide
        };
        f.append("add", "slide");
        f.append("data", JSON.stringify(dataToSend));
        f.append('type', selected.type);
        f.append('file', fichier.files[0]);
        const options = {
            method: 'POST',
            body: f,
        };

        fetch(API_URL, options).then(r => r.json())
            .then(r => {
                r.success ? toast.success("Slide bien enregistré") : toast.error("Echec d'enregistrement");
                getSlideData();
            }).finally(() => {
                setSpinning(false);
            })
    }
    const getSlideData = () => {

        getData("slide&idSlide=" + idSlide)
            .then((d) => {

                if (d.data !== null) {
                    setSlide1Elt(JSON.parse(d?.data.detail));
                    setNewBg(JSON.parse(d?.data.detail).background.lien ? JSON.parse(d?.data.detail).background.lien : "https://images.unsplash.com/photo-1526897515823-424cd784315f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGJsYWNrbWFuJTIwYm9zc3xlbnwwfHwwfHx8MA%3D%3D");
                    let detail = JSON.parse(d?.data.detail);
                    setImgUser(BACKEND_URL + detail?.user?.value);
                } else {
                    setNewBg("https://images.unsplash.com/photo-1526897515823-424cd784315f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGJsYWNrbWFuJTIwYm9zc3xlbnwwfHwwfHx8MA%3D%3D");
                }


            }).finally(() => {
                // alert(imgUser)
            })
    }
    // POUR L'IMAGE

    const selectLogo = (e) => {

        const file = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            const imageProperties = {
                name: file.name,
                type: file.type,
                size: file.size,
                dataURL: event.target.result
            };

            if (selected.id == "bg") {
                setNewBg(imageProperties.dataURL);
            } else {
                setImgUser(imageProperties.dataURL);
            }
            const newProperties = { ...slide1Elt };

            // newProperties.background.lien = imageProperties.dataURL;
            setSlide1Elt({ ...newProperties });

            onOpen();

            // Ajoutez l'élément image à votre page HTML où vous le souhaitez
        });

        reader.readAsDataURL(file);
    }
    const saveLogo = (e) => {
        let pr = JSON.parse(Cookies.get('profil'));
        let fichier = document.querySelector("#photo");
        const formData = new FormData();
        formData.append("add", "logo");
        formData.append('file', fichier.files[0]);
        formData.append('utilisateur', pr.id);
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
            .then(r => r.json()).then(response => {
                openNotification();
            })
            .catch(error => {
                // Gérer les erreurs de la requête
                openNotificationError();
            }).finally(() => {
                setIsLoadingLogo(false);
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        Modal.confirm({
            title: "Profil",
            content: "Confirmez-vous cette mise à jour ?",
            okText: "Oui, enregistrer",
            cancelText: "Annuler",
            onOk: () => {
                let pr = JSON.parse(localStorage.getItem('profil'));
                let fichier = document.querySelector("#photo");
                const formData = new FormData();
                formData.append("add", "adminEvenemetNew");
                formData.append('file', fichier.files[0]);
                formData.append("data", JSON.stringify(Object.fromEntries(new FormData(e.target))))
                formData.append('id', pr.id);
                const options = {
                    method: 'POST',
                    body: formData,
                    // headers: {
                    //   // Ajouter les en-têtes nécessaires, par exemple pour spécifier le type de contenu
                    //   'Content-Type': 'multipart/form-data'
                    // }
                };
                setIsLoading(true);
                fetch(API_URL, options)
                    .then(r => r.json()).then(response => {
                        openNotification();
                        document.querySelector("#f").reset();
                        setImgActu("");
                        getEvenements();
                    })
                    .catch(error => {
                        // Gérer les erreurs de la requête
                        openNotificationError();
                    }).finally(() => {
                        setIsLoading(false);
                    })
            }
        })
    }
    const suppression=()=>{
        alert(idSlide);
    }

    // POUR L'IMAGE
    useEffect(() => {
       mode=="new" && saveSlide();
        getSlideData();
    }, [])

    return (
        <>
            {
                mode == "edition" ?
                    <Section titre={"Edition slide"}>
                        <div>
                            <Spin spinning={spinning}>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col gap-3 pr-3'>
                                        {
                                            mode === "edition" &&
                                            <div>
                                                {/* <p className='text-start text-xl'><Edit /> Editeur</p> */}
                                                <div className='flex justify-end items-end gap-4'>
                                                    <Button color='primary' className='rounded-full' onPress={() => {
                                                        saveSlide();
                                                    }}>Enregistrer</Button>
                                                    <Button color='primary' onPress={()=>suppression()} className='rounded-full'>Supprimer</Button>
                                                </div>
                                            </div>
                                        }
                                        <div
                                            className='relative border rounded-md h-[400px] w-full m-3 bg-cover backdrop-blur-lg'
                                            style={{
                                                backgroundImage:
                                                    `url(
                                                        ${(newBg.startsWith("images"))
                                                        ? BACKEND_URL + newBg :
                                                        newBg
                                                    }
                            )`}}
                                        >
                                            <input onChange={selectLogo} id="photo" type="file" className="hidden" name="photo" />
                                            <div className='absolute top-2 left-4 z-50'>
                                                {
                                                    <Button onClick={() => {
                                                        edit({ id: "bg", lien: slide1Elt?.background, type: "bg" })
                                                    }} variant='ghost' color='primary' isIconOnly={true} onPress={() => selectModel({ id: "bg", "type": "img", "text": "Changer le background-image" })} id="bg">
                                                        <PencilIcon size={9} />
                                                    </Button>
                                                }
                                            </div>
                                            <div className='h-[400px] w-[300px] absolute left-3'>
                                                <Image src={imgUser ?? user1} fill />
                                                {mode == "edition" && <Button
                                                    className='mt-[40%]'
                                                    onClick={() => { edit({ id: "user", lien: slide1Elt?.background, type: "img" }) }}
                                                    variant='ghost' color='primary' isIconOnly={true}
                                                    onPress={() => selectModel({ id: "user", "type": "img", "text": "Changer le background-image" })} id="user">
                                                    <PencilIcon size={9} />
                                                </Button>}
                                            </div>
                                            <div className='absolute right-3 top-3 flex flex-col items-start justify-start w-[700px] pt-[100px] text-white'>
                                                <p onClick={() => {

                                                    mode == "edition" && edit({ id: "txt1", textContent: slide1Elt?.text?.txt1?.content, type: "text" })
                                                }}>{slide1Elt?.text?.txt1?.content}</p>
                                                <p className='text-[50px] font-bold text-white text-left flex-wrap' onClick={() => {

                                                    edit({ id: "txt2", textContent: slide1Elt?.text?.txt2?.content, type: "text" })
                                                }}>{slide1Elt?.text?.txt2?.content}</p>
                                                <p onClick={() => {

                                                    edit({ id: "txt3", textContent: slide1Elt?.text?.txt3?.content, type: "text" })
                                                }
                                                }
                                                >{slide1Elt?.text?.txt3?.content}</p>
                                                <p className='mt-9 flex gap-3'>
                                                    <Button startContent={"text"} onClick={() => edit({ id: "btn1", textContent: slide1Elt?.btn?.btn1?.content, type: "btn" })} variant='solid' onChange={() => { }} color={slide1Elt.btn.btn1.color} className={`rounded-full`}>{slide1Elt.btn.btn1.hidden && <EyeOff />} {slide1Elt.btn.btn1.content}</Button>
                                                    <Button onClick={() => edit({ id: "btn2", textContent: slide1Elt?.btn?.btn2?.content, type: "btn" })} color={slide1Elt?.btn?.btn2?.color} variant={slide1Elt?.btn?.btn2?.variant} className={`rounded-full ${slide1Elt?.btn?.btn2?.style}`}>{slide1Elt.btn.btn2.hidden && <EyeOff />} {slide1Elt?.btn?.btn2?.content}</Button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal size='3xl' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Editeur Slide</ModalHeader>
                                                <ModalBody>
                                                    <p>
                                                        {contenu}
                                                    </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" onPress={() => saveEdit()}>
                                                        Enregistrer
                                                    </Button>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        Annuler
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </Spin>
                            <Toaster position='bottom-center' />
                        </div>
                    </Section> :
                    <div>
                        <div>
                            <Spin spinning={spinning}>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col gap-3 pr-3'>
                                        {
                                            mode === "edition" &&
                                            <div>
                                                {/* <p className='text-start text-xl'><Edit /> Editeur</p> */}
                                                <div className='flex justify-end items-end gap-4'>
                                                    <Button color='primary' className='rounded-full' onPress={() => {
                                                        saveSlide();
                                                    }}>Enregistrer</Button>
                                                    <Button color='primary' className='rounded-full'>Supprimer</Button>
                                                </div>
                                            </div>
                                        }
                                        <div
                                            className='relative border rounded-md h-[400px] w-full m-3 bg-cover backdrop-blur-lg'
                                            style={{
                                                backgroundImage:
                                                    `url(
                                ${(newBg.startsWith("images"))
                                                        ? BACKEND_URL + newBg :
                                                        newBg
                                                    }
                            )`}}
                                        >
                                            <input onChange={selectLogo} id="photo" type="file" className="hidden" name="photo" />
                                            <div className='absolute top-2 left-4 z-50'>
                                                {
                                                    <Button onClick={() => {
                                                        edit({ id: "bg", lien: slide1Elt?.background, type: "bg" })
                                                    }} variant='ghost' color='primary' isIconOnly={true} onPress={() => selectModel({ id: "bg", "type": "img", "text": "Changer le background-image" })} id="bg">
                                                        <PencilIcon size={9} />
                                                    </Button>
                                                }
                                            </div>
                                            <div className='h-[400px] w-[300px] absolute left-3'>
                                                <Image src={imgUser ?? user1} fill />
                                                {mode == "edition" && <Button
                                                    className='mt-[40%]'
                                                    onClick={() => { edit({ id: "user", lien: slide1Elt?.background, type: "img" }) }}
                                                    variant='ghost' color='primary' isIconOnly={true}
                                                    onPress={() => selectModel({ id: "user", "type": "img", "text": "Changer le background-image" })} id="user">
                                                    <PencilIcon size={9} />
                                                </Button>}
                                            </div>
                                            <div className='absolute right-3 top-3 flex flex-col items-start justify-start w-[700px] pt-[100px] text-white'>
                                                <p onClick={() => {

                                                    mode == "edition" && edit({ id: "txt1", textContent: slide1Elt?.text?.txt1?.content, type: "text" })
                                                }}>{slide1Elt?.text?.txt1?.content}</p>
                                                <p className='text-[50px] font-bold text-white text-left flex-wrap' onClick={() => {

                                                    edit({ id: "txt2", textContent: slide1Elt?.text?.txt2?.content, type: "text" })
                                                }}>{slide1Elt?.text?.txt2?.content}</p>
                                                <p onClick={() => {

                                                    edit({ id: "txt3", textContent: slide1Elt?.text?.txt3?.content, type: "text" })
                                                }
                                                }
                                                >{slide1Elt?.text?.txt3?.content}</p>
                                                <p className='mt-9 flex gap-3'>
                                                    <Button startContent={"text"} onClick={() => edit({ id: "btn1", textContent: slide1Elt?.btn?.btn1?.content, type: "btn" })} variant='solid' onChange={() => { }} color={slide1Elt.btn.btn1.color} className={`rounded-full`}>{slide1Elt.btn.btn1.hidden && <EyeOff />} {slide1Elt.btn.btn1.content}</Button>
                                                    <Button onClick={() => edit({ id: "btn2", textContent: slide1Elt?.btn?.btn2?.content, type: "btn" })} color={slide1Elt?.btn?.btn2?.color} variant={slide1Elt?.btn?.btn2?.variant} className={`rounded-full ${slide1Elt?.btn?.btn2?.style}`}>{slide1Elt.btn.btn2.hidden && <EyeOff />} {slide1Elt?.btn?.btn2?.content}</Button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal size='3xl' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Editeur Slide</ModalHeader>
                                                <ModalBody>
                                                    <p>
                                                        {contenu}
                                                    </p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" onPress={() => saveEdit()}>
                                                        Enregistrer
                                                    </Button>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        Annuler
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </Spin>
                            <Toaster position='bottom-center' />
                        </div>
                    </div>
            }
        </>
    )
}


export default Slide