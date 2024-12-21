import addressStub from '@/scripts/admin/stub/address.js'

export default function () {
  return {
    rfc: '',
    name: '',
    contact_name: '',
    email: '',
    phone: null,
    password: '',
    confirm_password:'',
    currency_id: null,
    manager_id: null,
    website: null,
    billing: { ...addressStub },
    shipping: { ...addressStub },
    customFields: [],
    fields: [],
    enable_portal: false,
  }
}
