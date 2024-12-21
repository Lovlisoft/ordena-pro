<template>
  <table class="text-center item-table min-w-full">
    <colgroup>
      <col style="width: 30%; min-width: 280px" />
      <col style="width: 20%; min-width: 120px" />
      <col style="width: 20%; min-width: 120px" />
      <col style="width: 15%; min-width: 120px" />
      <col style="width: 15%; min-width: 120px" />
    </colgroup>
    <thead class="bg-white border border-gray-200 border-solid">
      <tr class="
            px-2 text-sm not-italic font-medium text-left gap-2
            text-gray-700 border-t border-b border-gray-200 border-solid
          ">
        <th class="py-3">
          <BaseContentPlaceholders v-if="isLoading">
            <BaseContentPlaceholdersText :lines="1" class="w-16 h-5" />
          </BaseContentPlaceholders>
          <span v-else class="pl-10">
            {{ $tc('items.item', 2) }}
          </span>
        </th>
        <th>
          <BaseContentPlaceholders v-if="isLoading">
            <BaseContentPlaceholdersText :lines="1" class="w-16 h-5" />
          </BaseContentPlaceholders>
          <span v-else>
            {{ $t('invoices.item.quantity') }}
          </span>
        </th>
        <th>
          <BaseContentPlaceholders v-if="isLoading">
            <BaseContentPlaceholdersText :lines="1" class="w-16 h-5" />
          </BaseContentPlaceholders>
          <span v-else>
            {{ $t('invoices.item.price') }}
          </span>
        </th>
        <th>
          <BaseContentPlaceholders v-if="isLoading">
            <BaseContentPlaceholdersText :lines="1" class="w-16 h-5" />
          </BaseContentPlaceholders>
          <span v-else>
            Precio de Venta
          </span>
        </th>
        <th>
          <BaseContentPlaceholders v-if="isLoading">
            <BaseContentPlaceholdersText :lines="1" class="w-16 h-5" />
          </BaseContentPlaceholders>
          <span v-else class="pr-10 column-heading">
            {{ $t('invoices.item.amount') }}
          </span>
        </th>
      </tr>
    </thead>
    <draggable
      v-model="store[storeProp].items"
      item-key="id"
      tag="tbody"
      handle=".handle"
    >
      <template #item="{ element, index }">
        <CreateItemRow
          :key="element.id"
          :index="index"
          :item-data="element"
          :loading="isLoading"
          :currency="defaultCurrency"
          :item-validation-scope="itemValidationScope"
          :invoice-items="store[storeProp].items"
          :store="store"
          :store-prop="storeProp"
        />
      </template>
    </draggable>
  </table>

  <div
    class="
      flex
      items-center
      justify-center
      w-full
      px-6
      py-3
      text-base
      border border-t-0 border-gray-200 border-solid
      cursor-pointer
      text-primary-400
      hover:bg-primary-100
    "
    @click="store.addItem"
  >
    <BaseIcon name="PlusCircleIcon" class="mr-2" />
    {{ $t('general.add_new_item') }}
  </div>
</template>

<script setup>
import { useCompanyStore } from '@/scripts/admin/stores/company'
import { computed } from 'vue'
import draggable from 'vuedraggable'
import CreateItemRow from './CreateItemRow.vue'

const props = defineProps({
  store: {
    type: Object,
    default: null,
  },
  storeProp: {
    type: String,
    default: '',
  },
  currency: {
    type: [Object, String, null],
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  itemValidationScope: {
    type: String,
    default: '',
  },
})

const companyStore = useCompanyStore()

const defaultCurrency = computed(() => {
  if (props.currency) {
    return props.currency
  } else {
    return companyStore.selectedCompanyCurrency
  }
})
</script>
