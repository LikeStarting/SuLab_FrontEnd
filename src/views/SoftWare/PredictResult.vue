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
    import { Tag } from 'ant-design-vue'

    const solfWareStore =  useSolfWareStore()
    const results = solfWareStore.getPredictResults

    const route = useRoute();  

    const columns = Object.keys(results[0]).map((value) => {
        let title = value
        let defaultSortOrder = ''
        let sorter = null
        let customRender = null

        if (value == 'Pred_Score') {
            defaultSortOrder ='descend'
            sorter = (a: PredictResult, b: PredictResult) => a.Pred_Score - b.Pred_Score
            const lastPath = route.path.split('result/')
            if (lastPath[lastPath.length - 1] == '1') {
                title = 'Synergy Score'
                customRender = ({ text }) => {
                    // const icon = h(SvgIcon, { iconName: 'icon-example' })
                    let color = ''
                    let value = ''
                    if (text >= 0.8) {
                        color = '#87d068'
                        value = 'High'
                    } else if (text >= 0.6) {
                        color = '#FFA15A'
                        value = 'Moderate'
                    } else {
                        color = '#b6c1c3'
                        value = 'Low'
                    }
                    // const vnode = h(Tag, { color  }, value)
                    const vnode = h('div', { class: 'score', style: { color }  }, [text, h(Tag, { color  }, () => value)])
                    return vnode
                }
            }
        }  

        const colors = ['#87d068', '#FFA15A', '#9DDBF8', '#4581B2', '#6a737b', '#FDC4C5', '#C4A9DC']

        if (value == 'Key_Genes') {
            customRender = ({ text }) => {
                const tooltip = text.map((v, i) => {
                    const randomIndex = Math.floor(Math.random() * colors.length)
                    const color = colors[randomIndex]
                    return h('div', { class: 'item' }, [h(Tag, { color }, () => v)])
                })
                const vnode = h('div', { class: 'gene-box' }, tooltip)
                return vnode
            }
        }

        if (value.includes('Svg') ) {
            title = value.replace('Svg', 'SMILES')
            customRender = (text) => {
                const vnode = h('div', { class: 'smiles-svg', innerHTML: text.text })
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
            .ant-tag {
                margin-left: 6px;
                font-size: 14px;
                line-height: 24px;
                cursor: pointer;
                margin-inline-end: 0;
            }
            .item {
                margin-top: 5px;
                &.ant-tag {
                    margin-left: 0;
                }
            }
            
        }
    }
}
</style>