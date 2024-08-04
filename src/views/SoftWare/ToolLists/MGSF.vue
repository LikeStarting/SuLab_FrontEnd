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
    import { message, Tooltip, Tag } from 'ant-design-vue';
    
    import type { UploadProps, UploadChangeParam } from 'ant-design-vue';
    import { getAlgorithmFileExample, callAlgorithmWithSingle } from '@/api/algorithm';
    import { useUserStore } from '@/store/modules/user'
    import { PredictResult, useSolfWareStore } from '@/store/modules/solfWare'

    const AlgorithmName = 'MGSF'
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
    }
    const formState = reactive<FormState>({
        drugA: '',
        smilesA: '',
        drugB: '',
        smilesB: ''
    });

    const Example = {
        drugA: 'Albendazole',
        smilesA: 'CCCSC1=CC2=C(C=C1)N=C(N2)NC(=O)OC',
        drugB: 'Allopurinol',
        smilesB: 'C1=NNC2=C1C(=O)NC=N2',
    }

    const algorithmName = AlgorithmName
    const algorithmTitle = 'Prediction of Drug Side Effects'
    const description = `The MGSF-DDI algorithm is a drug combination prediction model based on substructure features and utilizes graph neural networks. The method predicts drug combinations by integrating drug feature information learned from both the microscopic level and the macroscopic network level. At the microscopic level, the algorithm uses drug SMILES to construct drug molecular graphs. First, it encodes drug features by chemically characterizing the drug atoms and obtains substructure sequence encoding features through random walks starting from each atom on the molecular graph. Then, a graph attention network is used to propagate and learn from these two features on the molecular graph. At the macroscopic network level, the method utilizes the PubChemFP substructure sequence encoding as the drug feature input. Initially, a soft threshold function is used to extract features from the sparse molecular fingerprint features, reducing dimensionality while retaining important information. Then, an association network is constructed for the drug combinations in the database, and the drug PubChemFP features are propagated and learned through a multi-layer graph convolutional network on this association network. Finally, the model fuses the features learned from both the microscopic level and the macroscopic network level through an adaptive weighted feature fusion method to more accurately predict drug interactions. Experiments demonstrate that our proposed model achieves significant improvements in DDI prediction tasks, providing new methods and insights for studying combination therapies and avoiding multi-drug interactions.`

    const isInputComplete = ref(false)
    const activeKey = ref(0)
    const spinning = ref(false)

    const preprocessColumns = (results: any) => {
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

            if (value == 'Side_Effect') {
                const colors = ['#87d068', '#FFA15A', '#dee9eb']
                customRender = ({ text }) => {
                    const desc = text.map((v, i) => (h(Tooltip, { title: v, color: colors[i] }, [h(Tag, { color: colors[i] }, i+1)])))
                    const vnode = h('div', { class: 'desc' }, desc)
                    return vnode
                }
            }

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

        return results
    }

    const handleSelect = (key: number) => {
        activeKey.value = key
    }

    const handleInputExample = () => {
        formState.drugA = Example.drugA
        formState.smilesA = Example.smilesA
        formState.drugB = Example.drugB
        formState.smilesB = Example.smilesB
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
            message.success('Upload successfully.');
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
                spinning.value = true;
                const { drugA, smilesA, drugB, smilesB } = formState
                const { data } = await callAlgorithmWithSingle({
                    algorithmName,
                    drugA,
                    smilesA,
                    drugB,
                    smilesB
                })

                singleColumns.value = preprocessColumns(data)
                singleData.value = preprocessData(data)
                message.success({ content: 'Predict successfully!', key, duration: 1 });
                formState.drugA = ''
                formState.smilesA = ''
                formState.drugB = ''
                formState.smilesB = ''
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
                .ant-form {
                    .ant-form-item {
                        // margin-bottom: 10px;
                    }
                }
                .upload-box {
                    .upload-content {
                        height: 510px;
                        .ant-upload-wrapper {
                            height: calc(100% - 30px)
                        }
                    }
                }
                :deep(.ant-table) {
                    .desc {
                        .ant-tag {
                            margin: 0 4px;
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