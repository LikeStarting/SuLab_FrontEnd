<template>
    <div class="home-wrapper">
        <div class="introducation common-box">
            <a-row>
                <a-col :span="11">
                    <h2>AHU DrugD Platform</h2>
                    <p>
                        The Anhui University Drug Discovery Platform (AHU-DrugD-Platform) is an advanced platform that combines artificial intelligence (AI) methods in drug design with parasitic disease research, aimed at creating an efficient anti-parasitic drug discovery system. The main focus of the platform is the development of new drug design methods through the integration of AI algorithms, including drug molecule optimization, drug side effect prediction, and drug synergy prediction.
                    </p>
                    <p>
                        Currently, we have designed several algorithmic tools, which are available on our platform for public access, and our research findings have been published in academic journals or filed as patents.
                    </p>
                    <p>              
                        Our research group is supported by the National Natural Science Foundation of China, the Ministry of Science and Technology, the Anhui Science and Technology Development Funds, and funding from Anhui University.
                    </p>
                </a-col>
                <a-col :span="12">
                    <div class="lab-view">
                        <SvgImage />
                    </div>
                </a-col>
            </a-row>
        </div>

        <div class="modules">
            <a-row>
                <a-col>
                    <h2>Modules</h2>
                    <a-tabs v-model:activeKey="activeKey" centered>
                        <!-- <a-tab-pane key="1">
                            <template #tab>
                                <span class="tab-tittle">
                                    <div>
                                        <SvgIcon iconName="icon-ziyuan" className="icon-tab" />
                                    </div>
                                    <div class="text">Molecule optimization</div>
                                </span>
                            </template>
                            <div class="tab-content">
                                <div class="img">
                                    <img src="/src/assets/images/molecule-optimization.png" alt="">
                                </div>
                                <div class="desc">
                                    <h3>Molecule optimization</h3>
                                    <p>
                                        Molecule optimization is a key step in the development of new drugs, where the goal is to improve the properties of the lead compound while maintaining high molecular similarity. AI technologies—especially deep learning, machine learning, and evolutionary algorithms—show immense potential here. Deep learning captures molecular interactions and predicts properties, fostering drug discovery. Machine learning rapidly screens candidates, cutting costs and time. Evolutionary algorithms excel in structure optimization, pushing performance limits. These AI advancements enhance optimization efficiency and accuracy, fueling new drug development and material innovation, with profound impacts on economic growth and societal progress.
                                    </p>
                                </div>
                            </div>
                        </a-tab-pane> -->
                        <a-tab-pane key="2">
                            <template #tab>
                                <span class="tab-tittle">
                                    <div>
                                        <SvgIcon iconName="icon-Medicine" className="icon-tab" />
                                    </div>
                                    <div class="text">Drug combinations prediction</div>
                                </span>
                            </template>
                            <div class="tab-content">
                                <div class="img">
                                    <img src="/src/assets/images/drug-combination.png" alt="">
                                </div>
                                <div class="desc">
                                    <h3>Drug combinations prediction</h3>
                                    <p>
                                        Drug synergy prediction technology delves into the intricate relationships between drugs and their targets, as well as the interactions among drugs, to accurately forecast combinations that exhibit synergistic effects, resulting in enhanced therapeutic outcomes for diseases. Compared to traditional wet-lab experiments, this technology significantly shortens the research and development cycle, reduces costs, and mitigates the risks associated with clinical trials.
In the field of oncology, drug synergy prediction has facilitated the discovery of numerous drug combinations that significantly improve tumor treatment outcomes, offering new hope to patients. Additionally, in public health areas such as antiparasitic therapy, this technology demonstrates immense potential, aiding in the development of more effective and safer treatment protocols. As technology advances and data accumulates, drug synergy prediction models will become increasingly precise, providing a more solid and scientific foundation for clinical drug development and treatment strategy formulation.
                                    </p>
                                </div>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </div>

        <div class="reserch">
            <a-row>
                <a-col>
                    <h2>Research</h2>
                    <p>
                        In addition to our proprietary work, we also contribute to research articles. Visit the connect page to enquire about publication.
                    </p>
                    <div class="more-btn">
                        <router-link :to="{ name: 'PublicationPage' }" >
                            <HappyButton text="Our Publications" />
                        </router-link>
                    </div>
                </a-col>
            </a-row>
        </div>
        <!-- <div class="platform-info">

        </div>
        <div class="platform-view">

        </div> -->
    </div>
</template>

<script setup>
const activeKey = ref('2');
</script>

<style lang="scss" scoped>
    $s: 50px;
    $h: sqrt(5000);
    .fade-in {
        // background-color: #2ecc71;
        opacity: 0;
        transition: 0.3s all ease-out;
        transform: scale(0.8);
    }

    .introducation {
        height: calc(100vh - 86px);
        h2 {
            margin: 0;
            padding-bottom: 20px;
            font-size: 46px;
            color: #003366;
            font-family: Rubik,sans-serif;
        }
        p {
            margin-bottom: 10px;
            font-size: 18px;
            font-family: Arial Helvetica, sans-serif;
            line-height: 1.5;
            color: #333;
        }
        .ant-row {
            height: 100%;
            align-items: center;
            justify-content: space-between;

        }
        .lab-view {
            height: 100%;
            // background-color: #9DDBF8;
        }
    }

    .reserch {
        width: 100%;
        height: 320px;
        // background: url(../../assets/images/research.jpg) no-repeat center / cover;
        background: rgb(232, 246, 248); 
        background-image: repeating-linear-gradient(45deg,	transparent, transparent 25px, #9DDBF8 25px, #9DDBF8 50px);
        background-size: $h $h;
        background-position: center;
        .ant-row {
            height: 100%;
        }
        .ant-col {
            width: 100%;
            max-width: 1340px;
            margin: 0 auto;
            padding: 20px 50px;
        }
        h2 {
            margin: 0;
            padding: 20px 0;
            font-size: 56px;
            font-family: Rubik,sans-serif;
            color: #003366;
        }
        p {
            margin-bottom: 20px;
            font-size: 18px;
            font-family: Arial Helvetica, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .more-btn {
            a {
                display: inline-block;
                width: 180px;
                height: 54px;
                text-align: center;
                line-height: 54px;
                font-size: 16px;
                border-radius: 6px;
                color: #fff;
                background-color: #EB9794;
            }
        }
    }

    .modules {
        background: #f8f9fa; 
        .ant-row {
            height: 100%;
        }
        .ant-col {
            width: 100%;
            max-width: 1340px;
            margin: 0 auto;
            padding: 50px;
        }
        h2 {
            margin: 0;
            padding: 20px 0;
            font-size: 56px;
            font-family: Rubik,sans-serif;
            color: #003366;
        }
        :deep(.ant-tabs) {
            .ant-tabs-ink-bar {
                background-color: #548DD4;
            }
            .ant-tabs-tab {
                color: rgba(102, 102, 102);
                &:hover {
                    color: #548DD4;
                }
                &.ant-tabs-tab-active {
                    .ant-tabs-tab-btn {
                        color: #548DD4;
                    }
                }
                .ant-tabs-tab-btn {
                    &:active, &:focus {
                        color: #548DD4;
                    }
                }
            }
            .ant-tabs-content {
                padding: 30px 0;
            }
            .tab-tittle {
                text-align: center;
                .text {
                    margin-top: 10px;
                    font-size: 18px;
                    font-weight: 600;
                }
                .icon-tab {
                    width: 50px;
                    height: 50px;
                }
            }
            .tab-content {
                display: flex;
                align-items: center;
                .img {
                    width: 40%;
                }
                .desc {
                    width: 60%;
                    margin-left: 10px;
                    border-radius: 8px; 
                    padding: 20px;
                    transition: all 0.5s ease;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgb(157, 219, 248, 0.3); 
                    &:hover {
                        box-shadow: 0 4px 8px rgb(157, 219, 248, 0.8); 
                    }
                    h3 {
                        font-size: 28px;
                        font-weight: 700;
                        line-height: 1.5;
                        color: #003366;
                    }
                    p {
                        margin-top: 10px;
                        color: #333; 
                        font-family: 'Courier New', Courier, monospace; 
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1200px) {
        .introducation {
            h2 {
                font-size: 46px;
                padding-bottom: 10px;
            }
            p {
                font-size: 16px;
            }
        }

        .modules, .reserch {
            h2 {
                font-size: 46px;
            }
        }
    }

    @media screen and (max-width: 1000px) {
        .introducation {
            h2 {
                font-size: 40px;
                padding-bottom: 10px;
            }
            p {
                font-size: 14px;
            }
        }
        .modules, .reserch {
            h2 {
                font-size: 40px;
            }
        }
        .modules {
            .ant-col {
                padding: 30px;
            }
        }
    }

    @media screen and (max-width: 860px) {
        .introducation {
            h2 {
                font-size: 26px;
            }
            p {
                margin-bottom: 10px;
                line-height: 1.4;
            }
        }
        .modules, .reserch {
            h2 {
                font-size: 26px;
            }
            
        }
        .modules {
            .ant-col {
                padding: 25px;
            }
            :deep(.ant-tabs) .tab-content .desc h3 {
                font-size: 20px;
            }
        }
    }
</style>