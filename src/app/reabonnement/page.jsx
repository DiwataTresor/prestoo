"use client"
import { useEffect, useState } from "react";
import Tableau from "./../../components/table/Tableau"
import Layout from "./../../components/layouts/LayoutDashboard"
import moment from "moment"
import { postData, getData, deleteData, updateData, SITEWEB_URL } from "./../../fcts/helper"
import { Button } from "@nextui-org/react"
import { Edit } from "./../../components/icons/Edit"
import { Delete } from "./../../components/icons/Delete"
import { Eye } from "./../../components/icons/Eye"
import { MailIcon } from "./../../components/icons/MailIcon"
import Link from "next/link"
import { Modal as ModalAnt, Spin, notification } from "antd"
import { LockOutlined, UnlockOutlined } from "@ant-design/icons"
import Section from "./../../components/layouts/section/Section2"
import Cookies from "js-cookie"
import { RefreshCcw } from "lucide-react";
const page = () => {
    const [data, setData] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const colones = [
        { name: "ID", uid: "id", sortable: true },
        { name: "TYPE ABONNEMENT", uid: "typeabonnement", sortable: true },
        { name: "NBRE ANNEE", uid: "nbreAnnee", sortable: true },
        { name: "DATE DEMANDE", uid: "dateDemande" },
        { name: "PROFIL", uid: "nom", sortable: true },

        { name: "VILLE", uid: "villeDetail", sortable: true },
        { name: "TELEPHONE", uid: "telephone" },
        { name: "WHATSAPP", uid: "whatsapp", sortable: true },
        { name: "ACTIONS", uid: "actions" },
    ];
    const INITIAL_VISIBLE_COLUMNS = ["typeabonnement","nbreAnnee","dateDemande", "nom", "villeDetail", "telephone", "whatsapp", "actions"];
    const cellule = (ligne, colone) => {
        const cellValue = ligne[colone];
        switch (colone) {
            case "dateDemande":
                return (
                    <div>
                        {moment(ligne[colone]).format("DD/MM/YYYY")}
                    </div>
                )
                break;
            case "nom":
                return (
                    <div>
                        {ligne.nom} {ligne.postnom} {ligne.prenom}
                    </div>
                )
                break;
            case "actions":
                return (<div className="flex flex-row gap-3 justify-center items-center">

                    <Link href={`/reabonnement/${ligne?.idReabonnementCrypte}`} target="_self"><Button isIconOnly size="md" color={"success"} variant="light"><Eye /></Button></Link>
                    <Button onPress={() => {
                        ModalAnt.confirm({
                            title: "Suppression",
                            content: `Voulez-vous vraiment annuler cette demande ?`,
                            okText: "Supprimer",
                            cancelText: "Annuler",
                            onOk: () => {
                                deleteData("demandereabonnement", { idReabonnement: ligne.idReabonnement }).then(r => {
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
            message: 'Mise à jour',
            description:
                'Modification bien éffectuée',
            duration: 4,
        });
    };
    const openNotificationError = () => {
        api.error({
            message: 'Mise à jour',
            description:
                'Echec de mise à jour, veuillez reessayer plutard',
            duration: 4,
        });
    };
    const handleBtnNouveau = () => {
        // alert("test");
    }
    const datas = () => {
        getData("demandesreabonnement").then(r => {
            setData(r.data);
        }).catch(err => {
            console.log("erreur : ", err);
        })
    }
    useEffect(() => {
        datas();
    }, []);
    return (
        <>
            {contextHolder}
            <Section showRootLink={true} titre={"Demandes de reabonnement"} cl="text-xl" titreIcone={<RefreshCcw />}>
                <Spin spinning={spinning}>
                    <Tableau
                        hideBtnNouveau={true}
                        handleBtnNouveau={handleBtnNouveau}
                        btnnouveauText="Nouvelle dépense"
                        coloneSearch={"nom"}
                        columns={colones}
                        datas={data}
                        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                        cellule={cellule} />
                </Spin>
            </Section>
        </>
    );
}
export default page