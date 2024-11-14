<template>
  <div class="mt-6">
    <div class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">Archivo Previa (PDF)</div>
    
    <div v-if="isAttached">
      <label class="relative block cursor-pointer text-left w-full" >
        <input type="radio" name="radio-buttons" class="peer sr-only" checked />
        <div class="p-4 rounded-lg  border border-gray-200 hover:border-gray-300 shadow-sm transition">
          <div class="grid grid-cols-12 items-center">
            <!-- Card -->
            <div class="col-span-2 order-1 sm:order-none flex items-center space-x-4 p-2">
              <EstimateIcon />
            </div>
            <!-- Name -->
            <div class="col-span-7 order-2 sm:order-none text-left sm:text-center">
              <div class="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">Nombre del archivo.pdf</div>
            </div>
            <!-- Card status -->
            <div class="col-span-3 order-2 sm:order-none text-right">
              <AttachedFileDropdown @delete-file="deleteFile"/>
            </div>
          </div>
        </div>
      </label>
    </div>

    <BaseFileUploader v-else
        v-model="fileToUpload"
        :accept="types"
        @change="fileChange"
        @upload="fileUploaded"
        :autoProcess=true
        :uploadUrl="uploadUrl"
        inputFieldName="file"
      />
    </div>

</template>

<script setup>
import { computed, ref, inject, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/scripts/admin/stores/user'
import abilities from '@/scripts/admin/stub/abilities'
import BaseFileUploader from '@/scripts/components/base/BaseFileUploader.vue'
import EstimateIcon from '@/scripts/components/icons/EstimateIcon.vue'
import AttachedFileDropdown from './dropdowns/AttachedFileDropdown.vue'

const props = defineProps({
  file: {
    type: Object,
    default: null,
  },
  types: {
    type: String,
    default: ".pdf",
  },
  modelType: {
    type: String,
    default: null,
    required: true,
  },
  modelId: {
    type: Number,
    default: null,
    required: true,
  },
  collection: {
    type: String,
    default: null,
    required: true,
  },
})

const attachedFile = ref(null)
const emit = defineEmits(['update-parent-model'])

const isAttached = computed(() => {
  return attachedFile.value !== null
})

function fileUploaded(attachedFiles) {
  attachedFile.value = attachedFiles[0]
}

function deleteFile() {
  axios.delete(deleteUrl.value)
    .then((x) => {
      attachedFile.value = null
    })
}

const uploadUrl = computed(() => {
  return '/api/v1/' + props.modelType + '/' + props.modelId + '/files?collection=' + props.collection
})

const deleteUrl = computed(() => {
  return '/api/v1/' + props.modelType + '/' + props.modelId + '/files/' + attachedFile.value.id
})

watch(attachedFile, () => {
  emit('update-parent-model')
})
</script>
