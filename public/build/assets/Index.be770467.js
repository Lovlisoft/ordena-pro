import{X as rt,H as z,M as dt,af as ut,Y as h,A as p,u as k,I as Z,d as M,l as tt,e as $,p as G,q as mt,L as ht,aj as pt,r as u,o as B,j as P,h as o,b as w,z as f,t as v,x as y,a as c,w as ft,n as A,K as _t,a8 as vt,N as yt,ad as gt,ae as bt,c as X,a9 as O,aa as W,g as K,a4 as Q,Q as x,F as Tt}from"./main.6ce7f12a.js";import{u as kt}from"./payment.c1492c38.js";import{_ as Bt}from"./CapsuleIcon.9b0239ac.js";import{_ as wt}from"./SendPaymentModal.306db5af.js";import"./mail-driver.f40c112a.js";var J={date:"fecha"};const et=(V=!1)=>{const b=V?window.pinia.defineStore:rt,{global:r}=window.i18n;return b({id:"transaction",state:()=>({transactions:[],transactionTotalCount:0,selectAllField:!1,selectedTransactions:[],selectedNote:null,showExchangeRate:!1,drivers:[],providers:[],transactionProviders:{id:null,name:"",driver:"",active:!1,settings:{key:"",secret:""}},currentTransaction:{...J},transactionModes:[],currentTransactionMode:{id:"",name:null},isFetchingInitialData:!1}),getters:{isEdit:e=>!!e.transactionProviders.id},actions:{fetchTransactionInitialData(e){const s=z(),n=dt();this.isFetchingInitialData=!0;let t=[];e&&(t=[this.fetchTransaction(n.params.id)]),Promise.all([this.fetchTransactionModes({limit:"all"}),this.getNextNumber(),...t]).then(async([a,d,m])=>{e?m.data.data.invoice&&(this.currentTransaction.maxPayableAmount=parseInt(m.data.data.invoice.due_amount)):!e&&d.data&&(this.currentTransaction.transaction_date=ut().format("YYYY-MM-DD"),this.currentTransaction.transaction_number=d.data.nextNumber,this.currentTransaction.currency=s.selectedCompanyCurrency),this.isFetchingInitialData=!1}).catch(a=>{h(a)})},fetchTransactions(e){return new Promise((s,n)=>{p.get("/api/v1/bank-transactions",{params:e}).then(t=>{this.transactions=t.data.data,this.transactionTotalCount=t.data.meta.total,s(t)}).catch(t=>{h(t),n(t)})})},fetchTransaction(e){return new Promise((s,n)=>{p.get(`/api/v1/bank-transactions/${e}`).then(t=>{Object.assign(this.currentTransaction,t.data.data),s(t)}).catch(t=>{h(t),n(t)})})},importTransactions(e){return new Promise((s,n)=>{p.post("/api/v1/bank-transactions",e).then(t=>{this.transactions.push(t.data),k().showNotification({type:"success",message:r.t("transactions.created_message")}),s(t)}).catch(t=>{h(t),n(t)})})},updateTransaction(e){return new Promise((s,n)=>{p.put(`/api/v1/bank-transactions/${e.id}`,e).then(t=>{if(t.data){let a=this.transactions.findIndex(m=>m.id===t.data.data.id);this.transactions[a]=e.transaction,k().showNotification({type:"success",message:r.t("transactions.updated_message")})}s(t)}).catch(t=>{h(t),n(t)})})},deleteTransaction(e){const s=k();return new Promise((n,t)=>{p.post("/api/v1/bank-transactions/delete",e).then(a=>{let d=this.transactions.findIndex(m=>m.id===e);this.transactions.splice(d,1),s.showNotification({type:"success",message:r.t("transactions.deleted_message",1)}),n(a)}).catch(a=>{h(a),t(a)})})},deleteMultipleTransactions(){const e=k();return new Promise((s,n)=>{p.post("/api/v1/bank-transactions/delete",{ids:this.selectedTransactions}).then(t=>{this.selectedTransactions.forEach(a=>{let d=this.transactions.findIndex(m=>m.id===a.id);this.transactions.splice(d,1)}),e.showNotification({type:"success",message:r.tc("transactions.deleted_message",2)}),s(t)}).catch(t=>{h(t),n(t)})})},setSelectAllState(e){this.selectAllField=e},selectTransaction(e){this.selectedTransactions=e,this.selectedTransactions.length===this.transactions.length?this.selectAllField=!0:this.selectAllField=!1},selectAllTransactions(){if(this.selectedTransactions.length===this.transactions.length)this.selectedTransactions=[],this.selectAllField=!1;else{let e=this.transactions.map(s=>s.id);this.selectedTransactions=e,this.selectAllField=!0}},selectNote(e){this.selectedNote=null,this.selectedNote=e},resetSelectedNote(e){this.selectedNote=null},searchTransaction(e){return new Promise((s,n)=>{p.get("/api/v1/bank-transactions",{params:e}).then(t=>{this.transactions=t.data,s(t)}).catch(t=>{h(t),n(t)})})},previewTransaction(e){return new Promise((s,n)=>{p.get(`/api/v1/bank-transactions/${e.id}/send/preview`,{params:e}).then(t=>{s(t)}).catch(t=>{h(t),n(t)})})},sendEmail(e){return new Promise((s,n)=>{p.post(`/api/v1/bank-transactions/${e.id}/send`,e).then(t=>{k().showNotification({type:"success",message:r.t("transactions.send_transaction_successfully")}),s(t)}).catch(t=>{h(t),n(t)})})},getNextNumber(e,s=!1){return new Promise((n,t)=>{p.get("/api/v1/next-number?key=transaction",{params:e}).then(a=>{s&&(this.currentTransaction.transaction_number=a.data.nextNumber),n(a)}).catch(a=>{h(a),t(a)})})},resetCurrentTransaction(){this.currentTransaction={...J}},fetchTransactionModes(e){return new Promise((s,n)=>{p.get("/api/v1/transaction-methods",{params:e}).then(t=>{this.transactionModes=t.data.data,s(t)}).catch(t=>{h(t),n(t)})})},fetchTransactionMode(e){return new Promise((s,n)=>{p.get(`/api/v1/transaction-methods/${e}`).then(t=>{this.currentTransactionMode=t.data.data,s(t)}).catch(t=>{h(t),n(t)})})},addTransactionMode(e){const s=k();return new Promise((n,t)=>{p.post("/api/v1/transaction-methods",e).then(a=>{this.transactionModes.push(a.data.data),s.showNotification({type:"success",message:r.t("settings.transaction_modes.transaction_mode_added")}),n(a)}).catch(a=>{h(a),t(a)})})},updateTransactionMode(e){const s=k();return new Promise((n,t)=>{p.put(`/api/v1/transaction-methods/${e.id}`,e).then(a=>{if(a.data){let d=this.transactionModes.findIndex(m=>m.id===a.data.data.id);this.transactionModes[d]=e.transactionModes,s.showNotification({type:"success",message:r.t("settings.transaction_modes.transaction_mode_updated")})}n(a)}).catch(a=>{h(a),t(a)})})},deleteTransactionMode(e){const s=k();return new Promise((n,t)=>{p.delete(`/api/v1/transaction-methods/${e}`).then(a=>{let d=this.transactionModes.findIndex(m=>m.id===e);this.transactionModes.splice(d,1),a.data.success&&s.showNotification({type:"success",message:r.t("settings.transaction_modes.deleted_message")}),n(a)}).catch(a=>{h(a),t(a)})})}}})()},It={class:"flex justify-between w-full"},Mt={class:"item-modal"},St={class:"px-8 py-8 sm:p-6"},Pt={class:"z-0 flex justify-end p-4 border-t border-gray-200 border-solid"},Ct={__name:"BankImportModal",emits:["newItem"],setup(V,{emit:b}){const r=Z(),e=z(),s=et(),n=M(null),t=M(null),{t:a}=tt(),d=M(!1);M(e.selectedCompanySettings.tax_per_item);const m=$(()=>r.active&&r.componentName==="BankImportModal");G.withMessage(a("validation.required"),mt),G.withMessage(a("validation.name_min_length",{count:3}),ht(3)),G.withMessage(a("validation.description_maxlength",{count:255}),pt(255));async function F(){let T={bank_account:n,import_file:t};d.value=!0,await s.importTransactions(T).then(_=>{d.value=!1,_.data.data&&r.data&&r.refreshData(_.data.data),S()})}function S(){r.closeModal(),setTimeout(()=>{r.$reset(),v$.value.$reset()},300)}return(T,_)=>{const C=u("BaseIcon"),U=u("BaseMultiselect"),E=u("BaseInputGroup"),Y=u("BaseFileUploader"),L=u("BaseInputGrid"),D=u("BaseButton"),R=u("BaseModal");return B(),P(R,{show:m.value,onClose:S},{header:o(()=>[w("div",It,[f(v(y(r).title)+" ",1),c(C,{name:"XIcon",class:"h-6 w-6 text-gray-500 cursor-pointer",onClick:S})])]),default:o(()=>[w("div",Mt,[w("form",{action:"",onSubmit:ft(F,["prevent"])},[w("div",St,[c(L,{layout:"one-column"},{default:o(()=>[c(E,{label:"Cuenta Bancaria"},{default:o(()=>[c(U,{modelValue:n.value,"onUpdate:modelValue":_[0]||(_[0]=l=>n.value=l),label:"alias",options:y(e).selectedCompany.bank_accounts,"value-prop":"id","can-deselect":!1,"can-clear":!1,placeholder:"Elige una cuenta",searchable:"","track-by":"name"},null,8,["modelValue","options"])]),_:1}),c(E,{label:T.$t("expenses.receipt")},{default:o(()=>[c(Y,{modelValue:t.value,"onUpdate:modelValue":_[1]||(_[1]=l=>t.value=l),accept:".csv,.xlsx,.xls",autoProcess:"true",uploadUrl:"/api/v1/files",onChange:T.onFileInputChange,onRemove:T.onFileInputRemove},null,8,["modelValue","onChange","onRemove"])]),_:1},8,["label"])]),_:1})]),w("div",Pt,[c(D,{class:"mr-3",variant:"primary-outline",type:"button",onClick:S},{default:o(()=>[f(v(T.$t("general.cancel")),1)]),_:1}),c(D,{loading:d.value,disabled:d.value,variant:"primary",type:"submit"},{left:o(l=>[c(C,{name:"SaveIcon",class:A(l.class)},null,8,["class"])]),default:o(()=>[f(" Importar Movimientos ")]),_:1},8,["loading","disabled"])])],32)])]),_:1},8,["show"])}}},Nt={class:"relative table-container"},xt={class:"absolute items-center left-6 top-2.5 select-none"},$t={class:"relative block"},At={key:1},Yt={__name:"Index",setup(V){const{t:b}=tt();let r=M(!1),e=M(!0),s=M(null);const n=_t({customer:"",payment_mode:"",payment_number:""}),t=kt(),a=et();z(),vt();const d=yt(),m=Z(),F=$(()=>!a.transactionTotalCount&&!e.value);function S(){m.openModal({title:"Importar Movimientos",componentName:"BankImportModal",refreshData:l=>emit("select",l)})}const T=$(()=>[{key:"status",sortable:!1,thClass:"extra w-10",tdClass:"text-left text-sm font-medium extra"},{key:"date",label:b("transactions.date"),thClass:"extra",tdClass:"font-medium text-gray-900"},{key:"account",label:b("transactions.bank")},{key:"reference",label:b("transactions.reference")},{key:"debit",label:b("transactions.debit")},{key:"credit",label:b("transactions.credit")},{key:"actions",label:"",tdClass:"text-right text-sm font-medium",sortable:!1}]),_=$({get:()=>t.selectedPayments,set:l=>t.selectPayment(l)}),C=$({get:()=>t.selectAllField,set:l=>t.setSelectAllState(l)});gt(n,()=>{L()},{debounce:500}),bt(()=>{t.selectAllField&&t.selectAllPayments()}),t.fetchPaymentModes({limit:"all"});function U(){return d.hasAbilities([x.DELETE_PAYMENT,x.EDIT_PAYMENT,x.VIEW_PAYMENT,x.SEND_PAYMENT])}async function E({page:l,filter:I,sort:N}){let j={customer_id:n.customer_id,payment_method_id:n.payment_mode!==null?n.payment_mode:"",payment_number:n.payment_number,orderByField:N.fieldName||"created_at",orderBy:N.order||"desc",page:l};e.value=!0;let g=await a.fetchTransactions(j);return e.value=!1,{data:g.data.data,pagination:{totalPages:g.data.meta.last_page,currentPage:g.data.meta.current_page,totalCount:g.data.meta.total,limit:10}}}function Y(){s.value&&s.value.refresh()}function L(){Y()}function D(){n.customer_id="",n.payment_mode="",n.payment_number=""}function R(){r.value&&D(),r.value=!r.value}return(l,I)=>{const N=u("BaseBreadcrumbItem"),j=u("BaseBreadcrumb"),g=u("BaseIcon"),q=u("BaseButton"),at=u("BasePageHeader"),nt=u("BaseEmptyPlaceholder"),H=u("BaseCheckbox"),st=u("router-link"),ot=u("PaymentDropdown"),it=u("BaseTable"),ct=u("BasePage");return B(),X(Tt,null,[c(Ct),c(ct,{class:"payments"},{default:o(()=>[c(wt),c(at,{title:l.$t("transactions.title")},{actions:o(()=>[O(c(q,{variant:"primary-outline",onClick:R},{right:o(i=>[y(r)?(B(),P(g,{key:1,name:"XIcon",class:A(i.class)},null,8,["class"])):(B(),P(g,{key:0,class:A(i.class),name:"FilterIcon"},null,8,["class"]))]),default:o(()=>[f(v(l.$t("general.filter"))+" ",1)]),_:1},512),[[W,y(t).paymentTotalCount]]),y(d).currentUser.is_owner?(B(),P(q,{key:0,onClick:S},{left:o(i=>[c(g,{name:"PlusIcon",class:A(i.class),"aria-hidden":"true"},null,8,["class"])]),default:o(()=>[f(" Importar Movimientos ")]),_:1})):K("",!0)]),default:o(()=>[c(j,null,{default:o(()=>[c(N,{title:l.$t("general.home"),to:"dashboard"},null,8,["title"]),c(N,{title:l.$tc("transactions.transactions",2),to:"#",active:""},null,8,["title"])]),_:1})]),_:1},8,["title"]),F.value?(B(),P(nt,{key:0,title:l.$t("payments.no_payments"),description:l.$t("payments.list_of_payments")},Q({default:o(()=>[c(Bt,{class:"mt-5 mb-4"})]),_:2},[y(d).hasAbilities(y(x).CREATE_PAYMENT)?{name:"actions",fn:o(()=>[c(q,{variant:"primary-outline",onClick:I[0]||(I[0]=i=>l.$router.push("/admin/payments/create"))},{left:o(i=>[c(g,{name:"PlusIcon",class:A(i.class)},null,8,["class"])]),default:o(()=>[f(" "+v(l.$t("payments.add_new_payment")),1)]),_:1})]),key:"0"}:void 0]),1032,["title","description"])):K("",!0),O(w("div",Nt,[c(it,{ref_key:"tableComponent",ref:s,data:E,columns:T.value,"placeholder-count":y(a).transactionTotalCount>=20?10:5,class:"mt-3"},Q({header:o(()=>[w("div",xt,[c(H,{modelValue:C.value,"onUpdate:modelValue":I[1]||(I[1]=i=>C.value=i),variant:"primary",onChange:y(t).selectAllPayments},null,8,["modelValue","onChange"])])]),"cell-status":o(({row:i})=>[w("div",$t,[c(H,{id:i.data.id,modelValue:_.value,"onUpdate:modelValue":I[2]||(I[2]=lt=>_.value=lt),value:i.data.id,variant:"primary"},null,8,["id","modelValue","value"])])]),"cell-date":o(({row:i})=>[f(v(i.data.date),1)]),"cell-account":o(({row:i})=>[f(v(i.data.account),1)]),"cell-reference":o(({row:i})=>[i.data.reference_link?(B(),P(st,{key:0,to:{path:`${i.data.reference_link}`},class:"font-medium text-primary-500"},{default:o(()=>[f(v(i.data.reference),1)]),_:2},1032,["to"])):(B(),X("span",At,v(i.data.reference),1))]),"cell-debit":o(({row:i})=>[f(v(i.data.debit),1)]),"cell-credit":o(({row:i})=>[f(v(i.data.credit),1)]),_:2},[U()?{name:"cell-actions",fn:o(({row:i})=>[c(ot,{row:i.data,table:y(s)},null,8,["row","table"])]),key:"0"}:void 0]),1032,["columns","placeholder-count"])],512),[[W,!F.value]])]),_:1})],64)}}};export{Yt as default};