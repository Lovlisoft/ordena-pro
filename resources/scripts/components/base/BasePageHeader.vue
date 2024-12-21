<template>
  <div class="flex flex-wrap justify-between">
    <div class="flex-none">
      <div class="flex">
        <h3 class="text-2xl font-bold text-left text-black pr-5">
          {{ title }}
        </h3>
        <slot name="title" />
      </div>
      
    </div>
    <div class="grow flex items-center justify-end">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: [String],
    default: '',
    required: true,
  },
})
</script>
