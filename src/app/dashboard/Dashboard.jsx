"use client";
import { useState, useEffect, useRef } from "react";
import Module from "./components/Module"
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
import { Chevron } from "../../components/icons/Chevron"
import { getEntites } from "../utils/helper"
import Layout from "./components/Layout"
import { getData, provinces as getProvinces } from "./../../fcts/helper"
import moment from "moment"
import Link from "next/link"
import iconInfo from "./../../components/icons/info-signs-svgrepo-com.png"
import Image from "next/image";
import { BadgeCheck, BadgePlusIcon, User2, UserCircle2 } from "lucide-react";
import Cookies from "js-cookie"

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(new Set([0]));
  const selectedOptionValue = Array.from(selectedOption)[0];
  const entites = getEntites();
  const [provinces, setProvinces] = useState([]);
  const [statistiqueProfil, setStatistiqueProfil] = useState({});
  const getStatistiqueProfil = () => {
    getData("adminStatistiqueProfil").then(r => {
      setStatistiqueProfil(r.data);
    });
  }
  moment().locale("fr");
  useEffect(() => {
    getProvinces().then(r => setProvinces(r));
    getStatistiqueProfil();
  }, [])

  const descriptionsMap = {

    0: "Kinshasa"

  };

  const labelsMap = {
    0: "Kinshasa"
  };

  // Icone
  const iconEvenement = <svg width="46px" height="46px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M892.1 938.7H131.9c-17.8 0-35.1-3.5-51.4-10.4-15.6-6.6-29.7-16.1-41.9-28.2C26.5 888 17 873.9 10.3 858.2 3.5 841.8 0 824.5 0 806.8V217.2c0-17.8 3.5-35 10.4-51.3 6.6-15.7 16.1-29.8 28.2-41.9 12.2-12.2 26.3-21.7 42-28.3 16.2-6.9 33.5-10.4 51.3-10.4h83.4c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7h-83.4c-6.3 0-12.4 1.2-18.1 3.6-5.6 2.4-10.6 5.7-14.9 10-4.3 4.3-7.6 9.2-10 14.8-2.4 5.7-3.6 11.8-3.6 18.1v589.6c0 6.3 1.2 12.4 3.7 18.1 2.3 5.5 5.7 10.5 10 14.8 4.3 4.2 9.2 7.6 14.8 9.9 5.8 2.4 11.9 3.7 18.1 3.7h760.2c6.3 0 12.4-1.2 18.1-3.6 5.6-2.4 10.6-5.7 14.9-10 4.3-4.3 7.6-9.2 10-14.8 2.4-5.7 3.6-11.8 3.6-18.1V217.2c0-6.3-1.2-12.4-3.7-18.1-2.3-5.5-5.7-10.5-10-14.8-4.3-4.2-9.2-7.6-14.8-9.9-5.8-2.4-11.9-3.7-18.1-3.7h-83.4c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h83.4c17.8 0 35.1 3.5 51.4 10.4 15.6 6.6 29.7 16.1 41.9 28.2 12.1 12.1 21.6 26.2 28.3 41.9 6.9 16.3 10.4 33.6 10.4 51.4v589.6c0 17.8-3.5 35-10.4 51.3-6.6 15.7-16.1 29.8-28.2 41.9-12.2 12.2-26.3 21.7-42 28.3-16.3 6.9-33.6 10.4-51.4 10.4z" fill="#3688FF"></path><path d="M341.3 277.3c-23.6 0-42.7-19.1-42.7-42.7V85.3c0-23.6 19.1-42.7 42.7-42.7S384 61.8 384 85.3v149.3c0 23.6-19.1 42.7-42.7 42.7zM682.7 277.3c-23.6 0-42.7-19.1-42.7-42.7V85.3c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v149.3c-0.1 23.6-19.2 42.7-42.7 42.7zM810.7 490.7H213.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h597.3c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.6 42.7zM810.7 704H213.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h597.3c23.6 0 42.7 19.1 42.7 42.7S834.2 704 810.7 704z" fill="#5F6379"></path></g></svg>;
  const iconUsers = <svg width="46px" height="46px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M388.9 597.4c-135.2 0-245.3-110-245.3-245.3s110-245.3 245.3-245.3 245.3 110 245.3 245.3-110.1 245.3-245.3 245.3z m0-405.3c-88.2 0-160 71.8-160 160s71.8 160 160 160 160-71.8 160-160-71.8-160-160-160z" fill="#3688FF"></path><path d="M591.3 981.3H186.5c-76.6 0-138.8-62.3-138.8-138.8V749c0-130.6 106.2-236.9 236.9-236.9h208.8c130.6 0 236.9 106.3 236.9 236.9v93.5c-0.2 76.5-62.4 138.8-139 138.8zM284.5 597.4c-83.6 0-151.5 68-151.5 151.5v93.5c0 29.5 24 53.5 53.5 53.5h404.8c29.5 0 53.5-24 53.5-53.5v-93.5c0-83.6-68-151.5-151.6-151.5H284.5z" fill="#3688FF"></path><path d="M847.2 938.6c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c29.5 0 53.5-24 53.5-53.5v-93.5c0-83.6-68-151.5-151.6-151.5h-14.3c-19.8 0-37-13.6-41.5-32.9-4.5-19.3 4.8-39.1 22.5-48 54.8-27.3 88.9-82.1 88.9-143.1 0-88.2-71.8-160-160-160-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c135.2 0 245.3 110 245.3 245.3 0 57.8-19.9 111.9-54.9 154.8 88.3 34.6 151 120.6 151 220.9v93.5c0 76.6-62.3 138.8-138.9 138.8z" fill="#5F6379"></path></g></svg>;
  const iconNewsletters = <svg width="46px" height="46px" viewBox="0 -0.5 1025 1025" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M509.3 606.2c-27.9 0-55.6-9-78.7-26.9L36.4 245.7c-18-15.2-20.2-42.2-5-60.1 15.2-18 42.2-20.2 60.1-5L484.3 513c14.4 11.1 36.5 11.1 52.4-1.2l396.2-331.4c18.1-15.1 45-12.8 60.1 5.4 15.1 18.1 12.7 45-5.4 60.1L590.1 578.3c-24.1 18.7-52.6 27.9-80.8 27.9z" fill="#5F6379"></path><path d="M894.8 938.6H129.4c-71.3 0-129.4-58-129.4-129.4v-552c0-71.3 58-129.4 129.4-129.4h765.4c71.3 0 129.4 58 129.4 129.4v552.1c0 71.3-58.1 129.3-129.4 129.3zM129.4 213.2c-24.3 0-44 19.8-44 44v552.1c0 24.3 19.8 44 44 44h765.4c24.3 0 44-19.8 44-44V257.2c0-24.3-19.8-44-44-44H129.4z" fill="#3688FF"></path></g></svg>;
  const iconProduit = <svg width="46px" height="46px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M814.2 1016.4c-19.6 0-39.2-4.5-57.1-13.5L530.8 889.2c-11.7-5.9-25.8-5.9-37.5 0L267 1002.9c-37.2 18.7-81.3 17.9-118.1-1.9-35.3-19-58.1-52.3-62.6-91.3-0.6-4.9-0.9-9.9-0.9-15V129.4C85.3 58 143.4 0 214.7 0h594.6c71.3 0 129.4 58 129.4 129.4v765.3c0 5.1-0.3 10.1-0.9 15-4.5 39-27.4 72.2-62.6 91.3-19 10.2-40 15.4-61 15.4zM512 799.5c19.6 0 39.2 4.5 57.1 13.5l226.3 113.7c12.3 6.2 27 5.9 39.3-0.8 6.1-3.3 16.7-11.1 18.4-26 0.2-1.7 0.3-3.4 0.3-5.2V129.4c0-24.3-19.8-44-44-44H214.7c-24.3 0-44 19.8-44 44v765.3c0 1.8 0.1 3.5 0.3 5.2 1.7 15 12.3 22.8 18.4 26 12.3 6.7 27 6.9 39.3 0.8L455 813c17.8-9.1 37.4-13.5 57-13.5z" fill="#3688FF"></path><path d="M597.8 590.6c-6.7 0-13.5-1.3-20-4.1L512 558.9l-65.7 27.7c-16.8 7-35.5 4.9-50.2-5.8-14.7-10.7-22.5-27.9-20.9-45.9l6-71-46.6-54c-11.9-13.7-15.6-32.2-10-49.4 5.6-17.3 19.5-30.1 37.1-34.2l69.5-16.2 36.9-61c9.4-15.5 25.9-24.8 44-24.8s34.6 9.3 44 24.8l36.9 61 69.5 16.2c17.7 4.1 31.6 16.9 37.2 34.2 5.6 17.2 1.8 35.8-10 49.5l-46.6 54 6 71c1.6 18-6.3 35.2-20.9 45.9-9.3 6.4-19.8 9.7-30.4 9.7z m-99-37.3s0.1 0 0 0z m26.4 0z m38.7-11.3c0 0.1 0 0.1 0 0z m-103.8 0z m51.9-71.3c6.8 0 13.7 1.4 20 4l27.1 11.4-2.5-29.4c-1.2-13.8 3.4-27.6 12.4-38.1l19.2-22.2-28.7-6.7c-13.4-3.2-25.1-11.7-32.2-23.3L512 341.1l-15.2 25.2c-7.2 11.8-18.9 20.3-32.1 23.4l-28.9 6.7 19.3 22.3c9 10.3 13.5 24.2 12.3 37.9l-2.5 29.4 27.2-11.4c6.3-2.6 13.1-3.9 19.9-3.9z m-121.6 3.9s0.1 0.1 0.1 0.2l-0.1-0.2z m243.3-0.2l-0.1 0.2s0-0.1 0.1-0.2z m-33.4-152.2h0.2-0.2z" fill="#5F6379"></path></g></svg>;
  const iconActu = <svg width="46px" height="46px" viewBox="0 -2 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="newspaper" transform="translate(0 -126)"> <path id="Path_158" data-name="Path 158" d="M60,182l2-54H18v54" fill="#1b8cff" opacity="0.3"></path> <line id="Line_301" data-name="Line 301" x2="44" transform="translate(18 178)" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="2" opacity="0.5"></line> <line id="Line_302" data-name="Line 302" x2="44" transform="translate(18 174)" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="2" opacity="0.5"></line> <path id="Path_159" data-name="Path 159" d="M62,175V128H18v47" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path> <line id="Line_303" data-name="Line 303" x2="42" transform="translate(11 184)" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line> <path id="Path_160" data-name="Path 160" d="M18,175v1a8,8,0,0,1-16,0V156H18" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path> <path id="Path_161" data-name="Path 161" d="M62,175a9,9,0,0,1-9,9" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path> <line id="Line_304" data-name="Line 304" x2="42" transform="translate(20 133)" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line> <line id="Line_305" data-name="Line 305" x2="16" transform="translate(2 161)" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line> <line id="Line_306" data-name="Line 306" x1="26" transform="translate(25 151)" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line> <line id="Line_307" data-name="Line 307" x1="24" transform="translate(25 155)" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line> <line id="Line_308" data-name="Line 308" x1="30" transform="translate(25 143)" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line> <line id="Line_309" data-name="Line 309" x1="28" transform="translate(25 147)" fill="none" stroke="#1b8cff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line> </g> </g></svg>;
  const iconSecteur = <svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 224v608c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V224c0-17.7 14.3-32 32-32h832c17.7 0 32 14.3 32 32z" fill="#3D5AFE"></path><path d="M832 480.2c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h576c17.7 0 32 14.4 32 32zM832 672.2c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h576c17.7 0 32 14.4 32 32z" fill="#FFEA00"></path><path d="M224 319.8c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32v127.8c0 17.7-14.3 32-32 32zM800 319.8c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32v127.8c0 17.7-14.3 32-32 32z" fill="#536DFE"></path><path d="M660.8 704.3H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h461.4c12.1-40.6 18.6-83.5 18.6-128H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h475.5c-14.2-99.8-61.3-189-130-256.3H256v95.8c0 17.7-14.3 32-32 32s-32-14.3-32-32V192H96c-17.7 0-32 14.3-32 32v608c0 35.3 28.7 64 64 64h358.9c75.1-45.2 135.9-112 173.9-191.7z" fill="#536DFE"></path><path d="M192 480.3c0 17.7 14.3 32 32 32h480v-0.2c0-21.6-1.5-42.9-4.5-63.8H224c-17.7 0-32 14.3-32 32zM192 672.3c0 17.7 14.3 32 32 32h436.8c9.8-20.5 18-41.9 24.6-64H224c-17.7 0-32 14.3-32 32z" fill="#FFFF00"></path><path d="M192 287.8c0 17.7 14.3 32 32 32s32-14.3 32-32V192h-64v95.8z" fill="#8C9EFF"></path></g></svg>;
  const iconMap = <svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 160v704c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h768c35.3 0 64 28.7 64 64z" fill="#3D5AFE"></path><path d="M704 512c0-188.6-116.5-349.9-281.4-416H128c-35.3 0-64 28.7-64 64v704c0 35.3 28.7 64 64 64h294.6C587.5 861.9 704 700.6 704 512z" fill="#536DFE"></path><path d="M101.7 922.3c8 3.6 16.9 5.7 26.3 5.7h768c9.4 0 18.3-2 26.3-5.7L512 512 101.7 922.3z" fill="#8C9EFF"></path><path d="M702 447.8c0-106-86-192-192-192s-192 86-192 192c0 56.9 24.7 107.9 64 143.1l128 128 128-128c39.3-35.2 64-86.3 64-143.1z m-192 64c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" fill="#FFEA00"></path></g></svg>;
  // const iconInfo = <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="68px" height="68px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#BFDCFF;" d="M0,256c0,141.384,114.615,256,256,256l22.261-256L256,0C114.615,0,0,114.616,0,256z"></path> <path style="fill:#8BC0FF;" d="M256,0v512c141.385,0,256-114.616,256-256S397.385,0,256,0z"></path> <path style="fill:#3897FF;" d="M44.522,256c0,116.61,94.868,211.478,211.478,211.478L278.261,256L256,44.522 C139.39,44.522,44.522,139.39,44.522,256z"></path> <path style="fill:#2D79CC;" d="M256,44.522v422.957c116.61,0,211.478-94.868,211.478-211.478S372.61,44.522,256,44.522z"></path> <path style="fill:#FFFFFF;" d="M222.609,144.696c0,18.442,14.949,33.391,33.391,33.391l11.13-33.391L256,111.304 C237.558,111.304,222.609,126.254,222.609,144.696z"></path> <path style="fill:#BFDCFF;" d="M256,111.304v66.783c18.442,0,33.391-14.949,33.391-33.391S274.442,111.304,256,111.304z"></path> <polygon style="fill:#FFFFFF;" points="222.609,222.609 222.609,400.696 256,400.696 267.13,311.652 256,222.609 "></polygon> <rect x="256" y="222.609" style="fill:#BFDCFF;" width="33.391" height="178.087"></rect> </g></svg>;
  // 

  const Item = ({ icone, titre, v, description }) => {
    return (
      <div className=" w-[280px] min-h-[150px] bg-slate-200 border border-gray-100 rounded-md px-3 py-2">
        <div className="items-center text-center font-bold border-b-0 border-white">{titre}</div>
        <DividerAnt stye={{ borderColor: "white" }} />
        <div className="flex gap-4">
          {
            icone ||
            <div className="mr-7">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
            </div>
          }
          <div className="flex gap-5 w-full">
            <div className="text-3xl flex-1 text-orange-500 font-bold">{v}</div>
            <div className="text-lg flex-1 w-full ">{description}</div>
          </div>
        </div>
      </div>
    )
  }
  const Btn = ({ icone, text, href }) => {
    return (
      <div className="bg-slate-200 h-[114px] text-gray-500 w-[200px] overflow-hidden py-4 mb-4  border-0 rounded-md px-3 hover:border hover:border-gray-300">
        {href ?
          <Link href={href}>
            <div className=" h-full flex flex-col items-center justify-between  text-white hover:text-blue-100 transition">
              {
                icone ?
                  <div>
                    {icone}
                  </div> :
                  <div className="mr-7">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                  </div>
              }
              <div className="flex gap-1 w-full">
                <div className="text-md text-center flex-1 text-gray-700 font-bold">{text}</div>
              </div>
            </div>
          </Link> :
          <div className="flex gap-4">
            {
              icone ||
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>

            }
            <div className="flex gap-1 w-full">
              <div className="text-md flex-1 font-bold text-gray-500">{text}</div>
            </div>
          </div>
        }
      </div>
    )
  }
  return (
    <div className="text-start">
      <h2 className="text-xl font-bold mb-5 text-center border-b border-white bg-white rounded-md py-3">Tableau de Bord</h2>

      <div className="flex gap-4 border-b">
        <User2 /> <span className="font-bold text-xl">{JSON.parse(Cookies.get("profil"))?.nom}</span>
        {/* <ButtonGroup color="primary" variant="flat">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              fill="none"
              stroke-width="1.4"
              viewBox="0 0 24 24"
              color="#fff"
            >
              <path
                stroke="#fff"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 14H2M8 10H2M6 6H2M12 18H2M19 20V4m0 16 3-3m-3 3-3-3m3-13 3 3m-3-3-3 3"
              ></path>
            </svg>
            Trier par : {labelsMap[selectedOptionValue]}
          </Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly>
                <Chevron />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Trier par entité"
              selectedKeys={selectedOption}
              selectionMode="single"
              onSelectionChange={setSelectedOption}
              className="max-w-[300px]"
            >
              <DropdownItem key={1}>Kinshasa</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup> */}
      </div>
      <Layout titre={"Options"}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 flex-wrap bg-white p-3 rounded-md">
              <Btn href="/slide" text="Gestion slide accueil" icone={<img src="/slide.png" className=" w-[60px] h-[60px]" />} />
              <Btn href={"/evenement/liste"} text="Gestion des événements" icone={iconEvenement} />
              <Btn href="/parametre/secteur" text="Secteurs" icone={iconSecteur} />
              <Btn href="/produit" text="Gestion Produits/Accueil" icone={iconProduit} />
              <Btn href="/actualite" text="Gestion Actualités" icone={iconActu} />
              <Btn href="/infos-utile" text="Gestion info utiles" icone={<Image src={iconInfo} width={50} height={50} />} />
              <Btn href="/publicite" text="Gestion publicité" icone={<Image src={iconInfo} width={50} height={50} />} />
              <Btn href="/partenaire" text="Gestion partenaires" icone={<Image src={iconInfo} width={50} height={50} />} />
              <Btn href={"/parametre/utilisateur"} text="Gestion des utilisateurs" icone={iconUsers} />
              <Btn href="/newsletters" text="Espace newsletters" icone={iconNewsletters} />
              <Btn href="/parametre/associationsaffiliation" text="Associations d'affiliation" icone={iconMap} />
              <Btn href="/parametre/localisation" text="Gestion localisation" icone={iconMap} />
            </div>
          </div>
        </div>
      </Layout>
      <Layout titre="Certifications/Abonnements">
        <div className="grid grid-cols-4 gap-2 ">
          <Module lien={"/profil/demandecertification"} text="Demandes de certifications" nombre={statistiqueProfil?.totalDemandescertification} icon={<BadgeCheck  color="white" />} />
          <Module lien={"profil/comptescertifies"} text="Comptes certifiés" nombre={statistiqueProfil?.totalCertification} icon={<BadgePlusIcon color="white" />} />
          <Module lien={"/abonnement"} text="Demande d'abonnement" nombre={statistiqueProfil?.totalDemandeAbonnement} icon={<BadgePlusIcon color="white" />} />
          <Module lien={"/reabonnement"} text="Demande de reabonnement" nombre={statistiqueProfil?.totalDemandeReabonnement} icon={<BadgePlusIcon color="white" />} />
        </div>
      </Layout>
      <Layout titre="Statistiques Profils">
        <div className="grid grid-cols-4 gap-2 ">
          <Module text="Total profils" nombre={statistiqueProfil?.total || 0} icon={<UserCircle2 color="white" />} />
          <Module text="Total inscriptions mois en cours" nombre={statistiqueProfil?.totalMensuel || 0} icon={<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.4" viewBox="0 0 24 24" color="#fff"><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m7 12.5 3 3 7-7"></path><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path></svg>} />
          <Module text="Total inscriptions année en cours" nombre={statistiqueProfil?.totalAnnuel || 0 +" "+ moment().format("YYYY")} icon={<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.4" viewBox="0 0 24 24" color="#fff"><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m7 12.5 3 3 7-7"></path><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path></svg>} />
        </div>
      </Layout>
      <Layout titre="Statistiques visites">
        <div className="grid grid-cols-4 gap-2 ">
          <Module text="Total Visiteurs" nombre={statistiqueProfil?.totalVisites || 0} icon={<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.4" viewBox="0 0 24 24" color="#fff"><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m7 12.5 3 3 7-7"></path><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path></svg>} />
          <Module text="Visiteurs du jour" nombre={statistiqueProfil?.totalVisitesJournalier || 0} icon={<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.4" viewBox="0 0 24 24" color="#fff"><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m7 12.5 3 3 7-7"></path><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path></svg>} />
          <Module text="Visiteurs mensuels" nombre={statistiqueProfil?.totalVisitesMensuel || 0} icon={<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.4" viewBox="0 0 24 24" color="#fff"><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m7 12.5 3 3 7-7"></path><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path></svg>} />
          <Module text="Visiteurs/année" nombre={statistiqueProfil?.totalVisitesAnnuel || 0} icon={<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.4" viewBox="0 0 24 24" color="#fff"><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="m7 12.5 3 3 7-7"></path><path stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path></svg>} />
        </div>
      </Layout>
      <div className="min-h-[300px] flex flex-row gap-3">

        <Layout titre={"Profils par province"} cl={"w-2/3  rounded-md"}>
          <div className="pt-4">
          <table className="w-full rounded-md  overflow-hidden">
            <thead className="bg-slate-400 text-white font-bold">
              <th className="py-3">#</th>
              <th>Province</th>
              <th>Nombre</th>
            </thead>
            <tbody>
              {
                provinces?.map((p, i) => {
                  return (
                    <tr key={i} className="border-b text-gray-700 border-gray-100">
                      <th className="py-2">{i + 1}</th>
                      <th>{p.province}</th>
                      <th>{p.nbProfil || 0}</th>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          </div>
        </Layout>

        <Layout cl="w-1/3 h-[300px] rounded-md" titre={"Utilisateurs"}>
          <div>

          </div>
        </Layout>
      </div>
    </div>
  );
};
export default Dashboard;
