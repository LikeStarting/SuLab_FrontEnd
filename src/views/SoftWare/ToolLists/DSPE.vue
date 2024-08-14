<template>
    <div class="software-wrapper common-box">
        <div>
            <AlgorithmIntro iconClass="icon-yanfapingtai-icon-shujufenxi" :algorithmName=algorithmTitle :content="description"/>
            <div class="AI-tool">
                <div class="tool-use">
                    <div class="tab-bar">
                        <div class="tabBar-title">Customized Type</div>
                        <ul>
                            <!-- <li :class="activeKey == 0 ? 'tab-active' : ''" @click="() => handleSelect(0)">
                                <SvgIcon iconName="icon-icon" className="tabBar-icon"/>
                                <span>Text</span>
                            </li> -->
                            <!-- <li :class="activeKey == 1 ? 'tab-active' : ''" @click="() => handleSelect(1)">
                                <SvgIcon iconName="icon-shangchuanwenjian" className="tabBar-icon"/>
                                <span>File</span>
                            </li> -->
                            <li class="tab-active">
                                <SvgIcon iconName="icon-shangchuanwenjian" className="tabBar-icon"/>
                                <span>File</span>
                            </li>
                        </ul>
                        <a-form-item class="submit-btn">
                            <a-button 
                                type="primary" 
                                html-type="submit"
                                :disabled="activeKey == 0 ? !isInputComplete : (!fileList || fileList.length === 0 || secondFormState.drugName == '')"
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
                            </div>
                            <a-spin :spinning="spinning" tip="Loading...">
                                <a-form
                                    :model="formState"
                                    ref="formRef"
                                    autocomplete="off"
                                    @validate="handleValidate"
                                >
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
                                    <a-form-item
                                        label="Disease Name"
                                        name="clineName"
                                        :rules="[{ required: true, message: 'Please input an Disease name!' }]"
                                    >
                                        <a-input v-model:value="formState.clineName" />
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
                                <a  class="drug-link" href="https://go.drugbank.com/" target="_blank">
                                    <SvgIcon iconName="icon-Allergy_Drug" className="drug-icon" />
                                    DrugBank
                                </a>
                            </div>
                            <a-spin :spinning="spinning" tip="Loading...">
                                <div class="upload-content">
                                    <div class="drug-select">
                                        <a-form 
                                            :model="secondFormState"
                                            ref="secondFormRef"
                                            autocomplete="off"
                                        >
                                            <a-form-item name="drugName" label="Drug Name" :rules="[{ required: true }]">
                                                <a-select show-search v-model:value="secondFormState.drugName" :options="drugLists" placeholder="Please select a drug"></a-select>
                                            </a-form-item>
                                        </a-form>
                                    </div>
                                    <div class="file-label">
                                        <span>Gene expression</span>
                                    </div>
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
    import { PredictResult, useSolfWareSCStore } from '@/store/modules/solfWare'

    const AlgorithmName = 'DSPE'
    const formRef = ref()
    const secondFormRef = ref()
    const router = useRouter()
    const userStore = useUserStore()
    const token = userStore.getToken
    const solfWareStore =  useSolfWareSCStore()

    const singleColumns = ref([])
    const singleData = ref([])

    interface FormState {
        drugA: string;
        smilesA: string;
        drugB: string;
        smilesB: string;
        clineName: string;
    }
    interface SecondFormState {
        drugName: string | undefined;
    }
    const formState = reactive<FormState>({
        drugA: '',
        smilesA: '',
        drugB: '',
        smilesB: '',
        clineName: ''
    });

    const secondFormState = reactive<SecondFormState>({
        drugName: undefined
    })

    const Example = {
        drugA: 'albendazole',
        smilesA: 'CCCSc1ccc2[nH]c(NC(=O)OC)nc2c1',
        drugB: 'Magnesium isoglycyrrhizinate',
        smilesB: 'C[C@]12CC[C@](C[C@@H]1C3=CC(=O)[C@@H]4[C@]5(CC[C@@H](C([C@@H]5CC[C@]4([C@@]3(CC2)C)C)(C)C)O[C@@H]6[C@@H]([C@H]([C@@H]([C@H](O6)C(=O)[O-])O)O)O[C@H]7[C@@H]([C@H]([C@@H]([C@H](O7)C(=O)[O-])O)O)O)C)(C)C(=O)O.[Mg+2]',
        clineName: 'AE'
    }

    const algorithmTitle = 'Prediction of Sensitizing Drug Combinations'
    const algorithmName = AlgorithmName
    const description = `The DSPE model analyzes gene expression of echinococcus to determine resistance, and recommends sensitizing drug combinations for common anti-echinococcosis drugs based on the expression profiles. DSPE utilizes echinococcus expression data, employing node2vec and attention-weight aggregation techniques to generate detailed feature representations of echinococcosis. It uses data from single drug and drug combinations, applying a residual graph attention mechanism to capture potential drug feature vectors and enhance the effect of drug combinations. Users only need to input the microarray data of echinococcosis, and the DSPE model can determine if it is drug-resistant. Based on gene expression data of echinococcosis and commonly used anti-echinococcosis drugs selected by the user, the algorithm recommends the three most likely synergistic sensitizing drug combinations. The DSPE model is highly effective in detecting drug resistance and advising on drug combination enhancements, providing significant insights for treating echinococcosis.`

    const isInputComplete = ref(false)
    const activeKey = ref(1)
    const spinning = ref(false)

    const drugLists = [
        { label: 'Albendazole', value: 'Albendazole' },
        { label: 'Flubendazole', value: 'Flubendazole' },
        { label: 'Mebendazole', value: 'Mebendazole' },
        { label: 'Praziquantel', value: 'Praziquantel' }
    ]

    const preprocessColumns = (results: any) => {
        if (!results || results.length == 0) return []

        return Object.keys(results[0]).map((value) => {
            let title = value
            let customRender = null

            if (value.includes('Svg') ) {
                title = value.replace('Svg', 'SMILES')
                customRender = (text) => {
                    const vnode = h('div', { class: 'smiles-svg', innerHTML: text.text })
                    return vnode
                }
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
        formData.append('algorithmName', AlgorithmName);
        formData.append('drugName', secondFormState.drugName);
        uploading.value = true;
        spinning.value = true;
        solfWareStore.GetAlgorithmResults(formData).then((res) => {
            fileList.value = [];
            uploading.value = false;
            spinning.value = false;
            message.success('Predict successfully.');
            const { href } = router.resolve({
                name: 'ModelSCResultPage',
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
                message.success({ content: 'Predict successful!', key, duration: 1 });
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
                spinning.value = false
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

    function handleDrop(e: DragEvent) {
        console.log(e);
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
            .tab-content {
                .upload-box {
                    .upload-content {
                        height: 602px;
                        .drug-select {
                            padding: 0 20px;
                            .ant-form-item {
                                margin-bottom: 0;
                                :deep(.ant-select-selector) {
                                    .ant-select-selection-item {
                                        line-height: 36px;
                                    }
                                }
                            }
                        }
                        .file-label {
                            padding: 20px;
                            padding-bottom: 0;
                            font-size: 18px;
                            line-height: 32px;
                            font-weight: 600;
                            color: #222;
                            &::before {
                                display: inline-block;
                                margin-inline-end: 4px;
                                color: #ff4d4f;
                                font-size: 14px;
                                font-family: SimSun, sans-serif;
                                line-height: 1;
                                content: "*";
                            }
                            &::after {
                                content: ":";
                                position: relative;
                                margin-block: 0;
                                margin-inline-start: 2px;
                                margin-inline-end: 8px;
                            }
                        }
                        .ant-upload-wrapper {
                            padding-top: 0;
                            height: calc(100% - 132px);
                        }
                    }
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