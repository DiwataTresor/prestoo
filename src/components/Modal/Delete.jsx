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


const ModalDelete = (open) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
      <Modal
        isOpen={open?isOpen:false}
        scrollBehavior={"inside"}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            
          )}
        </ModalContent>
      </Modal>
 
  );
};
export default ModalDelete;
