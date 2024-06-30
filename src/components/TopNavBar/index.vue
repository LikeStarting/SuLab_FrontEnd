<template>
    <a-layout-header  class="header-nav">
        <div class="header-row">
            <div class="logo" style="color: #fff;">
                <router-link to="/index" style="font-size: 28px; color: #fff;">Su Lab logo</router-link>
            </div>
            <div class="menu">
                <div class="navbar">
                    <ul class="menu-list">
                        <li>
                            <router-link to="/index">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/article">Articles</router-link>
                        </li>
                        <li>
                            <router-link to="/publication">Publications</router-link>
                        </li>
                        <li>
                            <router-link to="/team">Teams</router-link>
                        </li>
                        <li>
                            <router-link to="/about">About us</router-link>
                        </li>
                        <li>
                            <a href="javascript:;" @click="showLoginModal">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Login :showLogin="showLogin" @handleClose="onCloseModel" />
    </a-layout-header>
</template>


<script lang="ts" setup>
    import { ref } from 'vue';
    const showLogin = ref<boolean>(false);
    const showLoginModal = () => {
        showLogin.value = true;
    }

    const onCloseModel = (value: boolean) => {
        showLogin.value = value;
    }
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

.navbar {
    display: flex;
    justify-content: flex-end;
    .menu-list {
      display: flex;
      color: #000;
    }
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