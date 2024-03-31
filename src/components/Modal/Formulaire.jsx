"use client";
import { useState, useEffect, useRef } from "react";
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
// import CardComponent from "./CardComponent"
import { Spin, Modal as ModalAnt } from "antd";



import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";




const ModalFormulaire = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open,setOpen]=useState(true);
  const [spinning, setSpinning] = useState(false);
 
  const [CRUDOPTION, setCRUDOPTION] = useState("A");
  const [CRUDOPTIONBANQUE, setCRUDOPTIONBANQUE] = useState("A");

  useEffect(()=>{

  },[])
  return (
    <Spin spinning={spinning}>
      <Modal
        isOpen={open ? onOpen : null}
        scrollBehavior={"inside"}
        onOpenChange={onOpenChange}
        isDismissable={false}
        onClose={()=>{
            setOpen(false);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form id="formulaire">
              <ModalHeader className="flex flex-col gap-1 bg-blue-950 overflow-hidden text-white rounded-tr-lg rounded-tl-lg">
                Nouvel Utilisateur
              </ModalHeader>
              <ModalBody>
                <div className="bg-blue-900">
                    Test
                </div>
                
               
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
    </Spin>
  );
};
export default ModalFormulaire;
