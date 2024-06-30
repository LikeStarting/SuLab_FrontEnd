<template>
    <a-layout-header  class="header-nav">
        <div class="header-row">
            <div class="logo" style="color: #fff;">
                <router-link to="/index" style="font-size: 28px; color: #fff;">Su Lab logo</router-link>
            </div>
            <div class="menu">
                <div class="navbar">
                    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items"/>
                    <div class="login">
                        <a href="javascript:;" @click="showLoginModal">Login</a>
                    </div>
                </div>
            </div>
        </div>
        <Login :showLogin="showLogin" @handleClose="onCloseModel" />
    </a-layout-header>
</template>


<script lang="ts" setup>
    import { h, ref } from 'vue';
    import { RouterLink} from 'vue-router';
    const showLogin = ref<boolean>(false);
    const showLoginModal = () => {
        showLogin.value = true;
    }

    const onCloseModel = (value: boolean) => {
        showLogin.value = value;
    }

    import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
    import { MenuProps } from 'ant-design-vue';
    const current = ref<string[]>(['home']);
    const items = ref<MenuProps['items']>([
    {
        key: 'home',
        // icon: () => h(MailOutlined),
        label: h(RouterLink, { to: '/index', }, 'Home'),
        title: 'Home',
    },
    {
        key: 'software',
        // icon: () => h(AppstoreOutlined),
        label: h(RouterLink, { to: '/software', }, 'Software'),
        title: 'Software',
        children: [
            {
                type: 'group',
                label: 'Direction 1',
                children: [
                {
                    label: h(RouterLink, { to: '/software/1', }, 'Tool1'),
                    key: 'tool:1',
                },
                {
                    label: h(RouterLink, { to: '/software/2', }, 'Tool2'),
                    key: 'tool:2',
                },
                ],
            },
            {
                type: 'group',
                label: 'Direction 2',
                children: [
                {
                    label: h(RouterLink, { to: '/software/3', }, 'Tool3'),
                    key: 'tool:1',
                },
                {
                    label: h(RouterLink, { to: '/software/4', }, 'Tool4'),
                    key: 'tool:2',
                },
                ],
            },
        ],
    },
    {
        key: 'team',
        // icon: () => h(MailOutlined),
        label: h(RouterLink, { to: '/team', }, 'Teams'),
        title: 'Team',
    },
    {
        key: 'publication',
        // icon: () => h(MailOutlined),
        label: h(RouterLink, { to: '/publication', }, 'Publications'),
        title: 'Publication',
    },
    {
        key: 'about',
        // icon: () => h(MailOutlined),
        label: h(RouterLink, { to: '/about', }, 'About us'),
        title: 'About',
    }
    ]);
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
}
.menu {
    .navbar {
        display: flex;
        justify-content: flex-end;
        :deep(.ant-menu) {
            background-color: transparent;
            .ant-menu-title-content {
                a {
                    font-size: 18px;
                    font-weight: 600;
                    color: #fff;
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