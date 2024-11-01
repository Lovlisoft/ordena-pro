<template>
  <SendEstimateModal @update="updateSentEstimate" />
  <EstimateFileUploadModal />
  <BasePage v-if="estimateData">
    <BasePageHeader :title="pageTitle">
      <template #actions>
        <div class="mr-3 text-sm">
          <BaseButton
            v-if="
              estimateData.status === 'DRAFT' &&
              userStore.hasAbilities(abilities.EDIT_ESTIMATE)
            "
            :disabled="isMarkAsSent"
            :content-loading="isLoadingEstimate"
            variant="primary-outline"
            @click="onMarkAsSent"
          >
            {{ $t('estimates.mark_as_sent') }}
          </BaseButton>
        </div>

        <BaseButton
          v-if="
            estimateData.status === 'DRAFT' &&
            userStore.hasAbilities(abilities.SEND_ESTIMATE)
          "
          :content-loading="isLoadingEstimate"
          variant="primary"
          class="text-sm"
          @click="onSendEstimate"
        >
          {{ $t('estimates.send_estimate') }}
        </BaseButton>

        <EstimateDropDown class="ml-3" :row="estimateData" />
      </template>
    </BasePageHeader>

    <div class="relative table-container pt-5" >
        <BaseTable
          :data="estimateData.items"
          :columns="itemsColumns"
          :loading="isLoadingEstimate"
        >
          <template #cell-id="{ row }">
            <router-link
              :to="openEstimateFileUploadModal"
              class="font-medium text-primary-500"
            >{{ row.data.id }}</router-link>
          </template>

          <template #cell-name="{ row }">
            {{ row.data.name }}
          </template>

          <template #cell-quantity="{ row }">
            {{ row.data.quantity }}
          </template>

          <template #cell-precision_price="{ row }">
            {{ row.data.precision_price }}
          </template>

          <template #cell-total="{ row }">
            {{ row.data.total }}
          </template>

          <template #cell-actions>
            <EstimateItemDropDown class="ml-3" :row="estimateData" />
          </template>
        </BaseTable>
    </div>


    <!-- <div
      class="flex flex-col min-h-0 mt-8 overflow-hidden"
      style="height: 75vh"
    >
      <iframe
        :src="`${shareableLink}`"
        class="
          flex-1
          border border-gray-400 border-solid
          rounded-md
          bg-white
          frame-style
        "
      />
    </div> -->
  </BasePage>
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

import EstimateItemDropDown from '@/scripts/admin/components/dropdowns/EstimateItemDropdown.vue'
import EstimateDropDown from '@/scripts/admin/components/dropdowns/EstimateIndexDropdown.vue'
import SendEstimateModal from '@/scripts/admin/components/modal-components/SendEstimateModal.vue'
import EstimateFileUploadModal from '@/scripts/admin/components/modal-components/EstimateFileUploadModal.vue'
import LoadingIcon from '@/scripts/components/icons/LoadingIcon.vue'
import BaseCard from '@/scripts/components/base/BaseCard.vue'

import abilities from '@/scripts/admin/stub/abilities'

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
    },
    {
      key: 'precision_price',
      label: "Precio Unitario",
    },
    {
      key: 'total',
      label: "Total",
    },
    {
      key: 'actions',
      label: "Acciones",
      tdClass: 'text-right text-sm font-medium pl-0',
      thClass: 'text-right pl-0',
      sortable: false,
    },
  ]
})

const pageTitle = computed(() => 'Previa: ' + estimateData.value.estimate_number)

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

const shareableLink = computed(() => {
  return `/estimates/pdf/${estimateData.value.unique_hash}`
})

const getCurrentEstimateId = computed(() => {
  if (estimateData.value && estimateData.value.id) {
    return estimate.value.id
  }
  return null
})

watch(route, (to, from) => {
  if (to.name === 'estimates.view') {
    loadEstimate()
  }
})

loadEstimates()
loadEstimate()

onSearched = debounce(onSearched, 500)

function hasActiveUrl(id) {
  return route.params.id == id
}

async function loadEstimates(pageNumber, fromScrollListener = false) {
  if (isLoading.value) {
    return
  }

  let params = {}
  if (
    searchData.searchText !== '' &&
    searchData.searchText !== null &&
    searchData.searchText !== undefined
  ) {
    params.search = searchData.searchText
  }

  if (searchData.orderBy !== null && searchData.orderBy !== undefined) {
    params.orderBy = searchData.orderBy
  }

  if (
    searchData.orderByField !== null &&
    searchData.orderByField !== undefined
  ) {
    params.orderByField = searchData.orderByField
  }

  isLoading.value = true
  let response = await estimateStore.fetchEstimates({
    page: pageNumber,
    ...params,
  })
  isLoading.value = false

  estimateList.value = estimateList.value ? estimateList.value : []
  estimateList.value = [...estimateList.value, ...response.data.data]

  currentPageNumber.value = pageNumber ? pageNumber : 1
  lastPageNumber.value = response.data.meta.last_page
  let estimateFound = estimateList.value.find(
    (est) => est.id == route.params.id
  )

  if (
    fromScrollListener == false &&
    !estimateFound &&
    currentPageNumber.value < lastPageNumber.value &&
    Object.keys(params).length === 0
  ) {
    loadEstimates(++currentPageNumber.value)
  }

  if (estimateFound) {
    setTimeout(() => {
      if (fromScrollListener == false) {
        scrollToEstimate()
      }
    }, 500)
  }
}

function openEstimateFileUploadModal() {
  modalStore.openModal({
    title: "Cargar Previa",
    componentName: 'EstimateFileUploadModal',
    refreshData: (val) => emit('select', val),
    // data: {
    //   taxPerItem: props.taxPerItem,
    //   taxes: props.taxes,
    //   itemIndex: props.index,
    //   store: props.store,
    //   storeProps: props.storeProp,
    // },
  })
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

async function loadEstimate() {
  isLoadingEstimate.value = true
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

async function onMarkAsSent() {
  dialogStore
    .openDialog({
      title: t('general.are_you_sure'),
      message: t('estimates.confirm_mark_as_sent'),
      yesLabel: t('general.ok'),
      noLabel: t('general.cancel'),
      variant: 'primary',
      hideNoButton: false,
      size: 'lg',
    })
    .then((response) => {
      isMarkAsSent.value = false
      if (response) {
        estimateStore.markAsSent({
          id: estimateData.value.id,
          status: 'SENT',
        })
        estimateData.value.status = 'SENT'
        isMarkAsSent.value = true
      }
      isMarkAsSent.value = false
    })
}

async function onSendEstimate(id) {
  modalStore.openModal({
    title: t('estimates.send_estimate'),
    componentName: 'SendEstimateModal',
    id: estimateData.value.id,
    data: estimateData.value,
  })
}

async function removeEstimate(id) {
  dialogStore
    .openDialog({
      title: t('general.are_you_sure'),
      message: t('estimates.confirm_delete'),
      yesLabel: t('general.ok'),
      noLabel: t('general.cancel'),
      variant: 'danger',
      hideNoButton: false,
      size: 'lg',
    })
    .then((res) => {
      if (res) {
        estimateStore
          .deleteEstimate({ ids: [id] })
          .then(() => {
            router.push('/admin/estimates')
          })
          .catch((err) => {
            console.error(err)
          })
      }
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
