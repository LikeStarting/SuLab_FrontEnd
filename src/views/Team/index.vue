<template>
    <div class="teams-wrapper common-box">
        <div class="team team-first">
            <a-row>
                <a-col class="img" :span="8">
                    image
                </a-col>
                <a-col class="intro" :span="16">
                    <div>
                        <h2>Name</h2>
                        <p>Introducation</p>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="team team-one">
            <h2>
                <span>Postdocs</span>
            </h2>
            <div class="member">
                <a-row v-if="loading" :gutter="[16, 16]" justify="center">
                    <a-col class="gutter-row" v-for="item in 4" :key="item" :span="6">
                        <a-card hoverable>
                            <template #cover>
                                <a-skeleton-image />
                            </template>
                            <a-skeleton active :paragraph="{ rows: 1 }" />
                        </a-card>
                    </a-col>
                </a-row>
                <a-row v-if="!loading" :gutter="[16, 16]" justify="center">
                    <a-col class="gutter-row" v-for="item in team_one" :key="item.id" :span="6">
                        <a-card hoverable>
                            <template #cover>
                                <img alt="avatar" :src="item.avatar" />
                            </template>
                            <a-card-meta :title="item.name">
                                <template #description>{{ item.link }}</template>
                            </a-card-meta>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="team team-two">
            <h2>
                <span>PhD Students</span>
            </h2>
            <div class="member">
                <a-row v-if="loading" :gutter="[16, 16]" justify="center">
                    <a-col class="gutter-row" v-for="item in 4" :key="item" :span="6">
                        <a-card hoverable>
                            <template #cover>
                                <a-skeleton-image />
                            </template>
                            <a-skeleton active :paragraph="{ rows: 1 }" />
                        </a-card>
                    </a-col>
                </a-row>
                <a-row v-if="!loading" :gutter="[16, 16]" justify="center">
                    <a-col class="gutter-row" v-for="item in team_two" :key="item.id" :span="6">
                        <a-card hoverable >
                            <template #cover>
                                <img alt="avatar" :src="item.avatar" />
                            </template>
                            <a-card-meta :title="item.name">
                                <template #description>{{ item.link }}</template>
                            </a-card-meta>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="team team-three">
            <h2>
                <span>Graduate Students</span>
            </h2>
            <div class="member">
                <a-row v-if="loading" :gutter="[16, 16]" justify="center">
                    <a-col class="gutter-row" v-for="item in 4" :key="item" :span="6">
                        <a-card hoverable>
                            <template #cover>
                                <a-skeleton-image />
                            </template>
                            <a-skeleton active :paragraph="{ rows: 1 }" />
                        </a-card>
                    </a-col>
                </a-row>
                <a-row v-if="!loading" :gutter="[16, 16]" justify="center">
                    <a-col class="gutter-row" v-for="item in team_three" :key="item.id" :span="6">
                        <a-card hoverable>
                            <template #cover>
                                <img alt="avatar" :src="item.avatar" />
                            </template>
                            <a-card-meta :title="item.name">
                                <template #description>{{ item.link }}</template>
                            </a-card-meta>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { getAllMember } from '@/api/member'

    const loading = ref(true)
    const team_one = ref(<any>[])
    const team_two = ref(<any>[])
    const team_three = ref(<any>[])

    onMounted(() => {
        getAllMember().then((res) => {
            const { data } = res
            team_one.value = data.filter((item) => item.typeId == 0)
            team_two.value = data.filter((item) => item.typeId == 1)
            team_three.value = data.filter((item) => item.typeId == 2)
            loading.value = false
        })
    })
</script>


<style lang="scss" scoped>
.teams-wrapper {
    width: 100%;
    max-width: 1340px;
    margin: 0 auto;
    padding: 20px 50px;
}
.team {
    padding: 20px 0;
    &>h2 {
        text-align: center;
        position: relative;
        span:first-child {
            display: inline-block;
            width: 290px;
            height: 40px;
            padding-right: 80px;
            line-height: 40px;
            text-align: center;
            background: url(../../assets/images/team-title.png) no-repeat center / cover;
            font-family: IBM Plex Mono serif;
        }
    }

    .member {
        margin-top: 30px;
        .ant-card {
            height: auto;
            .ant-card-body {
                padding: 0 20px 20px;
                .ant-card-meta-description {
                    line-height: 22px;
                    height: 44px;
                    overflow-wrap: break-word;
                }
            }
            :deep(.ant-card-cover) {
                text-align: center;
                .ant-skeleton-element {
                    width: 100%;
                    .ant-skeleton-image {
                        width: 100%;
                        height: 192px;
                        .ant-skeleton-image-svg {
                            width: 50%;
                            height: 50%;
                        }
                    }
                }
            }
        }
    }
}
</style>