import{I as Be,ab as te,u as Ee,H as he,l as ae,d as I,K as se,e as F,p as M,q as L,s as Z,v as $e,r as o,o as h,j as C,h as t,b as E,z as b,t as B,x as a,a as e,c as ee,g as N,a8 as Ce,N as Ie,m as ke,ad as Te,ae as we,a9 as W,aa as z,n as x,Q as A,a4 as Se}from"./main.6ce7f12a.js";import{_ as Ve}from"./ObservatoryIcon.cbb035b5.js";import{_ as Ae}from"./EstimateIndexDropdown.e3eb47fb.js";import{u as De}from"./mail-driver.f40c112a.js";const Me={class:"flex justify-between w-full"},Fe={key:0,action:""},Pe={class:"px-8 py-8 sm:p-6"},Re={class:"z-0 flex justify-end p-4 border-t border-gray-200 border-solid"},je={key:1},xe={class:"my-6 mx-4 border border-gray-200 relative"},Ne=["src"],Ue={class:"z-0 flex justify-end p-4 border-t border-gray-200 border-solid"},qe={__name:"SendEstimateModal",emits:["update"],setup(le,{emit:c}){const k=Be(),S=te(),D=Ee(),i=he();De();const{t:v}=ae(),g=I(!1),V=I(""),f=I(!1),n=I(["customer","customerCustom","estimate","estimateCustom","company"]);let m=se({id:null,from:null,to:null,subject:"New Estimate",body:null});const U=c,O=F(()=>k.active&&k.componentName==="SendEstimateModal"),q=F(()=>k.data),H={from:{required:M.withMessage(v("validation.required"),L),email:M.withMessage(v("validation.email_incorrect"),Z)},to:{required:M.withMessage(v("validation.required"),L),email:M.withMessage(v("validation.email_incorrect"),Z)},subject:{required:M.withMessage(v("validation.required"),L)},body:{required:M.withMessage(v("validation.required"),L)}},d=$e(H,F(()=>m));function X(){f.value=!1}async function J(){let _=await i.fetchBasicMailConfig();m.id=k.id,_.data&&(m.from=_.data.from_mail),q.value&&(m.to=q.value.customer.email),m.body=i.selectedCompanySettings.estimate_mail_body}async function G(){if(d.value.$touch(),d.value.$invalid)return!0;try{if(g.value=!0,!f.value){const w=await S.previewEstimate(m);g.value=!1,f.value=!0;var _=new Blob([w.data],{type:"text/html"});V.value=URL.createObjectURL(_);return}const u=await S.sendEstimate(m);if(g.value=!1,u.data.success)return U("update"),T(),!0}catch(u){console.error(u),g.value=!1,D.showNotification({type:"error",message:v("estimates.something_went_wrong")})}}function T(){k.closeModal(),setTimeout(()=>{d.value.$reset(),f.value=!1,V.value=null},300)}return(_,u)=>{const w=o("BaseIcon"),s=o("BaseInput"),r=o("BaseInputGroup"),$=o("BaseCustomInput"),P=o("BaseInputGrid"),p=o("BaseButton"),R=o("BaseModal");return h(),C(R,{show:O.value,onClose:T,onOpen:J},{header:t(()=>[E("div",Me,[b(B(a(k).title)+" ",1),e(w,{name:"XIcon",class:"h-6 w-6 text-gray-500 cursor-pointer",onClick:T})])]),default:t(()=>[f.value?(h(),ee("div",je,[E("div",xe,[e(p,{class:"absolute top-4 right-4",disabled:g.value,variant:"primary-outline",onClick:X},{default:t(()=>[e(w,{name:"PencilIcon",class:"h-5 mr-2"}),b(" Edit ")]),_:1},8,["disabled"]),E("iframe",{src:V.value,frameborder:"0",class:"w-full",style:{"min-height":"500px"}},null,8,Ne)]),E("div",Ue,[e(p,{class:"mr-3",variant:"primary-outline",type:"button",onClick:T},{default:t(()=>[b(B(_.$t("general.cancel")),1)]),_:1}),e(p,{loading:g.value,disabled:g.value,variant:"primary",type:"button",onClick:G},{default:t(()=>[g.value?N("",!0):(h(),C(w,{key:0,name:"PaperAirplaneIcon",class:"mr-2"})),b(" "+B(_.$t("general.send")),1)]),_:1},8,["loading","disabled"])])])):(h(),ee("form",Fe,[E("div",Pe,[e(P,{layout:"one-column"},{default:t(()=>[e(r,{label:_.$t("general.from"),required:"",error:a(d).from.$error&&a(d).from.$errors[0].$message},{default:t(()=>[e(s,{modelValue:a(m).from,"onUpdate:modelValue":u[0]||(u[0]=y=>a(m).from=y),type:"text",invalid:a(d).from.$error,onInput:u[1]||(u[1]=y=>a(d).from.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),e(r,{label:_.$t("general.to"),required:"",error:a(d).to.$error&&a(d).to.$errors[0].$message},{default:t(()=>[e(s,{modelValue:a(m).to,"onUpdate:modelValue":u[2]||(u[2]=y=>a(m).to=y),type:"text",invalid:a(d).to.$error,onInput:u[3]||(u[3]=y=>a(d).to.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),e(r,{label:_.$t("general.subject"),required:"",error:a(d).subject.$error&&a(d).subject.$errors[0].$message},{default:t(()=>[e(s,{modelValue:a(m).subject,"onUpdate:modelValue":u[4]||(u[4]=y=>a(m).subject=y),type:"text",invalid:a(d).subject.$error,onInput:u[5]||(u[5]=y=>a(d).subject.$touch())},null,8,["modelValue","invalid"])]),_:1},8,["label","error"]),e(r,{label:_.$t("general.body"),required:""},{default:t(()=>[e($,{modelValue:a(m).body,"onUpdate:modelValue":u[6]||(u[6]=y=>a(m).body=y),fields:n.value},null,8,["modelValue","fields"])]),_:1},8,["label"])]),_:1})]),E("div",Re,[e(p,{class:"mr-3",variant:"primary-outline",type:"button",onClick:T},{default:t(()=>[b(B(_.$t("general.cancel")),1)]),_:1}),e(p,{loading:g.value,disabled:g.value,variant:"primary",type:"button",class:"mr-3",onClick:G},{default:t(()=>[g.value?N("",!0):(h(),C(w,{key:0,name:"PhotographIcon",class:"h-5 mr-2"})),b(" "+B(_.$t("general.preview")),1)]),_:1},8,["loading","disabled"])])]))]),_:1},8,["show"])}}},Ge=E("div",{class:"hidden w-8 h-0 mx-4 border border-gray-400 border-solid xl:block",style:{"margin-top":"1.5rem"}},null,-1),Le={class:"relative table-container"},We={class:"relative flex items-center justify-between h-10 mt-5 list-none border-b-2 border-gray-200 border-solid"},ze={class:"flex text-sm font-medium cursor-pointer select-none text-primary-400"},Oe={class:"absolute items-center left-6 top-2.5 select-none"},He={class:"relative block"},Ye={__name:"Index",setup(le){const c=te(),k=Ce(),S=Ie(),D=I(null),{t:i}=ae(),v=I(!1),g=I(["DRAFT","SENT","VIEWED","EXPIRED","ACCEPTED","REJECTED"]),V=I(!0),f=I("general.draft");ke();let n=se({customer_id:"",status:"",from_date:"",to_date:"",estimate_number:""});const m=F(()=>!c.totalEstimateCount&&!V.value),U=F({get:()=>c.selectedEstimates,set:s=>{c.selectEstimate(s)}}),O=F(()=>[{key:"checkbox",thClass:"extra w-10 pr-0",sortable:!1,tdClass:"font-medium text-gray-900 pr-0"},{key:"estimate_date",label:i("estimates.date"),thClass:"extra",tdClass:"font-medium text-gray-500"},{key:"estimate_number",label:i("estimates.number",2)},{key:"name",label:i("estimates.customer")},{key:"status",label:i("estimates.status")},{key:"total",label:i("estimates.total"),tdClass:"font-medium text-gray-900"},{key:"actions",tdClass:"text-right text-sm font-medium pl-0",thClass:"text-right pl-0",sortable:!1}]);Te(n,()=>{G()},{debounce:500}),we(()=>{c.selectAllField&&c.selectAllEstimates()});function q(){return S.hasAbilities([A.CREATE_ESTIMATE,A.EDIT_ESTIMATE,A.VIEW_ESTIMATE,A.SEND_ESTIMATE])}async function H(s,r){n.status="",d()}function d(){D.value&&D.value.refresh()}async function X({page:s,filter:r,sort:$}){let P={customer_id:n.customer_id,status:n.status,from_date:n.from_date,to_date:n.to_date,estimate_number:n.estimate_number,orderByField:$.fieldName||"created_at",orderBy:$.order||"desc",page:s};V.value=!0;let p=await c.fetchEstimates(P);return V.value=!1,{data:p.data.data,pagination:{totalPages:p.data.meta.last_page,currentPage:s,totalCount:p.data.meta.total,limit:10}}}function J(s){if(f.value==s.title)return!0;switch(f.value=s.title,s.title){case i("general.draft"):n.status="DRAFT";break;case i("general.sent"):n.status="SENT";break;default:n.status="";break}}function G(){c.$patch(s=>{s.selectedEstimates=[],s.selectAllField=!1}),d()}function T(){n.customer_id="",n.status="",n.from_date="",n.to_date="",n.estimate_number="",f.value=i("general.all")}function _(){v.value&&T(),v.value=!v.value}async function u(){k.openDialog({title:i("general.are_you_sure"),message:i("estimates.confirm_delete"),yesLabel:i("general.ok"),noLabel:i("general.cancel"),variant:"danger",hideNoButton:!1,size:"lg"}).then(s=>{s&&c.deleteMultipleEstimates().then(r=>{d(),r.data&&c.$patch($=>{$.selectedEstimates=[],$.selectAllField=!1})})})}function w(s){switch(s){case"DRAFT":f.value=i("general.draft");break;case"SENT":f.value=i("general.sent");break;case"VIEWED":f.value=i("estimates.viewed");break;case"EXPIRED":f.value=i("estimates.expired");break;case"ACCEPTED":f.value=i("estimates.accepted");break;case"REJECTED":f.value=i("estimates.rejected");break;default:f.value=i("general.all");break}}return(s,r)=>{const $=o("BaseBreadcrumbItem"),P=o("BaseBreadcrumb"),p=o("BaseIcon"),R=o("BaseButton"),y=o("router-link"),oe=o("BasePageHeader"),ne=o("BaseCustomerSelectInput"),j=o("BaseInputGroup"),re=o("BaseMultiselect"),Q=o("BaseDatePicker"),ie=o("BaseInput"),ue=o("BaseFilterWrapper"),de=o("BaseEmptyPlaceholder"),K=o("BaseTab"),me=o("BaseTabGroup"),ce=o("BaseDropdownItem"),pe=o("BaseDropdown"),Y=o("BaseCheckbox"),fe=o("BaseText"),_e=o("BaseEstimateStatusBadge"),be=o("BaseFormatMoney"),ve=o("BaseTable"),ge=o("BasePage");return h(),C(ge,null,{default:t(()=>[e(qe),e(oe,{title:s.$t("estimates.title")},{actions:t(()=>[W(e(R,{variant:"primary-outline",onClick:_},{right:t(l=>[v.value?(h(),C(p,{key:1,name:"XIcon",class:x(l.class)},null,8,["class"])):(h(),C(p,{key:0,class:x(l.class),name:"FilterIcon"},null,8,["class"]))]),default:t(()=>[b(B(s.$t("general.filter"))+" ",1)]),_:1},512),[[z,a(c).totalEstimateCount]]),a(S).hasAbilities(a(A).CREATE_ESTIMATE)?(h(),C(y,{key:0,to:"estimates/create"},{default:t(()=>[e(R,{variant:"primary",class:"ml-4"},{left:t(l=>[e(p,{name:"PlusIcon",class:x(l.class)},null,8,["class"])]),default:t(()=>[b(" "+B(s.$t("estimates.new_estimate")),1)]),_:1})]),_:1})):N("",!0)]),default:t(()=>[e(P,null,{default:t(()=>[e($,{title:s.$t("general.home"),to:"dashboard"},null,8,["title"]),e($,{title:s.$tc("estimates.estimate",2),to:"#",active:""},null,8,["title"])]),_:1})]),_:1},8,["title"]),W(e(ue,{"row-on-xl":!0,onClear:T},{default:t(()=>[e(j,{label:s.$tc("customers.customer",1)},{default:t(()=>[e(ne,{modelValue:a(n).customer_id,"onUpdate:modelValue":r[0]||(r[0]=l=>a(n).customer_id=l),placeholder:s.$t("customers.type_or_click"),"value-prop":"id",label:"name"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),e(j,{label:s.$t("estimates.status")},{default:t(()=>[e(re,{modelValue:a(n).status,"onUpdate:modelValue":[r[1]||(r[1]=l=>a(n).status=l),w],options:g.value,searchable:"",placeholder:s.$t("general.select_a_status"),onRemove:r[2]||(r[2]=l=>H())},null,8,["modelValue","options","placeholder"])]),_:1},8,["label"]),e(j,{label:s.$t("general.from")},{default:t(()=>[e(Q,{modelValue:a(n).from_date,"onUpdate:modelValue":r[3]||(r[3]=l=>a(n).from_date=l),"calendar-button":!0,"calendar-button-icon":"calendar"},null,8,["modelValue"])]),_:1},8,["label"]),Ge,e(j,{label:s.$t("general.to")},{default:t(()=>[e(Q,{modelValue:a(n).to_date,"onUpdate:modelValue":r[4]||(r[4]=l=>a(n).to_date=l),"calendar-button":!0,"calendar-button-icon":"calendar"},null,8,["modelValue"])]),_:1},8,["label"]),e(j,{label:s.$t("estimates.estimate_number")},{default:t(()=>[e(ie,{modelValue:a(n).estimate_number,"onUpdate:modelValue":r[5]||(r[5]=l=>a(n).estimate_number=l)},{left:t(l=>[e(p,{name:"HashtagIcon",class:x(l.class)},null,8,["class"])]),_:1},8,["modelValue"])]),_:1},8,["label"])]),_:1},512),[[z,v.value]]),W(e(de,{title:s.$t("estimates.no_estimates"),description:s.$t("estimates.list_of_estimates")},{actions:t(()=>[a(S).hasAbilities(a(A).CREATE_ESTIMATE)?(h(),C(R,{key:0,variant:"primary-outline",onClick:r[6]||(r[6]=l=>s.$router.push("/admin/estimates/create"))},{left:t(l=>[e(p,{name:"PlusIcon",class:x(l.class)},null,8,["class"])]),default:t(()=>[b(" "+B(s.$t("estimates.add_new_estimate")),1)]),_:1})):N("",!0)]),default:t(()=>[e(Ve,{class:"mt-5 mb-4"})]),_:1},8,["title","description"]),[[z,m.value]]),W(E("div",Le,[E("div",We,[e(me,{class:"-mb-5",onChange:J},{default:t(()=>[e(K,{title:s.$t("general.all"),filter:""},null,8,["title"]),e(K,{title:s.$t("general.draft"),filter:"DRAFT"},null,8,["title"]),e(K,{title:s.$t("general.sent"),filter:"SENT"},null,8,["title"])]),_:1}),a(c).selectedEstimates.length&&a(S).hasAbilities(a(A).DELETE_ESTIMATE)?(h(),C(pe,{key:0,class:"absolute float-right"},{activator:t(()=>[E("span",ze,[b(B(s.$t("general.actions"))+" ",1),e(p,{name:"ChevronDownIcon"})])]),default:t(()=>[e(ce,{onClick:u},{default:t(()=>[e(p,{name:"TrashIcon",class:"mr-3 text-gray-600"}),b(" "+B(s.$t("general.delete")),1)]),_:1})]),_:1})):N("",!0)]),e(ve,{ref_key:"tableComponent",ref:D,data:X,columns:O.value,"placeholder-count":a(c).totalEstimateCount>=20?10:5,class:"mt-10"},Se({header:t(()=>[E("div",Oe,[e(Y,{modelValue:a(c).selectAllField,"onUpdate:modelValue":r[7]||(r[7]=l=>a(c).selectAllField=l),variant:"primary",onChange:a(c).selectAllEstimates},null,8,["modelValue","onChange"])])]),"cell-checkbox":t(({row:l})=>[E("div",He,[e(Y,{id:l.id,modelValue:U.value,"onUpdate:modelValue":r[8]||(r[8]=ye=>U.value=ye),value:l.data.id},null,8,["id","modelValue","value"])])]),"cell-estimate_date":t(({row:l})=>[b(B(l.data.formatted_estimate_date),1)]),"cell-estimate_number":t(({row:l})=>[e(y,{to:{path:`estimates/${l.data.id}/view`},class:"font-medium text-primary-500"},{default:t(()=>[b(B(l.data.estimate_number),1)]),_:2},1032,["to"])]),"cell-name":t(({row:l})=>[e(fe,{text:l.data.customer.name,length:30},null,8,["text"])]),"cell-status":t(({row:l})=>[e(_e,{status:l.data.status.name,color:l.data.status.color,class:"px-3 py-1"},{default:t(()=>[b(B(l.data.status.name),1)]),_:2},1032,["status","color"])]),"cell-total":t(({row:l})=>[e(be,{amount:l.data.total,currency:l.data.customer.currency},null,8,["amount","currency"])]),_:2},[q()?{name:"cell-actions",fn:t(({row:l})=>[e(Ae,{row:l.data,table:D.value},null,8,["row","table"])]),key:"0"}:void 0]),1032,["columns","placeholder-count"])],512),[[z,!m.value]])]),_:1})}}};export{Ye as default};