<template>
    <div class="home-wrapper">
        <div class="introducation common-box">
            <a-row>
                <a-col :span="11">
                    <h2>AHU Bio Platform</h2>
                    <p>
                        At AHU-Bio-Platform (Anhui University Bioinformatics Laboratory Platform), we are dedicated to creating an efficient bioinformatics platform by combining the most advanced AI-based drug design methods and bioinformatics technologies. Our research focuses on developing new computational biology methods by incorporating artificial intelligence algorithms, such as drug molecule optimization, drug combinations, drug synergy, medical image segmentation, and single-cell sequencing. Using these methods, we investigate the molecular mechanisms underlying the development of serious diseases such as cancer, infectious diseases, and metabolic disorders, and accordingly develop therapeutic agents.
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
In addition to our proprietary work, we also contribute to research articles, host seminars, and attend speaking events. Visit the connect page to enquire about engagement opportunities.
                    </p>
                    <div class="more-btn">
                        <router-link :to="{name: 'PublicationPage', params: { }}" >
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

<script>

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
            padding: 20px 0;
            font-size: 56px;
            font-family: Rubik,sans-serif;
        }
        p {
            margin-bottom: 20px;
            font-size: 18px;
            font-family: Arial Helvetica, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .ant-row {
            height: 100%;
            align-items: center;
            justify-content: space-between;
            .ant-col {
                // height: 600px;
            }

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
        .ant-col {
            max-width: 1340px;
            margin: 0 auto;
            padding: 20px 50px;
        }
        h2 {
            margin: 0;
            padding: 20px 0;
            font-size: 56px;
            font-family: Rubik,sans-serif;
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
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 16px;
                border-radius: 6px;
                color: #fff;
                background-color: #EB9794;
            }
        }
    }
</style>