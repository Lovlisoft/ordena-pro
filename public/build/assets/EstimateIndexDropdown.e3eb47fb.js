import{a3 as D,ab as x,I as T,u as k,a8 as B,N as A,l as $,M as N,m as M,r as u,o as c,j as m,h as a,a as n,x as o,Q as g,z as p,t as f,g as _}from"./main.6ce7f12a.js";const V={__name:"EstimateIndexDropdown",props:{row:{type:Object,default:null},table:{type:Object,default:null}},setup(r){const h=r;D("utils");const y=x();T(),k();const w=B(),d=A(),{t:l}=$(),I=N(),b=M();async function S(e){w.openDialog({title:l("general.are_you_sure"),message:l("estimates.confirm_delete"),yesLabel:l("general.ok"),noLabel:l("general.cancel"),variant:"danger",hideNoButton:!1,size:"lg"}).then(i=>{e=e,i&&y.deleteEstimate({ids:[e]}).then(t=>{t&&(h.table&&h.table.refresh(),t.data&&b.push("/admin/estimates"),y.$patch(s=>{s.selectedEstimates=[],s.selectAllField=!1}))})})}return(e,i)=>{const t=u("BaseIcon"),s=u("BaseDropdownItem"),E=u("router-link"),v=u("BaseDropdown");return c(),m(v,null,{activator:a(()=>[n(t,{class:"text-gray-500",name:"DotsHorizontalIcon"})]),default:a(()=>[o(d).hasAbilities(o(g).EDIT_ESTIMATE)?(c(),m(E,{key:0,to:`/admin/estimates/${r.row.id}/edit`},{default:a(()=>[n(s,null,{default:a(()=>[n(t,{name:"PencilIcon",class:"w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"}),p(" "+f(e.$t("general.edit")),1)]),_:1})]),_:1},8,["to"])):_("",!0),o(d).hasAbilities(o(g).DELETE_ESTIMATE)?(c(),m(s,{key:1,onClick:i[0]||(i[0]=j=>S(r.row.id))},{default:a(()=>[n(t,{name:"TrashIcon",class:"w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"}),p(" "+f(e.$t("general.delete")),1)]),_:1})):_("",!0),o(I).name!=="estimates.view"&&o(d).hasAbilities(o(g).VIEW_ESTIMATE)?(c(),m(E,{key:2,to:`estimates/${r.row.id}/view`},{default:a(()=>[n(s,null,{default:a(()=>[n(t,{name:"EyeIcon",class:"w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"}),p(" "+f(e.$t("general.view")),1)]),_:1})]),_:1},8,["to"])):_("",!0)]),_:1})}}};export{V as _};