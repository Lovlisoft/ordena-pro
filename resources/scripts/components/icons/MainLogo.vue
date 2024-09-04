<template>
  <div class="flex items-center min-w-[100px] w-full h-full">
    <div class="w-full h-full flex items-center justify-center">
     <V8Logo />
    </div>
    <!-- <div class="flex items-center gap-x-1">
      <span class="font-bold text-4xl tracking-tighter">
        V8
      </span>
      <span class="font-bold text-4xl tracking-tighter">Garage</span>
    </div> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import V8Logo from './V8Logo.vue'


const props = defineProps({
  inverted: {
    type: Boolean,
    default: false,
  },
})

const mainColor = computed(() => {
  return props.inverted ? "fill:#000" : "fill:#fff"
})

const secondaryColor = computed(() => {
  return props.inverted ? "fill:#5560A9" : "fill:#000"
})
</script>
