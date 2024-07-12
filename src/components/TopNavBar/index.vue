<template>
    <a-layout-header  class="header-nav">
        <div class="header-row">
            <div class="logo" style="color: #fff;">
                <router-link to="/index" style="font-size: 28px; color: #fff;">
                    <img src="/logo.png" alt="logo" />
                </router-link>
            </div>
            <div class="menu">
                <div class="navbar">
                    <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" :items="items"/>
                    <div v-if="!userInfo" class="login">
                        <a href="javascript:;" @click="showLoginModal">Login</a>
                    </div>
                    <UserNavMenu  v-else :avatar="userInfo.avatar" :userName="userInfo.userName" />
                </div>
            </div>
        </div>
        <Login :showLogin="showLogin" @handleClose="onCloseModel" />
    </a-layout-header>
</template>


<script lang="ts" setup>
    import { h, ref } from 'vue';
    import { RouterLink, useRoute} from 'vue-router';
    import { MenuProps } from 'ant-design-vue';
    import { useUserStore } from '@/store/modules/user'

    const showLogin = ref(false);

    const route = useRoute()
    const userStore = useUserStore()

    const userInfo = computed(() =>  userStore.getUserInfo)

    const showLoginModal = () => {
        showLogin.value = true;
    }

    const onCloseModel = (value: boolean) => {
        showLogin.value = value;
    }

    const selectedKeys = ref<string[]>(['/index']);
    const items = ref<MenuProps['items']>([
    {
        key: '/index',
        // icon: () => h(MailOutlined),
        label: h(RouterLink, { to: '/index', }, () => 'Home'),
        title: 'Home',
    },
    {
        key: '/software',
        // icon: () => h(AppstoreOutlined),
        label: h('a', { class: 'softwares-dropmenu', href: 'javascript:;', }, 'Softwares'),
        title: 'Software',
        children: [
            {
                type: 'group',
                label: 'Molecular optimization',
                children: [
                {
                    label: h(RouterLink, { to: '/software/momo', }, () => 'MOMO'),
                    key: '/software/momo',
                },
                {
                    label: h(RouterLink, { to: '/software/cdmo', }, () => 'CDMO'),
                    key: '/software/cdmo',
                },
                ],
            },
            {
                type: 'group',
                label: 'Drug combinations and Drug synergy',
                children: [
                {
                    label: h(RouterLink, { to: '/software/casynergy', }, () => 'CASynergy'),
                    key: '/software/casynergy',
                },
                {
                    label: h(RouterLink, { to: '/software/transferban', }, () => 'TransferBan'),
                    key: '/software/transferban',
                },
                {
                    label: h(RouterLink, { to: '/software/dspe', }, () => 'DSPE'),
                    key: '/software/dspe',
                },
                ],
            }
        ],
    },
    {
        key: '/team',
        // icon: () => h(MailOutlined),
        label: h(RouterLink, { to: '/team', }, () => 'Teams'),
        title: 'Team',
    },
    {
        key: '/publication',
        // icon: () => h(MailOutlined),
        label: h(RouterLink, { to: '/publication', }, () => 'Publications'),
        title: 'Publication',
    },
    {
        key: '/about',
        // icon: () => h(MailOutlined),
        label: h(RouterLink, { to: '/about', }, () => 'About us'),
        title: 'About',
    }
    ]);

    watch(() => route.path, (path) => {
        selectedKeys.value = [path];
    }, { immediate: true });
</script>

<style scoped lang="scss">
@media screen and (min-width: 1200px) {
    .navbar {
        display: none;
        justify-content: start;
        font-size: 16px;
        flex: 1;
        .menu-list {
            display: flex;
            color: #000;
            li {
                .drop-item{
                    display: flex;
                }
                transition: all ease 0.4s;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                a {
                    font-weight: 400;
                }
                span {
                    font-family: 'Cartoonfont', 'Microsoft';
                    font-size: 18px;
                }
                &:hover {
                    text-shadow: 1px 1px 10px #fff;
                }
            }
        }
    }
}

.header-nav {
    height: 86px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #333;
    background-color: #9DDBF8;
    .logo {
        display: flex;
        align-items: center;
        a {
            width: 100px;
            height: 52px;
            img {
                width: 100%;
                vertical-align: top;
            }
        }
    }
}
.menu {
    .navbar {
        display: flex;
        justify-content: flex-end;
        :deep(.ant-menu) {
            background-color: transparent;
            border-bottom: none;
            .ant-menu-submenu {
                &::after {
                    display: none;
                }
            }
            .ant-menu-item, .ant-menu-submenu {
                &::after {
                    display: none;
                }
                .ant-menu-title-content {
                    a {
                        font-size: 18px;
                        font-weight: 600;
                        color: #fff;
                    }
                }
                &.ant-menu-submenu-active,&.ant-menu-submenu-open {
                    .ant-menu-title-content a {
                        color: #F7AB60;
                    }
                    .ant-menu-submenu-arrow {
                        color: #F7AB60;
                    }
                }
                .ant-menu-submenu-arrow {
                    display: inline;
                    right: -18px;
                    color: #fff;
                    margin-top: -2px;
                    transform: rotate(90deg);
                    &::before {
                        transform: rotate(45deg) translateY(-4px);
                    }
                    &::after {
                        transform: rotate(-45deg) translateY(4px);
                    }
                    &::before, &::after {
                        width: 10px;
                        
                    }
                }
            }
            .ant-menu-item-selected {
                .ant-menu-title-content a {
                    color: #F7AB60;
                }
            }
            
            .ant-menu-item-group-list .ant-menu-item-selected, .ant-menu-submenu-selected {
                .ant-menu-title-content a, .ant-menu-submenu-arrow {
                    color: #F7AB60;
                }
            }
        }

        .login {
            a {
                font-size: 18px;
                font-weight: 600;
                color: #fff;
            }
        }

    }
    .menu-list {
        li {
            padding: 0 16px;
            a {
                font-size: 18px;
                font-weight: 600;
                color: #fff;
            }
        }
    }
}


:global(.ant-menu-submenu .ant-menu .ant-menu-item-group .ant-menu-item-group-title) {
    position: relative;                
    font-weight: 600;
    border-bottom: 1px solid #F7AB60;
    color: #F7AB60;
}

.header-row {
    display: flex;
    max-width: 1240px;
    min-height: 4em;
    margin: 0 auto;
    justify-content: space-between;
}



@media screen and (min-width:992px) {
.navbar {
    .menu-list {
      display: flex;
      color: #000;
    }
  }
}
.ant-layout-header {
    width: 100%;
}
.menu-list {
    display: flex;
}
</style>