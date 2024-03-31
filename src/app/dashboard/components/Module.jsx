import {
    Button,
    Input,
    ButtonGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownTrigger,
    Select,
    SelectItem,
    Divider,
} from "@nextui-org/react";
import Link from "next/link";
const Module = ({ text, nombre, icon, lien }) => {
    return (
        <>
            {
                lien ? <Link href={lien}>
                    <div className="w-full bg-white min-h-[100px] border border-gray-300 my-2 rounded-md shadow-sm px-2 py-3 overflow-hidden flex justify-center items-center gap-2">
                        <div>
                            <div className="w-[50px] h-[50px] rounded-full bg-green-500 flex items-center justify-center">
                                {icon}
                            </div>
                        </div>
                        <Divider className="mb-3 h-[50px] ml-5" orientation="vertical" />
                        <div className="text-center w-full flex flex-col gap-6">
                            <h1 className="text-md">{text} </h1>
                            <h1 className="text-lg">{nombre} </h1>
                        </div>
                    </div>
                </Link> :
                    <div className="w-full bg-white min-h-[100px] border border-gray-300 my-2 rounded-md shadow-sm px-2 py-3 overflow-hidden flex justify-center items-center gap-2">
                        <div>
                            <div className="w-[50px] h-[50px] rounded-full bg-green-500 flex items-center justify-center">
                                {icon}
                            </div>
                        </div>
                        <Divider className="mb-3 h-[50px] ml-5" orientation="vertical" />
                        <div className="text-center w-full flex flex-col gap-6">
                            <h1 className="text-md">{text} </h1>
                            <h1 className="text-lg">{nombre} </h1>
                        </div>
                    </div>
            }
        </>
    )
}
export default Module