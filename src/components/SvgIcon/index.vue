<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClassName"></use>
    </svg>
</template>


<script lang="ts" setup name="SvgIcon">
    import { computed, defineProps } from "vue"

    // const props = defineProps({
    //     className: {
    //         type: String,
    //         default: ''
    //     },
    //     iconName: {
    //         type: String,
    //         required: true
    //     }
    // })

    const props = defineProps<{
        className: string;
        iconName: string
    }>()

    const svgClass = computed(() => {
        if (props.className) {
            return `svg-icon ${ props.className }`
        }
        return 'svg-icon'
    })

    const iconClassName = computed(() => `#${ props.iconName }`)


    // export default {
    //     name: 'SvgIcon',
    //     props: ['className', 'iconName']
    // }
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