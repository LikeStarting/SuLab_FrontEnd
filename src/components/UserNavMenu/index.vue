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
                <a href="javascript:;">Log Out</a>
            </a-menu-item>
        </a-menu>
        </template>
    </a-dropdown>
</template>


<script lang="ts" setup name="SvgIcon">
    const props = defineProps<{
        avatar: string;
        userName: string;
    }>()
</script>

<style lang="scss" scoped>
    .ant-dropdown-link {
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