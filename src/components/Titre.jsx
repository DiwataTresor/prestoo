import React from "react";
import {Alert} from "antd"
import { GlobalOutlined } from "@ant-design/icons";
import {Button} from "@nextui-org/react";
import {Notification} from "./icons/Notification";
import {MenuUnfoldOutlined} from "@ant-design/icons"

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { bgColor } from "../app/utils/style";

export default function Titre({titre}) {
  return (
    <div className={`flex flex-row justify-center items-center gap-3 ${bgColor} mb-3 shadow-sm py-3 px-2 rounded-sm h-[50px]`}>
      <div type="info" className="text-start  flex-1 text-blue-500  text-lg flex flex-row gap-4">
        <MenuUnfoldOutlined />
        {titre}
        </div>
      
        <Button
          isDisabled
          endContent={<GlobalOutlined />}
          variant="flat"
          color="default"
          className=""
        >
          Entité : AC
        </Button>
     
    </div>
  );
}
