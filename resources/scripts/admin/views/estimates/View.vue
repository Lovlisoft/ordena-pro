<template>
  <BasePage v-if="estimateData" :class="{ 'sm:w-1/2 lg:w-2/3' : estimateItemDetailOpen !== null }">
    <BasePageHeader :title="pageTitle" class="items-center">
      <template #title>
        <BaseEstimateStatusBadge 
            :status="estimateData.status.slug" 
            :color="estimateData.status.color"
            size="md"
            class="px-3 py-1 flex-none"
          >
            {{ estimateData.status.name }}
          </BaseEstimateStatusBadge>  
      </template>
      <template #actions>
        <div class="flex jusitfy-between items-center ">
          <div class="grow flex items-center justify-end">
            <BaseButton
              v-if="statusButtonVisible"
              :disabled="actionPendingToEnable"
              :content-loading="isLoadingEstimate"
              variant="primary"
              class="text-sm"
              @click="sendToStatus(mainAction?.action)"
            >
              {{ nextStatusDescription }}
            </BaseButton>

            <EstimateDropDown 
              class="ml-3" 
              :row="estimateData" 
              :statusActions="estimateAvailableActions"
              @action-execute="sendToStatus"
            />
          </div>
        </div>
      </template>
    </BasePageHeader>

    <div class="relative table-container pt-5">
        <BaseTable
          :data="estimateData.items"
          :columns="itemsColumns"
          :loading="isLoadingEstimate"
          actionRow="openItemDetail"
          :selectedRow="estimateItemDetailOpen"
          @open-item-detail="openEstimateItemDetail"
        >
          <template #cell-id="{ row }">
            <router-link
              :to="openEstimateItemDetail"
              class="font-medium text-primary-500"
            >{{ formatNumber(row.data.id) }}</router-link>
          </template>

          <template #cell-name="{ row }">
            {{ row.data.name }}
          </template>

          <template #cell-quantity="{ row }">
            {{ formatNumber(row.data.quantity) }}
          </template>

          <template #cell-precision_price="{ row }">
            <BaseFormatMoney :amount="row.data.precision_price" precision="6" />
          </template>

          <template #cell-total="{ row }">
            <BaseFormatMoney :amount="row.data.total" onlyFormat="true"/>
          </template>

          <template #cell-status="{ row }">
            <BaseEstimateStatusBadge 
              :status="row.data.status" 
              :color="row.data.status_color"
              class="px-3 py-1"
            >
              {{ row.data.status_name }}
            </BaseEstimateStatusBadge>
          </template>
        </BaseTable>
    </div>
  </BasePage>

  <EstimateItemDetail 
    :estimateItemDetailOpen="estimateItemDetailOpen !== null" 
    :estimateItem="estimateItemDetailOpen"
    :estimateData="estimateData"
    @close-estimateitemdetail="closeEstimateItemDetail"
    @update-estimate-item="loadEstimate(false)"
  />
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from 'lodash'

import { useEstimateStore } from '@/scripts/admin/stores/estimate'
import { useModalStore } from '@/scripts/stores/modal'
import { useDialogStore } from '@/scripts/stores/dialog'
import { useUserStore } from '@/scripts/admin/stores/user'

import BaseEstimateStatusBadge from '@/scripts/components/base/BaseEstimateStatusBadge.vue';
import EstimateDropDown from '@/scripts/admin/components/dropdowns/EstimateIndexDropdown.vue'
import EstimateItemDetail from '@/scripts/admin/components/modal-components/EstimateItemDetail.vue'
import LoadingIcon from '@/scripts/components/icons/LoadingIcon.vue'

import abilities from '@/scripts/admin/stub/abilities'
import BaseFormatMoney from '@/scripts/components/base/BaseFormatMoney.vue'
import utilities from '@/scripts/helpers/utilities';
import { main } from '@popperjs/core'

const { formatMoney, formatNumber } = utilities

const modalStore = useModalStore()
const estimateStore = useEstimateStore()
const dialogStore = useDialogStore()
const userStore = useUserStore()

const { t } = useI18n()
const estimateData = ref(null)
const route = useRoute()
const router = useRouter()

const isMarkAsSent = ref(false)
const isLoading = ref(false)
const isLoadingEstimate = ref(false)

const estimateList = ref(null)
const currentPageNumber = ref(1)
const lastPageNumber = ref(1)
const estimateListSection = ref(null)
const estimateItemDetailOpen = ref(null)
const mainAction = ref(null)

const searchData = reactive({
  orderBy: null,
  orderByField: null,
  searchText: null,
})

const itemsColumns = computed(() => {
  return [
    {
      key: 'id',
      label: "Partida",
    },
    {
      key: 'name',
      label: "Producto",
    },
    {
      key: 'quantity',
      label: "Litros",
      thClass: "text-right",
      tdClass: "text-right",
    },
    {
      key: 'precision_price',
      label: "Precio Unitario",
      thClass: "text-right",
      tdClass: "text-right",
    },
    {
      key: 'total',
      label: "Total",
      thClass: "text-right",
      tdClass: "text-right",
    },
    {
      key: 'status',
      label: "Estatus",
    }
  ]
})

const pageTitle = computed(() => 'Previa: ' + estimateData.value.estimate_number)

const actionPendingToEnable = computed(() => {
  let currentStatus = estimateData.value.status.slug
  let isEnabled = true

  switch (currentStatus) {
    case 'requested':
      isEnabled = checkForItemsStatus([
        'requested',
        'changes',
      ])
      break
    case 'changes':
      isEnabled = checkForItemsStatus([
        'requested',
        'changes',
      ])
      break
  }

  return ! isEnabled
})

function checkForItemsStatus(statuses) {
  let pendingItems = 0

  estimateData.value.items?.forEach(function (item) {
    console.log(item.status)
    if (statuses.includes(item.status)) {
      pendingItems++
    }
  })

  console.log(pendingItems)

  return pendingItems == 0 
}

const getOrderBy = computed(() => {
  if (searchData.orderBy === 'asc' || searchData.orderBy == null) {
    return true
  }
  return false
})

const nextStatusDescription = computed(() => {
  let description = 'Avanzar status'

  if (mainAction.value.action) {
    description = mainAction.value.label
  }

  return description
})

const statusButtonVisible = computed(() => {
  return typeof mainAction.value !== 'undefined' && mainAction.value !== null
})

const estimateAvailableActions = computed(() => {
  let actions = []

  estimateData.value.user_flow.next?.forEach(function (value) {
    if (value.main) {
      mainAction.value = value
    }

    actions.push(value)
  })

  estimateData.value.user_flow.previous?.forEach(function (value) {
    actions.push(value)
  })

  return actions
})

loadEstimate()

onSearched = debounce(onSearched, 500)

async function sendToStatus(status = null) {
  mainAction.value = null
  let estimate = estimateData.value
  let resp = await estimateStore.updateStatus(estimate.id, status)

  loadEstimate()
}

function hasActiveUrl(id) {
  return route.params.id == id
}

function openEstimateItemDetail(estimateItem) {
  estimateItemDetailOpen.value = estimateItem
}

function closeEstimateItemDetail() {
  estimateItemDetailOpen.value = null
}

function addScrollListener() {
  estimateListSection.value.addEventListener('scroll', (ev) => {
    if (
      ev.target.scrollTop > 0 &&
      ev.target.scrollTop + ev.target.clientHeight >
        ev.target.scrollHeight - 200
    ) {
      if (currentPageNumber.value < lastPageNumber.value) {
        loadEstimates(++currentPageNumber.value, true)
      }
    }
  })
}

async function loadEstimate(blockScreen = true) {
  isLoadingEstimate.value = blockScreen
  let response = await estimateStore.fetchEstimate(route.params.id)

  if (response.data) {
    isLoadingEstimate.value = false
    estimateData.value = { ...response.data.data }
  }
}

async function onSearched() {
  estimateList.value = []
  loadEstimates()
}

function sortData() {
  if (searchData.orderBy === 'asc') {
    searchData.orderBy = 'desc'
    onSearched()
    return true
  }
  searchData.orderBy = 'asc'
  onSearched()
  return true
}
</script>
