import{b as y}from"./index.2066d73b.js";import{v}from"./formExtend.fd5f7b23.js";import{f as E,a as f,r as C,E as V,l as u,q as A,A as k,C as c,G as D,y as r,x as a,F as _}from"./element-plus.98b962cc.js";const S=()=>{const{login:e}=y();let o=f({name:"",pwd:""});const i=C(null),d=n=>{n.key==="Enter"&&m()},m=async()=>{let{name:n,pwd:t}=o;await v(i)&&(await e({username:n,password:t}),V({title:"\u63D0\u793A",message:"\u767B\u9646\u6210\u529F",type:"success"}))},p=f({name:[{validator:(n,t,l)=>{if(!t)return l(new Error("\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A"));l()},trigger:"blur"}],pwd:[{validator:(n,t,l)=>{if(!t)return l(new Error("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"));l()},trigger:"blur"}]});return{form:o,onSubmit:m,enterSubmit:d,rules:p,ruleForm:i}};var w=E({name:"Login",setup(){return{labelCol:{span:4},wrapperCol:{span:14},...S()}}});const F={class:"w-screen h-screen bg-gray-200 flex justify-center items-center"},h={class:"text-2xl font-semibold text-gray-700 text-center mb-6"},x=_("\u767B\u5F55"),B=_("\u8FD8\u6CA1\u5E10\u53F7? \u7ACB\u5373\u6CE8\u518C");function $(e,o,i,d,m,p){const n=u("el-input"),t=u("el-form-item"),l=u("el-button"),b=u("el-link"),g=u("el-form");return A(),k("div",F,[c("div",{class:"layout-login",onKeyup:o[3]||(o[3]=(...s)=>e.enterSubmit&&e.enterSubmit(...s))},[c("h3",h,D(e.ImportMetaEnv.VITE_APP_TITLE),1),r(g,{ref:"ruleForm","label-position":"right","label-width":"80px",model:e.form,rules:e.rules},{default:a(()=>[r(t,{class:"mb-6 -ml-20",prop:"name"},{default:a(()=>[r(n,{modelValue:e.form.name,"onUpdate:modelValue":o[0]||(o[0]=s=>e.form.name=s),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D","prefix-icon":"el-icon-user"},null,8,["modelValue"])]),_:1}),r(t,{class:"mb-6 -ml-20",prop:"pwd"},{default:a(()=>[r(n,{modelValue:e.form.pwd,"onUpdate:modelValue":o[1]||(o[1]=s=>e.form.pwd=s),placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801","prefix-icon":"el-icon-lock","show-password":""},null,8,["modelValue"])]),_:1}),r(t,{class:"mb-6 -ml-20"},{default:a(()=>[r(l,{type:"primary",class:"w-full",onClick:e.onSubmit},{default:a(()=>[x]),_:1},8,["onClick"])]),_:1}),r(b,{type:"info",underline:!1,class:"text-xs",onClick:o[2]||(o[2]=s=>e.toPage("Register"))},{default:a(()=>[B]),_:1})]),_:1},8,["model","rules"])],32)])}w.render=$;w.__scopeId="data-v-3e7dd6f6";export{w as default};