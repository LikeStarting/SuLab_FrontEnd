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

        <a-modal class="chart-modal" style="width: 800px;"  v-model:open="showChartModal"  @cancel="closeChartModal">
            <div class="chart-container">
                <Chart :options="options"/>
            </div>
            <template #footer>

            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
    import { PredictMPHNSynResult, useSolfWareMPHNSynStore } from '@/store/modules/solfWare'

    const solfWareStore =  useSolfWareMPHNSynStore()
    const msResults = solfWareStore.getPredictMPHNSynResults

    
    let data: PredictMPHNSynResult[] = []
    const showChartModal = ref(false)
    const options = ref(null)


    data = msResults.map((val, index, arr) => {
        const result:any = new Object()
        result['Disease_Name'] = val.disease_name
        result['Drug_Name_A'] = val.drug_name_a
        result['Drug_Name_B'] = val.drug_name_b
        // result['Drug Target A'] = val.druga_target
        // result['Drug Target B'] = val.drugb_target
        result['Side_Effect_Score'] = parseFloat(val.side_score.toFixed(4))
        result['Synergy_Score'] = parseFloat(val.synergy_score.toFixed(4))
        result['Drug-Target_Network_Diagram'] = {
            [val.drug_name_a]: val.druga_target,
            [val.drug_name_b]: val.drugb_target
        }
        result['Resources'] = 'Download'

        return result
    })

    const keys = Object.keys(data[0]).filter((k) => k !== 'Drug Target A' && k !== 'Drug Target A')
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


        // if (value == 'druga_target' || value == 'drugb_target') { 
        //     customRender = ({ text, record }) => {
        //         const drugName = Object.keys(text)
        //         const data = [text[drugName[0]]]
        //         const vnode = h('span', { class: 'drug-target', onClick: () => openChartModal(data, drugName),  innerHTML: 'preview' })
        //         return vnode
        //     }
        // }

        if (value == 'Drug-Target_Network_Diagram') {
            customRender = ({ text, record }) => {
                const drugName = Object.keys(text)
                const data = drugName.map((key) => {
                    const d = text[key]
                    const maxNum = Math.min(80, d.length)

                    return d.slice(0, maxNum)
                })
                const vnode = h('span', { class: 'drug-target all', onClick: () => openChartModal(data, drugName),  innerHTML: 'preview' })
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
        const { Disease_Name, Drug_Name_A, Drug_Name_B, Side_Effect_Score, Synergy_Score } = data
        const Drug_Target = data['Drug-Target_Network_Diagram']
        const target_A = Drug_Target[Drug_Name_A]
        const target_B = Drug_Target[Drug_Name_B]

        const head = 'Disease Name,Drug Name A,Drug Name B,Target_A,Target_B,Side Effect Score, Synergy Score'
        const maxLen = Math.max(target_A.length, target_B.length)
        let csvContent = head + '\n'
        for (let i =0; i < maxLen; i++) {
            let tmp = []
            tmp.push(Disease_Name, Drug_Name_A, Drug_Name_B, target_A[i], target_B[i], Side_Effect_Score, Synergy_Score)
            csvContent += tmp.join(',') + '\n'
        }

        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        let link = document.createElement('a')
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url)
        link.setAttribute('download', 'drug_target.csv')
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

    }

    const generateRandomPoints = (num, centerX, centerY, maxRadius) => {
        const points = []
        for (let i = 0; i < num; i++) { 
            let radius = maxRadius * Math.random() + 20
            let angle = Math.random() * 2 * Math.PI
            let x = centerX + radius * Math.cos(angle)
            let y = centerY + radius * Math.sin(angle)

            x = Math.min(Math.max(x, 0), 600);
            y = Math.min(Math.max(y, 0), 600)

            points.push({ x, y })
        }
        return points
    }

    const colors = ['#32B9EB', '#3B6EB8', '#EF5F4F', '#A4CF33', '#F7AB60']
    const categories = [
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
    const openChartModal = (data, drugs) => {
        // const drugPoints = generateRandomPoints(drugs.length, 300, 300, 100)
        const drugNames =  drugs.map((item, i) => ({
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
                    category: index + 2,
                    name: value,
                    // x: tmpPoints[i].x,
                    // y: tmpPoints[i].y,
                    symbol: 'circle',
                    symbolSize: 20,
                    itemStyle: {
                        color: colors[index + 2],
                    },
                    label: {
                        fontWeight: 600,
                    }
                }
    
                tmp_node.push(tmp)
            }

            const tmp_link = item.map((value) => ({
                source: drugs[index],
                target: value
            }))
            targets = targets.concat(tmp_node)
            edges = edges.concat(tmp_link)
        })
       
        const drugsLists = combineTwoNodes(drugs.slice(0))

        let drugEdges = []
        if (drugsLists.length >= 1) {
            drugEdges = drugsLists.map((item) => ({
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
                text: 'Drug target - Drug network diagram',
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
                    if (category == 0 || category == 1) {
                        title = 'Drug Name'
                    } else if (category == 2 || category == 3 || category == 4) {
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
                // left: 'center',
                // top: 'center',
                // edgeSymbolSize: 10,
                // edgeLabel: {
                //   position: 'middle',
                //   distance: 5
                // },
                // nodeScaleRatio: 0.6,
                // emphasis: {
                //   scale: true,
                //   label: {
                //     show: true
                //   },

                // }
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

</style>