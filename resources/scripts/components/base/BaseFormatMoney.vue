<template>
  <span style="font-family: sans-serif">{{ formattedAmount }}</span>
</template>

<script setup>
import { useCompanyStore } from '@/scripts/admin/stores/company'
import { inject, computed } from 'vue'

const props = defineProps({
  amount: {
    type: [Number, String],
    required: true,
  },
  currency: {
    type: Object,
    default: () => {
      return null
    },
  },
})

const utils = inject('utils')

const companyStore = useCompanyStore()

const formattedAmount = computed(() => {
  return utils.formatMoney(
    props.amount,
    !!props.currency ? { ...props.currency, precision: 2 } : { ...companyStore.selectedCompanyCurrency, precision: 2 }
  )
})
</script>
