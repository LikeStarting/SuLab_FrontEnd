<template>
    <div class="contact-wrapper common-box">
        <div class="contact">
            <h2>
                <span>Contact Us</span>
            </h2>
            <a-row class="content-box">
                <a-col class="info" :span="12">
                    <div class="item">
                        <h3>ADDRESS</h3>
                        <p>111 Jiulong Road, Shushan District, Hefei City, Anhui Province</p>
                    </div>
                    <div class="item">
                        <h3>PHONE</h3>
                        <p>15755146125</p>
                    </div>
                    <div class="item">
                        <h3>E-MAIL</h3>
                        <p>suyansen@ahu.edu.cn</p>
                    </div>
                </a-col>
                <a-col class="map" :span="12">
                    <div id="map-container">
                        
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import AMapLoader from "@amap/amap-jsapi-loader";
    import { onMounted, onUnmounted, ref } from 'vue';

    let map = null;

    onMounted(() => {
        window._AMapSecurityConfig = {
            securityJsCode: "2945fdaa46357cc1714467890bf47a63",
        };
        AMapLoader.load({
            key: "dfa7815d7d228be719ebb4f5a2e76332", 
            version: "2.0", 
            plugins: ["AMap.Scale"],
        })
        .then((AMap) => {
            map = new AMap.Map("map-container", {
                viewMode: "3D", 
                zoom: 14, 
                center: [117.189175,31.758371], // 初始化地图中心点位置
            });


            const position = new AMap.LngLat(117.189175,31.758371);
            const marker = new AMap.Marker({
            position: position,
            // content: markerContent,
            // offset: new AMap.Pixel(-13, -30)
            })

            map.add(marker)
        }).catch((e) => {
            console.log(e);
        });
    });

    onUnmounted(() => {
        map?.destroy();
    });
</script>


<style lang="scss" scoped>
.contact-wrapper {
    .contact {
        padding: 20px 0;
        h2 {
            text-align: center;
            position: relative;
            span:first-child {
                display: inline-block;
                width: 160px;
                height: 40px;
                padding-right: 12px;
                line-height: 40px;
                text-align: center;
                background: url(../../assets/images/bg-contact.png) no-repeat center / cover;
                font-family: IBM Plex Mono serif;
            }
        }
        .content-box {
            margin-top: 40px;
            .item {
                padding: 20px 0;
                h3 {
                    font-size: 24px;
                    line-height: 30px;
                    color: #9DDBF8;
                }
                p {
                    margin-top: 10px;
                    font-size: 16px;
                    line-height: 1.5;
                    color: #ccc;
                }
            }
        }
        .map {   
            #map-container {
                width: 100%;
                height: 400px;
            }
        }
    }
}

</style>