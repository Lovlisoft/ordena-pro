import axios from 'axios'
import moment from 'moment'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { useCompanyStore } from './company'
import { useNotificationStore } from '@/scripts/stores/notification'
import transactionStub from '../stub/transaction'
import { handleError } from '@/scripts/helpers/error-handling'

export const useTransactionStore = (useWindow = false) => {
  const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore
  const { global } = window.i18n

  return defineStoreFunc({
    id: 'transaction',

    state: () => ({
      transactions: [],
      transactionTotalCount: 0,

      selectAllField: false,
      selectedTransactions: [],
      selectedNote: null,
      showExchangeRate: false,
      drivers: [],
      providers: [],

      transactionProviders: {
        id: null,
        name: '',
        driver: '',
        active: false,
        settings: {
          key: '',
          secret: '',
        },
      },

      currentTransaction: {
        ...transactionStub,
      },

      transactionModes: [],
      currentTransactionMode: {
        id: '',
        name: null,
      },

      isFetchingInitialData: false,
    }),

    getters: {
      isEdit: (state) => (state.transactionProviders.id ? true : false),
    },

    actions: {
      fetchTransactionInitialData(isEdit) {
        const companyStore = useCompanyStore()
        const route = useRoute()

        this.isFetchingInitialData = true

        let actions = []
        if (isEdit) {
          actions = [this.fetchTransaction(route.params.id)]
        }
        Promise.all([
          this.fetchTransactionModes({ limit: 'all' }),
          this.getNextNumber(),
          ...actions,
        ])
          .then(async ([res1, res2, res3]) => {
            if (isEdit) {
              if (res3.data.data.invoice) {
                this.currentTransaction.maxPayableAmount = parseInt(
                  res3.data.data.invoice.due_amount
                )
              }
            }

            // On Create
            else if (!isEdit && res2.data) {
              this.currentTransaction.transaction_date = moment().format('YYYY-MM-DD')
              this.currentTransaction.transaction_number = res2.data.nextNumber
              this.currentTransaction.currency =
                companyStore.selectedCompanyCurrency
            }

            this.isFetchingInitialData = false
          })
          .catch((err) => {
            handleError(err)
          })
      },

      fetchTransactions(params) {
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/bank-transactions`, { params })
            .then((response) => {
              this.transactions = response.data.data
              this.transactionTotalCount = response.data.meta.total
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      fetchTransaction(id) {
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/bank-transactions/${id}`)
            .then((response) => {
              Object.assign(this.currentTransaction, response.data.data)
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      addTransaction(data) {
        return new Promise((resolve, reject) => {
          axios
            .post('/api/v1/bank-transactions', data)
            .then((response) => {
              this.transactions.push(response.data)
              const notificationStore = useNotificationStore()
              notificationStore.showNotification({
                type: 'success',
                message: global.t('transactions.created_message'),
              })
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      updateTransaction(data) {
        return new Promise((resolve, reject) => {
          axios
            .put(`/api/v1/bank-transactions/${data.id}`, data)
            .then((response) => {
              if (response.data) {
                let pos = this.transactions.findIndex(
                  (transaction) => transaction.id === response.data.data.id
                )

                this.transactions[pos] = data.transaction

                const notificationStore = useNotificationStore()
                notificationStore.showNotification({
                  type: 'success',
                  message: global.t('transactions.updated_message'),
                })
              }
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      deleteTransaction(id) {
        const notificationStore = useNotificationStore()

        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/bank-transactions/delete`, id)
            .then((response) => {
              let index = this.transactions.findIndex(
                (transaction) => transaction.id === id
              )
              this.transactions.splice(index, 1)

              notificationStore.showNotification({
                type: 'success',
                message: global.t('transactions.deleted_message', 1),
              })
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      deleteMultipleTransactions() {
        const notificationStore = useNotificationStore()
        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/bank-transactions/delete`, { ids: this.selectedTransactions })
            .then((response) => {
              this.selectedTransactions.forEach((transaction) => {
                let index = this.transactions.findIndex(
                  (_transaction) => _transaction.id === transaction.id
                )
                this.transactions.splice(index, 1)
              })
              notificationStore.showNotification({
                type: 'success',
                message: global.tc('transactions.deleted_message', 2),
              })
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      setSelectAllState(data) {
        this.selectAllField = data
      },

      selectTransaction(data) {
        this.selectedTransactions = data
        if (this.selectedTransactions.length === this.transactions.length) {
          this.selectAllField = true
        } else {
          this.selectAllField = false
        }
      },

      selectAllTransactions() {
        if (this.selectedTransactions.length === this.transactions.length) {
          this.selectedTransactions = []
          this.selectAllField = false
        } else {
          let allTransactionIds = this.transactions.map((transaction) => transaction.id)
          this.selectedTransactions = allTransactionIds
          this.selectAllField = true
        }
      },

      selectNote(data) {
        this.selectedNote = null
        this.selectedNote = data
      },

      resetSelectedNote(data) {
        this.selectedNote = null
      },

      searchTransaction(params) {
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/bank-transactions`, { params })
            .then((response) => {
              this.transactions = response.data
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      previewTransaction(params) {
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/bank-transactions/${params.id}/send/preview`, { params })
            .then((response) => {
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      sendEmail(data) {
        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/bank-transactions/${data.id}/send`, data)
            .then((response) => {
              const notificationStore = useNotificationStore()
              notificationStore.showNotification({
                type: 'success',
                message: global.t('transactions.send_transaction_successfully'),
              })
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      getNextNumber(params, setState = false) {
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/next-number?key=transaction`, { params })
            .then((response) => {
              if (setState) {
                this.currentTransaction.transaction_number = response.data.nextNumber
              }
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      resetCurrentTransaction() {
        this.currentTransaction = {
          ...transactionStub,
        }
      },

      fetchTransactionModes(params) {
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/transaction-methods`, { params })
            .then((response) => {
              this.transactionModes = response.data.data
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      fetchTransactionMode(id) {
        return new Promise((resolve, reject) => {
          axios
            .get(`/api/v1/transaction-methods/${id}`)
            .then((response) => {
              this.currentTransactionMode = response.data.data
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      addTransactionMode(data) {
        const notificationStore = useNotificationStore()
        return new Promise((resolve, reject) => {
          axios
            .post(`/api/v1/transaction-methods`, data)
            .then((response) => {
              this.transactionModes.push(response.data.data)
              notificationStore.showNotification({
                type: 'success',
                message: global.t('settings.transaction_modes.transaction_mode_added'),
              })
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      updateTransactionMode(data) {
        const notificationStore = useNotificationStore()
        return new Promise((resolve, reject) => {
          axios
            .put(`/api/v1/transaction-methods/${data.id}`, data)
            .then((response) => {
              if (response.data) {
                let pos = this.transactionModes.findIndex(
                  (transactionMode) => transactionMode.id === response.data.data.id
                )
                this.transactionModes[pos] = data.transactionModes
                notificationStore.showNotification({
                  type: 'success',
                  message: global.t(
                    'settings.transaction_modes.transaction_mode_updated'
                  ),
                })
              }
              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },

      deleteTransactionMode(id) {
        const notificationStore = useNotificationStore()

        return new Promise((resolve, reject) => {
          axios
            .delete(`/api/v1/transaction-methods/${id}`)
            .then((response) => {
              let index = this.transactionModes.findIndex(
                (transactionMode) => transactionMode.id === id
              )
              this.transactionModes.splice(index, 1)
              if (response.data.success) {
                notificationStore.showNotification({
                  type: 'success',
                  message: global.t('settings.transaction_modes.deleted_message'),
                })
              }

              resolve(response)
            })
            .catch((err) => {
              handleError(err)
              reject(err)
            })
        })
      },
    },
  })()
}
