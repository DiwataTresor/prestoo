"use client"
import React, { useEffect, useState } from 'react'
import DashboardBtn from '../components/DashboardBtn'
import ListeAbonne from "./ListeAbonne"
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { Modal, Spin } from 'antd'
import { Add, isTraiting } from "./../controller/crud"

const page = () => {
    const [openModal, setOpenModal] = useState(false)
    const [spinning, setSpinning] = useState(isTraiting)
    // const []
    const handleNew = () => {
        setOpenModal(true)
    }
    const handleSubmit = (e) => {
        // e.preventDefault()
        // console.log(Object.fromEntries(new FormData(e.target)));
        add(e, Object.fromEntries(new FormData(e.target))).then(r => {
            console.log(r);
        })
    }

    useEffect(() => {
        // alert(isTraiting)
        setSpinning(isTraiting)
    }, [isTraiting])

    return (
        <>

            <div className='flex gap-2'>
                <DashboardBtn text={"Total abonnements en cours"} badge={15} />
                <DashboardBtn text={"Presences journalière"} badge={15} />
                <DashboardBtn text={"Presences Mensuelle"} badge={15} />
                <DashboardBtn text={"Presences Anuelle"} badge={15} />
            </div>
            <div className='text-start mt-4'>
                <Button color='primary' onPress={handleNew} startContent={<PlusIcon />}>Nouvel abonnement</Button>
            </div>
            <div>
                <ListeAbonne />
            </div>
            <Modal title={"Nouvel abonnement"} open={openModal} onCancel={() => setOpenModal(false)} footer={false}>
                <Add>
                    <div className='flex flex-col gap-4'>
                        <Input name='nom' autoComplete='off' size='sm' labelPlacement='inside' label="Nom abonné" />
                        <div className='flex gap-3'>
                            <Input name='adresse' autoComplete='off' size='sm' label="Adresse" labelPlacement='inside' />
                            <Input name='telephone' autoComplete='off' size='sm' label="Téléphone" labelPlacement='inside' />
                        </div>
                        <Select name='typeAbonnement' size='sm' label="Type abonnement">
                            <SelectItem>Mensuel</SelectItem>
                            <SelectItem>Semaine</SelectItem>
                        </Select>
                        <Input name='duree' autoComplete='off' size='sm' type='number' label="Durée" labelPlacement='inside' />
                    </div>
                </Add>
            </Modal>
        </>
    )
}

export default page