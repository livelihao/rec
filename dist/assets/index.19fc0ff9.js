import{d as u}from"./index.2066d73b.js";import{l as n,q as i,t as g,x as l,y as a,C as s,A as _,P as b,Q as w,H as k,G as v,N as P,O as R,F as x}from"./element-plus.98b962cc.js";const M={components:{},data(){return{dataReceived:!1,loadingNeuralCF:!1,loadingTensorNet:!1,selectedModel:"",selectedDataset:"",models:[{value:"NeuralCF",label:"NeuralCF"},{value:"TensorNet",label:"TensorNet"}],datasets:[{value:"dataset1",label:"\u6570\u636E\u96C61"},{value:"dataset2",label:"\u6570\u636E\u96C62"}],title:"\u53C2\u6570\u964D\u4F4E\u7387 / %",titleNeurCF:"NeuralCF \u53C2\u6570\u91CF",titleTensNet:"TensorNet \u53C2\u6570\u91CF",resultsNeuralCF:{res1:[],res2:[]},resultsTensorNet:{res1:[],res2:[]},paraCount:{reductionPercentage:88.78,ParamsNeurCF:15617,ParamsTensNet:1753},resultsNeuralCFTemp:[],resultsTensorNetTemp:[],resultsTemp:[]}},methods:{async trainNeuralCF(){try{let e=await u.get("get_train_NeurCF/");if(console.log(e),e&&e.data){this.resultsNeuralCFTemp=[];for(let t=0;t<e.data.mse.length;t++){let d={MSE:e.data.mse[t],RMSE:e.data.rmse[t]};this.resultsNeuralCFTemp.push(d)}this.resultsNeuralCF.res1=e.data.mse,this.resultsNeuralCF.res2=e.data.rmse}else throw new Error("Invalid response structure");this.loadingNeuralCF=!0}catch(e){console.error("NeuralCF\u8BAD\u7EC3\u5931\u8D25:",e)}finally{this.loadingNeuralCF=!1}},async trainTensorNet(){try{let e=await u.get("get_train_TensNet/");if(console.log(e),e&&e.data){this.resultsTensorNetTemp=[];for(let t=0;t<e.data.mse.length;t++){let d={MSE:e.data.mse[t],RMSE:e.data.rmse[t]};this.resultsTensorNetTemp.push(d)}this.resultsTensorNet.res1=e.data.mse,this.resultsTensorNet.res2=e.data.rmse}else throw new Error("Invalid response structure");this.loadingTensorNet=!0}catch(e){console.error("TensorNet\u8BAD\u7EC3\u5931\u8D25:",e)}finally{this.loadingTensorNet=!1}},async fetchData(){this.dataReceived=!1;try{let e=await u.get("get_model_params/");const{rat:t,param_NeurCF:d,param_TensNet:f}=e.data;this.paraCount.reductionPercentage=parseFloat(t).toFixed(2),this.paraCount.ParamsNeurCF=d,this.paraCount.ParamsTensNet=f,this.dataReceived=!0}catch(e){console.error("\u83B7\u53D6\u6A21\u578B\u53C2\u6570\u5931\u8D25:",e),this.dataReceived=!1}},async startTraining(){if(!this.selectedModel||!this.selectedDataset){this.$message.error("\u8BF7\u5148\u9009\u62E9\u6A21\u578B\u548C\u6570\u636E\u96C6");return}this.loading=!0;try{let e;if(this.selectedModel==="NeuralCF"?e=await u.get("get_train_NeurCF/"):this.selectedModel==="TensorNet"&&(e=await u.get("get_train_TensNet/")),e&&e.data){this.resultsTemp=[];for(let t=0;t<e.data.mse.length;t++)this.resultsTemp.push({MSE:e.data.mse[t],RMSE:e.data.rmse[t]})}else throw new Error("\u672A\u80FD\u83B7\u53D6\u5230\u8BAD\u7EC3\u7ED3\u679C")}catch(e){this.$message.error("\u8BAD\u7EC3\u8FC7\u7A0B\u4E2D\u51FA\u73B0\u9519\u8BEF: "+e.message)}finally{this.loading=!1}}}},p=e=>(P("data-v-14327226"),e=e(),R(),e),V=p(()=>s("div",{slot:"header",class:"header"},[s("span",{class:"header-title"},"\u6A21\u578B\u9009\u62E9")],-1)),D={class:"training-container"},I={class:"select-button-container"},B=x("\u5F00\u59CB\u8BAD\u7EC3"),q={key:0,class:"results"},U={class:"centered-content"},A=x("\u83B7\u53D6\u6A21\u578B\u53C2\u6570\u4FE1\u606F"),G={key:0,style:{width:"100%"}},H={class:"content-box"},L=p(()=>s("div",{class:"icon-and-text"},[s("p",null,"NeuralCF \u53C2\u6570\u91CF")],-1)),O={class:"data-value"},Q={class:"content-box"},j=p(()=>s("div",{class:"icon-and-text"},[s("p",null,"TensorNet \u53C2\u6570\u91CF")],-1)),z={class:"data-value"},J={class:"content-box"},K=p(()=>s("div",{class:"icon-and-text"},[s("p",null,"\u53C2\u6570\u51CF\u5C11\u767E\u5206\u6BD4")],-1)),W={class:"data-value"},X={key:1,class:"placeholder",style:{"margin-top":"10px"}};function Y(e,t,d,f,r,C){const T=n("el-option"),y=n("el-select"),F=n("el-button"),E=n("el-spinner"),h=n("el-table-column"),S=n("el-table"),m=n("el-card"),c=n("el-col"),N=n("el-row");return i(),g(m,{class:"x-container"},{header:l(()=>[V]),default:l(()=>[a(N,{gutter:20,class:"training-row",style:{"margin-top":"20px"}},{default:l(()=>[a(c,{span:24},{default:l(()=>[a(m,{shadow:"hover",style:{height:"40vh"}},{default:l(()=>[s("div",D,[s("div",I,[a(y,{modelValue:r.selectedModel,"onUpdate:modelValue":t[0]||(t[0]=o=>r.selectedModel=o),placeholder:"\u9009\u62E9\u6A21\u578B",class:"select-box"},{default:l(()=>[(i(!0),_(w,null,b(r.models,o=>(i(),g(T,{key:o.value,label:o.label,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),a(y,{modelValue:r.selectedDataset,"onUpdate:modelValue":t[1]||(t[1]=o=>r.selectedDataset=o),placeholder:"\u9009\u62E9\u6570\u636E\u96C6",class:"select-box"},{default:l(()=>[(i(!0),_(w,null,b(r.datasets,o=>(i(),g(T,{key:o.value,label:o.label,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),a(F,{type:"primary",loading:e.loading,onClick:C.startTraining},{default:l(()=>[B]),_:1},8,["loading","onClick"])]),r.loadingNeuralCF?(i(),_("div",q,[a(E)])):k("",!0),a(S,{data:r.resultsTemp,style:{width:"100%"}},{default:l(()=>[a(h,{type:"index",label:"Epoch",width:"250"}),a(h,{prop:"MSE",label:"MSE"}),a(h,{prop:"RMSE",label:"RMSE"})]),_:1},8,["data"])])]),_:1})]),_:1})]),_:1}),a(N,{gutter:20},{default:l(()=>[a(c,{span:24},{default:l(()=>[a(m,{class:"parameter-card",shadow:"hover",style:{"margin-top":"10px",height:"30vh"}},{default:l(()=>[s("div",U,[a(F,{type:"primary",onClick:C.fetchData},{default:l(()=>[A]),_:1},8,["onClick"]),r.dataReceived?(i(),_("div",G,[a(N,{class:"stats-container",gutter:20},{default:l(()=>[a(c,{span:8,class:"stat-item"},{default:l(()=>[s("div",H,[L,s("p",O,[s("strong",null,v(r.paraCount.ParamsNeurCF),1)])])]),_:1}),a(c,{span:8,class:"stat-item"},{default:l(()=>[s("div",Q,[j,s("p",z,[s("strong",null,v(r.paraCount.ParamsTensNet),1)])])]),_:1}),a(c,{span:8,class:"stat-item"},{default:l(()=>[s("div",J,[K,s("p",W,[s("strong",null,v(r.paraCount.reductionPercentage)+"%",1)])])]),_:1})]),_:1})])):(i(),_("div",X,"\u70B9\u51FB\u6309\u94AE\u83B7\u53D6\u53C2\u6570"))])]),_:1})]),_:1})]),_:1})]),_:1})}M.render=Y;M.__scopeId="data-v-14327226";export{M as default};