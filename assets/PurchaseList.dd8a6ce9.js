import{d as O,r as g,c as b,o as T,a6 as j,a7 as q,f as M,k as e,p as B,q as P,b as a,a8 as H,z as K,g as n,t as o,J as z,a as i,e as f,F as A,x as N,M as J,O as S,U as V,V as U,_ as Y,s as L,u as x,l as w,h as R,j as G}from"./index.2e401dab.js";import{P as Q}from"./PUserLayout.0d700a5d.js";import{g as W}from"./getProductListFromBoughtByOrderId.3e1bc5f5.js";const X=s=>(V("data-v-7c3a886e"),s=s(),U(),s),Z={class:"mask"},ee={class:"serial-number"},te={class:"content"},se={class:"order-detail"},oe={class:"order-detail-column"},ue=X(()=>e("div",null,"\u5B8C\u6210\u6642\u9593\uFF5C-",-1)),ae={class:"order-detail-column"},re={class:"order-methods"},ne={key:0},ce={key:0,class:"product-list-container"},de=["src"],ie={class:"product-name"},le={class:"btns"},pe=O({__name:"OrderDialog",props:{order:{type:Object,required:!0}},emits:["closeDialog"],setup(s,{emit:l}){const r=s,c=g(),_=b(()=>{const t=new Date(r.order.purchaseTime);return`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}`}),p=b(()=>{if(r.order.paymentStatus!=="paid")return"-";{const t=new Date(r.order.purchaseTime);return`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}`}}),m=b(()=>r.order.deliveryType==="home-delivery"?`${r.order.county} ${r.order.address}`:""),F={"credit-card":"\u4FE1\u7528\u5361\uFF0F\u91D1\u878D\u5361",transfer:"\u9280\u884C\u8F49\u5E33","cash-on-delivery":"\u8CA8\u5230\u4ED8\u6B3E"},h={"home-delivery":"\u5B85\u914D","convenience-store":"\u8D85\u5546\u53D6\u8CA8"},k={text:"OK",color:"main-color"},C={text:"\u806F\u7D61\u5BA2\u670D",color:"main-product-color"};async function D(){c.value=(await W({orderId:`${r.order.serialNumber}`})).data}T(()=>{D()});function v(){l("closeDialog")}window.addEventListener("keydown",t=>{t.code==="Escape"&&v()},!1);const y=j(window.document.body);return T(()=>{y.value=!0}),q(()=>{y.value=!1}),(t,d)=>(n(),M(K,{to:"body"},[e("div",Z,[B(a(H),{class:"container",onTrigger:v},{default:P(()=>[e("div",ee," \u8A02\u55AE\u7DE8\u865F "+o(r.order.serialNumber),1),e("div",te,[e("div",se,[e("div",oe,[e("div",null,"\u8A02\u55AE\u6642\u9593\uFF5C"+o(a(_)),1),e("div",null,"\u4ED8\u6B3E\u6642\u9593\uFF5C"+o(a(p)),1),ue]),e("div",ae,[e("div",null,"\u8A02\u8CFC\u59D3\u540D\uFF5C"+o(s.order.name),1),e("div",null,"\u806F\u7D61\u96FB\u8A71\uFF5C"+o(s.order.mobile),1),e("div",null,"\u96FB\u5B50\u4FE1\u7BB1\uFF5C"+o(s.order.email),1)])]),e("div",re,[e("div",null,"\u4ED8\u6B3E\u65B9\u5F0F\uFF5C"+o(F[s.order.paymentType]),1),e("div",null,[z("\u914D\u9001\u65B9\u5F0F\uFF5C"+o(h[s.order.deliveryType]),1),a(m)!==""?(n(),i("span",ne,"\uFF1A"+o(a(m)),1)):f("",!0)])]),a(c)?(n(),i("div",ce,[(n(!0),i(A,null,N(a(c),(u,E)=>(n(),i("div",{key:`boughtItem-${E}`,class:"product"},[e("img",{class:"product-img",src:a(J)(u.image)},null,8,de),e("div",ie,o(u.name),1),e("div",null,o(u.specificationName),1),e("div",null,o(u.amount)+" \u9805",1),e("div",null,"NT$ "+o(u.price*u.amount),1)]))),128))])):f("",!0)]),e("div",le,[B(S,{class:"btn",content:C,onClick:v}),B(S,{class:"btn",content:k,onClick:v})])]),_:1})])]))}});const ve=Y(pe,[["__scopeId","data-v-7c3a886e"]]);function I({userId:s,status:l}){const{isMocked:r,mockData:c}=L(x()),{isUserTokenValid:_}=x(),{userToken:p}=L(w()),{forcedLogout:m}=w();return r.value?_(p.value)===!1?(m(),{data:[]}):c.value==null?{data:[]}:{data:c.value.orders.filter(h=>h.userId===s&&h.status===l)}:R.get({url:"/orders",params:{userId:s,status:l}})}const $=s=>(V("data-v-22610960"),s=s(),U(),s),_e={key:0,class:"purchase-list-container"},me={class:"order-prepared-block block"},he=$(()=>e("div",{class:"subtitle"}," \u8A02\u55AE\u6E96\u5099\u4E2D ",-1)),ge={key:0,class:"order-content"},Fe=$(()=>e("div",{class:"item-titles"},[e("div",{class:"item-time"}," \u8CFC\u8CB7\u65E5\u671F "),e("div",{class:"item-orderid"}," \u8A02\u55AE\u7DE8\u865F "),e("div",{class:"item-payment-status"}," \u4ED8\u6B3E\u72C0\u614B "),e("div",{class:"item-total-price"}," \u7E3D\u8A08 ")],-1)),De=["onClick"],fe={class:"item-time"},ye={class:"item-orderid"},Be={class:"item-payment-status"},$e={class:"item-total-price"},ke=$(()=>e("div",{class:"order-shipped-block block"},[e("div",{class:"subtitle"}," \u8A02\u55AE\u5DF2\u51FA\u8CA8 "),e("div",{class:"order-shipped-content"},[e("div")])],-1)),Ce=$(()=>e("div",{class:"order-completed-block block"},[e("div",{class:"subtitle"}," \u8A02\u55AE\u5B8C\u6210 "),e("div",{class:"order-completed-content"},[e("div")])],-1)),Ee=O({__name:"PurchaseList",setup(s){const{userId:l,isLoggedIn:r}=L(w()),{startLoading:c,endLoading:_}=G(),p=g([]),m=g([]),F=g([]);async function h(){c(),p.value=(await I({userId:l.value,status:"prepared"})).data,_(),p.value.sort((t,d)=>+d.purchaseTime-+t.purchaseTime)}async function k(){c(),m.value=(await I({userId:l.value,status:"shipped"})).data,_(),m.value.sort((t,d)=>+d.purchaseTime-+t.purchaseTime)}async function C(){c(),F.value=(await I({userId:l.value,status:"completed"})).data,_(),F.value.sort((t,d)=>+d.purchaseTime-+t.purchaseTime)}T(()=>{h(),k(),C()});const D=g(!1),v=g();function y(t){D.value=!0,v.value=t}return(t,d)=>(n(),i(A,null,[B(Q,null,{default:P(()=>[a(r)?(n(),i("div",_e,[e("div",me,[he,a(p).length>0?(n(),i("div",ge,[Fe,(n(!0),i(A,null,N(a(p),(u,E)=>(n(),i("div",{key:`prepared-${E+1}`,class:"item",onClick:be=>y(u)},[e("div",fe,o(`${new Date(+u.purchaseTime).getFullYear()}/${new Date(+u.purchaseTime).getMonth()+1}/${new Date(+u.purchaseTime).getDate()}`),1),e("div",ye,o(u.serialNumber),1),e("div",Be,o(u.paymentStatus==="paid"?"\u5DF2\u4ED8\u6B3E":"\u672A\u4ED8\u6B3E"),1),e("div",$e,o(u.totalPrice),1)],8,De))),128))])):f("",!0)]),ke,Ce])):f("",!0)]),_:1}),a(D)&&a(v)?(n(),M(ve,{key:0,order:a(v),onCloseDialog:d[0]||(d[0]=u=>D.value=!1)},null,8,["order"])):f("",!0)],64))}});const Le=Y(Ee,[["__scopeId","data-v-22610960"]]);export{Le as default};