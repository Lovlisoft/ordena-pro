<template>
  <BaseModal
    :show="modalActive"
    @close="closeCustomerModal"
    @open="setInitialData"
  >
    <template #header>
      <div class="flex justify-between w-full">
        {{ modalStore.title }}

        <BaseIcon
          name="XIcon"
          class="h-6 w-6 text-gray-500 cursor-pointer"
          @click="closeCustomerModal"
        />
      </div>
    </template>
    <form action="" @submit.prevent="submitCustomerData">
      <div class="px-6 pb-3">
        <BaseTabGroup>
          <BaseTab :title="$t('customers.basic_info')" class="!mt-2">
            <BaseInputGrid layout="one-column">
             
              <BaseInputGroup
              :label="$t('customers.rfc')"
              required
              :error="
                v$.rfc.$error &&
                v$.rfc.$errors[0].$message
              "
              :content-loading="isFetchingInitialData"
            >
              <BaseInput
                v-model="customerStore.currentCustomer.rfc"
                :content-loading="isFetchingInitialData"
                type="text"
                name="name"
                class=""
                :invalid="v$.rfc.$error"
                @input="v$.rfc.$touch()"
              />
            </BaseInputGroup>

            <BaseInputGroup
              :label="$t('customers.legal_name')"
              required
              :error="
                v$.name.$error &&
                v$.name.$errors[0].$message
              "
              :content-loading="isFetchingInitialData"
            >
              <BaseInput
                v-model="customerStore.currentCustomer.name"
                :content-loading="isFetchingInitialData"
                type="text"
                name="name"
                class=""
                :invalid="v$.name.$error"
                @input="v$.name.$touch()"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="Regimen Fiscal"
              :content-loading="isFetchingInitialData"
              :error="
                v$.currency_id.$error &&
                v$.currency_id.$errors[0].$message
              "
              required
            >
              <BaseMultiselect
                v-model="customerStore.currentCustomer.sat_regime_id"
                value-prop="id"
                label="name"
                track-by="name"
                :content-loading="isFetchingInitialData"
                :options="globalStore.satRegimes"
                searchable
                :can-deselect="false"
                :placeholder="$t('customers.select_currency')"
                :invalid="v$.currency_id.$error"
                class="w-full"
              >
              </BaseMultiselect>
            </BaseInputGroup>
            </BaseInputGrid>
          </BaseTab>
        </BaseTabGroup>
      </div>

      <div
        class="z-0 flex justify-end p-4 border-t border-gray-200 border-solid"
      >
        <BaseButton
          class="mr-3 text-sm"
          type="button"
          variant="primary-outline"
          @click="closeCustomerModal"
        >
          {{ $t('general.cancel') }}
        </BaseButton>

        <BaseButton :loading="isLoading" variant="primary" type="submit">
          <template #left="slotProps">
            <BaseIcon
              v-if="!isLoading"
              name="SaveIcon"
              :class="slotProps.class"
            />
          </template>
          {{ $t('general.save') }}
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import {
  required,
  minLength,
  maxLength,
  email,
  alpha,
  url,
  helpers,
  requiredIf,
  sameAs,
} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import { useModalStore } from '@/scripts/stores/modal'
import { useEstimateStore } from '@/scripts/admin/stores/estimate'
import { useCustomerStore } from '@/scripts/admin/stores/customer'
import { useCompanyStore } from '@/scripts/admin/stores/company'
import { useGlobalStore } from '@/scripts/admin/stores/global'
import { useInvoiceStore } from '@/scripts/admin/stores/invoice'
import CopyInputField from '@/scripts/admin/components/CopyInputField.vue'
import { useNotificationStore } from '@/scripts/stores/notification'
import { useRecurringInvoiceStore } from '@/scripts/admin/stores/recurring-invoice'

const recurringInvoiceStore = useRecurringInvoiceStore()
const modalStore = useModalStore()
const estimateStore = useEstimateStore()
const customerStore = useCustomerStore()
const companyStore = useCompanyStore()
const globalStore = useGlobalStore()
const invoiceStore = useInvoiceStore()
const notificationStore = useNotificationStore()

let isFetchingInitialData = ref(false)

const { t } = useI18n()
const route = useRoute()
const isEdit = ref(false)
const isLoading = ref(false)
let isShowPassword = ref(false)
let isShowConfirmPassword = ref(false)

const validRFC = helpers.regex(/^([A-Z&]{3,4})\d{6}(?:[A-Z\d]{3})?$/)

const modalActive = computed(
  () => modalStore.active && modalStore.componentName === 'CustomerModal'
)

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(t('validation.required'), required),
      minLength: helpers.withMessage(
        t('validation.name_min_length', { count: 3 }),
        minLength(3)
      ),
    },
    rfc: {
        required: helpers.withMessage(t('validation.required'), required),
        validRFC: helpers.withMessage("El formato del RFC no es correcto", validRFC)
      },
    currency_id: {
      required: helpers.withMessage(t('validation.required'), required),
    },
    password: {
      required: helpers.withMessage(
        t('validation.required'),
        requiredIf(
          customerStore.currentCustomer.enable_portal == true &&
            !customerStore.currentCustomer.password_added
        )
      ),
      minLength: helpers.withMessage(
        t('validation.password_min_length', { count: 8 }),
        minLength(8)
      ),
    },
    confirm_password: {
      sameAsPassword: helpers.withMessage(
        t('validation.password_incorrect'),
        sameAs(customerStore.currentCustomer.password)
      ),
    },
    email: {
      required: helpers.withMessage(
        t('validation.required'),
        requiredIf(customerStore.currentCustomer.enable_portal == true)
      ),
      email: helpers.withMessage(t('validation.email_incorrect'), email),
    },
    prefix: {
      minLength: helpers.withMessage(
        t('validation.name_min_length', { count: 3 }),
        minLength(3)
      ),
    },
    website: {
      url: helpers.withMessage(t('validation.invalid_url'), url),
    },

    billing: {
      address_street_1: {
        maxLength: helpers.withMessage(
          t('validation.address_maxlength', { count: 255 }),
          maxLength(255)
        ),
      },
      address_street_2: {
        maxLength: helpers.withMessage(
          t('validation.address_maxlength', { count: 255 }),
          maxLength(255)
        ),
      },
    },

    shipping: {
      address_street_1: {
        maxLength: helpers.withMessage(
          t('validation.address_maxlength', { count: 255 }),
          maxLength(255)
        ),
      },
      address_street_2: {
        maxLength: helpers.withMessage(
          t('validation.address_maxlength', { count: 255 }),
          maxLength(255)
        ),
      },
    },
  }
})

const v$ = useVuelidate(
  rules,
  computed(() => customerStore.currentCustomer)
)

const getCustomerPortalUrl = computed(() => {
  return `${window.location.origin}/${companyStore.selectedCompany.slug}/customer/login`
})

function copyAddress() {
  customerStore.copyAddress()
}

async function setInitialData() {
  if (!customerStore.isEdit) {
    customerStore.currentCustomer.currency_id =
      companyStore.selectedCompanyCurrency.id
  }
}

async function submitCustomerData() {
  v$.value.$touch()

  if (v$.value.$invalid && customerStore.currentCustomer.email === '') {
    notificationStore.showNotification({
      type: 'error',
      message: t('settings.notification.please_enter_email'),
    })
  }

  if (v$.value.$invalid) {
    return true
  }

  isLoading.value = true

  let data = {
    ...customerStore.currentCustomer,
  }

  try {
    let response = null
    if (customerStore.isEdit) {
      response = await customerStore.updateCustomer(data)
    } else {
      response = await customerStore.addCustomer(data)
    }

    if (response.data) {
      isLoading.value = false
      // Automatically create newly created customer
      if (route.name === 'invoices.create' || route.name === 'invoices.edit') {
        invoiceStore.selectCustomer(response.data.data.id)
      }
      if (
        route.name === 'estimates.create' ||
        route.name === 'estimates.edit'
      ) {
        estimateStore.selectCustomer(response.data.data.id)
      }
      if (
        route.name === 'recurring-invoices.create' ||
        route.name === 'recurring-invoices.edit'
      ) {
        recurringInvoiceStore.selectCustomer(response.data.data.id)
      }
      closeCustomerModal()
    }
  } catch (err) {
    console.error(err)
    isLoading.value = false
  }
}

function closeCustomerModal() {
  modalStore.closeModal()
  setTimeout(() => {
    customerStore.resetCurrentCustomer()
    v$.value.$reset()
  }, 300)
}
</script>
