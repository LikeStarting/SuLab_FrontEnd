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
    :deep(.ant-form) {
        .ant-form-item {
            .login-btn {
                width: 100%;
                background-color: $active-color;
                &:hover {
                    background-color: $light-active-color;
                }
            }
            .ant-input-affix-wrapper {
                &:hover {
                    border-color: $light-active-color;
                }
            }
        }
        .bottom-box {
            text-align: center;
            span {
                cursor: pointer;
                color: $active-color;
            }
        }
    }
    
    :deep(.ant-input-affix-wrapper) {
        &:focus {
            border-color: $light-active-color;
            box-shadow: 0 0 6px rgba(248, 125, 0, 0.1);
        }
    }

    :deep(.ant-input-affix-wrapper-focused) {
        border-color: $light-active-color;
        box-shadow: 0 0 6px rgba(248, 125, 0, 0.1);
    }
}
</style>