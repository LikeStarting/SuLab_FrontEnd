<template>
    <div class="container" ref="body">
        <a-layout>
            <TopNavBar />
            <a-layout class="main-container">
                <a-layout-content class="main">
                    <div class="main-content">
                        <RouterView v-slot="{ Component }">
                            <KeepAlive>
                                <transition name="fade">
                                    <component :is="Component" />
                                </transition>
                            </KeepAlive>
                        </RouterView>
                    </div>
                </a-layout-content>
                <!-- <Sider /> -->
            </a-layout>
            <a-layout-footer>
                <div class="footer-content">
                    <p>
                        <span>
                            Copyright &copy; 2024 ahu-bioinf-lab. All rights reserved.
                        </span>
                    </p>
                    <p>
                        <a href="https://beian.mit.gov.cn/" target="_blank">
                            皖ICP备2022016408号
                        </a>
                    </p>
                </div>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script lang="ts">
    export default { name: 'Layout' }
</script>

<style lang="scss" scoped>

$s: 50px;
$h: sqrt(5000);

.container {
    position: relative;
    width: 100%;
    height: 100%;
    .main-container.ant-layout {
        min-height: calc(100vh - 86px);
        background: #fff;
        // background: transparent url(../assets/images/bg2.jpg) no-repeat center / cover;
        // background: hsl(158, 53%, 94%);
        // background-image: repeating-linear-gradient(45deg,	transparent, transparent 25px, hsl(158, 53%, 90%) 25px, hsl(158, 53%, 90%) 50px);
        // background-size: $h $h;
        // background-position: center;
        .main {
            width: 100%;
            margin: 0 auto;
    
        }
    }
    .main-content {
        margin: 0;
        height: 100%;
    }
}

.content-wrapper {

}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
 
.fade-enter-from,
.fade-leave-to {
  display:none;
  opacity: 0;
//   transform: translate3d(0, 0, 0);
}

.ant-layout-footer {
    margin-top: 20px;
    padding: 20px 0;
    background-color: #B0BEC5;
    .footer-content {
        text-align: center;
        p {
            font-size: 14px;
            line-height: 24px;
            color: #fff;
            a {
                color: #fff;
                &:hover {
                    // #1b66fe
                    color: #F7AB60;
                }
            }
        }
    }
}

</style>

