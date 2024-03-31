import {Card, CardHeader, CardBody, CardFooter,Button,Switch, Image,Divider} from "@nextui-org/react"
const LayoutDashboard=({children,titre,titreIcone,center,footer,footerCenter,cl})=>{
    return (
        <>
        <Card className="mb-3">
            <CardHeader className={`flex gap-3 border-b border-white shadow-sm bg-slate-300 text-green-600 font-bold ${cl}`}>
                {titreIcone || <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="text-white" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>}
                {titre}
            </CardHeader>
            <CardBody className={footer && " border-b"}>
                {
                    center?
                    <div className="flex flex-col items-center">
                        {children}
                    </div>:
                    <div>
                        {children}
                    </div>
                }
            </CardBody>
            {
                footer && 
                <CardFooter>
                    <div className={footerCenter && " w-full"}>{footer}</div>
                </CardFooter>
            }
        </Card>
        {/* <div className="">&nbsp;</div> */}
        </>
    )
}

export default LayoutDashboard