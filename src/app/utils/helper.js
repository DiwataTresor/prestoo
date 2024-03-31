import Cookies from "js-cookie";
import { BACKEND_URL } from "../../fcts/helper";
// export const BACKURL = "http://localhost/root/backend-annuaire-pmes/";
export const BACKURL = BACKEND_URL;
export const APIURL = `${BACKURL}api.php`;

export const infoApp={
    nomApp:"Prestoo",
    description:"Votre gestionnaire du Restautant,Hotêl",
    contactTelephone:"+243992129404",
    contactEmail:"dev@tresordiwata.com",
    siteweb:"prestoo.tresordiwata.com",
}


export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const getData = async (query) => {
    let response = {};
    try
    {
        const user = Cookies.get("profil")?JSON.parse(Cookies.get("profil")) : {};
        await fetch(`${APIURL}?qry=${query}&user=${user?.id}`, { method: "GET" })
            .then(r => r.json())
            .then(r => { response = r });
    } catch (r) {
        response = { "success": false, "msg": r }
    }
    return response;
}
export const postData = async (query, dataToPost) => {
    let response = [];
    try {
        const user = Cookies.get("profil")?JSON.parse(Cookies.get("profil")) : {};
        let form = new FormData();
        form.append("qry", query);
        form.append("data", JSON.stringify(dataToPost));
        form.append("user", user?.id);
        await fetch(`${APIURL}`, { method: "POST", body: form })
            .then(r => r.json())
            .then(r => { response = r });

    } catch (r) {
        console.log(r);
        response = { "success": false, "msg": r }
    }
    return response;
}
export const deleteData = async (query, dataToPost) => {
    let response = [];
    try {
        const user = Cookies.get("profil")?JSON.parse(Cookies.get("profil")) : {};
        let form = new FormData();
        form.append("delete", query);
        form.append("data", JSON.stringify(dataToPost));
        form.append("user", user?.id);

        await fetch(`${APIURL}`, { method: "POST", body: form })
            .then(r => r.json())
            .then(r => { response = r });

    } catch (r) {
        response = { "success": false, "msg": r }
    }
    return response;
}
export const updateData = async (query, dataToPost) => {
    let response = [];
    try {
        const user = Cookies.get("profil")?JSON.parse(Cookies.get("profil")) : {};
        let form = new FormData();
        form.append("update", query);
        form.append("data", JSON.stringify(dataToPost));
        form.append("entite", user?.id);
        await fetch(`${APIURL}`, { method: "POST", body: form })
            .then(r => r.json())
            .then(r => { response = r });

    } catch (r) {
        response = { "success": false, "msg": r }
    }
    return response;
}
export const getEntites = async () => {
    let resultat = [];
    await getData("entites").then(r => { resultat = r.data });
    return resultat;
}