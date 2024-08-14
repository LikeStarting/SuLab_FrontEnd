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
                                <a-tooltip title="Drug combination prediction" color="rgb(68, 190, 98)" placement="right">
                                    <SvgIcon iconName="icon-icon" className="tabBar-icon"/>
                                    <span>Function1</span>
                                </a-tooltip>
                            </li>
                            <li :class="activeKey == 1 ? 'tab-active' : ''" @click="() => handleSelect(1)">
                                <a-tooltip title="Drug combination recommend" color="rgb(68, 190, 98)" placement="right">
                                    <SvgIcon iconName="icon-icon" className="tabBar-icon"/>
                                    <span>Function2</span>
                                </a-tooltip>
                            </li>
                            <li :class="activeKey == 2 ? 'tab-active' : ''" @click="() => handleSelect(2)">
                                <SvgIcon iconName="icon-shangchuanwenjian" className="tabBar-icon"/>
                                <span>File</span>
                            </li>
                        </ul>
                        <a-form-item class="submit-btn">
                            <a-button 
                                type="primary" 
                                html-type="submit"
                                :disabled="activeKey == 0  ? !isInputComplete : (activeKey == 1 ? (!isInputComplete2 || !fileTargetList || fileTargetList.length === 0 ) : (!fileList || fileList.length === 0))"
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
                                <span class="drug-data" @click="() => handleDownloadFile('MPHNSyn-drug-name', 'Data_Drugs')">
                                    <SvgIcon iconName="icon-lizi" className="example-icon"/>
                                    Drugs Data
                                </span>
                                <a class="drug-link" href="https://go.drugbank.com/" target="_blank">
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
                                        :rules="[{ required: true }]"
                                    >
                                        <a-select show-search v-model:value="formState.drugA" :options="drugDatasets" placeholder="Please select a drug"></a-select>
                                    </a-form-item>

                                    <a-form-item
                                        label="Drug B"
                                        name="drugB"
                                        :rules="[{ required: true }]"
                                    >
                                        <a-select show-search v-model:value="formState.drugB" :options="drugDatasets" placeholder="Please select a drug"></a-select>
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
                        <div v-if="activeKey == 1" class="upload-box">
                            <div class="example">
                                <span  @click="handleInputExample">
                                    <SvgIcon iconName="icon-example" className="example-icon"/>
                                    An Example
                                </span>
                                <span class="drug-data" @click="() => handleDownloadFile('MPHNSyn-target-all', `${algorithmName}_Disease_Targets`)">
                                    <SvgIcon iconName="icon-badianliebiao" className="example-icon"/>
                                    Disease Targets
                                </span>
                                <span class="drug-data" @click="() => handleDownloadFile('MPHNSyn-drug-name', `${algorithmName}_Data_Drugs`)">
                                    <SvgIcon iconName="icon-lizi" className="example-icon"/>
                                    Drugs Data
                                </span>
                                <a class="drug-link" href="https://go.drugbank.com/" target="_blank">
                                    <SvgIcon iconName="icon-Allergy_Drug" className="drug-icon" />
                                    DrugBank
                                </a>
                            </div>
                            <a-spin :spinning="spinning" tip="Loading...">
                                <div class="upload-content upload1">
                                    <div class="drug-select">
                                        <a-form
                                            :model="formState2"
                                            ref="secondFormRef"
                                            autocomplete="off"
                                            @validate="handleValidate"
                                        >
                                            <a-form-item
                                                label="Disease Name"
                                                name="diseaseName"
                                                :rules="[{ required: true }]"
                                            >
                                                <a-select show-search v-model:value="formState2.diseaseName" :options="diseaseDatasets" placeholder="Please select a disease"></a-select>
                                            </a-form-item>
                                        </a-form> 
                                    </div>
                                    <div class="file-label">
                                        <span>Disease Targets</span>
                                    </div>
                                    <a-upload-dragger
                                        v-model:fileList="fileTargetList"
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
                        <div class="upload-box"  v-if="activeKey == 2">
                            <div class="example">
                                <span @click="() => handleDownloadFile(algorithmName, `${algorithmName}_input`)">
                                    <SvgIcon iconName="icon-lizi" className="example-icon"/>
                                    File Example
                                </span>
                            </div>
                            <a-spin :spinning="spinning" tip="Loading...">
                                <div class="upload-content upload2">
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

                <a-modal class="chart-modal" style="width: 800px;"  v-model:open="showChartModal"  @cancel="closeChartModal">
                    <div class="chart-container">
                        <Chart :options="options"/>
                    </div>
                    <template #footer>

                    </template>
                </a-modal>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { message } from 'ant-design-vue';
    import type { UploadProps } from 'ant-design-vue';
    import { getAlgorithmFileExample, callAlgorithmWithSingle, callMPHNSynWithSingle, getAlgorithmDrugLists } from '@/api/algorithm';
    import { PredictMPHNSynResult, PredictMPHNSynResult2, useSolfWareMPHNSynStore, useSolfWareMPHNSynWithTargetStore } from '@/store/modules/solfWare'

    const AlgorithmName = 'MPHNSyn'
    const formRef = ref()
    const secondFormRef = ref()
    const router = useRouter()
    const solfWareStore =  useSolfWareMPHNSynStore()
    const solfWareWithTargetStore =  useSolfWareMPHNSynWithTargetStore()

    const singleColumns = ref([])
    const singleData = ref([])
    const singleColumns2 = ref([])
    const singleData2 = ref([])

    interface FormState {
        drugA: string | undefined;
        drugB: string | undefined;
        clineName: string;
    }
    interface FormState2 {
        diseaseName: string
    }
    const formState = reactive<FormState>({
        drugA: undefined,
        drugB: undefined,
        clineName: ''
    });

    const formState2 = reactive<FormState2>({
        diseaseName: ''
    })
    const isInputComplete = ref(false)
    const isInputComplete2 = ref(false)

    const Example = {
        drugA: 'Praziquantel',
        drugB: 'Pyrimethamine',
        clineName: 'Schistosomiasis'
    }

    const algorithmTitle = 'Prediction of Drug Combination Synergy and Toxicity Scores'
    const algorithmName = AlgorithmName
    const description = `Inputs to the MPHNSyn model include drug combinations and parasitic disease targets for parasitic diseases similar to Echinococcosis (25 diseases in total). The output is the drug combinations for the treatment of parasitic diseases and their synergistic score and toxicity score. The model uses metapathes-based heterogeneous graphs and graph-level attention mechanisms for prediction, with different metapathesrepresenting different interactions between drugs and targets in the heterogeneous graphs, thus capturing high-quality characterization of drugs more comprehensively. Users can select specific types of parasitic diseases (such as schistosomiasis and alveolar echinococcosis), and MPHNSyn recommends safe multiple drug combinations for the parasitic diseases selected by users, that is, MPHNSyn not only provides some drug combinations with high synergistic scores, but also evaluates the toxic and side effects between drugs, and selects a drug pair with less toxic and side effects, thus achieving personalized recommendation.`

    const activeKey = ref(0)
    const spinning = ref(false)

    const drugDatasets = ref([])
    let diseaseDatasets = ['Alveolar echinococcosis','Amebiasis','Ancylostomiasis','Ascariasis','Babesiosis','Bilharziasis','Chagas Disease','Cutaneous Leishmaniasis','Cystic echinococcosis','Cysticercosis','Elephantiasis','Fascioliasis','Giardiasis','Malaria','Mucocutaneous Leishmaniasis','Myiasis','Onchocerciasis','Schistosomiasis','Strongyloidiasis','Toxocariasis','Trichinosis','Trichuriasis','Trypanosomiasis','Visceral leishmaniasis','Filariasis']
    diseaseDatasets = diseaseDatasets.map((v) => ({
        label: v,
        value: v
    }))
    const showChartModal = ref(false)
    const options = ref(null)

    const uploading = ref<boolean>(false);
    const fileList = ref<UploadProps['fileList']>([]);
    const fileTargetList = ref<UploadProps['fileList']>([]);


    const preprocessColumns = (results: any, type: number) => {
        if (!results || results.length == 0) return []
        const keys = Object.keys(results[0])
 
        const columns = keys.map((value) => {
            let title = value
            let customRender = null
            let customCell = null
            let ellipsis = true
            let defaultSortOrder = ''
            let sorter = null

            title = title.replace(/_/g, ' ')

            if (value == 'Disease_Name') {
                title = 'Disease'
                customRender = ({ text }) => {
                    const vnode = h('span', { class: 'disease-name', innerHTML: text })
                    return vnode
                }
            }

            if (value == 'Drug_Name_A' || value == 'Drug_Name_B') {
                title = title.replace(' Name ', ' ')
                customRender = ({ text }) => {
                    const vnode = h('span', { class: 'drug-name', innerHTML: text })
                    return vnode
                }
            }

            if (value == 'Drug-Target_Network_Diagram') {
                customRender = ({ text, record }) => {
                    const drugName = Object.keys(text)
                    const data = drugName.map((key) => {
                        const d = text[key]
                        const maxNum = Math.min(80, d.length)

                        return d.slice(0, maxNum)
                    })
                    const vnode = h('span', { class: 'drug-target all', onClick: () => openChartModal(data, drugName, type),  innerHTML: 'preview' })
                    return vnode
                }
            }

            if (value == 'Disease-Target_Network_Diagram') {
                customRender = ({ text, record }) => {
                    const diseaseName = Object.keys(text)
                    const data = diseaseName.map((key) => {
                        const d = text[key]
                        const maxNum = Math.min(100, d.length)

                        return d.slice(0, maxNum)
                    })
                    const vnode = h('span', { class: 'drug-target all', onClick: () => openChartModal(data, diseaseName, type),  innerHTML: 'preview' })
                    return vnode
                }
            }

            if (type == 1) {
                if (value == 'Side_Effect_Score') {
                    defaultSortOrder ='descend'
                    sorter = (a: any, b: any) => a['Side_Effect_Score'] - b['Side_Effect_Score']
                } 

                if (value == 'Synergy_Score') {
                    defaultSortOrder ='descend'
                    sorter = (a: any, b: any) => a['Synergy_Score'] - b['Synergy_Score']
                }
            }

            if (value == 'Resources') {
                ellipsis = false
                customRender = ({ text, record }) => {
                    const vnode = h('span', { class: 'download', onClick: () => handleDownloadResource(record, type),  innerHTML: 'download' })
                    return vnode
                }
            }

            return {
                title,
                dataIndex: value,
                defaultSortOrder,
                sorter,
                customRender,
                align: 'center',
                customCell,
                ellipsis
            }
        })

        return columns
    }

    const preprocessData = (results, type) => {
        if (!results || results.length == 0) return []
        let data: PredictMPHNSynResult[] = []
        if (type == 0) {
            data = results.map((val, index, arr) => {
                const result:any = new Object()
                result['Disease_Name'] = val.disease_name
                result['Drug_Name_A'] = val.drug_name_a
                result['Drug_Name_B'] = val.drug_name_b
                result['Side_Effect_Score'] = parseFloat(val.side_score.toFixed(4))
                result['Synergy_Score'] = parseFloat(val.synergy_score.toFixed(4))
                result['Drug-Target_Network_Diagram'] = {
                    [val.drug_name_a]: val.druga_target,
                    [val.drug_name_b]: val.drugb_target
                }
                result['Resources'] = 'Download'
    
                return result
            })
        } else {
            data = results.map((val, index, arr) => {
                const result:any = new Object()
                result['Disease_Name'] = val.disease_name
                result['Drug_Name_A'] = val.drug_name_a
                result['Drug_Name_B'] = val.drug_name_b
                result['Side_Effect_Score'] = parseFloat(val.side_score.toFixed(4))
                result['Synergy_Score'] = parseFloat(val.synergy_score.toFixed(4))
                result['Disease-Target_Network_Diagram'] = {
                    [val.disease_name]: val.disease_target,
                }
                result['Resources'] = 'Download'
    
                return result
            })
        }
        return data
    }

    const handleSelect = (key: number) => {
        activeKey.value = key
    }

    const handleInputExample = () => {
        if (activeKey.value == 0) {
            formState.drugA = Example.drugA
            formState.drugB = Example.drugB
            formState.clineName = Example.clineName
            isInputComplete.value = true
        } else {
            formState2.diseaseName = Example.clineName
            isInputComplete2.value = true
        }
    }

    getAlgorithmDrugLists({ algorithmName: 'MPHNSyn-drug-name-list' }).then((res) => {
        const { data } = res
        drugDatasets.value = data.drugs.map((item) => ({
            label: item,
            value: item
        }))
    })

    const handleDownloadFile = (type, fileName) => {
        getAlgorithmFileExample({ algorithmName: type }).then((res) => {
            const { data } = res
            const fileURL = window.URL.createObjectURL(new Blob([data], {
                type:'application/vnd.ms-excel',
            }));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', `example_${fileName}.csv`);
            document.body.appendChild(fileLink);
            fileLink.click();
            window.URL.revokeObjectURL(fileURL)
        })
    }

    const handleRemove: UploadProps['onRemove'] = file => {
        if (activeKey.value == 1) {
            const index = fileTargetList.value.indexOf(file);
            const newFileList = fileTargetList.value.slice();
            newFileList.splice(index, 1);
            fileTargetList.value = newFileList;
        } else {
            const index = fileList.value.indexOf(file);
            const newFileList = fileList.value.slice();
            newFileList.splice(index, 1);
            fileList.value = newFileList;
        }
    };

    const beforeUpload: UploadProps['beforeUpload'] = file => {
        if (activeKey.value == 1) {
            fileTargetList.value = [...(fileTargetList.value || []), file];
        } else {
            fileList.value = [...(fileList.value || []), file];
        }
        return false;
    };

    const handleUpload = (type) => {
        if (type == 1) {
            const formData = new FormData();
            const file = fileTargetList.value[0].originFileObj
            const { diseaseName } = formState2
            formData.append('file', file);
            formData.append('diseaseName', diseaseName);
            formData.append('algorithmName', AlgorithmName);
            uploading.value = true;
            spinning.value = true;
            solfWareWithTargetStore.GetAlgorithmResults(formData).then((res) => {
                
                fileTargetList.value = [];
                uploading.value = false;
                spinning.value = false
                message.success({ content: 'Predict successfully!', duration: 2 });
                const { href } = router.resolve({
                    name: 'ModelMPHNSynWithTargetResultPage',
                })
    
                window.open(href, '_blank')
            })
            .catch((e) => {
                spinning.value = false
                uploading.value = false;
                fileTargetList.value = []
            });
        } else {
            const formData = new FormData();
            const file = fileList.value[0].originFileObj
            formData.append('file', file);
            formData.append('algorithmName', AlgorithmName);
            uploading.value = true;
            spinning.value = true;
            solfWareStore.GetAlgorithmResults(formData).then((res) => {
                
                fileList.value = [];
                uploading.value = false;
                spinning.value = false
                message.success({ content: 'Predict successfully!', duration: 2 });
                const { href } = router.resolve({
                    name: 'ModelMPHNSynResultPage',
                })
    
                window.open(href, '_blank')
            })
            .catch((e) => {
                spinning.value = false
                uploading.value = false;
                fileList.value = []
            });
        }
    };

    const handleValidate = (name, status, error) => {
        if (activeKey.value == 0) {
            isInputComplete.value = !(Object.values(formState).some((value) => value == ''))  
        } else {
            isInputComplete2.value = !(Object.values(formState2).some((value) => value == ''))  
        }
    }
    
    const key = 'updatable';
    const handleSingleInput = (index: number) => {
        let ref = null
        if (index == 0) {
            ref = formRef
        } else {
            ref = secondFormRef
        }
        ref.value
            ?.validate().then(async () => {
            try {
                uploading.value = true;
                spinning.value = true;
                if (index == 0) {
                    const { drugA, drugB, clineName } = formState
                    const { data } = await callAlgorithmWithSingle({
                        algorithmName,
                        drugA,
                        drugB,
                        clineName
                    })
                    const newData = preprocessData(data, 0)
                    singleData.value = newData
                    singleColumns.value = preprocessColumns(newData, 0)
                    formState.drugA = ''
                    formState.drugB = ''
                    formState.clineName = ''
                } else {
                    const { diseaseName } = formState2
                    const { data } = await callMPHNSynWithSingle({
                        diseaseName
                    })
                    const newData = preprocessData(data, 1)
                    singleData2.value = newData
                    singleColumns2.value = preprocessColumns(newData, 1)
                    formState2.diseaseName = ''
                }
                message.success({ content: 'Predict successful!', key, duration: 2 });
                isInputComplete.value = false
                isInputComplete2.value = false
            } finally {
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
            handleSingleInput(0)
        } else if (activeKey.value == 1) {
            // handleSingleInput(1)
            handleUpload(1)
        } else {
            handleUpload(2)
        }
        
    }

    function handleDrop(e: DragEvent) {
        console.log(e);
    }

    const downloadCSVFile = (content, fileName) => {
        let blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
        let link = document.createElement('a')
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url)
        link.setAttribute('download', fileName)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleDownloadResource = (data, type) => {
        let csvContent = ''
        const { Disease_Name, Drug_Name_A, Drug_Name_B, Side_Effect_Score, Synergy_Score } = data
        if (type == 0) {
            const Drug_Target = data['Drug-Target_Network_Diagram']
            const target_A = Drug_Target[Drug_Name_A]
            const target_B = Drug_Target[Drug_Name_B]
    
            const head = 'Disease Name,Drug Name A,Drug Name B,Target_A,Target_B,Side Effect Score, Synergy Score'
            const maxLen = Math.max(target_A.length, target_B.length)
            csvContent = head + '\n'
            for (let i =0; i < maxLen; i++) {
                let tmp = []
                tmp.push(Disease_Name, Drug_Name_A, Drug_Name_B, target_A[i], target_B[i], Side_Effect_Score, Synergy_Score)
                csvContent += tmp.join(',') + '\n'
            }
        } else {
            const Disease_Target = data['Disease-Target_Network_Diagram']
            const target = Disease_Target[Disease_Name]
            const head = 'Disease Name,Drug Name A,Drug Name B,Target,Side Effect Score, Synergy Score'
            csvContent = head + '\n'
            for (let i =0; i < target.length; i++) {
                let tmp = []
                tmp.push(Disease_Name, Drug_Name_A, Drug_Name_B, target[i], Side_Effect_Score, Synergy_Score)
                csvContent += tmp.join(',') + '\n'
            }
        }
        downloadCSVFile(csvContent, `${type == 0 ? 'disease' : 'drug'}_target.csv`)
    }

    const colors = ['#32B9EB', '#3B6EB8', '#EF5F4F', '#A4CF33', '#F7AB60']
    
    const openChartModal = (data, sourceLists, type) => {
        // const drugPoints = generateRandomPoints(drugs.length, 300, 300, 100)

        const categories = type == 0 ? [
            {
                name: 'DrugA'
            },
            {
                name: 'DrugB'
            },
            {
                name: 'TargetA'
            },
            {
                name: 'TargetB'
            },
            {
                name: 'Common target'
            },
        ] : [
            {
                name: 'Disease'
            },
            {
                name: 'Target'
            }
        ]

        const legendOptions = categories.map((item, i) => {
            const result = {
                name: item.name,
                itemStyle: {
                    color: colors[i]
                }
            }
            return result
        })
        
        const drugNames =  sourceLists.map((item, i) => ({
            category: i,
            symbol: 'circle',
            symbolSize: 60,
            // x: drugPoints[i].x,
            // y: drugPoints[i].y,
            name: item,
            // value: item,
            itemStyle: {
                color: colors[i],
                // borderColor: '#f2f2f2',
                // borderWidth: 2
            },
            label: {
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                textBorderWidth: 1,
                textBorderColor: 'inherit'
            }
        }))

        const sourceLength = sourceLists.length
        let targets = []
        let edges = []

        data.forEach((item, index) => {
            const tmp_node = []
            // const tmpPoints = generateRandomPoints(item.length, drugNames[index].x, drugNames[index].y, 680)
            for (let i = 0; i < item.length; i++) {
                const value = item[i]
                const common = targets.find((b) => b.name == value)
                if (common) {
                    common.category = categories.length - 1
                    common.itemStyle.color = colors[colors.length-1]
                    continue
                }

                const tmp = {
                    category: index + sourceLength,
                    name: value,
                    // x: tmpPoints[i].x,
                    // y: tmpPoints[i].y,
                    symbol: 'circle',
                    symbolSize: 20,
                    itemStyle: {
                        color: colors[index + sourceLength],
                    },
                    label: {
                        fontWeight: 600,
                    }
                }
    
                tmp_node.push(tmp)
            }

            const tmp_link = item.map((value) => ({
                source: sourceLists[index],
                target: value
            }))
            targets = targets.concat(tmp_node)
            edges = edges.concat(tmp_link)
        })
       
        const tmpLists = combineTwoNodes(sourceLists.slice(0))

        let drugEdges = []
        if (tmpLists.length >= 1) {
            drugEdges = tmpLists.map((item) => ({
                source: item[0],
                target: item[1],
                lineStyle: {
                    color: '#F7AB60',
                    curveness: 0,
                    width: 5,
                    type: 'dotted',
                    opacity: 1
                }
            }))
        }
        const nodes = drugNames.concat(targets)
        const links = edges.concat(drugEdges)

        const chartOptions = {
            title : {
                text: type == 0? 'Drug target - Drug network diagram' : 'Disease target - target network diagram',
                subtext: 'The Data from SuLab',
                textStyle: {
                    color: '#003366',
                },
                left: 'left',
                top: 'top'
            },
            tooltip : {
                trigger: 'item',
                borderWidth: 2,
                formatter: function(params) {
                    const node = params.data
                    let title = ''
                    const { category, name } = node
                    if (category < sourceLength) {
                        title = 'Drug Name'
                    } else if (category < categories.length) {
                        title = 'Target Name'
                    } else {
                        return `${node.source}——${node.target}`
                    }

                    return `<div class="title" style="font-weight: 600">${title}</div>
                            <div class="name" style="margin-top: 5px; color: ${node.itemStyle.color}">${name}</div>`
                            
                }
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {}
                }
            },
            legend: [{
                show: true,
                left: 'right',
                top: 'bottom',
                data: legendOptions,
                selectedMode: false
            }],
            series: [
                {
                type: 'graph',
                layout: 'force',
                name: 'drug-target',
                data: nodes,
                links: links,
                categories,
                label: {
                    show: true,
                    formatter: '{b}',
                },
                LabelLayout: {
                    hideOverlap: true
                },
                scaleLimit: {
                    min: 0.8,
                    max: 2.5
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.2,
                    width: 1.5,
                    opcaity: 0.5
                },
                coordinateSystemManager: 'view',
                legendHoverLink: true,
                roam: true,
                force: {
                    repulsion: 80,
                    gravity: 0.01,
                    friction: 0.2,
                    edgeLength: 20,
                    layoutAnimation: true
                },
                draggable: true,
                }
            ]
        }

        showChartModal.value = true
        options.value = chartOptions
    }

    const combineTwoNodes = (arr) => {
        if (arr.length <= 1) {
            return arr[0] ? [arr] : [];
        }
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            // const remaining = arr.slice(0);
            const first = arr.splice(i, 1)[0];
            const combos = combineTwoNodes(arr);
            result = result.concat(combos.map(c => [first].concat(c)));
        }
        return result;
    }

    const closeChartModal = () => {
        showChartModal.value = false
    }
</script>

<style lang="scss" scoped>
.software-wrapper {
    .AI-tool {
        .tool-use {
            .tab-bar {
                .bg-box {
                    height: calc(100% - 295px);
                    background: url("../../../assets/images/predict-bg.png") no-repeat center / cover;
                }
            }
            .tab-content {
                min-height: 545px;
                .single-results {
                    :deep(.ant-table) {
                        height: auto;
                    }
                }
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
                        }
                        &.upload1 {
                            .ant-upload-wrapper {
                                height: calc(100% - 152px);
                            }
                        }
                        &.upload2 {
                            .ant-upload-wrapper {
                                height: calc(100% - 32px);
                            }
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