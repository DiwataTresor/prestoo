import React from 'react'
import ModuleTitre from "./../components/ModuleTitre"

const layout = ({children}) => {
  return (
    <>
   <ModuleTitre titre={"Fitness"} />
    {children}
    </>
  )
}

export default layout