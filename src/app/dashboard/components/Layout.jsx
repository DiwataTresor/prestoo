import React from 'react'

const Layout = ({children,titre,cl}) => {
  return (
    <div className={'border rounded-lg border-white overflow-hidden my-2 w-full bg-white '+cl}>
        <h1 className='flex gap-3 text-xl font-bold border-b-1 border-white text-white pl-3 py-3 bg-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-4 h-4 mt-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
            {titre}
        </h1>
        <div className='px-2 bg-white'>
            {children}
        </div>
    </div>
  )
}

export default Layout