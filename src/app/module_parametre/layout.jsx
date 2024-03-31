"use client"
import React from 'react'
import ModuleTitre from '../components/ModuleTitre'

const layout = ({children}) => {
  return (
    <div>
        <ModuleTitre titre={"Paramètre"} />
        <div>
            {children}
        </div>
    </div>
  )
}

export default layout