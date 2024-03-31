"use client"
import React, { useEffect,useState } from 'react'
import Slide from '../../modele_slide_1/Slide'
import { getData } from '../../../../fcts/helper'

const page = ({params}) => {
  const [typeSlide,setTypeSlide]=useState(null)
 const getDatas=() =>{
  getData("slide&idSlide="+params.id).then(r=>{
    console.clear()
   setTypeSlide(r?.data.typeSlide);
  })
 }
  useEffect(() =>{
    getDatas();
  },[])
  return (
    <div>
       <Slide idSlide={params.id} typeSlide={typeSlide}  mode="edition" />
    </div>
  )
}

export default page