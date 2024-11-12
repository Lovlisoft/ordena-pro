<template>
  <span :class="badgeColorClasses">
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
  }
})

const badgeColorClasses = computed(() => {
  let color = props.color ?? "gray"

  let classes = "text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 " +
    "bg-" + color + "-100 text-" + color + "-400"

  return classes
})
</script>
