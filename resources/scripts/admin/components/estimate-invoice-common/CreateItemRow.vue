<template>
  <tr class="box-border bg-white border border-gray-200 border-solid rounded-b">
    <td colspan="5" class="p-0 text-left align-top pt-2">
      <table class="w-full">
        <colgroup>
          <col style="width: 30%; min-width: 280px" />
          <col style="width: 20%; min-width: 120px" />
          <col style="width: 20%; min-width: 120px" />
          <col style="width: 15%; min-width: 120px" />
          <col style="width: 15%; min-width: 120px" />
        </colgroup>
        <tbody>
          <tr>
            <td class="px-2 py-2 text-left align-top">
              <div class="flex justify-start">
                <div
                  class="flex items-center justify-center w-5 
                    h-5 mt-2 mr-2 text-gray-300 cursor-move  handle"
                >
                  <DragIcon />
                </div>
                <BaseItemSelect
                  type="Invoice"
                  :item="itemData"
                  :invalid="v$.name.$error"
                  :invalid-description="v$.description.$error"
                  :taxes="itemData.taxes"
                  :index="index"
                  :store-prop="storeProp"
                  :store="store"
                  @search="searchVal"
                  @select="onSelectItem"
                />
              </div>
            </td>
            <td class="px-2 py-2 text-right align-top">
              <BaseInput
                v-model="quantity"
                :invalid="v$.quantity.$error"
                :content-loading="loading"
                type="number"
                small
                min="0"
                step="any"
                @change="syncItemToStore()"
                @input="v$.quantity.$touch()"
              />
            </td>
            <td class="px-2 py-2 text-left align-top">
              <div class="flex flex-col">
                <div class="flex-auto flex-fill bd-highlight">
                  <div class="relative w-full">
                    <BaseItemMoney
                      :key="selectedCurrency"
                      v-model="precisionPrice"
                      :invalid="v$.price.$error"
                      :content-loading="loading"
                      :currency="selectedCurrency"
                      :item-precision="DEFAULT_ITEM_PRECISION"
                      :disabled="true"
                    />
                  </div>
                </div>
              </div>
            </td>

            <td class="px-2 py-2 text-left align-top">
              <div class="flex flex-col">
                <div class="flex-auto flex-fill bd-highlight">
                  <div class="relative w-full">
                    <BaseItemMoney
                      :key="selectedCurrency"
                      v-model="compositePrice"
                      :invalid="v$.price.$error"
                      :content-loading="loading"
                      :currency="selectedCurrency"
                      :item-precision="DEFAULT_ITEM_PRECISION"
                    />
                  </div>
                </div>
              </div>
            </td>
        
            <td class="px-2 py-2 text-right align-top">
              <div class="flex items-center justify-end text-sm">
                <span>
                  <BaseContentPlaceholders v-if="loading">
                    <BaseContentPlaceholdersText :lines="1" class="w-16 h-5" />
                  </BaseContentPlaceholders>

                  <BaseItemMoney
                    v-else
                    :key="selectedCurrency"
                    v-model="total"
                    :currency="selectedCurrency"
                    :item-precision="2"
                  />
                </span>
                <div class="flex items-center justify-center w-6 h-10 mx-2">
                  <BaseIcon
                    v-if="showRemoveButton"
                    class="h-5 text-gray-700 cursor-pointer"
                    name="TrashIcon"
                    @click="store.removeItem(index)"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="px-12 pb-4 text-right">
        <BaseLabel>Monto Base:</BaseLabel> <span class="text-sm pr-6">{{ basePriceStr }}</span>
        <span v-if="iepsBreakdown"><BaseLabel>IEPS:</BaseLabel> <span class="text-sm pr-6">{{ iepsTaxStr }}</span></span>
        <BaseLabel>IVA (16%): </BaseLabel> <span class="text-sm">{{ ivaTaxStr }}</span>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { computed, ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Guid from 'guid'
import TaxStub from '@/scripts/admin/stub/tax'
import ItemTax from './CreateItemRowTax.vue'
import { sumBy } from 'lodash'
import abilities from '@/scripts/admin/stub/abilities'
import {
  required,
  between,
  maxLength,
  helpers,
  minValue,
} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useCompanyStore } from '@/scripts/admin/stores/company'
import { useItemStore } from '@/scripts/admin/stores/item'
import DragIcon from '@/scripts/components/icons/DragIcon.vue'
import { DEFAULT_ITEM_PRECISION } from '@/scripts/admin/config/constants'

import utilities from '@/scripts/helpers/utilities'
import BaseLabel from '@/scripts/components/base/BaseLabel.vue'
import BaseItemMoney from '@/scripts/components/base/BaseItemMoney.vue'
import { useEstimateStore } from '../../stores/estimate'

const { getItemDecimalPrecisionMultiplier } = utilities;

const props = defineProps({
  store: {
    type: Object,
    default: null,
  },
  storeProp: {
    type: String,
    default: '',
  },
  itemData: {
    type: Object,
    default: null,
  },
  index: {
    type: Number,
    default: null,
  },
  type: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  currency: {
    type: [Object, String],
    required: true,
  },
  invoiceItems: {
    type: Array,
    required: true,
  },
  itemValidationScope: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update', 'remove', 'itemValidate'])


const companyStore = useCompanyStore()
const itemStore = useItemStore()
const estimateStore = useEstimateStore()

let route = useRoute()
const { t } = useI18n()

const iepsBreakdown = computed({
  get: () => {
    return estimateStore.newEstimate.show_price_breakdown
  },
})

const quantity = computed({
  get: () => {
    return props.itemData.quantity
  },
  set: (newValue) => {
    updateItemAttribute('quantity', parseFloat(newValue))
  },
})

const price = computed({
  get: () => {
    const price = props.itemData.price

    if (parseFloat(price) > 0) {
      return price / 100
    }

    return price
  },

  set: (newValue) => {
    if (parseFloat(newValue) > 0) {
      let price = Math.round(newValue * 100)

      updateItemAttribute('price', price)
    } else {
      updateItemAttribute('price', newValue)
    }
  },
})

const precisionPrice = computed({
  get: () => {
    const precisionPrice = props.itemData.precision_price

    if (parseFloat(precisionPrice) > 0) {
      return precisionPrice / getItemDecimalPrecisionMultiplier(DEFAULT_ITEM_PRECISION)
    }

    return precisionPrice
  },
  set: (newValue) => {
    if (parseFloat(newValue) > 0) {
      let precisionPrice = Math.round(newValue * getItemDecimalPrecisionMultiplier(DEFAULT_ITEM_PRECISION))
      let price = Math.round(newValue * 100) // Calculate the corresponding price

      updateItemAttribute('precision_price', precisionPrice)
      updateItemAttribute('price', price) // Update the price attribute
    } else {
      updateItemAttribute('precision_price', newValue)
      updateItemAttribute('price', newValue) // Update the price attribute
    }
  },
})

const basePriceStr = computed({
  get: () => {
    return formatMoney(basePrice)
  },
})

const ivaTaxStr = computed({
  get: () => {
    return formatMoney(ivaTax)
  },
})

const iepsTaxStr = computed({
  get: () => {
    return formatMoney(iepsTax)
  },
})

function formatMoney(value) {
  return value.value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
  })
}

const fixedPrice = ref(null)
const loadedTotal = ref(null)

const subtotal = computed(() => { 
  const precisionPrice = props.itemData.precision_price;

  return precisionPrice * props.itemData.quantity;
})

const subtotalPrecision = computed(() => props.itemData.precision_price * props.itemData.quantity / getItemDecimalPrecisionMultiplier(DEFAULT_ITEM_PRECISION))

const compositePrice = computed({
  get: () => {
    let compPrice = fixedPrice.value ?? total.value / quantity.value

    fixedPrice.value = compPrice

    return compPrice
  },
  set: (newValue) => {
    total.value = newValue * quantity.value
    fixedPrice.value = parseFloat(newValue)
  }
})

const total = computed({
  get: () => {
    let tempTotal = basePrice.value + ivaTax.value + iepsTax.value

    loadedTotal.value = tempTotal

    return tempTotal
  },
  set: (newValue) => {
    let old = Math.round((total.value + Number.EPSILON) * 100) / 100
    let current = Math.round((parseFloat(newValue) + Number.EPSILON) * 100) / 100

    if (old !== current) {
      fixedPrice.value = parseFloat(newValue / quantity.value)
      calculateFromTotal(parseFloat(newValue))
    }
  }
})

function calculateFromTotal(value) {
  let providedTotal = value
  let cantidad = quantity.value
  let ieps = iepsBreakdown.value ? props.itemData.ieps : 0
  let ivaRate = 1.16

  console.log(providedTotal, cantidad, ieps)

  let precioUnitario =  ((providedTotal / cantidad - ieps) / ivaRate) + ieps

  if (cantidad > 0 && precioUnitario > 0 && providedTotal > 0) {
    quantity.value = cantidad
    precisionPrice.value = precioUnitario
  }
}

const basePrice = computed({
  get: () => {
    return subtotalPrecision.value - iepsTax.value;
  },
})

const iepsTax = computed({
  get: () => {
    return iepsBreakdown.value ? props.itemData.quantity * props.itemData.ieps : 0
  },
})

const ivaTax = computed({
  get: () => {
    // Replace this with the dynamic IVA condition
    return basePrice.value * 0.16;
  },
})

watch(
  () => iepsBreakdown.value,
  (val) => {
    calculateFromTotal(loadedTotal.value)
  }
)

const selectedCurrency = computed(() => {
  if (props.currency) {
    return props.currency
  } else {
    return companyStore.selectedCompanyCurrency
  }
})

const showRemoveButton = computed(() => {
  if (props.store[props.storeProp].items.length == 1) {
    return false
  }
  return true
})

const totalSimpleTax = computed(() => {
  return Math.round(
    sumBy(props.itemData.taxes, function (tax) {
      if (!tax.compound_tax) {
        return tax.amount
      }
      return 0
    })
  )
})

const totalCompoundTax = computed(() => {
  return Math.round(
    sumBy(props.itemData.taxes, function (tax) {
      if (tax.compound_tax) {
        return tax.amount
      }
      return 0
    })
  )
})

const totalTax = computed(() => totalSimpleTax.value + totalCompoundTax.value)

const rules = {
  name: {
    required: helpers.withMessage(t('validation.required'), required),
  },
  quantity: {
    required: helpers.withMessage(t('validation.required'), required),
    minValue: helpers.withMessage(
      t('validation.qty_must_greater_than_zero'),
      minValue(0)
    ),
    maxLength: helpers.withMessage(
      t('validation.amount_maxlength'),
      maxLength(20)
    ),
  },
  price: {
    required: helpers.withMessage(t('validation.required'), required),
    minValue: helpers.withMessage(
      t('validation.number_length_minvalue'),
      minValue(1)
    ),
    maxLength: helpers.withMessage(
      t('validation.price_maxlength'),
      maxLength(20)
    ),
  },
  discount_val: {
    between: helpers.withMessage(
      t('validation.discount_maxlength'),
      between(
        0,
        computed(() => subtotal.value)
      )
    ),
  },
  description: {
    maxLength: helpers.withMessage(
      t('validation.notes_maxlength'),
      maxLength(65000)
    ),
  },
}

const v$ = useVuelidate(
  rules,
  computed(() => props.store[props.storeProp].items[props.index]),
  { $scope: props.itemValidationScope }
)

function updateTax(data) {
  props.store.$patch((state) => {
    state[props.storeProp].items[props.index]['taxes'][data.index] = data.item
  })

  let lastTax = props.itemData.taxes[props.itemData.taxes.length - 1]

  if (lastTax?.tax_type_id !== 0) {
    props.store.$patch((state) => {
      state[props.storeProp].items[props.index].taxes.push({
        ...TaxStub,
        id: Guid.raw(),
      })
    })
  }

  syncItemToStore()
}

function searchVal(val) {
  updateItemAttribute('name', val)
}

function onSelectItem(itm) {
  props.store.$patch((state) => {
    state[props.storeProp].items[props.index].name = itm.name
    state[props.storeProp].items[props.index].price = itm.price
    state[props.storeProp].items[props.index].item_id = itm.id
    state[props.storeProp].items[props.index].description = itm.description
    state[props.storeProp].items[props.index].precision = itm.precision
    state[props.storeProp].items[props.index].precision_price = itm.precision_price
    state[props.storeProp].items[props.index].ieps = itm.ieps

    if (itm.unit) {
      state[props.storeProp].items[props.index].unit_name = itm.unit.name
    }

    if (props.store[props.storeProp].tax_per_item === 'YES' && itm.taxes) {
      let index = 0

      itm.taxes.forEach((tax) => {
        updateTax({ index, item: { ...tax } })
        index++
      })
    }

    if (state[props.storeProp].exchange_rate) {
      state[props.storeProp].items[props.index].price /=
        state[props.storeProp].exchange_rate
    }
  })

  itemStore.fetchItems()
  syncItemToStore()
}

function syncItemToStore() {
  let itemTaxes = props.store[props.storeProp]?.items[props.index]?.taxes

  if (!itemTaxes) {
    itemTaxes = []
  }

  let data = {
    ...props.store[props.storeProp].items[props.index],
    index: props.index,
    total: total.value,
    sub_total: subtotal.value,
    totalSimpleTax: totalSimpleTax.value,
    totalCompoundTax: totalCompoundTax.value,
    totalTax: totalTax.value,
    tax: totalTax.value,
    taxes: [...itemTaxes],
  }

  props.store.updateItem(data)
}

function updateItemAttribute(attribute, value) {
  props.store.$patch((state) => {
    state[props.storeProp].items[props.index][attribute] = value
  })

  syncItemToStore()
}
</script>
