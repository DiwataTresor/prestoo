"use client"
import React, { useState, useEffect } from 'react'
import Section from "./../../../components/layouts/section/Section"
import Section2 from "./../../../components/layouts/section/Section2"
import { Button, Image, Input, Textarea } from '@nextui-org/react'
import { Modal, notification } from 'antd'
import { getData, postData } from '../../../fcts/helper'
import { Facebook, Linkedin, MapPinIcon, MessageSquareIcon, PhoneCallIcon } from 'lucide-react'
import logoX from "./../../../components/icons/logoX.png"

const Comp = ({ _type, typeColone, id, label, colone, clbck }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [valeur, setValeur] = useState("");

    const maj = () => {

        Modal.confirm({
            title: "Contact",
            content: "Confirmez-vous cette modification ?",
            okText: "Oui",
            cancelText: "Annuler",
            onOk: () => {
                setIsLoading(true);
                postData("contact", { colone:colone, valeur:valeur }).then(r => {
                    console.log(r);
                    if (r.success) {
                        clbck(true);
                    } else {
                        clbck(false);
                    }
                }).finally(() => {
                    setIsLoading(false);
                })
            }
        })
    }
    return (
        <>
            <div className='flex gap-2 justify-center items-center'>
                {
                    _type == "input" ?
                        <Input type={typeColone} label={label} size='sm' onChange={(e) => setValeur(e.target.value)} /> :
                        <div className='w-full'>
                            <Textarea minRows={4} label="Adresse" size='lg' onChange={(e) => setValeur(e.target.value)}>

                            </Textarea>
                        </div>
                }
                <Button isLoading={isLoading} size='md' color='primary' className='px-6' onPress={() => maj()}>Mettre à jour</Button>
            </div>
        </>
    )
}
const page = () => {
    const [contact, setContact] = useState({
        adresse: "",
        telephone: "",
        telephone2: "",
        e_mail: "",
        facebook: "",
        linkedin: "",
        x: "",
    })

    const [elt, setElt] = useState(null);
    const [api, contextHolder] = notification.useNotification();

    const retour = (r) => {
        api.open({
            type: r == true ? "success" : "error",
            message: `Notification`,
            description: r == true ? "Bien enregistré" : "Echec d'enregistrement",
            placement: "topRight"
        });
        if (r == true) {
            getContact();
        }
    }
    const hauteurLigne = "h-5 py-5 flex gap-3 items-center w-[200px]";
    const getContact = () => {
        getData("contact").then(r => {
            setContact({
                adresse: r?.data?.adresse,
                telephone: r?.data?.telephone,
                telephone2: r?.data?.telephone2,
                e_mail: r?.data?.e_mail,
                facebook: r?.data?.facebook,
                linkedin: r?.data?.linkedin,
                x: r?.data?.r
            })
        });
    }

    useEffect(() => {
        getContact();
    }, [])

    return (
        <>
            {contextHolder}
            <Section titre={<div className='text-2xl'>Nos contacts</div>}>
                <div className='flex gap-4 flex-wrap'>
                    {/* <div className='flex gap-2'>
                    <Input  type='email' label="Email" size='sm' onChange={(e)=>setContact({...contact,e_mail:e.target.value})} />
                    <Button size='md' color='primary' className='px-6' onPress={()=>maj("e_mail",contact.e_mail)}>Mettre à jour</Button>
                </div> */}
                    <Comp _type={"input"} label={"Email"} typeColone={"email"} colone={"e_mail"} clbck={retour} />
                    <Comp _type={"input"} label={"Téléphone"} typeColone={"phone"} colone="telephone" clbck={retour} />
                    <Comp _type={"input"} label={"Téléphone 2"} typeColone={"phone"} colone={"telephone2"} clbck={retour} />
                    <Comp _type={"input"} label={"Facebook"} typeColone={"text"} colone={"facebook"} clbck={retour} />
                    <Comp _type={"input"} label={"Linkedin"} typeColone={"text"} colone={"linkedin"} clbck={retour} />
                    <Comp _type={"input"} label={"X(Twitter)"} typeColone={"text"} colone={"x"} clbck={retour} />
                </div>
                <div className='items-center mt-4 gap-4'>
                    <Comp _type={"textarea"} label={"Adressess"} typeColone={"text"} colone={"adresse"} clbck={retour} />
                </div>
                <hr className='my-3' />
                <div className='mt-5'>
                    <div className='text-lg flex flex-col'>
                        <div className='flex'>
                            <div className={hauteurLigne}><MapPinIcon size={15} color='gray' /> Adresse</div>
                            <div> : {contact?.adresse}</div>
                        </div>
                        <div className='flex'>
                            <div className={hauteurLigne}><PhoneCallIcon size={15} color='gray' /> Téléphone</div>
                            <div> : {contact?.telephone}</div>
                        </div>
                        <div className='flex'>
                            <div className={hauteurLigne}><PhoneCallIcon size={15} color='gray' /> Téléphone 2</div>
                            <div> : {contact?.telephone2}</div>
                        </div>
                        <div className='flex'>
                            <div className={hauteurLigne}><MessageSquareIcon size={15} color='gray' /> E-mail</div>
                            <div> : {contact?.e_mail}</div>
                        </div>
                        <div className='flex'>
                            <div className={hauteurLigne}><Facebook size={15} color='gray' /> Facebook</div>
                            <div> : {contact?.facebook}</div>
                        </div>
                        <div className='flex'>
                            <div className={hauteurLigne}><Linkedin size={15} color='gray' /> Linkedin</div>
                            <div> : {contact?.linkedin}</div>
                        </div>
                        <div className='flex'>
                            <div className={hauteurLigne}><Image size={15} color='gray' src={logoX} width={18} height={18} /> X</div>
                            <div> : {contact?.x}</div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}

export default page