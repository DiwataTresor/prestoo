"use client"
import React from 'react';
import { Image } from '@nextui-org/react';
import { redirect, useRouter } from 'next/navigation';
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
  NotificationOutlined,
  SettingOutlined,
  MailOutlined,
  SearchOutlined,
  HomeOutlined
} from '@ant-design/icons';


import { Layout, Menu, theme } from 'antd';
import { SITEWEB_URL } from '../../fcts/helper';
import Link from 'next/link';
import { infoApp } from '../utils/helper';
import { UtensilsCrossed } from 'lucide-react';


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
  LaptopOutlined,
  SettingOutlined,
  MailOutlined,
  SearchOutlined,
  HomeOutlined
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const items2 = [
  {
    "menu": "Home",
    "icon": HomeOutlined,
    "key": "accueil",
    "smenu": [
      { "label": "Tableau de Bord", "lien": "/" },
      { "label": "Gestion Slide accueil", "lien": "/slide" },
      { "label": "Produits", "lien": "/produit" },
    ]
  },
  {
    "menu": "Profil",
    "icon": UserOutlined,
    "key": "profil",
    "smenu": [
      { "label": "Nouveau profil", "lien": "/profil/nouveau" },
      { "label": "Profils", "lien": "/profil/profils" },
      { "label": "Profil par province", "lien": "/profil/profilparprovince" },
      { "label": "Profil par Secteur", "lien": "/profil/profilparsecteur" },
      { "label": "Profil par Type de compte", "lien": "/profil/profilpartypecompte" },
      { "label": "Utilisateurs bloqués", "lien": "/profil/suspended" },
    ]
  },
  {
    "menu": "Recherche",
    "icon": SearchOutlined,
    "key": "operation",
    "smenu": [
      { "label": "Recherche par mot clé", "lien": "/recherche/motcle" }
    ]
  },
  {
    "menu": "Statistiques",
    "icon": LaptopOutlined,
    "key": "rapport",
    "smenu": [
      { "label": "Visites par villes", "lien": "/statistique/statistiqueparville" },
      { "label": "Recherche", "lien": "/statistique/recherche" },
    ]
  },
  {
    "menu": "Evénements", "icon": NotificationOutlined, "key": "ressources",
    "smenu": [
      { "label": "Nouveau", "lien": "/evenement/nouveau" },
      { "label": "Liste", "lien": "/evenement/liste" },
    ]
  },
  {
    "menu": "Messages", "icon": MailOutlined, "key": "messages",
    "smenu": [
      // { "label": "Envoie email", "lien": "/message/mail" },
      { "label": "Nouveau à tous", "lien": "/message/to_all" },
      { "label": "Boite d'envois", "lien": "/message/envoye" },
      { "label": "Boite de reception", "lien": "/message/reception" },
      { "label": "Archives", "lien": "/message/#" }
    ]
  },
  {
    "menu": "Paramètres", "icon": SettingOutlined, "key": "parametres",
    "smenu": [
      // {"label":"Gestion secteur","lien":"/parametre/secteur"},
      { "label": "Gestion secteurs", "lien": "/parametre/secteur" },
      { "label": "Gestion localisation", "lien": "/parametre/localisation" },
      { "label": "Utilisateurs", "lien": "/parametre/utilisateur" },
      { "label": "Gestion contacts", "lien": "/parametre/contact" }
    ]
  }
]
  .map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `${icon.key}`,
      icon: React.createElement(icon.icon),
      label: `${icon.menu}`,
      children: icon.smenu.map((smenu, j) => {
        const subKey = smenu.lien;
        return {
          key: subKey,
          label: `${smenu.label}`,
        };
      }),
    };
  });
const LayoutSidebar = () => {
  const router = useRouter();
  const _red = () => {
    router.push('/dashboard/');
  }
  return (
    <div className=''>
      
      <Sider
        style={{

          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        className="min-h-screen"
      >
        <div className='h-[64px] w-[310px] bg-slate-500 flex flex-col items-center justify-center font-bold text-2xl border-b-4 border-blue-300 shadow-md'>
            <Link href={"/"} className='text-blue-200'>{infoApp.nomApp}</Link>
            <span className="text-sm  font-normal bg-slate-100 text-black py-1 px-4 rounded-t-lg flex gap-1 items-center"><UtensilsCrossed size={12} /> {infoApp.description}</span>
        </div>
        <div className='flex justify-center items-center w-[310px] h-32 bg-cover bg-gradient-to-tr' 
          style={
            {backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D')"
            }}
        >
          <Link href={"/"}>
          {/* <img width={190} height={90} className='p-2 rounded-md ' src={SITEWEB_URL+"logo_sans_fond.png"} /> */}
          </Link>
        </div>
        
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
            width: "310px"
          }}
          iconSize={40}
          items={items2}
          className="pt-[40px]"
          onClick={(e) => {
            router.push(`${e.key}`);
            // _red();
            // console.log("ok")
          }}
        />
      </Sider>
    </div>
  )
}

export default LayoutSidebar