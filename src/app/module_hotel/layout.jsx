import { ArrowRightCircle } from 'lucide-react'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <div className='border-b py-4 bg-white text-left flex gap-3 pl-3'><ArrowRightCircle /> GESTION HOTEL</div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default layout