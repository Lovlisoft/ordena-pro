import{H as se,a8 as le,ac as oe,N as ne,d as C,l as re,K as ue,e as v,ad as ce,ae as me,af as de,r as o,o as p,j as _,h as t,a,b as d,a9 as D,aa as T,x as n,n as b,z as y,t as i,Q as B,g as F,a4 as ie}from"./main.6ce7f12a.js";import{_ as pe}from"./CustomerIndexDropdown.6989ae49.js";import{_ as _e}from"./AstronautIcon.acbbec99.js";const fe={class:"flex items-center justify-end space-x-5"},he={class:"relative table-container"},ye={class:"relative flex items-center justify-end h-5"},Be={class:"flex text-sm font-medium cursor-pointer select-none text-primary-400"},Ce={class:"absolute z-10 items-center left-6 top-2.5 select-none"},ve={class:"relative block"},Ie={__name:"Index",setup(be){se();const O=le(),u=oe(),g=ne();let k=C(null),f=C(!1),x=C(!0);const{t:m}=re();let r=ue({display_name:"",contact_name:"",phone:""});const w=v(()=>!u.totalCustomers&&!x.value),A=v({get:()=>u.selectedCustomers,set:s=>u.selectCustomer(s)}),U=v({get:()=>u.selectAllField,set:s=>u.setSelectAllState(s)}),z=v(()=>[{key:"status",thClass:"extra w-10 pr-0",sortable:!1,tdClass:"font-medium text-gray-900 pr-0"},{key:"name",label:m("customers.name"),thClass:"extra",tdClass:"font-medium text-gray-900"},{key:"phone",label:m("customers.phone")},{key:"due_amount",label:m("customers.amount_due")},{key:"created_at",label:m("items.added_on")},{key:"actions",tdClass:"text-right text-sm font-medium pl-0",thClass:"pl-0",sortable:!1}]);ce(r,()=>{W()},{debounce:500}),me(()=>{u.selectAllField&&u.selectAllCustomers()});function I(){k.value.refresh()}function W(){I()}function Y(){return g.hasAbilities([B.DELETE_CUSTOMER,B.EDIT_CUSTOMER,B.VIEW_CUSTOMER])}async function j({page:s,filter:l,sort:h}){let V={display_name:r.display_name,contact_name:r.contact_name,phone:r.phone,orderByField:h.fieldName||"created_at",orderBy:h.order||"desc",page:s};x.value=!0;let c=await u.fetchCustomers(V);return x.value=!1,{data:c.data.data,pagination:{totalPages:c.data.meta.last_page,currentPage:s,totalCount:c.data.meta.total,limit:10}}}function M(){r.display_name="",r.contact_name="",r.phone=""}function H(){f.value&&M(),f.value=!f.value}let P=C(new Date);P.value=de(P).format("YYYY-MM-DD");function L(){O.openDialog({title:m("general.are_you_sure"),message:m("customers.confirm_delete",2),yesLabel:m("general.ok"),noLabel:m("general.cancel"),variant:"danger",hideNoButton:!1,size:"lg"}).then(s=>{s&&u.deleteMultipleCustomers().then(l=>{l.data&&I()})})}return(s,l)=>{const h=o("BaseBreadcrumbItem"),V=o("BaseBreadcrumb"),c=o("BaseIcon"),$=o("BaseButton"),G=o("BasePageHeader"),S=o("BaseInput"),E=o("BaseInputGroup"),K=o("BaseFilterWrapper"),Q=o("BaseEmptyPlaceholder"),X=o("BaseDropdownItem"),q=o("BaseDropdown"),N=o("BaseCheckbox"),R=o("BaseText"),J=o("router-link"),Z=o("BaseFormatMoney"),ee=o("BaseTable"),te=o("BasePage");return p(),_(te,null,{default:t(()=>[a(G,{title:s.$t("customers.title")},{actions:t(()=>[d("div",fe,[D(a($,{variant:"primary-outline",onClick:H},{right:t(e=>[n(f)?(p(),_(c,{key:1,name:"XIcon",class:b(e.class)},null,8,["class"])):(p(),_(c,{key:0,name:"FilterIcon",class:b(e.class)},null,8,["class"]))]),default:t(()=>[y(i(s.$t("general.filter"))+" ",1)]),_:1},512),[[T,n(u).totalCustomers]]),n(g).hasAbilities(n(B).CREATE_CUSTOMER)?(p(),_($,{key:0,onClick:l[0]||(l[0]=e=>s.$router.push("customers/create"))},{left:t(e=>[a(c,{name:"PlusIcon",class:b(e.class)},null,8,["class"])]),default:t(()=>[y(" "+i(s.$t("customers.new_customer")),1)]),_:1})):F("",!0)])]),default:t(()=>[a(V,null,{default:t(()=>[a(h,{title:s.$t("general.home"),to:"dashboard"},null,8,["title"]),a(h,{title:s.$tc("customers.customer",2),to:"#",active:""},null,8,["title"])]),_:1})]),_:1},8,["title"]),a(K,{show:n(f),class:"mt-5",onClear:M},{default:t(()=>[a(E,{label:s.$t("customers.display_name"),class:"text-left"},{default:t(()=>[a(S,{modelValue:n(r).display_name,"onUpdate:modelValue":l[1]||(l[1]=e=>n(r).display_name=e),type:"text",name:"name",autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label"]),a(E,{label:s.$t("customers.contact_name"),class:"text-left"},{default:t(()=>[a(S,{modelValue:n(r).contact_name,"onUpdate:modelValue":l[2]||(l[2]=e=>n(r).contact_name=e),type:"text",name:"address_name",autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label"]),a(E,{label:s.$t("customers.phone"),class:"text-left"},{default:t(()=>[a(S,{modelValue:n(r).phone,"onUpdate:modelValue":l[3]||(l[3]=e=>n(r).phone=e),type:"text",name:"phone",autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["show"]),D(a(Q,{title:s.$t("customers.no_customers"),description:s.$t("customers.list_of_customers")},{actions:t(()=>[n(g).hasAbilities(n(B).CREATE_CUSTOMER)?(p(),_($,{key:0,variant:"primary-outline",onClick:l[4]||(l[4]=e=>s.$router.push("/admin/customers/create"))},{left:t(e=>[a(c,{name:"PlusIcon",class:b(e.class)},null,8,["class"])]),default:t(()=>[y(" "+i(s.$t("customers.add_new_customer")),1)]),_:1})):F("",!0)]),default:t(()=>[a(_e,{class:"mt-5 mb-4"})]),_:1},8,["title","description"]),[[T,w.value]]),D(d("div",he,[d("div",ye,[n(u).selectedCustomers.length?(p(),_(q,{key:0},{activator:t(()=>[d("span",Be,[y(i(s.$t("general.actions"))+" ",1),a(c,{name:"ChevronDownIcon"})])]),default:t(()=>[a(X,{onClick:L},{default:t(()=>[a(c,{name:"TrashIcon",class:"mr-3 text-gray-600"}),y(" "+i(s.$t("general.delete")),1)]),_:1})]),_:1})):F("",!0)]),a(ee,{ref_key:"tableComponent",ref:k,class:"mt-3",data:j,columns:z.value},ie({header:t(()=>[d("div",Ce,[a(N,{modelValue:U.value,"onUpdate:modelValue":l[5]||(l[5]=e=>U.value=e),variant:"primary",onChange:n(u).selectAllCustomers},null,8,["modelValue","onChange"])])]),"cell-status":t(({row:e})=>[d("div",ve,[a(N,{id:e.data.id,modelValue:A.value,"onUpdate:modelValue":l[6]||(l[6]=ae=>A.value=ae),value:e.data.id,variant:"primary"},null,8,["id","modelValue","value"])])]),"cell-name":t(({row:e})=>[a(J,{to:{path:`customers/${e.data.id}/view`}},{default:t(()=>[a(R,{text:e.data.name,length:30,tag:"span",class:"font-medium text-primary-500 flex flex-col"},null,8,["text"]),a(R,{text:e.data.contact_name?e.data.contact_name:"",length:30,tag:"span",class:"text-xs text-gray-400"},null,8,["text"])]),_:2},1032,["to"])]),"cell-phone":t(({row:e})=>[d("span",null,i(e.data.phone?e.data.phone:"-"),1)]),"cell-due_amount":t(({row:e})=>[a(Z,{amount:e.data.due_amount||0,currency:e.data.currency},null,8,["amount","currency"])]),"cell-created_at":t(({row:e})=>[d("span",null,i(e.data.formatted_created_at),1)]),_:2},[Y()?{name:"cell-actions",fn:t(({row:e})=>[a(pe,{row:e.data,table:n(k),"load-data":I},null,8,["row","table"])]),key:"0"}:void 0]),1032,["columns"])],512),[[T,!w.value]])]),_:1})}}};export{Ie as default};