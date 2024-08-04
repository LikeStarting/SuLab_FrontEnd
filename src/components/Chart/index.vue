<template>
  <div id="chart" ref="chartContainer">

  </div>

</template>


<script lang="ts" setup>
  import * as echarts from 'echarts';

  const props = defineProps({
    options: Object
  });
  
  const chartContainer = ref(null)
  let chart = ref(null)
  

  const init = () => {
    chart.value = echarts.init(chartContainer.value)
    chart.value.setOption(props.options)
  }

  watch(() => [props.options], () => {
    chart.value.setOption(props.options)
  }, { deep: true });
  
  onMounted(() => {
    // chart = echarts.init(chartContainer.value)
    
    init()
  })
</script>


<style>
  #chart {
    width: 100%;
    height: 600px;
  }

</style>