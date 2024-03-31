"use client"
import {useEffect,useState} from "react";
import Tableau from "./../../../components/table/Tableau"
import moment from "moment"
import Section from "./../../../components/layouts/section/Section2"
const page=()=>{
    const [data,setData]=useState([]); 
    const colones = [
        {name: "ID", uid: "id", sortable: true},
        {name: "DATE", uid: "dateDepense" },
        {name: "LIBELLE", uid: "libelle"},
        {name: "CAISSE", uid: "libelleCaisse",sortable: true},
        {name: "MONTANT", uid: "montant", sortable: true},
        {name: "ENTITE", uid: "nomEntite", sortable: true},
        {name: "AFFECTE", uid: "affecte", sortable: true},
        {name: "ACTIONS", uid: "actions"},
      ];
      const INITIAL_VISIBLE_COLUMNS = ["id","dt", "nomEntite","libelle","montant", "libelleCaisse", "actions"];
      const cellule=(ligne,colone)=>{
        const cellValue=ligne[colone];
        switch(colone)
        {
            case "dateDepense":
                return(
                    <div>
                        {moment(ligne[colone]).format("DD/MM/YYYY")}
                    </div>
                )
            break;
            case "montant":
                return(
                    <div>
                        {ligne.montant} {ligne.deviseCaisse}
                    </div>
                )
            break;
            case "actions":
                return (<div className="flex flex-row gap-3 justify-center items-center">
                    <Button isIconOnly size="md" color={"primary"} variant="light"><Edit /></Button>
                    <Button isIconOnly size="md" color={"danger"} variant="light"><Delete /></Button>
                </div>);
            break;
            default:
                return cellValue;
        }

      }
      const handleBtnNouveau=()=>{
        alert("test");
      }
  return(
    <Section>
        <Tableau 
                hideBtnNouveau={false} 
                handleBtnNouveau={handleBtnNouveau} 
                btnnouveauText="Nouvelle dépense"
                coloneSearch={"libelle"} 
                columns={colones} 
                datas={data} 
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} 
                cellule={cellule} />
    </Section>);
}
export default page