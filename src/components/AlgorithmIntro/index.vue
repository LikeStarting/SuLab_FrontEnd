<template>
  <div class="algorithm-intro">
      <h2>
          <SvgIcon :iconName="iconClass" :className="iconTitleClass"/>
          {{ algorithmName }}
      </h2>
      <div class="content">
        <div class="border-box">
          <div class="inner-box">
            {{ content }}
          </div>
        </div>
      </div>
  </div>
</template>


<script setup lang="ts">
    const props = defineProps<{
      algorithmName: string,
      content: string,
      iconClass: string,
      iconTitleClass?: string
    }>()


    const content = computed(() => `${ props.content }`)
    const algorithmName = computed(() => `${ props.algorithmName }`)
    const iconClass = computed(() => `${ props.iconClass }`)
    const iconTitleClass = computed(() => {
        if (props.iconTitleClass) {
            return `icon-title ${ props.iconTitleClass }`
        }
        return 'icon-title'
    })
</script>


<style lang="scss" scoped>
  .algorithm-intro {
      h2 {
          font-size: 30px;
          text-align: center;
          .icon-title {
              width: 40px;
              height: 40px;
              vertical-align: top;
              margin-top: 4px;
          }
      }
      .content {
          padding: 6px;
          background-color: rgb(157, 219, 248, 0.4);
          .border-box {
            padding: 6px;
            border: 3px solid #3f8ede;
            background-color: #fff;
          }
          .inner-box {
            padding: 20px 14px;
            font-size: 18px;
            line-height: 1.5;
            border: 2px dashed $theme-color;
            border-radius: 6px;
          }
      }
  }
</style>