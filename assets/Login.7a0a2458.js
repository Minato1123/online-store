import{g as n,a as u,k as o,d as I,s as b,l as h,r as H,p as c,q as f,b as s,K as B,N as x,v as C,a2 as L,f as _,J as g,T as M,z as E,F as D,R as T,O as F,Q as S,e as q,U as N,V as R,_ as z}from"./index.2e401dab.js";import{_ as U,a as K}from"./check-box-outline.731cab50.js";const O={class:"svg-icon",viewBox:"0 0 256 256",width:"1.2em",height:"1.2em"},P=o("path",{fill:"#1877F2",d:"M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"},null,-1),G=o("path",{fill:"#FFF",d:"m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"},null,-1),J=[P,G];function Q(l,a){return n(),u("svg",O,J)}const j={name:"logos-facebook",render:Q},W={class:"svg-icon",viewBox:"0 0 256 262",width:"1.2em",height:"1.2em"},X=o("path",{fill:"#4285F4",d:"M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"},null,-1),Y=o("path",{fill:"#34A853",d:"M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"},null,-1),Z=o("path",{fill:"#FBBC05",d:"M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"},null,-1),oo=o("path",{fill:"#EB4335",d:"M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"},null,-1),to=[X,Y,Z,oo];function so(l,a){return n(),u("svg",W,to)}const no={name:"logos-google-icon",render:so},eo={class:"svg-icon",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},lo=o("path",{fill:"currentColor",d:"M14 14.252V22H4a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6zm6 4v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"},null,-1),io=[lo];function co(l,a){return n(),u("svg",eo,io)}const ao={name:"ri-user-add-fill",render:co},e=l=>(N("data-v-b9d820ae"),l=l(),R(),l),_o={class:"login-left"},uo={class:"title-container"},ro=e(()=>o("div",{class:"title"}," \u6703\u54E1\u767B\u5165 ",-1)),po=e(()=>o("p",{class:"login-btn-text"}," \u8A3B\u518A ",-1)),ho={class:"mail-password-block"},go={class:"mail"},mo=e(()=>o("div",{class:"sub-title"}," \u96FB\u5B50\u4FE1\u7BB1 ",-1)),vo={class:"password"},bo=e(()=>o("div",{class:"sub-title"}," \u5BC6\u78BC ",-1)),fo={class:"account-setup"},Bo=e(()=>o("input",{class:"hidden",type:"checkbox"},null,-1)),xo=e(()=>o("div",null,[o("button",{type:"button",class:"forget-password"}," \u5FD8\u8A18\u5BC6\u78BC\uFF1F ")],-1)),Co={class:"footer-btn footer-btn-left-login"},Fo=e(()=>o("div",{class:"line"},null,-1)),ko={class:"right"},wo=e(()=>o("div",{class:"quick-login"}," \u5FEB\u901F\u767B\u5165 ",-1)),$o={class:"quick-login-block"},Vo={type:"button",class:"quick-login-btn"},yo={type:"button",class:"quick-login-btn"},Ao={class:"footer-btn footer-btn-rwd-login"},Io=I({__name:"Login",setup(l){const a={text:"\u767B\u5165",color:"main-color"},k={text:"\u767B\u5165\u5931\u6557\uFF01",additionalText:"\u8ACB\u78BA\u8A8D\u5E33\u865F\u5BC6\u78BC\u662F\u5426\u6B63\u78BA\u3002",color:"main-product-color",borderColor:"main-product-color",textInBtnOK:{text:"\u78BA\u8A8D",color:"main-product-color"}},{hasErrorInLogin:m}=b(h()),{handleLogin:v}=h(),{loginEmail:d,loginPassword:r}=b(h()),p=H(!1);return(Ho,t)=>{const w=ao,$=U,V=K,y=no,A=j;return n(),u(D,null,[o("form",{class:"login-container",onSubmit:t[3]||(t[3]=(...i)=>s(v)&&s(v)(...i))},[o("div",_o,[o("div",uo,[ro,c(s(T),{to:{name:"register"},class:"login-btn"},{default:f(()=>[c(w),po]),_:1})]),o("div",ho,[o("div",go,[mo,B(o("input",{"onUpdate:modelValue":t[0]||(t[0]=i=>C(d)?d.value=i:null),name:"email",class:"sub-input",type:"text"},null,512),[[x,s(d)]])]),o("div",vo,[bo,B(o("input",{"onUpdate:modelValue":t[1]||(t[1]=i=>C(r)?r.value=i:null),name:"password",class:"sub-input",type:"password"},null,512),[[x,s(r)]])])]),o("div",fo,[o("label",{class:"remember-password",onClick:t[2]||(t[2]=L(i=>p.value=!s(p),["self"]))},[Bo,s(p)?(n(),_($,{key:0})):(n(),_(V,{key:1})),g(" \u8A18\u4F4F\u6211 ")]),xo]),o("div",Co,[c(F,{class:"login-register-btn",content:a})])]),Fo,o("div",ko,[wo,o("div",$o,[o("button",Vo,[c(y),g(" Google \u767B\u5165 ")]),o("button",yo,[c(A),g(" Facebook \u767B\u5165 ")])]),o("div",Ao,[c(F,{class:"login-register-btn",content:a})])])],32),(n(),_(E,{to:"body"},[c(M,null,{default:f(()=>[s(m)?(n(),_(S,{key:0,"text-in-dialog":k,onCloseInfoDialog:t[4]||(t[4]=i=>m.value=!1)})):q("",!0)]),_:1})]))],64)}}});const Eo=z(Io,[["__scopeId","data-v-b9d820ae"]]);export{Eo as default};
