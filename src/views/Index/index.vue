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
</style>