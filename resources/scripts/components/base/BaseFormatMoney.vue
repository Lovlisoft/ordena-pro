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
  precision: {
    type: Number,
    required: false,
    default: 2,
  },
  onlyFormat: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const utils = inject('utils')

const companyStore = useCompanyStore()

const formattedAmount = computed(() => {
  if (props.onlyFormat) {
    return props.amount.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    })
  }

  return utils.formatMoney(
    props.amount,
    props.currency || companyStore.selectedCompanyCurrency,
    {
      itemPrecision: props.precision,
    }
  )
})
</script>
