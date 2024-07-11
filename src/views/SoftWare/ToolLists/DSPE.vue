<template>
    <div class="software-wrapper common-box">
        <div>
            <AlgorithmIntro iconClass="icon-yanfapingtai-icon-shujufenxi" iconTitleClass="a" :algorithmName=algorithmName :content="description"/>
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
                                    <SvgIcon iconName="icon-lizi" className="example-icon"/>
                                    An Example
                                </span>
                            </div>
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
                                    label="Cline Name"
                                    name="clineName"
                                    :rules="[{ required: true, message: 'Please input an Cline name!' }]"
                                >
                                    <a-input v-model:value="formState.clineName" />
                                </a-form-item>
                            </a-form>    
                            
                            <SinglePredictResult :columns="singleColumns" :data="singleData" />
                        </div>
                        <div class="upload-box" key="2" v-if="activeKey == 1" tab="Tab 2" force-render>
                            <div class="example">
                                <span @click="handleDownloadFile">
                                    <SvgIcon iconName="icon-lizi" className="example-icon"/>
                                    File Example
                                </span>
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
                                        sdf and csv formats only, max file size: 20MB
                                    </p>
                                </div>
                            </a-upload-dragger>
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

    const AlgorithmName = 'DSPE'
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
        drugA: 'albendazole',
        smilesA: 'CCCSc1ccc2[nH]c(NC(=O)OC)nc2c1',
        drugB: 'Magnesium isoglycyrrhizinate',
        smilesB: 'C[C@]12CC[C@](C[C@@H]1C3=CC(=O)[C@@H]4[C@]5(CC[C@@H](C([C@@H]5CC[C@]4([C@@]3(CC2)C)C)(C)C)O[C@@H]6[C@@H]([C@H]([C@@H]([C@H](O6)C(=O)[O-])O)O)O[C@H]7[C@@H]([C@H]([C@@H]([C@H](O7)C(=O)[O-])O)O)O)C)(C)C(=O)O.[Mg+2]',
        clineName: 'AE'
    }

    const algorithmName = AlgorithmName
    const description = `The DSPE model makes full use of drug-target interaction information and smiles structures of drugs to predict drug-drug synergies. The graph attention mechanism with residuals (resGAT) is used to obtain the potential feature vector of the drug. The graph attention network (GAT) can extract deeper drug characteristics and interactions, and the addition of residual connections helps to alleviate the problem of gradient disappearance, so that the interactions between drug molecules can be captured more effectively and the drug characteristics can be more accurately represented. At the same time, by obtaining protein-protein (PPI) network data associated with echinococcosis and using node2vec and attention weight aggregation, a richer and more differentiated representation of disease features can be obtained. In addition, the data information of single drugs is introduced, which effectively solves the problem of insufficient training data of drug combinations, and improves the prediction accuracy of new diseases with limited data. DSPE enables efficient and accurate prediction of drug combination synergies.`

    const isInputComplete = ref(false)
    const activeKey = ref(0)


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

            return {
                title,
                dataIndex: value,
                customRender,
                align: 'center'
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

        solfWareStore.GetAlgorithmResults(formData).then((res) => {
            fileList.value = [];
            uploading.value = false;
            message.success('Predict successfully.');
            const { href } = router.resolve({
                name: 'SoftWareResultPage',
            })
            window.open(href, '_blank')
        })
        .catch(() => {
            uploading.value = false;
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
                message.loading({ content: 'Predict...', key });
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
            }
            }).catch((e) => {
                console.log('======', e)
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
                    height: 300px;
                    background: url("../../../assets/images/predict-bg.png") no-repeat center bottom / cover;
                }
            }
            .tab-content {
                .ant-form {
                    .ant-form-item {
                        margin-bottom: 10px;
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