<template>
    <div class="software-wrapper common-box">
        <div>
            <h2>All Solfwares</h2>
            <div class="software-tabs">
                <a-tabs v-model:activeKey="activeKey" tab-position="left" animated>
                    <a-tab-pane key="1" tab="Molecular Optimization">
                        <a-row :gutter="16">
                            <a-col :span="8">
                                <a-card hoverable title="MOMO" :bordered="false">
                                    <p>CDMO is a diffusion-based molecular optimization model that selectively adds Gaussian noise while retaining conditional features as guiding information to guide the generation of molecules with specific attribute values while maintaining certain structural constraints. By optimizing the variational lower bound of the (conditional) likelihood, CDMO effectively trains the entire framework in an end-to-end manner. Aiming at the data sparsity issue of rare molecular structures in SMILES string representations, this method introduces a layer normalization module in the embedding layer to unify the embedding scales of different substructures. In addition, CDMO introduces a contrastive process to minimize the impact of noise on SMILES molecular properties by calculating the contrastive loss between real data and denoised data. CDMO can generate molecules with better validity, uniqueness, novelty, and desired attributes, thus achieving the desired results of lead molecule optimization.</p>
                                    <HappyButton class="more-btn" text="Try Now!" />
                                </a-card>
                            </a-col>
                            <a-col :span="8">
                                <a-card hoverable title="CDMO" :bordered="false">
                                    <p>CDMO is a diffusion-based molecular optimization model that selectively adds Gaussian noise while retaining conditional features as guiding information to guide the generation of molecules with specific attribute values while maintaining certain structural constraints. By optimizing the variational lower bound of the (conditional) likelihood, CDMO effectively trains the entire framework in an end-to-end manner. Aiming at the data sparsity issue of rare molecular structures in SMILES string representations, this method introduces a layer normalization module in the embedding layer to unify the embedding scales of different substructures. In addition, CDMO introduces a contrastive process to minimize the impact of noise on SMILES molecular properties by calculating the contrastive loss between real data and denoised data. CDMO can generate molecules with better validity, uniqueness, novelty, and desired attributes, thus achieving the desired results of lead molecule optimization.</p>
                                    <HappyButton class="more-btn" text="Try Now!" />    
                                </a-card>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Drug combinations and Drug synergy">
                        <a-row :gutter="16">
                            <a-col :span="8">
                                <a-card hoverable title="MOMO" :bordered="false">
                                    <p>CDMO is a diffusion-based molecular optimization model that selectively adds Gaussian noise while retaining conditional features as guiding information to guide the generation of molecules with specific attribute values while maintaining certain structural constraints. By optimizing the variational lower bound of the (conditional) likelihood, CDMO effectively trains the entire framework in an end-to-end manner. Aiming at the data sparsity issue of rare molecular structures in SMILES string representations, this method introduces a layer normalization module in the embedding layer to unify the embedding scales of different substructures. In addition, CDMO introduces a contrastive process to minimize the impact of noise on SMILES molecular properties by calculating the contrastive loss between real data and denoised data. CDMO can generate molecules with better validity, uniqueness, novelty, and desired attributes, thus achieving the desired results of lead molecule optimization.</p>
                                </a-card>
                            </a-col>
                            <a-col :span="8">
                                <a-card hoverable title="CDMO" :bordered="false">
                                <p>CDMO is a diffusion-based molecular optimization model that selectively adds Gaussian noise while retaining conditional features as guiding information to guide the generation of molecules with specific attribute values while maintaining certain structural constraints. By optimizing the variational lower bound of the (conditional) likelihood, CDMO effectively trains the entire framework in an end-to-end manner. Aiming at the data sparsity issue of rare molecular structures in SMILES string representations, this method introduces a layer normalization module in the embedding layer to unify the embedding scales of different substructures. In addition, CDMO introduces a contrastive process to minimize the impact of noise on SMILES molecular properties by calculating the contrastive loss between real data and denoised data. CDMO can generate molecules with better validity, uniqueness, novelty, and desired attributes, thus achieving the desired results of lead molecule optimization.</p>
                                </a-card>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    const activeKey = ref('1');



    export default { name: 'SoftwarePage' }
</script>



<style lang="scss" scoped>
.software-tabs {
    :deep(.ant-card) {
        .ant-card-head {
            font-size: 20px;
            font-weight: 700;
        }
        .ant-card-body {
            margin-top: 0;
            p {
                font-size: 18px;
                line-height: 1.5;
                height: 216px;
                word-break: break-all;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 8;
                -webkit-box-orient: vertical;
            }
            .more-btn {
                width: 100px;
                height: 40px;
                margin-top: 10px;
                min-width: 100px;
                min-height: 40px;
            }
        }
    }
}
</style>