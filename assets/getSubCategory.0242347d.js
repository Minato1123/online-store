import{s as o,u,h as n}from"./index.2e401dab.js";function l({id:t}){const{isMocked:s,mockData:a}=o(u());if(!s.value)return n.get({url:`/subCategories/${t}`});if(a.value==null)return{data:{}};const e=a.value.subCategories.find(r=>r.id===t);return e==null?{data:{}}:{data:e}}export{l as g};
