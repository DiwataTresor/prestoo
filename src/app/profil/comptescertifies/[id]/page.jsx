"use client"
import React,{useEffect, useState} from 'react'
import Section from '../../../../components/layouts/section/Section'
import { getData } from '../../../../fcts/helper'
import Profil from "./Profil"
import Document from "./Document"
import {Tabs} from  "antd"


const page = ({params}) => {
  const [profil,setProfil]=useState(null);
  const [data,setData]=useState(null);
  const callback=(isDone) => {
    if(isDone){
      alert("ok")
    }else{
      alert("false")
    }
  }
  const items=[
    {
      key:"Profil",
      label:"Profil",
      children:<Profil profil={profil} data={data} callback={callback} />
    },
    {
      key:"Document",
      label:"Dossiers traités",
      children:<Document />
    }
  ]
  const idDemande=params.id;
  useEffect(() => {
    getData("demandeCertification&idDemande="+idDemande)
    .then((r) => {
      console.clear()
      console.log(r);

      setProfil(r.profil);
      setData(r.data);
    })
    .finally(() => {})
  }, [])

  
  
  return (
    <Section titre={'Demande de certification'}>
        <Tabs items={items} />
    </Section>
  )
}

export default page