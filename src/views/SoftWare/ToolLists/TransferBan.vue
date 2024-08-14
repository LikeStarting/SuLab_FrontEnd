<template>
    <div class="software-wrapper common-box">
        <div>
            <AlgorithmIntro iconClass="icon-yanfapingtai-icon-shujufenxi" :algorithmName=algorithmTitle :content="description"/>
            <div class="AI-tool">
                <div class="tool-use">
                    <div class="tab-bar">
                        <div class="tabBar-title">Customized Type</div>
                        <ul>
                            <li :class="activeKey == 0 ? 'tab-active' : ''" @click="() => handleSelect(0)">
                                <SvgIcon iconName="icon-icon" className="tabBar-icon"/>
                                <span>Text</span>
                            </li>
                            <li :class="activeKey == 1 ? 'tab-active' : ''" @click="() => handleSelect(1)">
                                <SvgIcon iconName="icon-shangchuanwenjian" className="tabBar-icon"/>
                                <span>File</span>
                            </li>
                        </ul>
                        <a-form-item class="submit-btn">
                            <a-button 
                                type="primary" 
                                html-type="submit"
                                :disabled="activeKey == 0 ? !isInputComplete : (!fileList || fileList.length === 0)"
                                :loading="uploading" 
                                @click="handleSubmit">
                                {{ uploading ? 'Running' : 'Start Run' }}
                            </a-button>
                        </a-form-item>
                        <div class="bg-box">
                            
                        </div>
                    </div>
                    <div class="tab-content">
                        <div v-if="activeKey == 0">
                            <div class="example">
                                <span  @click="handleInputExample">
                                    <SvgIcon iconName="icon-example" className="example-icon"/>
                                    An Example
                                </span>
                                <a  class="drug-link" href="https://go.drugbank.com/" target="_blank">
                                    <SvgIcon iconName="icon-Allergy_Drug" className="drug-icon" />
                                    DrugBank
                                </a>
                            </div>
                            <a-spin :spinning="spinning" tip="Loading...">
                                <a-form
                                    :model="formState"
                                    ref="formRef"
                                    autocomplete="off"
                                    @validate="handleValidate"
                                >
                                    <!-- <a-form-item
                                        label="Disease Name"
                                        name="clineName"
                                        :rules="[{ required: true, message: 'Please input an Disease name!' }]"
                                    >
                                        <a-input v-model:value="formState.clineName" />
                                    </a-form-item> -->
                                    <a-form-item name="clineName" label="Disease Name" :rules="[{ required: true, message: 'Please input an Disease name!' }]">
                                        <a-select show-search v-model:value="formState.clineName" :options="diseaseLists"></a-select>
                                    </a-form-item>
                                    <a-form-item
                                        label="Drug A"
                                        name="drugA"
                                        :rules="[{ required: true, message: 'Please input an Drug!' }]"
                                    >
                                        <a-input v-model:value="formState.drugA" />
                                    </a-form-item>

                                    <a-form-item
                                        label="SMILES A"
                                        name="smilesA"
                                        :rules="[{ required: true, message: 'Please input an SMILES!' }]"
                                    >
                                        <a-input v-model:value="formState.smilesA" />
                                    </a-form-item>

                                    <a-form-item
                                        label="Drug B"
                                        name="drugB"
                                        :rules="[{ required: true, message: 'Please input an Drug!' }]"
                                    >
                                        <a-input v-model:value="formState.drugB" />
                                    </a-form-item>
                                    
                                    <a-form-item
                                        label="SMILES B"
                                        name="smilesB"
                                        :rules="[{ required: true, message: 'Please input an SMILES!' }]"
                                    >
                                        <a-input v-model:value="formState.smilesB" />
                                    </a-form-item>
                                </a-form>    
                            </a-spin>
                        
                            <SinglePredictResult :columns="singleColumns" :data="singleData" />
                        </div>
                        <div class="upload-box" key="2" v-if="activeKey == 1" tab="Tab 2" force-render>
                            <div class="example">
                                <span @click="handleDownloadFile">
                                    <SvgIcon iconName="icon-lizi" className="example-icon"/>
                                    File Example
                                </span>
                            </div>
                            <a-spin :spinning="spinning" tip="Loading...">
                                <div class="upload-content">
                                    <a-upload-dragger
                                        v-model:fileList="fileList"
                                        name="file"
                                        :maxCount="1"
                                        :multiple="false"
                                        :beforeUpload="beforeUpload"
                                        @remove="handleRemove"
                                        @drop="handleDrop"
                                    >
                                        <div class="btn-inner">
                                            <p class="ant-upload-drag-icon">
                                            <SvgIcon iconName="icon-shangchuanwenjian1" className="file-icon"/>
                                            </p>
                                            <p class="ant-upload-text">Drag and drop a file to this area, or choose from local device</p>
                                            <p class="ant-upload-hint">
                                                csv and xls formats only, max file size: 20MB
                                            </p>
                                        </div>
                                    </a-upload-dragger>
                                </div>
                            </a-spin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { message } from 'ant-design-vue';
    import type { UploadProps, UploadChangeParam } from 'ant-design-vue';
    import { getAlgorithmFileExample, callAlgorithmWithSingle } from '@/api/algorithm';
    import { useUserStore } from '@/store/modules/user'
    import { PredictResult, useSolfWareStore } from '@/store/modules/solfWare'
    import { Tag } from 'ant-design-vue'
    import SvgIcon from '@/components/SvgIcon/index.vue'

    const formRef = ref();
    const router = useRouter()
    const userStore = useUserStore()
    const token = userStore.getToken
    const solfWareStore =  useSolfWareStore()

    const singleColumns = ref([])
    const singleData = ref([])

    interface FormState {
        drugA: string;
        smilesA: string;
        drugB: string;
        smilesB: string;
        clineName: string;
    }
    const formState = reactive<FormState>({
        drugA: '',
        smilesA: '',
        drugB: '',
        smilesB: '',
        clineName: ''
    });

    const Example = {
        drugA: 'Albendazole',
        smilesA: 'CCCSC1=CC2=C(C=C1)N=C(N2)NC(=O)OC',
        drugB: 'Allopurinol',
        smilesB: 'C1=NNC2=C1C(=O)NC=N2',
        clineName: 'AE'
    }

    const diseaseLists = [
        { label: 'AE (Alveolar echinococcosis)', value: 'AE (Alveolar echinococcosis)' },
        { label: 'CE (Cystic echinococcosis)', value: 'CE (Cystic echinococcosis)' },
    ]

    const algorithmTitle = 'Prediction of Novel Drug Combinations for Echinococcosis Treatment'
    const algorithmName = 'TransferBAN-Syn'
    const description = `The TransferBAN-Syn algorithm consists of three key modules: the drug combination feature representation module, the disease feature representation module, and the synergy prediction module. The drug combination feature representation module utilizes a Graph Convolutional Network (GCN) to extract atom-level features of drug molecules and employs a bilinear attention network to integrate single-drug features, capturing the interactions between drugs and forming the drug combination feature representation. The disease feature representation module encodes the characteristics of diseases by combining pathway information and disease similarity of parasitic diseases through a Multi-Layer Perceptron (MLP) to obtain disease feature representations. In this framework, the drug and disease feature representation modules are initially trained on multiple parasitic diseases to form a pre-trained model, which is then applied to the task of predicting drug combinations for echinococcosis. The synergy prediction module is fine-tuned using specific drug combination data for echinococcosis to optimize the model's performance in this particular prediction task. Finally, the drug combination features and disease features are merged and propagated through a fully connected layer to predict drug synergy.`

    const isInputComplete = ref(false)
    const activeKey = ref(0)
    const spinning = ref(false)

    const preprocessColumns = (results) => {
        if (!results || results.length == 0) return []

        return Object.keys(results[0]).map((value) => {
            let title = value
            let customRender = null
            

            if (value.includes('Svg') ) {
                title = value.replace('Svg', 'SMILES')
                customRender = ({ text }) => {
                    const vnode = h('div', { class: 'smiles-svg', innerHTML: text })
                    return vnode
                }
            }

            if (value === 'Pred_Score') {
                title = 'Synergy Score'
                customRender = ({ text }) => {
                    // const icon = h(SvgIcon, { iconName: 'icon-example' })
                    let color = ''
                    let value = ''
                    if (text >= 0.9) {
                        color = '#87d068'
                        value = 'High'
                    } else if (text >= 0.7) {
                        color = '#FFA15A'
                        value = 'Moderate'
                    } else {
                        color = '#b6c1c3'
                        value = 'Low'
                    }
                    const vnode = h('div', { class: 'score', style: { color }  }, [text, h(Tag, { color  }, () => value)])
                    return vnode
                }
            }

            if (value == 'Cell_Name') {
                title = 'Disease Name'
            }

            title = title.replace(/_/g, ' ')

            return {
                title,
                dataIndex: value,
                customRender,
                align: 'center',
                ellipsis: true,
            }
        })

    }

    const preprocessData = (results) => {
        if (!results || results.length == 0) return []

        return results.map((item) => {
            item.Pred_Score = parseFloat(item.Pred_Score.toFixed(4))
            return item
        })
    }

    const handleSelect = (key: number) => {
        activeKey.value = key
    }

    const handleInputExample = () => {
        formState.drugA = Example.drugA
        formState.smilesA = Example.smilesA
        formState.drugB = Example.drugB
        formState.smilesB = Example.smilesB
        formState.clineName = Example.clineName

        isInputComplete.value = true
    }

    const handleDownloadFile = () => {
        getAlgorithmFileExample({ algorithmName }).then((res) => {
            const { data } = res
            const fileURL = window.URL.createObjectURL(new Blob([data], {
                type:'application/vnd.ms-excel',
            }));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', `example_${algorithmName}.csv`);
            document.body.appendChild(fileLink);
            fileLink.click();
            window.URL.revokeObjectURL(fileURL)
        })
    }

    const uploading = ref<boolean>(false);
    const fileList = ref<UploadProps['fileList']>([]);

    const handleRemove: UploadProps['onRemove'] = file => {
        const index = fileList.value.indexOf(file);
        const newFileList = fileList.value.slice();
        newFileList.splice(index, 1);
        fileList.value = newFileList;
    };

    const beforeUpload: UploadProps['beforeUpload'] = file => {
        fileList.value = [...(fileList.value || []), file];
        return false;
    };

    const handleUpload = () => {
        const formData = new FormData();
        // fileList.value.forEach((file: UploadProps['fileList'][number]) => {
        // });
        const file = fileList.value[0].originFileObj
        formData.append('file', file);
        formData.append('algorithmName', algorithmName);
        uploading.value = true;
        spinning.value = true;

        solfWareStore.GetAlgorithmResults(formData).then((res) => {
            fileList.value = [];
            uploading.value = false;
            spinning.value = false;
            message.success('Upload successfully.');
            const { href } = router.resolve({
                name: 'ModelResultPage',
            })
            window.open(href, '_blank')
        })
        .catch(() => {
            uploading.value = false;
            spinning.value = false;
            fileList.value = []
        });
    };

    const handleValidate = (name, status, error) => {
        isInputComplete.value = !(Object.values(formState).some((value) => value == ''))  
    }
    
    const key = 'updatable';
    const handleSingleInput = () => {
        formRef.value
            ?.validate().then(async () => {
            try {
                uploading.value = true;
                spinning.value = true;
                const { drugA, smilesA, drugB, smilesB, clineName } = formState
                const { data } = await callAlgorithmWithSingle({
                    algorithmName,
                    drugA,
                    smilesA,
                    drugB,
                    smilesB,
                    clineName
                }, token)

                singleColumns.value = preprocessColumns(data)
                singleData.value = preprocessData(data)
                message.success({ content: 'Predict successfully!', key, duration: 1 });
                formState.drugA = ''
                formState.smilesA = ''
                formState.drugB = ''
                formState.smilesB = ''
                formState.clineName = ''
            } finally {
                isInputComplete.value = false
                uploading.value = false
                spinning.value = false
            }
            }).catch((e) => {
                uploading.value = false
                uploading.value = false
                message.error({ content: 'Predict Failed!', key, duration: 1 });
            })
    }

    const handleSubmit = () => {
        if (activeKey.value == 0) {
            handleSingleInput()
        } else {
            handleUpload()
        }
        
    }
    
</script>

<style lang="scss" scoped>
.software-wrapper {
    .AI-tool {
        .tool-use {
            .tab-bar {
                .bg-box {
                    height: calc(100% - 235px);
                    background: url("../../../assets/images/predict-bg.png") no-repeat center / cover;
                }
            }
        }

    }
}
:global(.ant-select-dropdown .ant-select-item-option-content)  {
    font-size: 18px;
    line-height: 2;
}
</style>