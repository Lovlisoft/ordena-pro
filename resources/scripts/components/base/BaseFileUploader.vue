<template>
  <form
    enctype="multipart/form-data"
    class="
      relative
      flex
      flex-col
      items-center
      justify-center
      p-2
      border-2 border-dashed
      rounded-md
      cursor-pointer
      avatar-upload
      border-gray-200
      transition-all
      duration-300
      ease-in-out
      isolate
      w-full
      hover:border-gray-300
      group
      min-h-[100px]
      bg-gray-50
    "
    :class="avatar ? 'w-32 h-32' : 'w-full'"
  >
    <input
      id="file-upload"
      ref="inputRef"
      type="file"
      tabindex="-1"
      :multiple="multiple"
      :name="inputFieldName"
      :accept="accept"
      class="absolute z-10 w-full h-full opacity-0 cursor-pointer"
      @click="$event.target.value=null"
      @change="
        onChange(
          $event.target.name,
          $event.target.files,
          $event.target.files.length
        )
      "
    />

    <!-- Avatar Not Selected -->
    <div v-if="!localFiles.length && avatar">
      <img :src="getDefaultAvatar()" class="rounded" alt="Default Avatar" />

      <a
        href="#"
        class="absolute z-30 bg-white rounded-full -bottom-3 -right-3 group"
        @click.prevent.stop="onBrowse"
      >
        <BaseIcon
          name="PlusCircleIcon"
          class="
            h-8
            text-xl
            leading-6
            text-primary-500
            group-hover:text-primary-600
          "
        />
      </a>
    </div>

    <!-- Not Selected -->
    <div v-else-if="!localFiles.length" class="flex flex-col items-center py-5">
      <BaseIcon
        name="CloudUploadIcon"
        class="h-6 mb-2 text-xl leading-6 text-gray-400"
      />
      <p class="text-xs leading-4 text-center text-gray-400">
        Arrastra el archivo aquí o
        <a
          class="
            cursor-pointer
            text-primary-500
            hover:text-primary-600 hover:font-medium
            relative
            z-20
          "
          href="#"
          @click.prevent.stop="onBrowse"
        >
          búscalo
        </a>
        desde tu dispositivo
      </p>
      <p class="text-xs leading-4 text-center text-gray-400 mt-2">
        {{ recommendedText }}
      </p>
    </div>

    <div v-else-if="localFiles.length && autoProcess && !multiple && currentStatus == STATUS_SAVING" role="status">
      <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <div
      v-else-if="localFiles.length && avatar && !multiple && currentStatus != STATUS_SAVING"
      class="flex w-full h-full border border-gray-200 rounded"
    >
      <img
        v-if="localFiles[0].image"
        for="file-upload"
        :src="localFiles[0].image"
        class="block object-cover w-full h-full rounded opacity-100"
        style="animation: fadeIn 2s ease"
      />

      <div
        v-else
        class="
          flex
          justify-center
          items-center
          text-gray-400
          flex-col
          space-y-2
          px-2
          py-4
          w-full
        "
      >
        <!-- DocumentText Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.25"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>

        <p
          v-if="localFiles[0].name"
          class="
            text-gray-600
            font-medium
            text-sm
            truncate
            overflow-hidden
            w-full
          "
        >
          {{ localFiles[0].name }}
        </p>
      </div>

      <a
        href="#"
        class="
          box-border
          absolute
          z-30
          flex
          items-center
          justify-center
          w-8
          h-8
          bg-white
          border border-gray-200
          rounded-full
          shadow-md
          -bottom-3
          -right-3
          group
          hover:border-gray-300
        "
        @click.prevent.stop="onAvatarRemove(localFiles[0])"
      >
        <BaseIcon name="XIcon" class="h-4 text-xl leading-6 text-black" />
      </a>
    </div>

    <!-- Preview Files Multiple -->
    <div
      v-else-if="localFiles.length && multiple && false"
      class="flex flex-wrap w-full"
    >
      <a
        v-for="(localFile, index) in localFiles"
        :key="localFile"
        href="#"
        class="
          block
          p-2
          m-2
          bg-white
          border border-gray-200
          rounded
          hover:border-gray-500
          relative
          max-w-md
        "
        @click.prevent
      >
        <img
          v-if="localFile.image"
          for="file-upload"
          :src="localFile.image"
          class="block object-cover w-20 h-20 opacity-100"
          style="animation: fadeIn 2s ease"
        />

        <div
          v-else
          class="
            flex
            justify-center
            items-center
            text-gray-400
            flex-col
            space-y-2
            px-2
            py-4
            w-full
          "
        >
          <!-- DocumentText Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>

          <p
            v-if="localFile.name"
            class="
              text-gray-600
              font-medium
              text-sm
              truncate
              overflow-hidden
              w-full
            "
          >
            {{ localFile.name }}
          </p>
        </div>

        <a
          href="#"
          class="
            box-border
            absolute
            z-30
            flex
            items-center
            justify-center
            w-8
            h-8
            bg-white
            border border-gray-200
            rounded-full
            shadow-md
            -bottom-3
            -right-3
            group
            hover:border-gray-300
          "
          @click.prevent.stop="onFileRemove(index)"
        >
          <BaseIcon name="XIcon" class="h-4 text-xl leading-6 text-black" />
        </a>
      </a>
    </div>

    <div v-else class="flex w-full items-center justify-center">
      <a
        v-for="(localFile, index) in localFiles"
        :key="localFile"
        href="#"
        class="
          block
          p-2
          m-2
          bg-white
          border border-gray-200
          rounded
          hover:border-gray-500
          relative
          max-w-md
        "
        @click.prevent
      >
        <img
          v-if="localFile.image"
          for="file-upload"
          :src="localFile.image"
          class="block object-contain h-20 opacity-100 min-w-[5rem]"
          style="animation: fadeIn 2s ease"
        />

        <div
          v-else
          class="
            flex
            justify-center
            items-center
            text-gray-400
            flex-col
            space-y-2
            px-2
            py-4
            w-full
          "
        >
          <!-- DocumentText Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>

          <p
            v-if="localFile.name"
            class="
              text-gray-600
              font-medium
              text-sm
              truncate
              overflow-hidden
              w-full
            "
          >
            {{ localFile.name }}
          </p>
        </div>

        <a
          href="#"
          class="
            box-border
            absolute
            z-30
            flex
            items-center
            justify-center
            w-8
            h-8
            bg-white
            border border-gray-200
            rounded-full
            shadow-md
            -bottom-3
            -right-3
            group
            hover:border-gray-300
          "
          @click.prevent.stop="onFileRemove(index)"
        >
          <BaseIcon name="XIcon" class="h-4 text-xl leading-6 text-black" />
        </a>
      </a>
    </div>

    <BaseErrorAlert 
      v-if="currentStatus == STATUS_FAILED"
      errorTitle="No es posible cargar el archivo:"
      :errors="uploadErrors"
    />
  </form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import utils from '@/scripts/helpers/utilities'
import BaseErrorAlert from './BaseErrorAlert.vue';

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: Boolean,
    default: false,
  },
  autoProcess: {
    type: Boolean,
    default: false,
  },
  uploadUrl: {
    type: String,
    default: '',
  },
  preserveLocalFiles: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: 'image/*',
  },
  inputFieldName: {
    type: String,
    default: 'photos',
  },
  base64: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  recommendedText: {
    type: String,
    default: '',
  },
  fileId: {
    type: Number,
    default: null,
    required: false,
  }
})

const emit = defineEmits(['change', 'remove', 'update:modelValue', 'upload'])

// status
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

const uploadedFiles = ref([])
const localFiles = ref([])
const inputRef = ref(null)
const uploadErrors = ref(null)
const currentStatus = ref(null)

function reset() {
  // reset form to initial state
  currentStatus.value = STATUS_INITIAL

  uploadedFiles.value = []

  if (props.modelValue && props.modelValue.length) {
    localFiles.value = [...props.modelValue]
  } else {
    localFiles.value = []
  }

  onFileRemove(0)

  uploadErrors.value = null
}

// upload data to the server
function save(formData) {
  currentStatus.value = STATUS_SAVING

  axios.post(props.uploadUrl, formData)
    .then((x) => {
      uploadedFiles.value = x.data
      setTimeout(function() {
        emit('upload', x.data.data)
        reset()
        currentStatus.value = STATUS_SUCCESS
      }, 300)
    })
    .catch((err) => {
      setTimeout(function() {
        reset()
        uploadErrors.value = getResponseErrors(err.response)
        currentStatus.value = STATUS_FAILED
      }, 300)
    })
}

function getResponseErrors(response) {
  let errors = [response]

  if (response.data.errors) {
    errors = []

    response.data.errors.forEach(function (err) {
      errors.push(err.message)
    })
  }

  return errors
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

function onChange(fieldName, fileList, fileCount) {
  if (!fileList.length) return

  if (props.multiple) {
    emit('change', fieldName, fileList, fileCount)
  } else {
    if (props.base64) {
      getBase64(fileList[0]).then((res) => {
        emit('change', fieldName, res, fileCount, fileList[0])
      })
    } else {
      emit('change', fieldName, fileList[0], fileCount)
    }
  }

  if (!props.preserveLocalFiles) {
    localFiles.value = []
  }

  Array.from(Array(fileList.length).keys()).forEach((x) => {
    const file = fileList[x]

    if (utils.isImageFile(file.type)) {
      getBase64(file).then((image) => {
        localFiles.value.push({
          fileObject: file,
          type: file.type,
          name: file.name,
          image,
        })
      })
    } else {
      localFiles.value.push({
        fileObject: file,
        type: file.type,
        name: file.name,
      })
    }
  })

  emit('update:modelValue', localFiles.value)

  if (!props.autoProcess) return

  // append the files to FormData
  const formData = new FormData()

  Array.from(Array(fileList.length).keys()).forEach((x) => {
    formData.append(fieldName, fileList[x], fileList[x].name)
  })

  // save it
  save(formData)
}

function onBrowse() {
  if (inputRef.value) {
    inputRef.value.click()
  }
}

function onAvatarRemove(image) {
  localFiles.value = []
  emit('remove', image)
}

function onFileRemove(index) {
  localFiles.value.splice(index, 1)
  emit('remove', index)
}

function getDefaultAvatar() {
  const imgUrl = new URL('/img/default-avatar.jpg', import.meta.url)
  return imgUrl
}

onMounted(() => {
  reset()
})

watch(
  () => props.modelValue,
  (v) => {
    reset()
    if (!props.autoProcess) {
      localFiles.value = [...v]
    }
  }
)

watch(
  () => props.fileId,
  (v) => {
    reset()
  }
)
</script>
