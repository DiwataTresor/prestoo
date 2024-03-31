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
          <p className='flex justify-center gap-4'><Calendar size={14} />Date certification : {moment(data?.dtReponse).format("DD/MM/YYYY HH:mm:SS")}</p>
          <p><Link className='flex gap-3 justify-center items-center' target='_blank' href={`${SITEWEB_URL}${profil?.slug}`}><GlobeIcon size={13} />visiter la page</Link></p>
        </div>
       
      </div>
    </div>
    </Spin>
  )
}

export default Profil