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
          height: 145px;
          .smiles-svg {
              max-width: 192px;
              max-height: 80px;
              svg {
                  width: 100%;
                  height: 100%;
              }
          }
          .ant-empty-normal {
            margin-block: 4px;
            .ant-empty-image {
              margin-bottom: 9px;
            }
          }
        }
      }
  }

  // @media screen and (max-width: 1080px) {
  //   .single-results {
  //     .content {
  //       :deep(.ant-table) {
  //         thead {
  //           tr {
  //             .ant-table-cell {
  //               padding: 2%;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
</style>