"use client"
import React, { useState } from 'react'
import ModuleTitre from '../components/ModuleTitre'
import DashboardBtn from '../components/DashboardBtn'
import { Modal } from 'antd'
import { Add } from '../controller/crud'
import { Input, Select, SelectItem } from '@nextui-org/react'

const page = () => {
    const [openModalTypeAbonnement,setOpenModalTypeAbonnement]=useState(false)
    const callback=(value)=>{
        if(value.success)
        {
            setOpenModalTypeAbonnement(false)
        }
    }
  return (
    <>
        <div>
            <div>
                <ModuleTitre titre={"Fitness"} />
                <div>
                    <DashboardBtn text={"Type abonnement"} callback={()=>setOpenModalTypeAbonnement(true)} />
                </div>
            </div>
        </div>
        <Modal footer={false} onCancel={()=>setOpenModalTypeAbonnement(false)} open={openModalTypeAbonnement} title="Enregistrer type abonnement">
            <Add formulaire={"typeAbonnementFitness"} callback={callback}>
                <Input label="Libellé" labelPlacement='outside' name='libelle' />
                <Select label="Durée" labelPlacement='outside' name='duree' defaultValue={""}>
                    <SelectItem key={"A"} value={"A"}>Annuel</SelectItem>
                    <SelectItem key={"M"} value={"M"}>Mensuel</SelectItem>
                    <SelectItem key={"H"} value={"H"}>Hebdomadaire</SelectItem>
                </Select>
               
            </Add>
        </Modal>
    </>
  )
}

export default page