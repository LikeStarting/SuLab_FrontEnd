<template>
    <div class="result-wrapper common-box">
        <div>
            <h2>
                <SvgIcon iconName="icon-theme11" className="title-icon"/>
                Results
            </h2>
            <div class="software-tabs">
                <a-table :columns="columns" :data-source="data" @change="onChange" bordered/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { PredictResult, useSolfWareStore } from '@/store/modules/solfWare'


    const solfWareStore =  useSolfWareStore()
    const results = solfWareStore.getPredictResults

    const columns = Object.keys(results[0]).map((value) => {
        let title = value
        let defaultSortOrder = ''
        let sorter = null
        let customRender = null

        if (value == 'Pred_Score') {
            defaultSortOrder ='descend'
            sorter = (a: PredictResult, b: PredictResult) => a.Pred_Score - b.Pred_Score
        }  

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
            defaultSortOrder,
            sorter,
            customRender,
            align: 'center'
        }
    })

    const data: PredictResult[] = results.map((item) => {
        item.Pred_Score = parseFloat(item.Pred_Score.toFixed(4))
        return item
    })

    const onChange = () => {

    }
    
</script>



<style lang="scss" scoped>
.result-wrapper {
    h2 {
        font-size: 28px;
        line-height: 36px;
        .title-icon {
            width: 66px;
            height: 36px;
            vertical-align: top;
        }
    }
    .software-tabs {
        :deep(.ant-table) {
            .smiles-svg {
                width: 240px;
                height: 100px;
                svg {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>