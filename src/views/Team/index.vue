<template>
    <div class="teams-wrapper common-box">
        <div class="team team-first">
            <a-row>
                <a-col class="img" :span="6">
                    <div class="img-inner">
                        <img src="https://ai.ahu.edu.cn/_upload/article/images/dd/8b/587a55ca47c583406c06671f7538/fdcd0627-9fd4-4b10-9489-258e01e651db.jpg">
                    </div>
                </a-col>
                <a-col class="intro" :span="18">
                    <div class="intro-inner">
                        <h2>Yansen Su</h2>
                        <p>
                            Principle Investigator
                        </p>
                        <p>
                            Professor of Artificial Intelligence College of Anhui University,
                        </p>
                        <p>
                            Winner of National Excellent Youth Fund and outstanding youth in Anhui universities,
                        </p>
                        <p>
                            Member of the Bioinformatics Professional Committee of China Computer Federation, 
                        </p>
                        <p>
                            Member of the Bio-computing and Bio-information Processing Professional Committee of China Electronics Society.
                        </p>
                        <p class="email">
                            <SvgIcon iconName="icon-youxiang" />
                            <span>
                                suyansen@ahu.edu.cn
                            </span>
                        </p>
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
            min-height: 480px;
            height: 100%;
            :deep(.ant-card-body) {
                height: 24%;
                min-height: 95px;
                margin-top: 0;
                padding: 20px;
                .ant-card-meta-description {
                    line-height: 22px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            :deep(.ant-card-cover) {
                height: 76%;
                text-align: center;
                margin-top: 0;
                margin-inline-start: 0;
                margin-inline-end: 0;
                img {
                    height: 100%;
                }
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

.team-first {
    .ant-row {
        padding: 20px;
        background-color: #9DDBF8;
        border-radius: 8px;
    }
    .img {
        display: table;
        padding: 10px;
        background-color: #F3FCF2;
        .img-inner {
            display: table-cell;
            vertical-align: middle;
        }
        img {
            width: 100%;
            height: 100%;
            max-width: 300px;
            max-height: 300px;
        }
    }
    .intro {
        padding-left: 20px;
        background-color:  #F3FCF2;

        .intro-inner {
            padding: 20px 0;
            font-family: 'Roboto', sans-serif;
            h2 {
                margin: 0;
                font-size: 32px;
                font-weight: 600;
                line-height: 50px;
                color: #F7AB60;
            }
            p {
                font-size: 14px;
                line-height: 1.6;
                &.email {
                    margin-top: 10px;
                }
            }
        }
    }
}

@media screen and (max-width: 1240px) {
    .team  {
        .member {
            .ant-card {
                min-height: auto;
            }
        }
    }
}
</style>