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

    const map = ref(null);

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
            map.value = new AMap.Map("map-container", {
                viewMode: "2D", 
                zoom: 14, 
                center: [117.189175,31.758371], // 初始化地图中心点位置
            });

            const position = map.value.getCenter();
            const marker = new AMap.Marker({
                position: position,
            })
            map.value.add(marker)

            const infoContent = `
                <div class="info-card">
                    <h2>Su Lab</h2>
                    <p><span>Adress:</span> 111 Jiulong Road, Shushan District, Hefei City, Anhui Province</p>
                </div>
            `
            const infoWindow = new AMap.InfoWindow({
                content: infoContent,
                anchor: "top-left",
            });
            
            infoWindow.open(map.value, position);

            function markerClick(e) {
                infoWindow.open(map.value, position);
            }

            marker.on('click', markerClick);
            marker.emit('click', {target: marker});

        }).catch((e) => {
            // console.log(e)
        });
    });

    onUnmounted(() => {
        map.value?.destroy();
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
                :deep(.amap-info-content) {
                    padding-left: 18px;
                    .info-card {
                        width: 170px;
                        h2 {
                            margin: 0;
                            line-height: 2;
                            color: #003366;
                        }
                        p {
                            color: $theme-color;
                            span {
                                font-weight: 600;
                                color: #003366;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>