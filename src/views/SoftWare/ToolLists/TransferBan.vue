<template>
    <div class="software-wrapper common-box">
        <div>
            <AlgorithmIntro iconClass="icon-yanfapingtai-icon-shujufenxi" :algorithmName=algorithmName :content="description"/>
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
                                :disabled="fileList.length === 0"
                                :loading="uploading" 
                                @click="handleUpload">
                                {{ uploading ? 'Running' : 'Start Run' }}
                            </a-button>
                        </a-form-item>
                        <div class="bg-box">
                            
                        </div>
                    </div>
                    <div class="tab-content">
                        <div v-if="activeKey == 0">
                            <div class="example">
                                <span>
                                    <SvgIcon iconName="icon-lizi" className="example-icon"/>
                                    File Example
                                </span>
                            </div>
                            <a-form
                                :model="formState"
                                name="mo-form"
                                autocomplete="off"
                                @finish="onFinish"
                                @finishFailed="onFinishFailed"
                            >
                                <a-form-item
                                label="SMILES"
                                name="smiles"
                                :rules="[{ required: true, message: 'Please input Moleculae SMILES!' }]"
                                >
                                    <a-input v-model:value="formState.molecule" />
                                </a-form-item>
        
                                <a-form-item
                                label="Property"
                                name="property"
                                :rules="[{ required: true, message: 'Please input your property!' }]"
                                >
                                    <a-select v-model:value="formState.property" placeholder="please select your property">
                                        <a-select-option value="QED">QED</a-select-option>
                                        <a-select-option value="DRD2">DRD2</a-select-option>
                                        <a-select-option value="PlogP">PlogP</a-select-option>
                                    </a-select>
                                </a-form-item>

                            </a-form>                        
                        </div>
                        <div class="upload-box" key="2" v-if="activeKey == 1" tab="Tab 2" force-render>
                            <div class="example">
                                <span>
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
    import { reactive } from 'vue';
    import { message } from 'ant-design-vue';
    import type { UploadProps, UploadChangeParam } from 'ant-design-vue';
    import { CallAlgorithmApi } from '@/api/algorithm';
import { File } from 'buffer';

    interface FormState {
        molecule: string;
        property: string | undefined;
    }
    const formState = reactive<FormState>({
        molecule: '',
        property: undefined,

    });

    const algorithmName = 'TransferBan'
    const description = 'CDMO is a diffusion-based molecular optimization model that selectively adds Gaussian noise while retaining conditional features as guiding information to guide the generation of molecules with specific attribute values while maintaining certain structural constraints. By optimizing the variational lower bound of the (conditional) likelihood, CDMO effectively trains the entire framework in an end-to-end manner. Aiming at the data sparsity issue of rare molecular structures in SMILES string representations, this method introduces a layer normalization module in the embedding layer to unify the embedding scales of different substructures. In addition, CDMO introduces a contrastive process to minimize the impact of noise on SMILES molecular properties by calculating the contrastive loss between real data and denoised data. CDMO can generate molecules with better validity, uniqueness, novelty, and desired attributes, thus achieving the desired results of lead molecule optimization.'

    const activeKey = ref('0');
    const handleSelect = (key: string) => {
        activeKey.value = key
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
        fileList.value.forEach((file: UploadProps['fileList'][number]) => {
            console.log('file', file.originFileObj)
            
        });
        const file = fileList.value[0].originFileObj
        formData.append('file', file);
        formData.append('algorithmName', 'TransferBan');
        uploading.value = true;

        CallAlgorithmApi(formData)
        .then(() => {
            fileList.value = [];
            uploading.value = false;
            message.success('upload successfully.');
        })
        .catch(() => {
            uploading.value = false;
            message.error('upload failed.');
        });
    };

    function handleDrop(e: DragEvent) {
  console.log(e);
}

    // const handleChange = (info: UploadChangeParam) => {
    // const status = info.file.status;
    // if (status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    // }
    // if (status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    // }
    // };
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
        }

    }
}
:global(.ant-select-dropdown .ant-select-item-option-content)  {
    font-size: 18px;
    line-height: 2;
}
</style>