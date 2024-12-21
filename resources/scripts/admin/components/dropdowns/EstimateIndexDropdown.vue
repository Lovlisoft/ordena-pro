<template>
  <BaseDropdown>
    <template #activator>
      <BaseIcon class="text-gray-500" name="DotsHorizontalIcon" />
    </template>

    <div
      v-for="action in statusActions"
      :key="action.action"
      @click="$emit('actionExecute', action.action)"
    >
      <BaseDropdownItem>
        <BaseIcon
          :name="action.icon"
          class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
        />
        {{ action.label }}
      </BaseDropdownItem>
    </div>

    <!-- Edit Estimate -->
    <router-link
      v-if="userStore.hasAbilities(abilities.EDIT_ESTIMATE)"
      :to="`/admin/estimates/${row.id}/edit`"
    >
      <BaseDropdownItem>
        <BaseIcon
          name="PencilIcon"
          class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
        />
        {{ $t('general.edit') }}
      </BaseDropdownItem>
    </router-link>

    <!-- Delete Estimate  -->
    <BaseDropdownItem
      v-if="userStore.hasAbilities(abilities.DELETE_ESTIMATE)"
      @click="removeEstimate(row.id)"
    >
      <BaseIcon
        name="TrashIcon"
        class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
      />
      {{ $t('general.delete') }}
    </BaseDropdownItem>

    <!-- View Estimate -->
    <router-link
      v-if="
        route.name !== 'estimates.view' &&
        userStore.hasAbilities(abilities.VIEW_ESTIMATE)
      "
      :to="`estimates/${row.id}/view`"
    >
      <BaseDropdownItem>
        <BaseIcon
          name="EyeIcon"
          class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
        />
        {{ $t('general.view') }}
      </BaseDropdownItem>
    </router-link>

  </BaseDropdown>
</template>

<script setup>
import { useEstimateStore } from '@/scripts/admin/stores/estimate'
import { useNotificationStore } from '@/scripts/stores/notification'
import { useModalStore } from '@/scripts/stores/modal'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useDialogStore } from '@/scripts/stores/dialog'
import { inject, onMounted } from 'vue'
import { useUserStore } from '@/scripts/admin/stores/user'
import abilities from '@/scripts/admin/stub/abilities'

const props = defineProps({
  statusActions: {
    type: Array,
    default: null,
    required: false,
  },
  row: {
    type: Object,
    default: null,
  },
  table: {
    type: Object,
    default: null,
  },
})

const utils = inject('utils')

const estimateStore = useEstimateStore()
const modalStore = useModalStore()
const notificationStore = useNotificationStore()
const dialogStore = useDialogStore()
const userStore = useUserStore()

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

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
      id = id
      if (res) {
        estimateStore.deleteEstimate({ ids: [id] }).then((res) => {
          if (res) {
            props.table && props.table.refresh()

            if (res.data) {
              router.push('/admin/estimates')
            }
            estimateStore.$patch((state) => {
              state.selectedEstimates = []
              state.selectAllField = false
            })
          }
        })
      }
    })
}

function copyPdfUrl() {
  let pdfUrl = `${window.location.origin}/estimates/pdf/${props.row.unique_hash}`

  let response = utils.copyTextToClipboard(pdfUrl)
  notificationStore.showNotification({
    type: 'success',
    message: t('general.copied_pdf_url_clipboard'),
  })
}
</script>
