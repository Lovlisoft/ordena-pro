<template>
  <BaseModal :show="modalActive" @close="closeEstimateFileUploadModal">
    <template #header>
      <div class="flex justify-between w-full">
        {{ modalStore.title }}
        <BaseIcon
          name="XIcon"
          class="h-6 w-6 text-gray-500 cursor-pointer"
          @click="closeEstimateFileUploadModal"
        />
      </div>
    </template>
    <div class="item-modal">
      <form action="" @submit.prevent="submitImportData">
        <div class="px-8 py-8 sm:p-6">
          <BaseInputGrid layout="one-column">
            <BaseInputGroup :label="$t('expenses.receipt')">
              <BaseFileUploader
                v-model="csvFile"
                accept=".csv,.xlsx,.xls"
                autoProcess="true"
                uploadUrl="/api/v1/files"
                @change="onFileInputChange"
                @remove="onFileInputRemove"
              />
            </BaseInputGroup>
          </BaseInputGrid>
        </div>
        <div
          class="z-0 flex justify-end p-4 border-t border-gray-200 border-solid"
        >
          <BaseButton
            class="mr-3"
            variant="primary-outline"
            type="button"
            @click="closeEstimateFileUploadModal"
          >
            {{ $t('general.cancel') }}
          </BaseButton>
          <BaseButton
            :loading="isLoading"
            :disabled="isLoading"
            variant="primary"
            type="submit"
          >
            <template #left="slotProps">
              <BaseIcon name="SaveIcon" :class="slotProps.class" />
            </template>
            Adjuntar Archivo
          </BaseButton>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  required,
  minLength,
  maxLength,
  minValue,
  helpers,
  alpha,
} from '@vuelidate/validators'
import { useModalStore } from '@/scripts/stores/modal'
import { useCompanyStore } from '@/scripts/admin/stores/company'
import { useTransactionStore } from '../../stores/transaction'

const emit = defineEmits(['newItem'])

const modalStore = useModalStore()
const companyStore = useCompanyStore()
const transactionStore = useTransactionStore()

const selectedAccount = ref(null)
const csvFile = ref(null)

const { t } = useI18n()
const isLoading = ref(false)
const taxPerItemSetting = ref(companyStore.selectedCompanySettings.tax_per_item)

const modalActive = computed(
  () => modalStore.active && modalStore.componentName === 'EstimateFileUploadModal'
)

const rules = {
  name: {
    required: helpers.withMessage(t('validation.required'), required),
    minLength: helpers.withMessage(
      t('validation.name_min_length', { count: 3 }),
      minLength(3)
    ),
  },

  description: {
    maxLength: helpers.withMessage(
      t('validation.description_maxlength', { count: 255 }),
      maxLength(255)
    ),
  },
}

async function submitImportData() {
  let data = {
    bank_account: selectedAccount,
    import_file: csvFile,
  }

  isLoading.value = true

  await transactionStore.importTransactions(data).then((res) => {
    isLoading.value = false
    if (res.data.data) {
      if (modalStore.data) {
        modalStore.refreshData(res.data.data)
      }
    }
    closeEstimateFileUploadModal()
  })
}

function closeEstimateFileUploadModal() {
  modalStore.closeModal()
  setTimeout(() => {
    modalStore.$reset()
    v$.value.$reset()
  }, 300)
}
</script>
