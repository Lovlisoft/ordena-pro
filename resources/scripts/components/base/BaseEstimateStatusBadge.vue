<template>
  <span :class="dynamicClasses">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: false,
    default: '',
  },
  color: {
    type: String,
    required: false,
    default: "orange",
  },
  size: {
    type: String,
    required: false,
    default: 'xs',
  }
})

const dynamicClasses = computed(() => {
  let color = props.color ?? "gray"
  let padding = "px-3 py-3"
  let fontWeight = "font-medium"

  switch (props.size) {
    case 'md':
      padding = "px-5 py-5"
      break
    case 'sm':
      padding = "px-3 py-4"
      fontWeight = "font-normal"
      break
    default:
      padding = "px-3 py-2"
  }

  let classes = "text-" + props.size + " inline-flex rounded-full text-center " 
    + padding + " bg-" + color + "-100 text-" + color + "-400 " + fontWeight

  return classes
})
</script>
