"use client"
import React,{useState} from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import LayoutHeader from "./../../components/Header/Header";
import LayoutSidebar from "./Sidebar"
import LayoutLogin from "./../login/LayoutLogin"
import {ContextProvider,useStateContext} from './../context/ContextProvider'
import {NextUIProvider} from "@nextui-org/react";
import Cookies from "js-cookie";
// import {antd} from "antd"

const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  LaptopOutlined
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const items2 = [
    {"menu":"Accueil",
    "icon":UserOutlined}, 
    {"menu":"Saisie","icon":UserOutlined}, 
    {"menu":"Rapport","icon":LaptopOutlined}, 
    {"menu":"Ressources","icon":NotificationOutlined},
    {"menu":"Parametres","icon":ShopOutlined}]
.map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `${icon.menu} ${key}`,
      icon: React.createElement(icon.icon),
      label: `${icon.menu}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
const MainLayout = ({children}) => {
  const colorBgContainer="blue";
  const statut=Cookies.get("connected")=="true"?true:false;
  const [connected,setConnected]=useState(Cookies.get("connected")? statut : false);
  const cl=(id)=>{
    alert(id);
  }
  return (
    <NextUIProvider>
    <ContextProvider>
    {
       connected ?
       <Layout hasSider className="text-white overflow-hidden">
       <LayoutSidebar />
       <Layout
         className="site-layout"
         style={{
           marginLeft: 310,
         }}
       >
         <Header
           style={{
             padding: 0,
             
           }}
           className="bg-blue-600 border-b-4 border-blue-300"
         >
                 <LayoutHeader />
             </Header>
         <Content
           style={{
             margin: '4px 4px 0',
             overflow: 'initial',
           }}
           className="bg-slate-100 px-3"
         >
           <div
             style={{
               padding: 5,
               textAlign: 'center',
               color:"black"
             }}
             className="min-h-[800px]"
           >
             {children}
           </div>
         </Content>
         <Footer
           style={{
             textAlign: 'center',
           }}
         >
           INDEX RDC ©2024 Developpé chez ATON GROUP
         </Footer>
       </Layout>
     </Layout>
        :
        <div className="h-screen bg-slate-200 py-auto flex flex-col justify-between items-center pt-[100px]">
          <LayoutLogin />
        </div>
        
    }
    </ContextProvider>
    </NextUIProvider>
  );
};
export default MainLayout;
