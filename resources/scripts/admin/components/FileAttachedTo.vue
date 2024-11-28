<template>
  <div class="mt-6">
    <div class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ fileTitle }}</div>
    
    <div v-if="isAttached">
      <label class="relative block cursor-pointer text-left w-full" >
        <input type="radio" name="radio-buttons" class="peer sr-only" checked />
        <div class="p-4 rounded-lg  border border-gray-200 hover:border-gray-300 shadow-md transition bg-white">
          <div class="grid grid-cols-12 items-center gap-3">
            <!-- Card -->
            <div class="col-span-2 order-1 sm:order-none flex items-center space-x-4 p-2">
              <EstimateIcon v-if="collection == 'estimate_pdf'" />
              <InvoiceXmlIcon v-if="collection == 'invoice_xml'" />
              <InvoicePdfIcon v-if="collection == 'invoice_pdf'" />
            </div>
            <!-- Name -->
            <div class="col-span-7 order-2 sm:order-none text-left">
              <div class="text-sm font-medium text-gray-800 truncate">{{ attachedFile.file_name }}</div>
              <div class="text-xs font-small text-gray-500 truncate">{{ attachedFile.author.name }}</div>
            </div>
            <!-- Card status -->
            <div class="col-span-3 order-2 sm:order-none text-right">
              <AttachedFileDropdown 
                :file="attachedFile"
                @delete-file="deleteFile"
              />
            </div>
          </div>
        </div>
      </label>
    </div>
    <div v-else-if="userStore.hasAbilities(abilities.EDIT_ESTIMATE_FILES)">
      <BaseFileUploader 
            v-model="fileToUpload"
          :accept="types"
          @change="fileChange"
          @upload="fileUploaded"
          :autoProcess=true
          :uploadUrl="uploadUrl"
          inputFieldName="file"
        />
    </div>
    <div v-else>
      <label class="flex flex-col p-4 rounded-lg border border-gray-200 text-xs text-gray-400" >

        <div class="w-full flex justify-center">
          <BaseIcon
            name="ExclamationIcon"
            class="h-6 mb-2 text-xl leading-6 text-gray-400 w-full"
          />
        </div>  
        
        <p class="text-center">{{ missingFileMessage }}</p>
      </label>
    </div>  
  </div>
</template>

<script setup>
import { computed, ref, inject, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/scripts/admin/stores/user'
import abilities from '@/scripts/admin/stub/abilities'
import BaseFileUploader from '@/scripts/components/base/BaseFileUploader.vue'
import EstimateIcon from '@/scripts/components/icons/EstimateIcon.vue'
import InvoiceXmlIcon from '@/scripts/components/icons/InvoiceXmlIcon.vue'
import InvoicePdfIcon from '@/scripts/components/icons/InvoicePdfIcon.vue'
import AttachedFileDropdown from './dropdowns/AttachedFileDropdown.vue'

const userStore = useUserStore()

const props = defineProps({
  file: {
    type: Object,
    default: null,
  },
  fileTitle: {
    type: String,
    default: 'Archivo adjunto',
    required: false,
  },
  missingFileMessage: {
    type: String,
    default: 'Archivo pendiente de ser cargado por el personal de facturación',
    required: false,
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

onMounted(() => {
  attachedFile.value = props.file
  console.log(attachedFile.value)
})

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

function viewFile() {
  window.open(props.file.url);
}

const uploadUrl = computed(() => {
  return '/api/v1/' + props.modelType + '/' + props.modelId + '/files?collection=' + props.collection
})

const deleteUrl = computed(() => {
  return '/api/v1/' + props.modelType + '/' + props.modelId + '/files/' + attachedFile.value.id
})

const currentFile = computed(() => {
  return props.file
})

watch(attachedFile, () => {
  emit('update-parent-model')
})

watch(currentFile, (x,) => {
  attachedFile.value = currentFile.value
})
</script>
