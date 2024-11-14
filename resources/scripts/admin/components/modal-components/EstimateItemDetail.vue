<template>
  <div
    ref="panelContent"
    class="absolute inset-0 sm:left-auto z-20 shadow-xl transition-transform duration-200 ease-in-out"
    :class="estimateItemDetailOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="sticky top-16 bg-gradient-to-b from-gray-100 to-white dark:from-[#151D2C] dark:to-gray-900 
      overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-l border-gray-200 dark:border-gray-700/60 w-full 
      sm:w-[calc(100dvw/2-128px)] 2xl:w-[calc(100dvw/3-80px)] h-[calc(100dvh-64px)]">

      <button ref="closeBtn" @click.stop="$emit('close-estimateitemdetail')" class="absolute top-0 right-0 mt-6 mr-6 group p-2">
        <svg class="fill-gray-400 group-hover:fill-gray-600 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
        </svg>
      </button>

      <div class="py-8 px-4 lg:px-8">
        <div class="max-w-sm mx-auto lg:max-w-none">

          <div class="text-gray-800 dark:text-gray-100 font-semibold text-center mb-1">{{ estimateData?.customer?.rfc }} {{ estimateData?.customer?.name }}</div>
          <div class="text-sm text-center italic">Solicita: {{ estimateData?.creator?.name }}</div>

          <!-- Details -->
          <div class="drop-shadow-md mt-5 ">
            <!-- Top -->
            <div class="bg-white dark:bg-gray-800 rounded-t-xl px-5 pb-2.5 text-center pt-5">
              <div class="text-2xl font-semibold text-green-500 mb-1">{{ formatMoney(estimateItem?.total) }}</div>
              <div class="text-sm font-medium text-gray-800 dark:text-gray-100 mb-3">{{ estimateItem?.name }}</div>
              <BaseEstimateStatusBadge :status="estimateItem?.status" class="px-3 py-1">
                {{ estimateItem?.status_name }}
              </BaseEstimateStatusBadge>
            </div>
            <!-- Divider -->
            <div class="flex justify-between items-center" aria-hidden="true">
              <svg class="fill-white dark:fill-gray-800" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
              </svg>
              <div class="grow w-full h-5 bg-white dark:bg-gray-800 flex flex-col justify-center">
                <div class="h-px w-full border-t border-dashed border-gray-200 dark:border-gray-700"></div>
              </div>
              <svg class="fill-white dark:fill-gray-800 rotate-180" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
              </svg>
            </div>
            <!-- Bottom -->
            <div class="bg-white dark:bg-gray-800 rounded-b-xl p-5 pt-2.5 text-sm space-y-3">
              <div class="flex justify-between space-x-1">
                <span class="italic">Partida:</span>
                <span class="font-medium text-gray-700 dark:text-gray-100 text-right">{{ formatNumber(estimateItem?.id) }}</span>
              </div>
              <div class="flex justify-between space-x-1">
                <span class="italic">Producto:</span>
                <span class="font-medium text-gray-700 dark:text-gray-100 text-right">{{ estimateItem?.name }}</span>
              </div>
              <div class="flex justify-between space-x-1">
                <span class="italic">Litros:</span>
                <span class="font-medium text-gray-700 dark:text-gray-100 text-right">{{ formatNumber(estimateItem?.quantity) }}</span>
              </div>
              <div class="flex justify-between space-x-1">
                <span class="italic">Precio Unitario:</span>
                <span class="font-medium text-gray-700 dark:text-gray-100 text-right">{{ formatMoney(estimateItem?.precision_price, 0, {itemPrecision: 6} )}}</span>
              </div>
              
            </div>
          </div>

          <!-- Receipts -->
          <FileAttachedTo 
            modelType="estimate-items"
            :modelId="estimateItem?.id"
            types=".pdf"
            collection="estimate_pdf"
            @update-parent-model="$emit('update-estimate-item')"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import utilities from '@/scripts/helpers/utilities'
import BaseEstimateStatusBadge from '@/scripts/components/base/BaseEstimateStatusBadge.vue'
import FileAttachedTo from '@/scripts/admin/components/FileAttachedTo.vue'

const { formatMoney, formatNumber } = utilities

const panelContent = ref(null)
const closeBtn = ref(null)

const props = defineProps({
  estimateItemDetailOpen: {
    type: Boolean,
    default: false,
  },
  estimateItem: {
    type: Object,
  },
  estimateData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close-estimateitemdetail'])
</script>