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
            </a-row>
        </div>
        <div class="publications">
            <div class="publications-lists">
                <template v-if="!loading">
                    <a-row class="list" v-for="item in publications" :key="item.id">
                        <a-col class="pic" :span="6">
                            <a-skeleton-image />
                        </a-col>
                        <a-col :span="18">
                            <a-row>
                                <a-col class="item-left" :span="18">
                                    <h2>
                                        <a href="">{{ item.articleName }}</a>
                                    </h2>
                                    <p>
                                        {{ item.authors }}
                                    </p>
                                    <p>{{ item.introduction }}</p>
                                </a-col>
                                <a-col class="item-right" :span="6">
                                    <div>
                                        <h3>DATE</h3>
                                        <p>{{ item.publishDate }}</p>
                                    </div>
                                    <div>
                                        <h3>JOURNAL</h3>
                                        <p>{{ item.publication }}</p>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </template>
                <template v-if="loading">
                    <a-row class="list" v-for="item in pageSize" :key="item.id">
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
        <a-pagination v-model:current="currentPage" show-quick-jumper :total="totalCount" @change="handleChange" />
    </div>
</template>

<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import { message } from 'ant-design-vue';
    import { useUserStore } from '@/store/modules/user'
    import { getAllPublications } from '@/api/publication'

    const router = useRouter()
    const userStore = useUserStore()

    const keyWord = ref('')
    const totalCount = ref(0)
    const currentPage = ref(0)
    const pageSize = ref(3)
    const loading = ref<boolean>(true)

    const publications = ref(<any>[])

    getAllPublications({
        page: currentPage.value,
        limit: pageSize.value
    }).then((res) => {
        const { data, count } = res
        publications.value = data
        totalCount.value = count
        loading.value = false
    })
    
    
    const handleChange = (page, pageSize) => {
        loading.value = true
        getAllPublications({
            page,
            limit: pageSize
        }).then((res) => {
            const { data, count } = res
            publications.value = data
            totalCount.value = count
            loading.value = false
        })
    }
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
        .publications-lists {
            .list {
                margin-bottom: 20px;
                padding: 30px;
                -webkit-box-shadow: 0 0 18px 0 rgba(93, 107, 137, 0.1);
                box-shadow: 0 0 18px 0 rgba(93, 107, 137, 0.1);
                .pic {
                    width: 160px;
                    height: 220px;
                    .ant-skeleton-element {
                        display: block;
                        height: 100%;
                    }
                    :deep(.ant-skeleton-image) {
                        width: 100%;
                        height: 100%;
                    }
                }
                p {
                    font-size: 16px;
                    line-height: 28px;
                    color: #222;
                }
                .item-left {
                    padding: 0 20px;
                    h2 {
                        margin-top: 0;
                        font-size: 24px;
                        font-weight: 600;
                        line-height: 32px;
                    }
                }
                .item-right {
                    padding: 0 20px;
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

    .ant-pagination {
        text-align: center;
    }
}

</style>