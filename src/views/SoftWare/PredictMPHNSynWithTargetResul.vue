<template>
    <div class="result-wrapper common-box">
        <div>
            <h2>
                <SvgIcon iconName="icon-theme11" className="title-icon"/>
                Results
            </h2>

            <div class="visual">
                <h3>Visualization</h3>
                <div class="chart-container">
                    <Chart :options="options"/>
                </div>
            </div>
            <div class="software-tabs">
                <h3>Relative Data</h3>
                <a-table :columns="columns" :data-source="data" @change="onChange" bordered/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { PredictMPHNSynResult, useSolfWareMPHNSynWithTargetStore } from '@/store/modules/solfWare'

    const solfWareStore =  useSolfWareMPHNSynWithTargetStore()
    const msResults = solfWareStore.getPredictMPHNSynResults

    
    let data: PredictMPHNSynResult[] = []
    const options = ref(null)


    data = msResults.map((val, index, arr) => {
        const result:any = new Object()
        result['Disease_Name'] = val.disease_name
        result['Drug_Name_A'] = val.drug_name_a
        result['Drug_Name_B'] = val.drug_name_b
        result['Side_Effect_Score'] = parseFloat(val.side_score.toFixed(4))
        result['Synergy_Score'] = parseFloat(val.synergy_score.toFixed(4))
        result['Resources'] = 'Download'
        result['Disease_Target'] = val.disease_target

        return result
    })

    const keys = Object.keys(data[0]).filter((v) => v !== 'Disease_Target')
    // for(let i = 0; i < 2; i++) {
    //     const col = keys.splice(keys.length - 1, 1)[0]
    //     keys.splice(0, 0, col)
    // }

    const columns = keys.map((value) => {
        let title = value
        let defaultSortOrder = ''
        let sorter = null
        let customRender = null
        let customCell = null

        title = title.replace(/_/g, ' ')

        if (value == 'Drug_Name_A' || value == 'Drug_Name_B') {
            customRender = ({ text }) => {
                const vnode = h('div', { class: 'drug-name', innerHTML: text })
                return vnode
            }
        }

        if (value == 'Side_Effect_Score') {
            defaultSortOrder ='descend'
            sorter = (a: any, b: any) => a['Side_Effect_Score'] - b['Side_Effect_Score']
        } 

        if (value == 'Synergy_Score') {
            defaultSortOrder ='descend'
            sorter = (a: any, b: any) => a['Synergy_Score'] - b['Synergy_Score']
        }  

        if (value == 'Disease_Name') {
            customRender = ({ text }) => {
                const vnode = h('div', { class: 'disease-name', innerHTML: text })
                return vnode
            }
        } 

        if (value == 'Disease-Target_Network_Diagram') {
            customRender = ({ text, record }) => {
                const diseaseName = Object.keys(text)
                const data = diseaseName.map((key) => {
                    const d = text[key]
                    // const maxNum = Math.min(80, d.length)
                    return d
                    // return d.slice(0, maxNum)
                })
                const vnode = h('span', { class: 'drug-target all', onClick: () => openChartModal(data, diseaseName),  innerHTML: 'preview' })
                return vnode
            }
        }

        if (value == 'Resources') {
            customRender = ({ text, record }) => {
                const vnode = h('span', { class: 'download', onClick: () => handleDownloadResource(record),  innerHTML: 'download' })
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
            customCell
        }
    })
    const onChange = () => {

    }

    const handleDownloadResource = (data) => {
        const { Disease_Name, Drug_Name_A, Drug_Name_B, Side_Effect_Score, Synergy_Score, Disease_Target } = data
        // const Drug_Target = data['Drug-Target_Network_Diagram']
        // const target_A = Drug_Target[Drug_Name_A]
        // const target_B = Drug_Target[Drug_Name_B]
        const target = Disease_Target

        const head = 'Disease Name,Drug Name A,Drug Name B,Disease Target,Side Effect Score, Synergy Score'
        const maxLen = target.length
        let csvContent = head + '\n'
        for (let i =0; i < maxLen; i++) {
            let tmp = []
            tmp.push(Disease_Name, Drug_Name_A, Drug_Name_B, target[i], Side_Effect_Score, Synergy_Score)
            csvContent += tmp.join(',') + '\n'
        }

        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        let link = document.createElement('a')
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url)
        link.setAttribute('download', 'disease_target.csv')
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

    }

    const colors = ['#32B9EB', '#EF5F4F']
    const categories = [
        {
            name: 'Disease'
        },
        {
            name: 'Disease target'
        },
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

    const diseases = [data[0]['Disease_Name']]
    const targetData = diseases.map(v => data[0]['Disease_Target'])
    const diseaseLists =  diseases.map((item, i) => ({
        category: i,
        symbol: 'circle',
        symbolSize: 80,
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

    let targets = []
    let edges = []

    targetData.forEach((item, index) => {
        const tmp_node = []
        for (let i = 0; i < item.length; i++) {
            const value = item[i]

            const tmp = {
                category: index + 1,
                name: value,
                // x: tmpPoints[i].x,
                // y: tmpPoints[i].y,
                symbol: 'circle',
                symbolSize: 20,
                itemStyle: {
                    color: colors[index + 1],
                },
                label: {
                    fontWeight: 600,
                }
            }

            tmp_node.push(tmp)
        }

        const tmp_link = item.map((value) => ({
            source: diseases[index],
            target: value
        }))
        targets = targets.concat(tmp_node)
        edges = edges.concat(tmp_link)
    })

    const nodes = diseaseLists.concat(targets)
    const links = edges

    const chartOptions = {
        title : {
            text: 'Disease target - Disease network diagram',
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
                if (category == 0) {
                    title = 'Disease Name'
                } else if (category == 1) {
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

    options.value = chartOptions


</script>


<style lang="scss" scoped>
.visual {
    h3 {
        font-size: 26px;
        text-align: center;
        color: #003366;
    }
    .chart-container {
        padding: 20px;
        width: 800px;
        margin: 20px auto;
        border-radius: 6px;
        // border: 2px solid $active-color;
        -webkit-box-shadow: 0 0 8px 0 $active-color;
        box-shadow: 0 0 8px 0 $active-color;
        #chart {
            height: 500px;
        }
    }
}
.software-tabs {
    margin-top: 50px;
    h3 {
        font-size: 26px;
        text-align: center;
        color: #003366;
    }
    .ant-table-wrapper {
        margin-top: 20px;
    }
}
</style>