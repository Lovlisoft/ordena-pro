import{u as q,l as I,M as h,m as L,K as P,d as S,e as d,v as k,r as f,o as A,c as N,a as o,h as m,x as t,z as C,t as E,w as R,q as w,s as U,L as x,a0 as D,A as G,Y as M}from"./main.fa881b19.js";const K={__name:"ResetPassword",setup(z){const v=q(),{t:n}=I(),c=h(),$=L(),r=P({email:"",password:"",password_confirmation:""}),u=S(!1),_=d(()=>({email:{required:w,email:U},password:{required:w,minLength:x(8)},password_confirmation:{sameAsPassword:D(r.password)}})),a=k(_,r),g=d(()=>a.value.email.$error?a.value.email.required.$invalid?n("validation.required"):a.value.email.email?n("validation.email_incorrect"):!1:""),b=d(()=>a.value.password.$error?a.value.password.required.$invalid?n("validation.required"):a.value.password.minLength?n("validation.password_min_length",{count:a.value.password.minLength.$params.min}):!1:""),V=d(()=>a.value.password_confirmation.$error?a.value.password_confirmation.sameAsPassword.$invalid?n("validation.password_incorrect"):!1:"");async function y(i){if(a.value.$touch(),!a.value.$invalid)try{let e={email:r.email,password:r.password,password_confirmation:r.password_confirmation,token:c.params.token};u.value=!0;let l=await G.post("/api/v1/auth/reset/password",e);u.value=!1,l.data&&(v.showNotification({type:"success",message:n("login.password_reset_successfully")}),$.push("/login"))}catch(e){M(e),u.value=!1,e.response&&e.response.status}}return(i,e)=>{const l=f("BaseInput"),p=f("BaseInputGroup"),B=f("BaseButton");return A(),N("form",{id:"loginForm",onSubmit:R(y,["prevent"])},[o(p,{error:g.value,label:i.$t("login.email"),class:"mb-4",required:""},{default:m(()=>[o(l,{modelValue:r.email,"onUpdate:modelValue":e[0]||(e[0]=s=>r.email=s),invalid:t(a).email.$error,focus:"",type:"email",name:"email",onInput:e[1]||(e[1]=s=>t(a).email.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["error","label"]),o(p,{error:b.value,label:i.$t("login.password"),class:"mb-4",required:""},{default:m(()=>[o(l,{modelValue:r.password,"onUpdate:modelValue":e[2]||(e[2]=s=>r.password=s),invalid:t(a).password.$error,type:"password",name:"password",onInput:e[3]||(e[3]=s=>t(a).password.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["error","label"]),o(p,{error:V.value,label:i.$t("login.retype_password"),class:"mb-4",required:""},{default:m(()=>[o(l,{modelValue:r.password_confirmation,"onUpdate:modelValue":e[4]||(e[4]=s=>r.password_confirmation=s),invalid:t(a).password_confirmation.$error,type:"password",name:"password",onInput:e[5]||(e[5]=s=>t(a).password_confirmation.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["error","label"]),o(B,{loading:u.value,type:"submit",variant:"primary"},{default:m(()=>[C(E(i.$t("login.reset_password")),1)]),_:1},8,["loading"])],32)}}};export{K as default};