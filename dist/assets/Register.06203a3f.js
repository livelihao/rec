var C=Object.defineProperty;var c=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var w=(o,e,r)=>e in o?C(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r,_=(o,e)=>{for(var r in e||(e={}))A.call(e,r)&&w(o,r,e[r]);if(c)for(var r of c(e))V.call(e,r)&&w(o,r,e[r]);return o};import{b as D}from"./index.9afe2985.js";import{v as B}from"./formExtend.87c76a14.js";import{f as F,a as g,r as k,E as S,l as i,q as x,A as h,C as E,G as $,y as s,x as a,F as b}from"./element-plus.82ea873e.js";const j=()=>{const{register:o}=D();let e=g({name:"",email:"",pwd:"",pwd2:""});const r=k(null),p=n=>{n.key==="Enter"&&m()},m=async()=>{let{name:n,pwd:t,pwd2:l,email:d}=e;!await B(r)||(await o({username:n,password1:t,password2:l,email:d}),S({title:"\u63D0\u793A",message:"\u6CE8\u518C\u6210\u529F",type:"success"}))},f=g({name:[{validator:(n,t,l)=>{if(!t)return l(new Error("\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A"));l()},trigger:"blur"}],pwd:[{validator:(n,t,l)=>{if(!t)return l(new Error("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"));l()},trigger:"blur"}],pwd2:[{required:!0,message:"\u786E\u8BA4\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"},{validator:(n,t,l)=>{t!==e.pwd&&l(new Error("\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4")),l()},trigger:"blur"}]});return{form:e,onSubmit:m,enterSubmit:p,rules:f,ruleForm:r}};var v=F({name:"Login",setup(){return _({labelCol:{span:4},wrapperCol:{span:14}},j())}});const I={class:"w-screen h-screen bg-gray-200 flex justify-center items-center"},L={class:"text-2xl font-semibold text-gray-700 text-center mb-6"},N=b("\u6CE8\u518C"),T=b("\u5DF2\u6709\u5E10\u53F7? \u7ACB\u5373\u767B\u5F55");function P(o,e,r,p,m,f){const n=i("el-input"),t=i("el-form-item"),l=i("el-button"),d=i("el-link"),y=i("el-form");return x(),h("div",I,[E("div",{class:"layout-login",onKeyup:e[4]||(e[4]=(...u)=>o.enterSubmit&&o.enterSubmit(...u))},[E("h3",L,$(o.ImportMetaEnv.VITE_APP_TITLE),1),s(y,{ref:"ruleForm","label-position":"right","label-width":"80px",model:o.form,rules:o.rules},{default:a(()=>[s(t,{class:"mb-6 -ml-20",prop:"name"},{default:a(()=>[s(n,{modelValue:o.form.name,"onUpdate:modelValue":e[0]||(e[0]=u=>o.form.name=u),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D","prefix-icon":"el-icon-user"},null,8,["modelValue"])]),_:1}),s(t,{class:"mb-6 -ml-20",prop:"pwd"},{default:a(()=>[s(n,{modelValue:o.form.pwd,"onUpdate:modelValue":e[1]||(e[1]=u=>o.form.pwd=u),placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801","prefix-icon":"el-icon-lock","show-password":""},null,8,["modelValue"])]),_:1}),s(t,{class:"mb-6 -ml-20",prop:"pwd2"},{default:a(()=>[s(n,{modelValue:o.form.pwd2,"onUpdate:modelValue":e[2]||(e[2]=u=>o.form.pwd2=u),placeholder:"\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801","prefix-icon":"el-icon-lock","show-password":""},null,8,["modelValue"])]),_:1}),s(t,{class:"mb-6 -ml-20"},{default:a(()=>[s(l,{type:"primary",class:"w-full",onClick:o.onSubmit},{default:a(()=>[N]),_:1},8,["onClick"])]),_:1}),s(d,{type:"info",underline:!1,class:"text-xs",onClick:e[3]||(e[3]=u=>o.toPage("Login"))},{default:a(()=>[T]),_:1})]),_:1},8,["model","rules"])],32)])}v.render=P;v.__scopeId="data-v-5145ea9c";export{v as default};