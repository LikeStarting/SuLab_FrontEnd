<template>
    <div class="result-wrapper common-box">
        <div>
            <h2>Results</h2>
            <div class="software-tabs">
                <a-table :columns="columns" :data-source="data" @change="onChange" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { TableColumnType, TableProps } from 'ant-design-vue';
    import { useSolfWareStore } from '@/store/modules/solfWare'

    const solfWareStore =  useSolfWareStore()
    const results = solfWareStore.getPredictResults
    console.log('results=======', results, Object.keys(results[0]))

    // const columns = Object.keys(results[0])

    type TableDataType = {
        key: string;
        name: string;
        age: number;
        address: string;
    };

    const columns: TableColumnType<TableDataType>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            // filters: [
            // {
            //     text: 'Joe',
            //     value: 'Joe',
            // },
            // {
            //     text: 'Jim',
            //     value: 'Jim',
            // }
            // ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // onFilter: (value: string, record: TableDataType) => record.name.indexOf(value) === 0,
            defaultSortOrder: 'descend',
            sorter: (a: TableDataType, b: TableDataType) => a.name.length - b.name.length,
            // sortDirections: ['descend'],
        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a: TableDataType, b: TableDataType) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            // filters: [
            // {
            //     text: 'London',
            //     value: 'London',
            // },
            // {
            //     text: 'New York',
            //     value: 'New York',
            // },
            // ],
            // filterMultiple: false,
            // onFilter: (value: string, record: TableDataType) => record.address.indexOf(value) === 0,
            sorter: (a: TableDataType, b: TableDataType) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];


    const data: TableDataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }
    ];

    const onChange = () => {

    }
    
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