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
    import { PredictSCResult, SCResults, useSolfWareSCStore } from '@/store/modules/solfWare'

    const solfWareStore =  useSolfWareSCStore()
    const scResults = solfWareStore.getPredictSCResults

    let data: PredictSCResult[] = []
    let rowSpanLists: any[] = []

    scResults.forEach((item) => {
        const temp = item.result.map((val, index, arr) => {
            val.Disease_Name = item.Disease_Name
            val.Pred = item.Pred == 0 ? 'Drug-sensitive' : 'Drug-resistant'
            val.Pred_Score = parseFloat(val.Pred_Score.toFixed(4))
            if (index == 0) {
                rowSpanLists.push({
                    'rowSpan': arr.length
                })
            } else {
                rowSpanLists.push({
                    'rowSpan': 0
                })
            }
            
            return val
        })

        data = data.concat(temp)
    })

    const keys = Object.keys(data[0])
    for(let i = 0; i < 2; i++) {
        const col = keys.splice(keys.length - 1, 1)[0]
        keys.splice(0, 0, col)
    }

    const columns = keys.filter(val => val !== 'Pred_Score').map((value) => {
        let title = value
        let defaultSortOrder = ''
        let sorter = null
        let customRender = null
        let customCell = null

        // if (value == 'Pred_Score') {
        //     defaultSortOrder ='descend'
        //     sorter = (a: PredictResult, b: PredictResult) => a.Pred_Score - b.Pred_Score
        // }  

        if (value == 'Disease_Name') {
            customRender = (text) => {
                const vnode = h('div', { class: 'disease-name', innerHTML: text.text })
                return vnode
            }
        } 

        if (value == 'Pred') {
            title = 'Echinococcosis Subtype'
            customRender = (text) => {
                const vnode = h('div', { class: text.text == 'Drug-resistant' ? 'type_one' : 'type_two', innerHTML: text.text })
                return vnode
            }
        }  

        if (value == 'DrugB_Name') {
            title = 'Potential synergistic drugs'
            customRender = (text) => {
                const vnode = h('div', { class: 'drug-name', innerHTML: text.text })
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

        if (value == 'Disease_Name' || value == 'Pred') {
            customCell = (_, index: number) => {
                return rowSpanLists[index]
            }
        }

        return {
            title,
            dataIndex: value,
            defaultSortOrder,
            sorter,
            customRender,
            align: 'center',
            customCell
        }
    })
    const onChange = () => {

    }
    
</script>



<style lang="scss" scoped>
</style>