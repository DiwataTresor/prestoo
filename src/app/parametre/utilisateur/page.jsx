"use client"
import { useEffect, useState } from "react";
import Tableau from "./../../../components/table/Tableau"
import Layout from "./../../../components/layouts/LayoutDashboard"
import moment from "moment"
import { postData, getData, deleteData, updateData, SITEWEB_URL } from "./../../../fcts/helper"
import { Button } from "@nextui-org/react"
import { Edit } from "./../../../components/icons/Edit"
import { Delete } from "./../../../components/icons/Delete"
import { Eye } from "./../../../components/icons/Eye"
import { MailIcon } from "./../../../components/icons/MailIcon"
import Link from "next/link"
import { Modal as ModalAnt, Spin, notification, Alert } from "antd"
import { LockOutlined, UnlockOutlined } from "@ant-design/icons"
import Section from "./../../../components/layouts/section/Section2"
import { Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Checkbox } from "@nextui-org/react"
import {

  SelectContent,
  SelectGroup,

  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./../../../components/ui/select"
import { LockIcon } from "./../../../components/icons/LockIcon"
const page = () => {
  const [data, setData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feedBack, setFeedBack] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false);
  const colones = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NOM", uid: "nom" },
    { name: "LOGIN", uid: "login", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];
  const INITIAL_VISIBLE_COLUMNS = ["id", "nom", "login", "role", "actions"];
  const cellule = (ligne, colone) => {
    const cellValue = ligne[colone];
    switch (colone) {
      case "datecreation":
        return (
          <div>
            {moment(ligne[colone]).format("DD/MM/YYYY")}
          </div>
        )
        break;
      case "nom":
        return (
          <div className="text-center">
            {ligne.nom} {ligne.postnom} {ligne.prenom}
          </div>
        )
        break;
      case "actions":
        return (<div className="flex flex-row gap-3 justify-center items-center">
          <Button onPress={() => {
            ModalAnt.confirm({
              title: "Profil",
              content: `Voulez-vous vraiment ${ligne.enabled === 'A' ? 'bloquer' : 'debloquer'} ${ligne.nom}?`,
              okText: `${ligne.statut === 'A' ? 'Bloquer' : 'debloquer'}`,
              cancelText: "Annuler",
              onOk: () => {
                updateData("adminBlock", { id: ligne.id, v: ligne.statut == 'A' ? 'B' : 'A' }).then(r => {
                  if (r.success) {
                    datas();
                    openNotification();
                  } else {
                    openNotificationError();
                  }
                }).catch(r => {

                }).finally(() => {
                  setSpinning(false);
                })
              }
            })
          }} isIconOnly size="md" color={"primary"} variant="light">{ligne.statut === 'A' ? <LockOutlined /> : <UnlockOutlined style={{ color: "red" }} />}</Button>
          {/* <Link href={`${SITEWEB_URL}${ligne.slug}`} target="_blank"><Button isIconOnly size="md" color={"success"} variant="light"><Eye /></Button></Link> */}
          <Button onPress={() => {

            ModalAnt.confirm({
              title: "Suppression",
              content: `Voulez-vous vraiment supprimer ${ligne.nom}?`,
              okText: "Supprimer",
              cancelText: "Annuler",
              onOk: () => {
                deleteData("adminUtilisateur", { id: ligne.id }).then(r => {
                  if (r.success) {
                    datas();
                    openNotification();
                  } else {
                    openNotificationError();
                  }
                }).catch(r => {

                }).finally(() => {
                  setSpinning(false);
                })
              }
            })
          }} isIconOnly size="md" color={"danger"} variant="light"><Delete /></Button>
        </div>);
        break;
      default:
        return <div className="text-center items-center justify-center">{cellValue}</div>
    }

  }
  const openNotification = () => {
    api.success({
      message: 'Enregistrement',
      description:
        'Enregistrement bien éffectué',
      duration: 4,
    });
  };
  const openNotificationError = () => {
    api.error({
      message: 'Enregistrement',
      description:
        'Echec de mise à jour, veuillez reessayer plutard',
      duration: 4,
    });
  };
  const handleBtnNouveau = () => {
    onOpen();
  }
  const datas = () => {

    getData("adminUtilisateurs").then(r => {
      setData(r?.data);
    }).catch(err => {
      console.log("erreur : ", err);
    })
  }
  const handleAdd = (e) => {
    e.preventDefault();
    setFeedBack("");
    let f = Object.fromEntries(new FormData(e.target));
    let error = false;
    let errorDetail = "";

    if (f.password !== f.password2) { error = true; errorDetail = <Alert type="error" showIcon message="Veuillez verifier vos mot de passe" /> };
    if (f.password.length < 7) { error = true; errorDetail = <Alert type="error" showIcon message="Le mot de passe doit avoir au moins 7 Caracteres" /> };

    if (error) {
      setFeedBack(errorDetail);
    } else {
      ModalAnt.confirm({
        title: "Ajout utilisateur",
        content: "Voulez-vous vraiment enregistrer cet utilisateur ?",
        okText: "Enregistrer",
        cancelText: "Annuler",
        onOk: () => {
          onOpen();
          setIsSaving(true);
          postData("adminUtilisateur", f).then(r => {
            if (r.success) {
              openNotification();
              setFeedBack("");
              onOpenChange();
              datas();
            } else {
              setFeedBack(<Alert type="error" showIcon message="Une erreur s'est produite pendant l'enregistrement, veuillez ressayer plutard" />)
            }
          }).catch(err => {
            openNotificationError();
          }).finally(() => {
            setIsSaving(false);

          })
        }
      })
    }


  }

  useEffect(() => {
    datas();
  }, []);
  return (
    <>
      {contextHolder}
      <Section showRootLink={true} titre={"Gestion des utilisateurs"} cl="text-xl" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}>
        <Spin spinning={spinning}>
          <Tableau

            handleBtnNouveau={handleBtnNouveau}
            btnnouveauText="Nouvel utilisateur"
            coloneSearch={"nom"}
            columns={colones}
            datas={data}
            INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
            cellule={cellule} />
        </Spin>
      </Section>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleAdd}>
              <>
                <ModalHeader className="flex flex-col gap-1">Nouvel utilisateur</ModalHeader>
                <ModalBody className="">

                  <div className="flex flex-col gap-8">
                    <Input
                      isRequired
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      name="nom"
                      type="text"
                      label="Nom utilisateur"
                      labelPlacement="outside"

                    />
                    <Input
                      isRequired
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      name="login"
                      type="text"
                      label="Login"
                      labelPlacement="outside"

                    />

                    <Input
                      isRequired
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      name="password"
                      key={1}
                      type="password"
                      label="Votre Mot de passe"
                      labelPlacement={"outside"}
                    // description={"Rien"}
                    />
                    <Input
                      isRequired
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      name="password2"
                      key={1}
                      type="password"
                      label="Retaper le Mot de passe"
                      labelPlacement={"outside"}
                    // description={"Rien"}
                    />

                    <Select isRequired name="role" label="Selectionner le role" >
                      <SelectItem key="AG" value="AG">Admin General</SelectItem>
                      <SelectItem key="A" value="A">Admin</SelectItem>
                      <SelectItem key="U" value="U">Utilisateur</SelectItem>
                    </Select>

                  </div>
                  <div className="text-center items-center">{feedBack}</div>
                </ModalBody>
                <ModalFooter>
                  <Button isLoading={isSaving} type="submit" color="primary">
                    Enregistrer
                  </Button>
                  <Button type="reset" variant="light" color="danger">
                    Annuler
                  </Button>
                </ModalFooter>
              </>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default page