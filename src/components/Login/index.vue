<template>
    <a-modal v-model:open="props.showLogin"  @cancel="closeModel">
        <div class="login-container">
            <div class="form">
                <CardTitle/>
                <LoginCard />
                <RegisterCard />
            </div>
        </div>
        <template #footer>

        </template>
    </a-modal>
</template>


<script lang="ts" setup>

    import { defineProps } from 'vue';
    import emitter from '@/utils/mitt'

    const title = ref('login')
    
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