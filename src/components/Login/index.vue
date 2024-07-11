<template>
    <a-modal v-model:open="props.showLogin"  @cancel="closeModel">
        <div class="login-container">
            <div class="form">
                <CardTitle />
                <LoginCard @closeEvent="closeModel"/>
                <RegisterCard @closeEvent="closeModel"/>
                <Result title="Registered successfully!" />
            </div>
        </div>
        <template #footer>

        </template>
    </a-modal>
</template>


<script lang="ts" setup>
    const props = defineProps({
        showLogin: Boolean
    });

    const emit = defineEmits(['handleClose'])
    const closeModel = () => {
        emit('handleClose', false);
    }
</script>

<style lang="scss" scoped>
.login-container {
    :deep(.ant-tabs-nav-wrap) {
        justify-content: center;
    }
}
</style>