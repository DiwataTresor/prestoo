import {Watermark} from "antd"
import { bgPrimaryColor, myContainer,titrePrincipal } from "@/app/style/global";
import logo from "@/assets/logo.png"
const LayoutClient=({children,header,hideHeader})=>{
    return(
        <div>
            {/* <Watermark 
                content="Index RDC"
                // image="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.caf51a31.png&w=384&q=75"
            > */}
            {
                !hideHeader && 
                <div className="w-full items-center justify-center flex min-h-[250px] bg-gray-200 text-2xl font-bold">
                    {header}
                </div>
            }
            {/* </Watermark> */}
            <div className={myContainer + " min-h-[300px]"}>
                {children}
            </div>
        </div>
    )
}
export default LayoutClient