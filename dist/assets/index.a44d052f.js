import{d as g}from"./index.d9bc3fe2.js";import{l,q as d,t as x,x as a,y as t,C as s,A as _,H as F,G as f,N as E,O as S,F as C}from"./element-plus.98b962cc.js";const w={components:{},data(){return{dataReceived:!1,loadingNeuralCF:!1,title:"\u53C2\u6570\u964D\u4F4E\u7387 / %",titleNeurCF:"NeuralCF \u53C2\u6570\u91CF",titleTensNet:"TensorNet \u53C2\u6570\u91CF",resultsNeuralCF:{res1:[],res2:[]},resultsTensorNet:{res1:[],res2:[]},paraCount:{reductionPercentage:88.78,ParamsNeurCF:15617,ParamsTensNet:1753},resultsNeuralCFTemp:[],resultsTensorNetTemp:[]}},methods:{async trainNeuralCF(){try{let e=await g.get("get_train_NeurCF/");if(console.log(e),e&&e.data){this.resultsNeuralCFTemp=[];for(let r=0;r<e.data.mse.length;r++){let n={MSE:e.data.mse[r],RMSE:e.data.rmse[r]};this.resultsNeuralCFTemp.push(n)}this.resultsNeuralCF.res1=e.data.mse,this.resultsNeuralCF.res2=e.data.rmse}else throw new Error("Invalid response structure");this.loadingNeuralCF=!0}catch(e){console.error("NeuralCF\u8BAD\u7EC3\u5931\u8D25:",e)}finally{this.loadingNeuralCF=!1}},async trainTensorNet(){try{let e=await g.get("get_train_TensNet/");if(console.log(e),e&&e.data){this.resultsTensorNetTemp=[];for(let r=0;r<e.data.mse.length;r++){let n={MSE:e.data.mse[r],RMSE:e.data.rmse[r]};this.resultsTensorNetTemp.push(n)}this.resultsTensorNet.res1=e.data.mse,this.resultsTensorNet.res2=e.data.rmse}else throw new Error("Invalid response structure");this.loadingTensorNet=!0}catch(e){console.error("TensorNet\u8BAD\u7EC3\u5931\u8D25:",e)}finally{this.loadingTensorNet=!1}},async fetchData(){this.dataReceived=!1;try{let e=await g.get("get_model_params/");const{rat:r,param_NeurCF:n,param_TensNet:v}=e.data;this.paraCount.reductionPercentage=parseFloat(r).toFixed(2),this.paraCount.ParamsNeurCF=n,this.paraCount.ParamsTensNet=v,this.dataReceived=!0}catch(e){console.error("\u83B7\u53D6\u6A21\u578B\u53C2\u6570\u5931\u8D25:",e),this.dataReceived=!1}}}},p=e=>(E("data-v-fcd8f0ea"),e=e(),S(),e),b=p(()=>s("div",{slot:"header",class:"header"},[s("span",{class:"header-title"},"\u6A21\u578B\u8BAD\u7EC3")],-1)),k={class:"training-container"},M=C("NeuralCF\u8BAD\u7EC3"),R={key:0,class:"results"},P={class:"training-container"},I=C("TensorNet\u8BAD\u7EC3"),B={key:0,class:"results"},V={class:"centered-content"},D=C("\u83B7\u53D6\u6A21\u578B\u53C2\u6570\u4FE1\u606F"),q={key:0,style:{width:"100%"}},A={class:"content-box"},G=p(()=>s("div",{class:"icon-and-text"},[s("p",null,"NeuralCF \u53C2\u6570\u91CF")],-1)),H={class:"data-value"},O={class:"content-box"},j=p(()=>s("div",{class:"icon-and-text"},[s("p",null,"TensorNet \u53C2\u6570\u91CF")],-1)),z={class:"data-value"},J={class:"content-box"},K=p(()=>s("div",{class:"icon-and-text"},[s("p",null,"\u53C2\u6570\u51CF\u5C11\u767E\u5206\u6BD4")],-1)),L={class:"data-value"},Q={key:1,class:"placeholder",style:{"margin-top":"10px"}};function U(e,r,n,v,o,h){const m=l("el-button"),y=l("el-spinner"),i=l("el-table-column"),T=l("el-table"),u=l("el-card"),c=l("el-col"),N=l("el-row");return d(),x(u,{class:"x-container"},{default:a(()=>[b,t(N,{gutter:20,class:"training-row",style:{"margin-top":"20px"}},{default:a(()=>[t(c,{span:12},{default:a(()=>[t(u,{shadow:"hover",style:{height:"40vh"}},{default:a(()=>[s("div",k,[t(m,{type:"primary",loading:o.loadingNeuralCF,onClick:h.trainNeuralCF},{default:a(()=>[M]),_:1},8,["loading","onClick"]),o.loadingNeuralCF?(d(),_("div",R,[t(y)])):F("",!0),t(T,{data:o.resultsNeuralCFTemp,style:{width:"100%"}},{default:a(()=>[t(i,{type:"index",label:"Epoch",width:"150"}),t(i,{prop:"MSE",label:"MSE"}),t(i,{prop:"RMSE",label:"RMSE"})]),_:1},8,["data"])])]),_:1})]),_:1}),t(c,{span:12},{default:a(()=>[t(u,{shadow:"hover",style:{height:"40vh"}},{default:a(()=>[s("div",P,[t(m,{type:"primary",loading:e.loadingTensorNet,onClick:h.trainTensorNet},{default:a(()=>[I]),_:1},8,["loading","onClick"]),e.loadingTensorNet?(d(),_("div",B,[t(y)])):F("",!0),t(T,{data:o.resultsTensorNetTemp,style:{width:"100%"}},{default:a(()=>[t(i,{type:"index",label:"Epoch",width:"150"}),t(i,{prop:"MSE",label:"MSE"}),t(i,{prop:"RMSE",label:"RMSE"})]),_:1},8,["data"])])]),_:1})]),_:1})]),_:1}),t(N,{gutter:20},{default:a(()=>[t(c,{span:24},{default:a(()=>[t(u,{class:"parameter-card",shadow:"hover",style:{"margin-top":"10px",height:"30vh"}},{default:a(()=>[s("div",V,[t(m,{type:"primary",onClick:h.fetchData},{default:a(()=>[D]),_:1},8,["onClick"]),o.dataReceived?(d(),_("div",q,[t(N,{class:"stats-container",gutter:20},{default:a(()=>[t(c,{span:8,class:"stat-item"},{default:a(()=>[s("div",A,[G,s("p",H,[s("strong",null,f(o.paraCount.ParamsNeurCF),1)])])]),_:1}),t(c,{span:8,class:"stat-item"},{default:a(()=>[s("div",O,[j,s("p",z,[s("strong",null,f(o.paraCount.ParamsTensNet),1)])])]),_:1}),t(c,{span:8,class:"stat-item"},{default:a(()=>[s("div",J,[K,s("p",L,[s("strong",null,f(o.paraCount.reductionPercentage)+"%",1)])])]),_:1})]),_:1})])):(d(),_("div",Q,"\u70B9\u51FB\u6309\u94AE\u83B7\u53D6\u53C2\u6570"))])]),_:1})]),_:1})]),_:1})]),_:1})}w.render=U;w.__scopeId="data-v-fcd8f0ea";export{w as default};