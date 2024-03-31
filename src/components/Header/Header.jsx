import React,{useEffect,useState} from "react"
import Link from "next/link"
import {useRouter} from "next/navigation";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User,Input} from "@nextui-org/react";
import Cookies from "js-cookie"
import { infoApp } from "../../app/utils/helper";
import { ActivityIcon, Bed, CircleUserRound, Grip, Soup, UserCircle, Wrench } from "lucide-react";
import { usePathname } from 'next/navigation'


const LayoutHeader=()=>{
  const menuHorizontal="flex gap-1 items-center hover:bg-blue-400 h-[50px] px-6 rounded-tl-lg cursor-pointer shadow-sm";
  const menuHorizontalActive="flex gap-1 items-center bg-blue-800 hover:bg-blue-700 h-[50px] px-6 rounded-t-md cursor-pointer shadow-sm border-b-4 border-white";
  const pathname = usePathname()
  useEffect(() => {
    // alert(pathname)
  }, [])
  
  const router=useRouter();
    return (
        <div className="flex flex-row justify-between px-7 items-center pt-2">
          <div className="text-white font-bold text-xl flex flex-col">
              {/* <Link href={"/"}>{infoApp.nomApp}</Link>
              <span className="text-sm text-white">{infoApp.description}</span> */}
              {/* <span><Grip /></span> */}

              {/* DROPDOWN */}
              <div className="flex items-center gap-4">
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                  <span><Grip /></span>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    {/* <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-bold">Signed in as</p>
                      <p className="font-bold">@tonyreichert</p>
                    </DropdownItem> */}
                    <DropdownItem key="settings">
                      Hôtel
                    </DropdownItem>
                    <DropdownItem key="analytics">
                     Restaurant-Bar
                    </DropdownItem>
                    <DropdownItem key="help_and_feedback">
                     Salle(s)
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                     Paramètres-Admin
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              

              {/* FIN DROPDOWN */}
          </div>
          <div className="flex-1 flex-wrap md:flex-wrap md:mb-0">
            <div className="flex gap-3 text-xl text-white">
                <Link href={"/module_hotel"} className="hover:text-white"><div className={pathname.split("/")[1]=="module_hotel"?menuHorizontalActive:menuHorizontal}><Bed/> Hôtel</div></Link>
                 <Link href={"/module_restaurant"} className="hover:text-white"><div className={pathname.split("/")[1]=="module_restaurant"?menuHorizontalActive:menuHorizontal}><Soup />Restaurant-Bar</div></Link>
                 <Link href={"/module_fitness"} className="hover:text-white"><div className={pathname.split("/")[1]=="module_fitness"?menuHorizontalActive:menuHorizontal}><ActivityIcon /> Fitness</div></Link>
                 <Link href={"/module_parametre"} className="hover:text-white"><div className={pathname.split("/")[1]=="module_parametre"?menuHorizontalActive:menuHorizontal}><Wrench /> Paramètres-Admin</div></Link>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-3">
     
            <Dropdown placement="bottom-start">
              <DropdownTrigger className="w-[40px]">
                <CircleUserRound color="white" />
              </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat" className="flex flex-col py-2 px-4 -mt-[6px]  rounded-md">
              {/* <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@tonyreichert</p>
              </DropdownItem> */}
              <DropdownItem key="settings">
                Mon profil
              </DropdownItem>
              <DropdownItem key="team_settings">Mon journal</DropdownItem>
              {/* <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem> */}
              <DropdownItem key="logout" color="danger">
                <button onClick={()=>{
                Cookies.remove("connected");
                window.location.reload()
                }}>Deconnexion</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    )
}

export default LayoutHeader;