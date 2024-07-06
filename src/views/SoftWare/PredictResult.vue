<template>
    <div class="result-wrapper common-box">
        <div>
            <h2>All Solfwares</h2>
            <div class="software-tabs">
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    const activeKey = ref('1');



    
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