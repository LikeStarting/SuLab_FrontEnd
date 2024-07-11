<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClassName"></use>
    </svg>
</template>


<script lang="ts" setup name="SvgIcon">
    const props = defineProps<{
        iconName: string
        className?: string;
    }>()

    const svgClass = computed(() => {
        if (props.className) {
            return `svg-icon ${ props.className }`
        }
        return 'svg-icon'
    })

    const iconClassName = computed(() => `#${ props.iconName }`)
</script>

<style lang="scss" scoped>
    .svg-icon {
        width: 20px;
        height: 20px;
        fill: currentColor;
        vertical-align: -0.15em;
        overflow: hidden;
    }
</style>