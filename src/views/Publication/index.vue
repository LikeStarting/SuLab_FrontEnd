<template>
    <div class="publication-wrapper common-box">
        <div class="search">
            <a-row justify="space-between">
                <a-col :span="6">
                    <a-input v-model:value="keyWord" placeholder="Search">
                        <template #suffix>
                            <SvgIcon iconName="icon-SEARCH" className="icon-search" />
                        </template>
                    </a-input>
                </a-col>
                <!-- <a-col :span="6">
                    <a-form-item
                        label="Filter"
                        name="filter"
                        >
                        <a-select>
                            <a-select-option value="demo">Demo</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        label="Filter"
                        name="filter"
                        >
                        <a-select>
                            <a-select-option value="demo">Demo</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col> -->
            </a-row>
        </div>
        <div class="publications">
            <div class="list">
                <a-row>
                    <a-col class="pic" :span="6">
                        image
                    </a-col>
                    <a-col :span="18">
                        <a-row>
                            <a-col class="item-left" :span="18">
                                <h2>
                                    <a href="">Paper title</a>
                                </h2>
                                <p>
                                    author
                                </p>
                                <p>abstract</p>
                            </a-col>
                            <a-col class="item-right" :span="6">
                                <div>
                                    <h3>DATE</h3>
                                    <p>April 2, 2024</p>
                                </div>
                                <div>
                                    <h3>JOURNAL</h3>
                                    <p>Nature Scientific Reports</p>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default { name: 'PublicationPage' }
</script>

<style lang="scss" scoped>
.publication-wrapper {
    .search {
        padding: 20px 0;
        .ant-input-affix-wrapper {
            padding-top: 8px;
            padding-bottom: 8px;
            font-size: 16px;
        }
        :deep(.ant-select-selector .ant-select-selection-search-input) {
            height: 46px;
        }
    }

    .icon-search {
        width: 28px;
        height: 28px;
        cursor: pointer;
    }

    .publications {
        padding: 20px 0;
        border-top: 1px solid #ddd;
        .list {
            padding: 30px;
            -webkit-box-shadow: 0 0 18px 0 rgba(93, 107, 137, 0.1);
            box-shadow: 0 0 18px 0 rgba(93, 107, 137, 0.1);
            .pic {
                width: 160px;
                height: 220px;
            }
            p {
                font-size: 16px;
                line-height: 28px;
                color: #222;
            }
            .item-left {
                h2 {
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 32px;
                }
            }
            .item-right {
                div {
                    padding-bottom: 16px;
                }
                h3 {
                    font-size: 14px;
                    font-weight: 600;
                    color: #999;
                }
            }
        }
    }
}

</style>