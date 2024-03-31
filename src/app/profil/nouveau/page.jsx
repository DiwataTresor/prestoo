"use client";
import React from 'react'
import { useState, useEffect, useRef } from "react"


import Image from "next/image";
import Link from "next/link";

import { Button, Card, Row, Text, Input, Tabs, Tab, Chip, Select, SelectItem, Textarea } from "@nextui-org/react";
// import { titre } from "./../../app/style/global"
import { Divider } from "antd"
import { BankOutlined } from "@ant-design/icons"

import { Modal, notification } from "antd"

import { useRouter } from 'next/navigation'

// import ReCAPTCHA from "react-google-recaptcha"
import Cookies from "js-cookie";
import emailjs from "@emailjs/browser"
import Section from "./../../../components/layouts/section/Section2"
import { secteurs } from '../../../fcts/helper';
import { getData } from '../../utils/helper';

const page = () => {
    const [api, contextHolder] = notification.useNotification();
    const [secteurs,setSecteurs] = useState([]);
    const [provinces,setProvinces] = useState([]);
    const [villes,setVilles] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmitEntreprise = async (e) => {
        e.preventDefault();
       
        let form = Object.fromEntries(new FormData(e.target));
        form.typeCompte = "E";
        let error = false;
        let errorDetail = "";
        
        if (form.password !== form.passwordRepeat) { error = true; errorDetail = "Veuillez verifier vos 2 mots de passe" }
        if (form?.password?.trim()?.length < 8) { error = true; errorDetail = "Le mot de passe doit avoir au moins 8 caracteres" }

        if (error) {
            api.error({
                message: `Inscription`,
                description: errorDetail,
                duration: 3
            });
        } else {
            Modal.confirm({
                title: "Inscription",
                content: "Confirmez-vous vraiment votre inscription ?",
                okText: "S'inscrire",
                cancelText: "Annuler",
                onOk: () => {
                    setIsLoading(true);
                    postData("utilisateurFromAdmin", form)
                        .then(r => {
                            if (r.success) {
                                api.success({
                                    message: `Inscription`,
                                    description: "L'inscription s'est bien faite",
                                    duration: 3
                                });

                                document.getElementById("fEntreprise").reset();
                                // ENVOI MAIL
                                emailjs.init("XPPLXXUmFq2vZZjHu");
                                emailjs.send("service_5wqjced","template_3hp53pa",{
                                    to_name: form.nom,
                                    mail_to: form.email,
                                    }).then((r) => {
                                       console.log(r);
                                    }).catch((err)=>{
                                        console.log("Erreur mail"+err.message)
                                    })
                                // FIN MAIL
                                
                                
                            } else {
                                api.warning({
                                    message: `Inscription`,
                                    description: "Impossible de s'inscrire pour le moment, il y a un problème vers serveur",
                                    duration: 3
                                });
                            }
                        })
                        .catch(r => {
                            console.log("Echec " + r);
                        }).finally(() => {
                            setIsLoading(false)
                        })
                }
            })
        }
    }
    const handleSubmitIndependant = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        getData("secteurs")
            .then(r => {
                
                setSecteurs(r.data);
               
            });
        getData("provinces")
            .then(r => {
                setProvinces(r.data)
            });
        getData("villes").then(r => {
            setVilles(r.data);
        })
    }, [])
   
    return (
        <Section titre={"Nouveau profil"}>
            <div>
                {contextHolder}
                <Divider><h1 className="text-2xl">Inscription d'un profil</h1></Divider>
                <div className="pb-8 pt-9">
                    <div headerBg={"bg-black"} titre="Votre identité">
                        
                        <div className="flex w-full flex-col mt-2">
                            {/* <h2>Veuillez selectionner le type de votre compte</h2> */}
                            <Tabs
                                aria-label="Options"
                                color="primary"
                                variant="underlined"
                                classNames={{
                                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                    cursor: "w-full bg-[#22d3ee]",
                                    tab: "max-w-fit px-0 h-12",
                                    tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                                }}
                            >
                                <Tab
                                    key="photos"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <span><BankOutlined /> Organisation / Entreprise </span>
                                        </div>
                                    }
                                >
                                    <form onSubmit={handleSubmitEntreprise} id="fEntreprise">
                                        <div className="flex flex-col gap-8 mt-5">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                <Select name="secteur" isRequired className="w-full" label="Secteur Activité" labelPlacement="outside">
                                                    {
                                                        secteurs?.sort((a, b) => a.secteur > b.secteur).map((s) => { return <SelectItem key={s.id} value={s.id}>{s.secteur}</SelectItem> })
                                                    }

                                                </Select>
                                                <Input name="nom" isRequired className="w-full" label="Nom de l'organisation" labelPlacement="outside" />
                                            </div>
                                            {/* <div className="flex flex-row gap-6">
                                                <Input type="text" name="rccm" className="w-full" label="RCCM" labelPlacement="outside" />
                                                <Input type="text" name="idnat" className="w-full" label="Id-Nat" labelPlacement="outside" />
                                            </div> */}
                                            <Input name="email" isRequired className="w-full" label="E-mail" labelPlacement="outside" />
                                            <div className="flex flex-row gap-6">
                                                <Input type="password" name="password" isRequired className="w-full" label="Mot de passe" labelPlacement="outside" />
                                                <Input type="password" name="passwordRepeat" isRequired className="w-full" label="Retaper mot de passe" labelPlacement="outside" />
                                            </div>
                                            <div className="w-full">
                                                <Select name="ville" isRequired className="w-full" label="Ville" labelPlacement="outside">
                                                    {
                                                        villes?.sort((a, b) => a.ville > b.ville).map((s) => { return <SelectItem key={s.id} value={s.id}>{s.ville}</SelectItem> })
                                                    }
                                                </Select>
                                            </div>
                                            <div className="flex flex-row gap-6">
                                                <Input type="text" name="adresse" className="w-full" label="Adresse" labelPlacement="outside" />
                                                <Input type="telephone" name="telephone" className="w-full" label="Téléphone" labelPlacement="outside" />
                                            </div>
                                            {/* <Input type="url" name="siteweb" className="w-full" label="Votre site web (URL)" labelPlacement="outside" /> */}
                                            <Textarea name="description" minRows={3} className="w-full" label="Decrivez votre organisation" labelPlacement="outside" />
                                            {/* <div className="flex items-center justify-center">
                                                <ReCAPTCHA ref={captcha} sitekey={"6LdTJMIoAAAAAL74aT4mOU3uJhEjuhHNXU8Asp11"}
                                                    onChange={handleCaptcha} />
                                            </div> */}
                                            <div className="flex flex-row gap-4 items-end justify-end">
                                                <Button type="submit" color="primary" isLoading={isLoading}>
                                                    Enregistrer
                                                </Button>
                                                <Button type="button" color="danger" variant="light">
                                                    Annuler
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Tab>
                                <Tab
                                    key="music"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            <span>Compte indépedant</span>
                                        </div>
                                    }
                                    className="hidden"
                                >
                                    <form onSubmit={handleSubmitIndependant}>
                                        <div className="flex flex-col gap-8 mt-5">
                                            <div className="flex flex-row gap-6">

                                                <Input name="nom" className="w-full" label="Nom" labelPlacement="outside" />
                                                <Input name="posnom" className="w-full" label="Postnom" labelPlacement="outside" />
                                                <Input name="prenom" className="w-full" label="Prénom" labelPlacement="outside" />
                                            </div>

                                            <Input name="email" className="w-full" label="E-mail" labelPlacement="outside" />
                                            <Input name="telephone" className="w-full" label="Téléphone" labelPlacement="outside" />
                                            <Input name="adresse" className="w-full" label="Adresse" labelPlacement="outside" />

                                            <div className="flex flex-row gap-6">
                                                <Select name="province" isRequired className="w-full" label="Province" labelPlacement="outside">
                                                    {
                                                        provinces?.sort((a, b) => a.province > b.province).map((s) => { return <SelectItem key={s.id} value={s.id}>{s.province}</SelectItem> })
                                                    }
                                                </Select>
                                                <Input name="ville" className="w-full" label="Ville" labelPlacement="outside" />
                                            </div>
                                            <div className="flex flex-row gap-6">
                                                <Input type="text" name="adresse" className="w-full" label="Adresse" labelPlacement="outside" />
                                            </div>
                                            <div className="flex flex-row gap-6">
                                                <Input type="file" startContent={" "} name="photo" className="w-full" label="Votre photo de Profil" />
                                                <Input type="file" startContent={" "} name="cv" className="w-full" label="Votre CV" />
                                            </div>
                                            <div className="flex flex-row gap-6">
                                                <Input type="password" name="password" isRequired className="w-full" label="Mot de passe" labelPlacement="outside" />
                                                <Input type="password" name="passwordRepeat" isRequired className="w-full" label="Retaper mot de passe" labelPlacement="outside" />
                                            </div>
                                            {/* <div className="flex items-center justify-center">
                                                <ReCAPTCHA ref={captcha} sitekey={"6LdTJMIoAAAAAL74aT4mOU3uJhEjuhHNXU8Asp11"}
                                                    onChange={handleCaptcha} />
                                            </div> */}
                                            <div className="flex flex-row gap-4 items-end justify-end">
                                                <Button type="submit" color="primary" isLoading={isLoading}>
                                                    Enregistrer
                                                </Button>
                                                <Button type="button" color="danger" variant="light">
                                                    Annuler
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Tab>

                            </Tabs>
                        </div>
                    </div>
                    {/* <Card css={{ mw: "330px" }}>
                <Card.Header>
                    Test
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                    
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                   
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                    <Row justify="flex-end">
                    <Button size="sm" light>
                        Share
                    </Button>
                    <Button size="sm" color="secondary">
                        Learn more
                    </Button>
                    </Row>
                </Card.Footer>
            </Card> */}
                </div>
            </div>
        </Section>
    )
}

export default page