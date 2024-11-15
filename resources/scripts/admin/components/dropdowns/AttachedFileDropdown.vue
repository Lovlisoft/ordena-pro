<template>
  <BaseDropdown>
    <template #activator>
      <BaseIcon class="text-gray-500" name="DotsHorizontalIcon" />
    </template>

    <!-- View Estimate -->
    <div
      v-if="userStore.hasAbilities(abilities.VIEW_ESTIMATE)"
      @click="viewFile"
    >
      <BaseDropdownItem>
        <BaseIcon
          name="EyeIcon"
          class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
        />
        {{ $t('general.view') }}
      </BaseDropdownItem>
    </div>

    <!-- Delete Estimate  -->
    <BaseDropdownItem
      v-if="userStore.hasAbilities(abilities.DELETE_ESTIMATE)"
      @click="$emit('deleteFile')"
    >
      <BaseIcon
        name="TrashIcon"
        class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
      />
      {{ $t('general.delete') }}
    </BaseDropdownItem>

    
  </BaseDropdown>
</template>

<script setup>
import { useEstimateStore } from '@/scripts/admin/stores/estimate'
import { useNotificationStore } from '@/scripts/stores/notification'
import { useModalStore } from '@/scripts/stores/modal'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDialogStore } from '@/scripts/stores/dialog'
import { inject, computed } from 'vue'
import { useUserStore } from '@/scripts/admin/stores/user'
import abilities from '@/scripts/admin/stub/abilities'

const props = defineProps({
  file: {
    type: Object,
    default: null,
  },
})

const utils = inject('utils')

const estimateStore = useEstimateStore()
const dialogStore = useDialogStore()
const userStore = useUserStore()

function viewFile() {
  window.open(props.file.url);
}

const { t } = useI18n()

const router = useRouter()
</script>
