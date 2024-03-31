import Link from "next/link"
import {Card, CardHeader, CardBody, CardFooter,Button,Switch, Image} from "@nextui-org/react"
import {Divider} from "antd"
const Section2=({children,titre,titreIcone,center,footer,footerCenter,cl,showRootLink})=>{
    return (
        <div className={`mb-3 ${cl}`}>
            <h1 className="flex text-white gap-6 text-xl mb-2 font-bold bg-blue-800 border-b-2 py-3 px-2 rounded-tl-md rounded-tr-md border-blue-300">
                {showRootLink && 
                    <div className="flex">
                        <Link href="/" className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <span>Accueil</span>
                        </Link>
                        
                    </div>
                }
                {showRootLink && 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>                  
                }
                <div className=" flex gap-4">
                    {!titreIcone ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>:
                    <span className="text-white">{titreIcone}</span>
                    }
                    <span className="text-white text-lg">{titre}</span>
                </div>
            </h1>
            <div className="bg-white min-h-[100px] py-3 px-3  border-0 rounded-bl-md rounded-br-md">
                {children}
            </div>
        </div>
    )
}

export default Section2