<template>
    <div class="software-wrapper common-box">
        <div>
            <div class="intro">
                <h2>CDMO</h2>
                <div class="content">
                    CDMO is a diffusion-based molecular optimization model that selectively adds Gaussian noise while retaining conditional features as guiding information to guide the generation of molecules with specific attribute values while maintaining certain structural constraints. By optimizing the variational lower bound of the (conditional) likelihood, CDMO effectively trains the entire framework in an end-to-end manner. Aiming at the data sparsity issue of rare molecular structures in SMILES string representations, this method introduces a layer normalization module in the embedding layer to unify the embedding scales of different substructures. In addition, CDMO introduces a contrastive process to minimize the impact of noise on SMILES molecular properties by calculating the contrastive loss between real data and denoised data. CDMO can generate molecules with better validity, uniqueness, novelty, and desired attributes, thus achieving the desired results of lead molecule optimization.
                </div>
            </div>
            <div class="AI-tool">
                <div class="tool-use">
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
                        <a-form-item>
                            <a-button type="primary" html-type="submit">Submit</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue';
    interface FormState {
        molecule: string;
        property: string | undefined;
    }
    const formState = reactive<FormState>({
        molecule: '',
        property: undefined,

    });
    // export default { name: 'SoftwarePage-CDMO' }
</script>

<style lang="scss" scoped>
.software-wrapper {

    .intro {
        h2 {
            font-size: 30px;
        }
        .content {
            padding: 20px 0;
            font-size: 18px;
            line-height: 1.5;
        }
    }

    .AI-tool {
        margin-top: 20px;
        .tool-use {
            padding: 20px;
            border-radius: 8px;
            -webkit-box-shadow: 0 0 18px 0 #9DDBF8;
            box-shadow: 0 0 18px 0 #9DDBF8;
            :deep(.ant-form) {
                width: 800px;
                .ant-form-item {
                    &:nth-child(2) {
                        margin-top: 10px;
                    }
                }
                .ant-row {
                    display: block;
                    .ant-form-item-label {
                        margin-bottom: 8px;
                        display: block;
                        text-align: left;
                        &>label {
                            font-size: 18px;
                            font-weight: 600;
                            color: #222;
                        }
                    }
                    .ant-input {
                        font-size: 18px;
                        line-height: 2;
                        padding-top: 0;
                        padding-bottom: 0;
                        // line-height: 38px;
                    }
                    .ant-select-selector {
                        font-size: 18px;
                        height: 38px;
                        .ant-select-selection-placeholder {
                            height: 36px;
                            line-height: 36px;
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