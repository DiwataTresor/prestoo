"use client"
import React, { useState } from 'react'
import { Avatar, Button } from "@nextui-org/react";
import { BACKEND_URL, SITEWEB_URL, postData } from '../../../../fcts/helper';
import { Bookmark, Calendar, CheckCheckIcon, Globe2Icon, GlobeIcon, Home, Phone, ShieldOff } from 'lucide-react';
import moment from "moment"
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { Modal,Spin,notification } from 'antd';

const Profil = ({ profil,data, callback }) => {
  const [spinning,setSpinning]=useState(false);
  const [api,contextHolder]=notification.useNotification();
  const router =useRouter();

  return (
    <Spin spinning={spinning}>
      {contextHolder}
    <div className='flex justify-center items-center'>
      <div className='border rounded-sm w-[40%] h-fit py-5 shadow-md border-gray-100 flex flex-col justify-center items-center'>
        <p className='font-bold text-3xl'>{profil?.nom}</p> <hr className='my-3' />
        <p className='flex items-center justify-center mb-6'>
          <Avatar src={BACKEND_URL + profil?.logo} className="w-40 h-40 text-large" />
        </p>
        <div className='flex flex-col gap-6'>
          <p className='flex justify-center gap-4'><Bookmark size={14} /> {profil?.secteurDetail}</p>
          <p className='flex justify-center gap-4'><Home size={14} /> {profil?.adresse}, ville/commune : {profil?.villeDetail}</p>
          <p className='flex justify-center gap-4'><Phone size={14} /> {profil?.telephone}</p>
          <p className='flex justify-center gap-4'><Calendar size={14} />Date demande : {moment(data?.dtDemande).format("DD/MM/YYYY HH:mm:SS")}</p>
          <p><Link className='flex gap-3 justify-center items-center' target='_blank' href={`${SITEWEB_URL}${profil?.slug}`}><GlobeIcon size={13} />visiter la page</Link></p>
        </div>
        <div className='flex gap-5 mt-5 border-t pt-4 w-full justify-center items-center'>
          <Button color='primary' onPress={()=>{
            Modal.confirm({
              title:"Certification",
              content:"Confirmez-vous la certification de ce compte ?",
              okText:"Oui",
              cancelText:"Annuler",
              onOk:() => {
                setSpinning(true);
                postData("certifierSuccess",{profilId:profil?.id})
                .then((r) => {
                  if(r.success)
                  {
                    api.success({message:"certification",description:"Ce compte est bien certifié"});
                    router.push("/");

                  }else{
                    api.success({message:"certification",description:"Echec d'execution de la requete"});
                  }
                }).catch(r=>{
                  api.success({message:"certification",description:"Une erreur s'est produite dans le système"});
                }).finally(() =>{
                  setSpinning(false);
                })
              },
              onCancel:() => {
                callback(false)
              }
            })
          }}><CheckCheckIcon /> Certifier</Button>
          <Button color='warning'><ShieldOff /> Refuser</Button>
        </div>
      </div>
    </div>
    </Spin>
  )
}

export default Profil