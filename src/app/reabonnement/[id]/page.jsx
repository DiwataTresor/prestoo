"use client"
import React,{useEffect, useState} from 'react'
import Section from '../../../components/layouts/section/Section'
import { getData } from '../../../fcts/helper'
import Profil from "./Profil"
import Document from "./Document"
import {Tabs} from  "antd"


const page = ({params}) => {
  const [profil,setProfil]=useState(null);
  const [data,setData]=useState(null);
  const callback=(isDone) => {
    if(isDone){
     
    }else{
     
    }
  }
  const items=[
    {
      key:"Profil",
      label:"Profil",
      children:<Profil profil={profil} data={data} callback={callback} />
    }
  ]
  const idDemande=params.id;
  useEffect(() => {
    getData("demandeReabonnement&idDemande="+idDemande)
    .then((r) => {
      console.clear()
      console.log(r);

      setProfil(r.profil);
      setData(r.data);
    })
    .finally(() => {})
  }, [])

  
  
  return (
    <Section titre={'Demande de Reabonnement'}>
        <Tabs items={items} />
    </Section>
  )
}

export default page