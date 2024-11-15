<template>
  <BasePage v-if="estimateData" :class="{ 'sm:w-1/2 lg:w-2/3' : estimateItemDetailOpen !== null }">
    <BasePageHeader :title="pageTitle" class="items-center">
      <template #actions>
        <div class="flex jusitfy-between items-center ">
          <BaseEstimateStatusBadge 
            :status="estimateData.status.slug" 
            :color="estimateData.status.color"
            size="md"
            class="px-3 py-1 flex-none"
          >
            {{ estimateData.status.name }}
          </BaseEstimateStatusBadge>

          <div class="grow flex items-center justify-end">
            <BaseButton
              v-if="userStore.hasAbilities(abilities.SEND_ESTIMATE)"
              :disabled="itemsPendingToReview"
              :content-loading="isLoadingEstimate"
              variant="primary"
              class="text-sm"
              @click="sendToNextStatus"
            >
              {{ nextStatusDescription }}
            </BaseButton>

            <EstimateDropDown class="ml-3" :row="estimateData" />
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
            <BaseFormatMoney :amount="row.data.total" />
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
import EstimateItemDropDown from '@/scripts/admin/components/dropdowns/EstimateItemDropdown.vue'
import EstimateDropDown from '@/scripts/admin/components/dropdowns/EstimateIndexDropdown.vue'
import EstimateItemDetail from '@/scripts/admin/components/modal-components/EstimateItemDetail.vue'
import LoadingIcon from '@/scripts/components/icons/LoadingIcon.vue'

import abilities from '@/scripts/admin/stub/abilities'
import BaseFormatMoney from '@/scripts/components/base/BaseFormatMoney.vue'
import utilities from '@/scripts/helpers/utilities';

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

const itemsPendingToReview = computed(() => {
  let pendingItems = 0

  estimateData.value.items?.forEach(function (item) {
    if (item.status == 'requested') {
      pendingItems++
    }
  })

  return pendingItems > 0
})

const getOrderBy = computed(() => {
  if (searchData.orderBy === 'asc' || searchData.orderBy == null) {
    return true
  }
  return false
})

const getOrderName = computed(() => {
  if (getOrderBy.value) {
    return t('general.ascending')
  }
  return t('general.descending')
})

const estimateItemSelected = computed(() => {
  if (estimateData.value && estimateData.value.id) {
    return estimate.value.id
  }
  return null
})

const nextStatusDescription = computed(() => {
  let description = 'Avanzar status'

  switch(estimateData.value.status?.slug) {
    case 'requested':
    case 'draft':
      description = 'Enviar a Revisión'
      break
    case "review":
      description = 'Solicitar Facturas'
      break
  }

  return description
})

loadEstimate()

onSearched = debounce(onSearched, 500)

async function sendToNextStatus(status = null) {
  let nextStatus = 'review'
  let estimate = estimateData.value

  switch (estimate.status.slug) {
    case 'requested':
    case 'draft':
      nextStatus = 'review'
      break
    default:
      nextStatus = 'requested'
  }

  let resp = await estimateStore.updateStatus(estimate.id, nextStatus)

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

function scrollToEstimate() {
  const el = document.getElementById(`estimate-${route.params.id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    el.classList.add('shake')
    addScrollListener()
  }
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

async function onSendEstimate(id) {
  modalStore.openModal({
    title: t('estimates.send_estimate'),
    componentName: 'SendEstimateModal',
    id: estimateData.value.id,
    data: estimateData.value,
  })
}

function updateSentEstimate() {
  let pos = estimateList.value.findIndex(
    (estimate) => estimate.id === estimateData.value.id
  )

  if (estimateList.value[pos]) {
    estimateList.value[pos].status = 'SENT'
    estimateData.value.status = 'SENT'
  }
}
</script>
