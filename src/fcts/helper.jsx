"use client"
import Cookies from "js-cookie"
// export const SITEWEB_URL="http://localhost:3000/";
export const BACKEND_URL="http://localhost/root/backend-annuaire-pmes/";
export const SITEWEB_URL="https://indexrdc.com/";
// export const BACKEND_URL="https://bac.indexrdc.com/";


// export const BACKEND_URL="http://oxerode.com/envoimail/";
// Tsts
export const API_URL=BACKEND_URL+"api.php";
export const isMobile=()=>{
    if (window.innerWidth < 768) {
        // Rediriger vers la version mobile
        window.location.href = "/chemin-vers-version-mobile"; 
      }
}
export const getData=async(qry,id=null)=>{
  const profil=JSON.parse(Cookies.get("profil")) || {};
  let resultat={};
  await fetch(`${API_URL}?qry=${qry}&id=${profil?.id}`).then(r=>r.json()).then(r=>{
    resultat=r;
  }).catch(r=>{
    resultat={"success":false,"msg":r}
  });
  return resultat;
}
export const postData=async(qry,data,id=null)=>{
  const profil=JSON.parse(Cookies.get("profil")) || {};
  let resultat={};
  let form=new FormData();
  form.append("add",qry);
  form.append("data",JSON.stringify(data));
  form.append("id",profil?.id || null);

  await fetch(`${API_URL}`,{method:"POST",body:form}).then(r=>r.json()).then(r=>{
    resultat=r;
  }).catch(r=>{
    resultat={"success":false,"msg":r}
  });
  return resultat;
}
export const updateData=async(qry,data,id=null)=>{
  const profil=JSON.parse(Cookies.get("profil")) || {};
  let resultat={};
  let form=new FormData();
  form.append("update",qry);
  form.append("data",JSON.stringify(data));
  form.append("id",profil?.id);
  await fetch(`${API_URL}`,{method:"POST",body:form}).then(r=>r.json()).then(r=>{
    resultat=r;
  }).catch(r=>{
    resultat={"success":false,"msg":r}
  });
  return resultat;
}
export const deleteData=async(qry,data,id=null)=>{
  const profil=JSON.parse(Cookies.get("profil")) || {};
  let resultat={};
  let form=new FormData();
  form.append("delete",qry);
  form.append("data",JSON.stringify(data));
  form.append("id",id);
  await fetch(`${API_URL}`,{method:"POST",body:form}).then(r=>r.json()).then(r=>{
    resultat=r;
  }).catch(r=>{
    resultat={"success":false,"msg":r}
  });
  return resultat;
}
export const provinces=async()=>{
  let data=[];
  await getData("provinces").then(r=>data=r.data);
  return data;
}
export const secteurs=async()=>{
  let data=[];
  await getData("secteurs").then(r=>data=r.data);
  return data;
}
export const profil=async(colone,v)=>{
  let data=[];
  await getData(`profil&colone=${colone}&v=${v}`).then(r=>data=r.data);
  return data;
}
export const VisiteSiteOfUserFromLink=async(id,site)=>{
  if(site?.trim()!==null || site?.trim()!=="")
  {
    await postData("visiteSiteOfUser",{"profil":id}).then(r=>{
    
    }).catch(err=>{
      
    });
    window.location.href="http://"+site;
  }
}

