<template>
  <div class="single-results">
      <div class="content">
        <a-table :columns="props.columns" :data-source="props.data" bordered :pagination="false"/>
      </div>
  </div>
</template>


<script setup lang="ts">
    const props = defineProps<{
      columns: Array<any>,
      data: Array<any>
    }>()
</script>


<style lang="scss" scoped>
  .single-results {
    margin-top: 16px;
      .content {
        :deep(.ant-table) {
          .smiles-svg {
              width: 192px;
              height: 80px;
              svg {
                  width: 100%;
                  height: 100%;
              }
          }
          .ant-empty-normal {
            margin-block: 16px;
          }
        }
      }
  }
</style>