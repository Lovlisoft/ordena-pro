import{l as O,M as J,m as K,H as Q,d as w,e as q,p as c,q as D,v as W,r as m,o as V,j as y,h as i,a as o,b as I,x as e,c as X,i as Y,F as Z,n as x,g as ee,z as ae,t as te,w as oe,L as G,s as se,ah as re}from"./main.fa881b19.js";import{V as ne}from"./index.5323d67b.js";import{u as le}from"./users.46187544.js";const ie={class:"grid grid-cols-12"},ue={class:"space-y-6"},fe={__name:"Create",setup(de){const a=le(),{t:u}=O(),M=J(),N=K(),U=Q();let f=w(!1),n=w(!1);w([]);let C=w([]),k=w([]);const g=q(()=>M.name==="users.edit"),S=q(()=>g.value?u("users.edit_user"):u("users.new_user")),P=q(()=>({userData:{name:{required:c.withMessage(u("validation.required"),D),minLength:c.withMessage(u("validation.name_min_length",{count:3}),G(3))},email:{required:c.withMessage(u("validation.required"),D),email:c.withMessage(u("validation.email_incorrect"),se)},password:{required:re(function(){return c.withMessage(u("validation.required"),D),!g.value}),minLength:c.withMessage(u("validation.password_min_length",{count:8}),G(8))},companies:{required:c.withMessage(u("validation.required"),D)},offices:{required:c.withMessage(u("validation.required"),D)}}})),j={role:{required:c.withMessage(u("validation.required"),D)}},s=W(P,a,{$scope:!0});E(),a.resetUserData();async function E(){var l,t;n.value=!0;try{g.value&&await a.fetchUser(M.params.id);let d=await U.fetchUserCompanies();(l=d==null?void 0:d.data)!=null&&l.data&&(C.value=d.data.data.map($=>($.role=null,$)));let v=await U.fetchUserOffices();(t=v==null?void 0:v.data)!=null&&t.data&&(k.value=v.data.data.map($=>$))}catch{n.value=!1}n.value=!1}async function F(){if(s.value.$touch(),s.value.$invalid)return!0;try{f.value=!0;let l={...a.userData,companies:a.userData.companies.map(d=>({role:d.role,id:d.id}))};await(g.value?a.updateUser:a.addUser)(l),N.push("/admin/users"),f.value=!1}catch{f.value=!1}}return(l,t)=>{const d=m("BaseBreadcrumbItem"),v=m("BaseBreadcrumb"),$=m("BasePageHeader"),b=m("BaseInput"),p=m("BaseInputGroup"),h=m("BaseMultiselect"),H=m("BaseInputGrid"),R=m("BaseIcon"),z=m("BaseButton"),T=m("BaseCard"),A=m("BasePage");return V(),y(A,null,{default:i(()=>[o($,{title:S.value},{default:i(()=>[o(v,null,{default:i(()=>[o(d,{title:l.$t("general.home"),to:"dashboard"},null,8,["title"]),o(d,{title:l.$tc("users.user",2),to:"/admin/users"},null,8,["title"]),o(d,{title:S.value,to:"#",active:""},null,8,["title"])]),_:1})]),_:1},8,["title"]),I("form",{action:"",autocomplete:"off",onSubmit:oe(F,["prevent"])},[I("div",ie,[o(T,{class:"mt-6 col-span-12 md:col-span-8"},{default:i(()=>[o(H,{layout:"one-column"},{default:i(()=>[o(p,{"content-loading":e(n),label:l.$t("users.name"),error:e(s).userData.name.$error&&e(s).userData.name.$errors[0].$message,required:""},{default:i(()=>[o(b,{modelValue:e(a).userData.name,"onUpdate:modelValue":t[0]||(t[0]=r=>e(a).userData.name=r),modelModifiers:{trim:!0},"content-loading":e(n),invalid:e(s).userData.name.$error,onInput:t[1]||(t[1]=r=>e(s).userData.name.$touch())},null,8,["modelValue","content-loading","invalid"])]),_:1},8,["content-loading","label","error"]),o(p,{"content-loading":e(n),label:l.$t("users.email"),error:e(s).userData.email.$error&&e(s).userData.email.$errors[0].$message,required:""},{default:i(()=>[o(b,{modelValue:e(a).userData.email,"onUpdate:modelValue":t[2]||(t[2]=r=>e(a).userData.email=r),modelModifiers:{trim:!0},type:"email","content-loading":e(n),invalid:e(s).userData.email.$error,onInput:t[3]||(t[3]=r=>e(s).userData.email.$touch())},null,8,["modelValue","content-loading","invalid"])]),_:1},8,["content-loading","label","error"]),o(p,{"content-loading":e(n),label:l.$t("users.companies"),error:e(s).userData.companies.$error&&e(s).userData.companies.$errors[0].$message,required:""},{default:i(()=>[o(h,{modelValue:e(a).userData.companies,"onUpdate:modelValue":t[4]||(t[4]=r=>e(a).userData.companies=r),mode:"tags",object:!0,autocomplete:"new-password",label:"name",options:e(C),"value-prop":"id",invalid:e(s).userData.companies.$error,"content-loading":e(n),searchable:"","can-deselect":!1,class:"w-full","track-by":"name"},null,8,["modelValue","options","invalid","content-loading"])]),_:1},8,["content-loading","label","error"]),(V(!0),X(Z,null,Y(e(a).userData.companies,(r,B)=>(V(),y(e(ne),{key:B,state:r,rules:j},{default:i(({v:_})=>[I("div",ue,[o(p,{"content-loading":e(n),label:l.$t("users.select_company_role",{company:r.name}),error:_.role.$error&&_.role.$errors[0].$message,required:""},{default:i(()=>[o(h,{modelValue:e(a).userData.companies[B].role,"onUpdate:modelValue":L=>e(a).userData.companies[B].role=L,"value-prop":"name","track-by":"id",autocomplete:"off","content-loading":e(n),label:"name",options:e(a).userData.companies[B].roles,"can-deselect":!1,invalid:_.role.$invalid,onChange:L=>_.role.$touch()},null,8,["modelValue","onUpdate:modelValue","content-loading","options","invalid","onChange"])]),_:2},1032,["content-loading","label","error"])])]),_:2},1032,["state"]))),128)),o(p,{"content-loading":e(n),label:l.$t("users.offices"),error:e(s).userData.offices.$error&&e(s).userData.offices.$errors[0].$message,required:""},{default:i(()=>[o(h,{modelValue:e(a).userData.offices,"onUpdate:modelValue":t[5]||(t[5]=r=>e(a).userData.offices=r),mode:"tags",object:!0,autocomplete:"new-password",label:"name",options:e(k),"value-prop":"id",invalid:e(s).userData.offices.$error,"content-loading":e(n),searchable:"","can-deselect":!1,class:"w-full","track-by":"name"},null,8,["modelValue","options","invalid","content-loading"])]),_:1},8,["content-loading","label","error"]),o(p,{"content-loading":e(n),label:l.$tc("users.password"),error:e(s).userData.password.$error&&e(s).userData.password.$errors[0].$message,required:!g.value},{default:i(()=>[o(b,{modelValue:e(a).userData.password,"onUpdate:modelValue":t[6]||(t[6]=r=>e(a).userData.password=r),name:"new-password",autocomplete:"new-password","content-loading":e(n),type:"password",invalid:e(s).userData.password.$error,onInput:t[7]||(t[7]=r=>e(s).userData.password.$touch())},null,8,["modelValue","content-loading","invalid"])]),_:1},8,["content-loading","label","error","required"]),o(p,{"content-loading":e(n),label:l.$t("users.phone")},{default:i(()=>[o(b,{modelValue:e(a).userData.phone,"onUpdate:modelValue":t[8]||(t[8]=r=>e(a).userData.phone=r),modelModifiers:{trim:!0},"content-loading":e(n)},null,8,["modelValue","content-loading"])]),_:1},8,["content-loading","label"])]),_:1}),o(z,{"content-loading":e(n),type:"submit",loading:e(f),disabled:e(f),class:"mt-6"},{left:i(r=>[e(f)?ee("",!0):(V(),y(R,{key:0,name:"SaveIcon",class:x(r.class)},null,8,["class"]))]),default:i(()=>[ae(" "+te(g.value?l.$t("users.update_user"):l.$t("users.save_user")),1)]),_:1},8,["content-loading","loading","disabled"])]),_:1})])],32)]),_:1})}}};export{fe as default};