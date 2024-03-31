"use client";
import React,{useState} from 'react';
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space,Spin,Alert } from 'antd';
import {BACKURL, postData} from "./../utils/helper.js";
import Cookies from "js-cookie";

const Form = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [spinning,setSpinning]=useState(false);
  const [feedBack,setFeedBack]=useState("");
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(e.target[1].value)
    setSpinning(true);
    setFeedBack("");
    let d=new FormData();
    d.append("action", "adminLogin");
    d.append("data",JSON.stringify({login:e.target[0].value,password:e.target[1].value}));
    fetch(BACKURL+"api.php",{method:"POST",body:d})
    .then(r=>r.json())
    .then(r=>{
      if(r.success)
      {
        setFeedBack(<Alert message="Connexion bien etablie" type="success" showIcon />);
        Cookies.set("connected","true");
        Cookies.set("profil",JSON.stringify(r.profil));
        window.location.reload();
      }else
      {
          setFeedBack(<Alert message="Echec de connexion" type="error" showIcon />);
      }
    }).catch(e=>{
      Modal.error({
        title:"Connexion", content:"Une erreur s'est produite dans le systeme"
      });
      console.log(e);
    }).finally(()=>{
      setSpinning(false)
    })
    
  }
  return (
    <Spin  spinning={spinning}>
      <form id="formulaire" onSubmit={handleSubmit}>
        <Space direction="vertical">
          <Input placeholder="Votre login" className="w-full" />
          <Input.Password
            placeholder="Votre Mot de passe" className="w-full" 
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
           
            <button
              style={{
                width: "100%",
              }}
              className="w-full border-blue-500 border text-blue-500 rounded-md h-[34px] shadow-sm hover:bg-blue-800 hover:text-white"
              type="submit"
            >
              Connexion
            </button>
            <div className="mt-4">{feedBack}</div>
        </Space>
      </form>
    </Spin>
   
  );
};
export default Form;