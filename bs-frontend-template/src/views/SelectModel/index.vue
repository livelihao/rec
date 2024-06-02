<template>
    <el-card class="x-container">
      <template #header>
                <div slot="header" class="header">
            <span class="header-title">模型选择</span>
        </div>
            </template>
        <el-row :gutter="20" class="training-row" style="margin-top: 20px;">
           <el-col :span="24">
                <el-card shadow="hover" style="height: 40vh;">
                  <div class="training-container">
                  <div class="select-button-container">
                      <el-select v-model="selectedModel" placeholder="选择模型" class="select-box">
                            <el-option
                                v-for="model in models"
                                :key="model.value"
                                :label="model.label"
                                :value="model.value">
                            </el-option>
                        </el-select>
                      <el-select v-model="selectedDataset" placeholder="选择数据集" class="select-box">
                            <el-option
                                v-for="dataset in datasets"
                                :key="dataset.value"
                                :label="dataset.label"
                                :value="dataset.value">
                            </el-option>
                      </el-select>
                    <el-button type="primary" :loading="loading" @click="startTraining">开始训练</el-button>
                     </div>
                    <div class="results" v-if="loadingNeuralCF">
                            <el-spinner></el-spinner>
                        </div>
                        <el-table :data="resultsTemp" style="width: 100%">
                            <el-table-column type="index" label="Epoch" width="250" >
                            </el-table-column>
                            <el-table-column prop="MSE" label="MSE">
                            </el-table-column>
                            <el-table-column prop="RMSE" label="RMSE">
                            </el-table-column>
                        </el-table>
                        <!-- <el-empty v-else description="No results to display."></el-empty> -->
                        <!-- <div v-if="!loadingNeuralCF && !resultsNeuralCF.res1.length" class="placeholder">No results to display.</div> -->
                    </div>
                </el-card>
              </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card class="parameter-card" shadow="hover" style="margin-top: 10px; height: 30vh;">
                    <div class="centered-content">
                        <el-button type="primary" @click="fetchData">获取模型参数信息</el-button>
                        <div v-if="dataReceived" style="width: 100%;">
                            <el-row class="stats-container" :gutter="20">
                                <el-col :span="8" class="stat-item">
                                    <div class="content-box">
                                        <div class="icon-and-text">
                                            <p>NeuralCF 参数量</p>
                                        </div>
                                        <p class="data-value"><strong>{{ paraCount.ParamsNeurCF }}</strong></p>
                                    </div>
                                </el-col>
                                <el-col :span="8" class="stat-item">
                                    <div class="content-box">
                                        <div class="icon-and-text">
                                            <p>TensorNet 参数量</p>
                                        </div>
                                        <p class="data-value"><strong>{{ paraCount.ParamsTensNet }}</strong></p>
                                    </div>
                                </el-col>
                                <el-col :span="8" class="stat-item">
                                    <div class="content-box">
                                        <div class="icon-and-text">
                                            <p>参数减少百分比</p>
                                        </div>
                                        <p class="data-value"><strong>{{ paraCount.reductionPercentage }}%</strong></p>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>

                        <!-- <div v-if="dataReceived">
                            <p>参数减少百分比: {{ paraCount.reductionPercentage }}%</p>
                            <p>NeuralCF总参数量: {{ paraCount.ParamsNeurCF }}</p>
                            <p>TensorNet总参数量: {{ paraCount.ParamsTensNet }}</p>
                        </div> -->

                        <div v-else class="placeholder" style="margin-top: 10px">点击按钮获取参数</div>

                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import request from "/@/utils/request"
export default {
    components: {},
    data() {
        return {
            dataReceived: false,
            loadingNeuralCF: false,
            loadingTensorNet: false,
            selectedModel: '',
            selectedDataset: '',
            models: [
                { value: 'NeuralCF', label: 'NeuralCF' },
                { value: 'TensorNet', label: 'TensorNet' }
            ],
            datasets: [
                { value: 'dataset1', label: '数据集1' },
                { value: 'dataset2', label: '数据集2' }
            ],
            title: "参数降低率 / %",
            titleNeurCF: "NeuralCF 参数量",
            titleTensNet: "TensorNet 参数量",
            resultsNeuralCF: {
                res1: [],
                res2: []
            },
            resultsTensorNet: {
                res1: [],
                res2: []
            },
            paraCount: {
                reductionPercentage: 88.78,
                ParamsNeurCF: 15617,
                ParamsTensNet: 1753,
            },

            resultsNeuralCFTemp: [],
            resultsTensorNetTemp: [],
            resultsTemp:[],
        }
    },
    methods: {
        async trainNeuralCF() {
            try {
                let response = await request.get('get_train_NeurCF/');
                console.log(response)
                if (response && response.data) {
                    this.resultsNeuralCFTemp = []
                    for (let i = 0; i < response.data.mse.length; i++) {
                        let temp = {
                            "MSE": response.data.mse[i],
                            "RMSE": response.data.rmse[i],
                        }
                        this.resultsNeuralCFTemp.push(temp)
                    }
                    this.resultsNeuralCF.res1 = response.data.mse;
                    this.resultsNeuralCF.res2 = response.data.rmse;
                } else {
                    throw new Error("Invalid response structure");
                }
                this.loadingNeuralCF = true;
            }
            catch (error) {
                console.error("NeuralCF训练失败:", error)
            } finally {
                this.loadingNeuralCF = false;
            }
        },
        async trainTensorNet() {
            try {
                let response = await request.get('get_train_TensNet/');
                console.log(response)
                if (response && response.data) {
                    this.resultsTensorNetTemp = []
                    for (let i = 0; i < response.data.mse.length; i++) {
                        let temp = {
                            "MSE": response.data.mse[i],
                            "RMSE": response.data.rmse[i],
                        }
                        this.resultsTensorNetTemp.push(temp)
                    }
                    this.resultsTensorNet.res1 = response.data.mse;
                    this.resultsTensorNet.res2 = response.data.rmse;
                } else {
                    throw new Error("Invalid response structure");
                }
                this.loadingTensorNet = true;
            } catch (error) {
                console.error("TensorNet训练失败:", error)
            } finally {
                this.loadingTensorNet = false;
            }
        },
        async fetchData() {
            this.dataReceived = false; // 初始化数据接收状态
            try {
                // 发送 GET 请求到后端 API 获取模型参数数据
                let response = await request.get('get_model_params/'); // 确保 URL 是正确的
                // 解构赋值从响应中获取数据
                const { rat, param_NeurCF, param_TensNet } = response.data;
                // 更新 Vue 组件的数据
                this.paraCount.reductionPercentage = parseFloat(rat).toFixed(2); // 转换字符串为浮点数并存储
                this.paraCount.ParamsNeurCF = param_NeurCF;
                this.paraCount.ParamsTensNet = param_TensNet;
                this.dataReceived = true;
            } catch (error) {
                // 错误处理
                console.error("获取模型参数失败:", error);
                this.dataReceived = false;
            }
        },
        async startTraining() {
            if (!this.selectedModel || !this.selectedDataset) {
                this.$message.error('请先选择模型和数据集');
                return;
            }
            this.loading = true;
            try {
                let response;
                if (this.selectedModel === 'NeuralCF') {
                    response = await request.get('get_train_NeurCF/',
                      //   {
                      //   params: {dataset: this.selectedDataset}
                      // }
                    );
                } else if (this.selectedModel === 'TensorNet') {
                    response = await request.get('get_train_TensNet/',
                      //   {
                      //   params: { dataset: this.selectedDataset }
                      // }
                    );
                }
                if (response && response.data) {
                    this.resultsTemp = [];
                    for (let i = 0; i < response.data.mse.length; i++) {
                        this.resultsTemp.push({
                            MSE: response.data.mse[i],
                            RMSE: response.data.rmse[i],
                        });
                    }
                } else {
                    throw new Error('未能获取到训练结果');
                }
            } catch (error) {
                this.$message.error('训练过程中出现错误: ' + error.message);
            } finally {
                this.loading = false;
            }
        },
    }
}
</script>

<style scoped>

.select-button-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.select-box {
    flex: 1;
    margin-right: 20px; /* 增加间隔 */
    min-width: 200px; /* 设置最小宽度 */
}

.select-box:last-child {
    margin-right: 0;
}

.stats-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
}
.content-box {
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* 中心对齐内容 */
    min-height: 150px;
    text-align: center;
    transition: all 0.3s ease;
}

.content-box:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
}

.header-title {
    font-size: 24px;
    color: #333;
}


.parameter-card {
    padding: 10px;
    margin-bottom: 20px;
}

.training-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}


.placeholder {
    margin-top: 10px;
    font-size: 16px;
    color: #666;
    min-height: 24px;
}

.centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stats-container {
    margin-top: 20px;
}

.stat-item {
    flex: 1;
    /* 每个项目占据等宽的空间 */
    padding: 0 15px;
    /* 增加一些内边距使内容不会挤在一起 */
}

.icon-and-text {
    display: flex;
    align-items: center;
    /* Align icon and text */
    text-align: center;
    margin-bottom: 10px;
    /* Add space between title and data value */
}

.data-value {
    font-size: 20px;
    /* Larger font size for data value */
    color: #333;
    /* Darker color for emphasis */
    line-height: 1.5;
    /* Increase line-height for better readability */
}</style>