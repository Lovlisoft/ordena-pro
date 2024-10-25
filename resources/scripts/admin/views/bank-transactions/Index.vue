<template>
  <BankImportModal />
  <BasePage class="payments">
    <SendPaymentModal />
    <BasePageHeader :title="$t('transactions.title')">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="$t('general.home')" to="dashboard" />
        <BaseBreadcrumbItem :title="$tc('transactions.transactions', 2)" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <BaseButton
          v-show="paymentStore.paymentTotalCount"
          variant="primary-outline"
          @click="toggleFilter"
        >
          {{ $t('general.filter') }}

          <template #right="slotProps">
            <BaseIcon
              v-if="!showFilters"
              :class="slotProps.class"
              name="FilterIcon"
            />
            <BaseIcon v-else name="XIcon" :class="slotProps.class" />
          </template>
        </BaseButton>

        <BaseButton
            v-if="userStore.currentUser.is_owner"
            @click="openBankImportModal"
          >
            <template #left="slotProps">
              <BaseIcon
                name="PlusIcon"
                :class="slotProps.class"
                aria-hidden="true"
              />
            </template>
            Importar Movimientos
          </BaseButton>
      </template>
    </BasePageHeader>

    <BaseEmptyPlaceholder
      v-if="showEmptyScreen"
      :title="$t('payments.no_payments')"
      :description="$t('payments.list_of_payments')"
    >
      <CapsuleIcon class="mt-5 mb-4" />

      <template
        v-if="userStore.hasAbilities(abilities.CREATE_PAYMENT)"
        #actions
      >
        <BaseButton
          variant="primary-outline"
          @click="$router.push('/admin/payments/create')"
        >
          <template #left="slotProps">
            <BaseIcon name="PlusIcon" :class="slotProps.class" />
          </template>
          {{ $t('payments.add_new_payment') }}
        </BaseButton>
      </template>
    </BaseEmptyPlaceholder>

    <div v-show="!showEmptyScreen" class="relative table-container">
      <BaseTable
        ref="tableComponent"
        :data="fetchData"
        :columns="transactionColumns"
        :placeholder-count="transactionStore.transactionTotalCount >= 20 ? 10 : 5"
        class="mt-3"
      >
        <!-- Select All Checkbox -->
        <template #header>
          <div class="absolute items-center left-6 top-2.5 select-none">
            <BaseCheckbox
              v-model="selectAllFieldStatus"
              variant="primary"
              @change="paymentStore.selectAllPayments"
            />
          </div>
        </template>

        <template #cell-status="{ row }">
          <div class="relative block">
            <BaseCheckbox
              :id="row.data.id"
              v-model="selectField"
              :value="row.data.id"
              variant="primary"
            />
          </div>
        </template>

        <template #cell-date="{ row }">
          {{ row.data.date }}
        </template>

        <template #cell-account="{ row }">
          {{ row.data.account }}
        </template>

        <template #cell-reference="{ row }">
          <router-link v-if="row.data.reference_link"
            :to="{ path: `${row.data.reference_link}` }"
            class="font-medium text-primary-500"
          >
            {{ row.data.reference }}
          </router-link>

          <span v-else>
            {{ row.data.reference }}
          </span>
        </template>

        <template #cell-debit="{ row }">
          {{ row.data.debit }}
        </template>

        <template #cell-credit="{ row }">
          {{ row.data.credit }}
        </template>

        <!-- <template #cell-amount="{ row }">
          <BaseFormatMoney
            :amount="row.data.amount"
            :currency="row.data.customer.currency"
          />
        </template> -->

        <template v-if="hasAtleastOneAbility()" #cell-actions="{ row }">
          <PaymentDropdown :row="row.data" :table="tableComponent" />
        </template>
      </BaseTable>
    </div>
  </BasePage>
</template>

<script setup>
import { debouncedWatch } from '@vueuse/core'

import { ref, reactive, computed, onUnmounted } from 'vue'

import { useI18n } from 'vue-i18n'
import { useDialogStore } from '@/scripts/stores/dialog'
import { usePaymentStore } from '@/scripts/admin/stores/payment'
import { useTransactionStore } from '@/scripts/admin/stores/transaction'
import { useCompanyStore } from '@/scripts/admin/stores/company'
import { useUserStore } from '@/scripts/admin/stores/user'
import abilities from '@/scripts/admin/stub/abilities'
import CapsuleIcon from '@/scripts/components/icons/empty/CapsuleIcon.vue'
// import PaymentDropdown from '@/scripts/admin/components/dropdowns/PaymentIndexDropdown.vue'
import SendPaymentModal from '@/scripts/admin/components/modal-components/SendPaymentModal.vue'
import BankImportModal from '@/scripts/admin/components/modal-components/BankImportModal.vue'
import { useModalStore } from '@/scripts/stores/modal'

const { t } = useI18n()
let showFilters = ref(false)
let isFetchingInitialData = ref(true)
let tableComponent = ref(null)

const filters = reactive({
  customer: '',
  payment_mode: '',
  payment_number: '',
})

const paymentStore = usePaymentStore()
const transactionStore = useTransactionStore()
const companyStore = useCompanyStore()
const dialogStore = useDialogStore()
const userStore = useUserStore()
const modalStore = useModalStore()

const showEmptyScreen = computed(() => {
  return !transactionStore.transactionTotalCount && !isFetchingInitialData.value
})

function openBankImportModal() {
  modalStore.openModal({
    title: "Importar Movimientos",
    componentName: 'BankImportModal',
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

const transactionColumns = computed(() => {
  return [
    {
      key: 'status',
      sortable: false,
      thClass: 'extra w-10',
      tdClass: 'text-left text-sm font-medium extra',
    },
    {
      key: 'date',
      label: t('transactions.date'),
      thClass: 'extra',
      tdClass: 'font-medium text-gray-900',
    },
    { key: 'account', label: t('transactions.bank') },
    { key: 'reference', label: t('transactions.reference') },
    
    { key: 'debit', label: t('transactions.debit') },
    { key: 'credit', label: t('transactions.credit') },
    {
      key: 'actions',
      label: '',
      tdClass: 'text-right text-sm font-medium',
      sortable: false,
    },
  ]
})

const selectField = computed({
  get: () => paymentStore.selectedPayments,
  set: (value) => {
    return paymentStore.selectPayment(value)
  },
})

const selectAllFieldStatus = computed({
  get: () => paymentStore.selectAllField,
  set: (value) => {
    return paymentStore.setSelectAllState(value)
  },
})

debouncedWatch(
  filters,
  () => {
    setFilters()
  },
  { debounce: 500 }
)

onUnmounted(() => {
  if (paymentStore.selectAllField) {
    paymentStore.selectAllPayments()
  }
})

paymentStore.fetchPaymentModes({ limit: 'all' })

async function searchPayment(search) {
  let res = await paymentStore.fetchPaymentModes({ search })
  return res.data.data
}

function hasAtleastOneAbility() {
  return userStore.hasAbilities([
    abilities.DELETE_PAYMENT,
    abilities.EDIT_PAYMENT,
    abilities.VIEW_PAYMENT,
    abilities.SEND_PAYMENT,
  ])
}

async function fetchData({ page, filter, sort }) {
  let data = {
    customer_id: filters.customer_id,
    payment_method_id:
      filters.payment_mode !== null ? filters.payment_mode : '',
    payment_number: filters.payment_number,
    orderByField: sort.fieldName || 'created_at',
    orderBy: sort.order || 'desc',
    page,
  }

  isFetchingInitialData.value = true

  let response = await transactionStore.fetchTransactions(data)

  isFetchingInitialData.value = false

  return {
    data: response.data.data,
    pagination: {
      totalPages: response.data.meta.last_page,
      currentPage: response.data.meta.current_page,
      totalCount: response.data.meta.total,
      limit: 10,
    },
  }
}

function refreshTable() {
  tableComponent.value && tableComponent.value.refresh()
}

function setFilters() {
  refreshTable()
}

function clearFilter() {
  filters.customer_id = ''
  filters.payment_mode = ''
  filters.payment_number = ''
}

function toggleFilter() {
  if (showFilters.value) {
    clearFilter()
  }

  showFilters.value = !showFilters.value
}

function removeMultiplePayments() {
  dialogStore
    .openDialog({
      title: t('general.are_you_sure'),
      message: t('payments.confirm_delete', 2),
      yesLabel: t('general.ok'),
      noLabel: t('general.cancel'),
      variant: 'danger',
      hideNoButton: false,
      size: 'lg',
    })
    .then((res) => {
      if (res) {
        paymentStore.deleteMultiplePayments().then((response) => {
          if (response.data.success) {
            refreshTable()
          }
        })
      }
    })
}
</script>
