<template>
    <div class="publication-wrapper common-box">
        <div class="search">
            <a-row justify="flex-start">               
                <a-col :span="12">
                    <a-input-search v-model:value="keyWord" placeholder="Search" @search="handleSearch">
                        <template #enterButton>
                            <a-button><SvgIcon iconName="icon-SEARCH" className="icon-search" /></a-button>
                        </template>
                    </a-input-search>
                    
                </a-col>
                <a-col :span="4" class="reset-col">
                    <div class="reset-btn" @click="handleResetSearch">
                        <SvgIcon iconName="icon-icon_reseting" className="icon-reset" />
                        <span>Reset</span>
                    </div>
                </a-col>
            </a-row>
        </div>

        <a-pagination class="pagination-top" v-model:current="currentPage" :defaultPageSize=4 show-quick-jumper :total="totalCount" @change="handleChange" />

        <div class="publications">
            <div class="publications-lists">
                <template v-if="!loading">
                    <a-row class="list" v-for="item in publications" :key="item.id">
                        <a-col class="pic" :span="6">
                            <a :href="item.link" target="_blank">
                                <img :src="item.algorithmModelFigure" alt="algorithmModelFigure">
                            </a>
                        </a-col>
                        <a-col :span="18">
                            <a-row>
                                <a-col class="item-left" :span="18">
                                    <h2>
                                        <a :href="item.link" target="_blank">{{ item.articleName }}</a>
                                    </h2>
                                    <p>
                                        {{ item.authors }}
                                    </p>
                                    <p class="intro">
                                        <a :href="item.link" target="_blank">{{ item.introduction }}</a>
                                    </p>
                                </a-col>
                                <a-col class="item-right" :span="6">
                                    <div class="date">
                                        <h3>
                                            <SvgIcon iconName="icon-mydate" />
                                            <span>DATE</span>
                                        </h3>
                                        <p>{{ item.publishDate }}</p>
                                    </div>
                                    <div class="journal">
                                        <h3>
                                            <SvgIcon iconName="icon-icon-test" />
                                            <span>JOURNAL</span>
                                        </h3>
                                        <p>{{ item.publication }}</p>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </template>

                <div class="empty-box" v-if="!loading && publications.length == 0">
                    <a-row >
                        <a-empty>
                            <template #description>
                                <span>
                                    No data available.
                                </span>
                            </template>
                        </a-empty>
                    </a-row>
                </div>
                <template v-if="loading">
                    <a-row class="list" v-for="item in pageSize" :key="item">
                        <a-col class="pic" :span="6">
                            <a-skeleton-image />
                        </a-col>
                        <a-col :span="18">
                            <a-row>
                                <a-col class="item-left" :span="18">
                                    <a-skeleton active :paragraph="{ rows: 4 }" />
                                </a-col>
                                <a-col class="item-right" :span="6">
                                    <a-skeleton active :paragraph="{ rows: 1 }" />
                                    <a-skeleton active :paragraph="{ rows: 1 }" />
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </template>
            </div>
        </div>
        <a-pagination v-model:current="currentPage" :defaultPageSize=4 show-quick-jumper :total="totalCount" @change="handleChange" />
    </div>
</template>

<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import { message } from 'ant-design-vue';
    import { useUserStore } from '@/store/modules/user'
    import { getAllPublications, getPublicationsBySearch } from '@/api/publication'

    const router = useRouter()
    const userStore = useUserStore()

    const keyWord = ref('')
    const totalCount = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(4)
    const loading = ref<boolean>(true)
    const isAllPublications = ref(true)

    const publications = ref(<any>[])
        
    const handleSearch = () => {
        if (!keyWord.value) return 
        loading.value = true
        isAllPublications.value = false
        getPublicationsBySearch({
            articleName: keyWord.value,
            introduction: keyWord.value,
            page: currentPage.value - 1,
            limit: pageSize.value
        }).then((res) => {
            const { data, count } = res
            publications.value = data
            totalCount.value = count
            loading.value = false
        }, (error) => {
            loading.value = false
        })
    }

    const handleResetSearch = () => {
        if (!keyWord.value) return 
        keyWord.value = ''
        currentPage.value = 1
        isAllPublications.value = true
        getAllPublications({
            page: currentPage.value - 1,
            limit: pageSize.value
        }).then((res) => {
            const { data, count } = res
            publications.value = data
            totalCount.value = count
            loading.value = false
        }, (error) => {
            loading.value = false
        })
    }

    getAllPublications({
        page: currentPage.value - 1,
        limit: pageSize.value
    }).then((res) => {
        const { data, count } = res
        publications.value = data
        totalCount.value = count
        loading.value = false
    }, (error) => {
        loading.value = false
    })
    
    const handleChange = (page, pageSize) => {
        loading.value = true
        if (isAllPublications.value) {
            getAllPublications({
                page: page - 1,
                limit: pageSize
            }).then((res) => {
                const { data, count } = res
                publications.value = data
                totalCount.value = count
                loading.value = false
            }, (error) => {
                loading.value = false
            })
        } else {
            getPublicationsBySearch({
            articleName: keyWord.value,
            introduction: keyWord.value,
            page: page - 1,
            limit: pageSize
        }).then((res) => {
            const { data, count } = res
            publications.value = data
            totalCount.value = count
            loading.value = false
        }, (error) => {
                loading.value = false
            })
        }
    }
</script>

<style lang="scss" scoped>
.publication-wrapper {
    .search {
        padding: 20px 0;
        :deep(.ant-input-group) {
            .ant-input {
                padding-top: 8px;
                padding-bottom: 8px;
                font-size: 16px;
                line-height: 1.8;
            }
            .ant-input-group-addon {
                .ant-input-search-button {
                    height: 46px;
                }
            }
        }
        :deep(.ant-select-selector .ant-select-selection-search-input) {
            height: 46px;
        }
        .icon-search {
            width: 28px;
            height: 28px;
            cursor: pointer;
        }
        .reset-col {
            margin-left: 10px;
            .reset-btn {
                display: inline-block;
                padding: 7px;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                .icon-reset {
                    width: 30px;
                    height: 30px;
                }
                &:hover {
                    border: 1px solid #4096ff;
                    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
                }
                span {
                    margin-left: 6px;
                    font-weight: 600;
                }
            }
        }
    }

    .publications {
        margin-top: 20px;
        padding: 20px 0;
        .publications-lists {
            .list {
                align-items: center;
                margin-bottom: 20px;
                padding: 30px;
                -webkit-box-shadow: 0 0 18px 0 rgba(93, 107, 137, 0.1);
                box-shadow: 0 0 18px 0 rgba(93, 107, 137, 0.1);
                .pic {
                    height: 220px;
                    border: 1px solid #999;
                    overflow: hidden;
                    a {
                        display: block;
                        width: 100%;
                        height: 100%;
                        padding: 4px;
                        img {
                            width: 100%;
                            height: 100%;
                            transition: transform 0.5s ease;
                        }
                        &:hover {
                            img {
                                transform: scale(1.2);
                            }
                        }
                    }
                    .ant-skeleton-element {
                        display: block;
                        height: 100%;
                    }
                    :deep(.ant-skeleton-image) {
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                    }
                }
                p {
                    font-size: 16px;
                    line-height: 24px;
                    a {
                        color: #222;
                    }
                }
                .item-left {
                    padding: 0 20px;
                    h2 {
                        margin-top: 0;
                        margin-bottom: 10px;
                        font-size: 24px;
                        font-weight: 600;
                        line-height: 1;
                        a {
                            color: #F7AB60;
                            &:hover {
                                opacity: 0.7;
                            }
                        }
                    }
                    p.intro {
                        margin-top: 10px;
                        word-break: break-all;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 4;
                        -webkit-box-orient: vertical;
                        a {
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
                .item-right {
                    padding: 0 20px;
                    div {
                        padding-bottom: 16px;
                        .svg-icon {
                            width: 28px;
                            height: 28px;
                            margin-right: 6px;
                            vertical-align: top;
                        }
                    }
                    h3 {
                        font-size: 14px;
                        line-height: 2;
                        font-weight: 600;
                        color: #999;
                    }
                }
            }
            .empty-box {
                margin-bottom: 20px;
                .ant-row {
                    justify-content: center;
                    .ant-empty {
                        padding: 50px 0;
                    }
                }
            }
        }
    }

    .pagination-top {
        padding-top: 20px;
        border-top: 1px solid #ddd;
    }

    .ant-pagination {
        text-align: center;
    }
}

</style>