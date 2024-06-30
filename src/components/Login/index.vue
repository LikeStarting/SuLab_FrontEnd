<template>
    <a-modal v-model:open="props.showLogin"  @cancel="closeModel">
        <div class="login-container">
            <div class="form">
                <h2>Log In</h2>
                <LoginCard />
            </div>
        </div>
        <template #footer>

        </template>
    </a-modal>
</template>


<script lang="ts" setup>
    import { defineProps } from 'vue';
    
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
    h2 {
        text-align: center;
        font-weight: 700;
        font-size: 30px;
    }

    :deep(.ant-tabs-nav-wrap) {
        justify-content: center;
    }
}
</style>