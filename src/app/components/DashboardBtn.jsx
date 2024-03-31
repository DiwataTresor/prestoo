import { Badge } from 'antd'
import React from 'react'

const DashboardBtn = ({text,badge,children,cls,callback}) => {
  return (
    
      <div onClick={()=>callback()} className={`${cls && cls} h-[120px] gap-2 border shadow-sm min-w-[200px] w-fit px-8 flex flex-col items-center justify-center bg-white mb-4 rounded-md`}>
        <div className='font-bold text-md'>
        {text}
        </div>
        {
            badge && (<Badge count={badge} overflowCount={badge} />)
        }
        {children && (<Children />)}
    </div>
  )
}

export default DashboardBtn