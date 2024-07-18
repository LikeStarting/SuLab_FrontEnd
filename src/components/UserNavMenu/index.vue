<template>
    <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
            <span class="avatar">
                <img :src="props.avatar" alt="" />
            </span>
            <span class="name">{{ props.userName }}</span>
            <SvgIcon iconName="icon-xiala-" />
        </a>
        <template #overlay>
        <a-menu>
            <a-menu-item>
                <a href="javascript:;" @click="handleLogout">Log Out</a>
            </a-menu-item>
        </a-menu>
        </template>
    </a-dropdown>
</template>


<script lang="ts" setup name="SvgIcon">
    import { useUserStore } from '@/store/modules/user'
    import { message } from 'ant-design-vue'

    const userStore = useUserStore()

    const props = defineProps<{
        avatar: string;
        userName: string;
    }>()

    const handleLogout = async () => {
        const { data } = await userStore.Logout()
        message.success({ content: data, duration: 2 })
    }
</script>

<style lang="scss" scoped>
    .ant-dropdown-link {
        min-width: 120px;
        .avatar {
            display: inline-block;
            height: 30px;
            vertical-align: middle;
            img {
                height: 100%;
                vertical-align: top
            }
        }
        .name {
            margin-right: 4px;
        }
    }
</style>