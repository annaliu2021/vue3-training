<template>
    <section class="coupons container-lg py-8">
        <div class="">
            <button @click="$event => openModal('add')" type="button" class="btn btn-outline-success">新增優惠券</button>
        </div>
        <table class="table align-middle">
            <thead>
                <tr class="text-center">
                    <th scope="col" width="100">序號</th>
                    <th scope="col">標題</th>
                    <th scope="col">折扣</th>
                    <th scope="col" width="150">到期日</th>
                    <th scope="col" width="100">是否啟用</th>
                    <th scope="col" width="200">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in this.coupons" :key="item.id" class="text-center">
                    <td>{{ ++index }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}</td>
                    <td>{{ convertDate(item.due_date) }}</td>
                    <td width="200" class="text-center">
                        <span v-if="item.is_enabled" class="text-success">啟用中</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td width="200" class="text-center">
                        <button type="button" class="btn btn-outline-success btn-sm me-2"
                            @click="($event) => openModal('edit', item)">
                            編輯
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="(event) => openModal('delete', item)">
                            刪除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination-component :pages="pagination" @go-to-page="getCoupons"></pagination-component>
    </section>

    <!-- 優惠券刪除 start -->
    <delete-modal-component ref="deleteModal" :data="{ item: '優惠券', text: tempCoupons.title }"
        @delete="delCoupon"></delete-modal-component>
    <!-- 優惠券刪除 end -->

    <!-- 優惠券 start -->
    <div class="modal fade" ref="editorModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header text-white bg-primary" data-bs-theme="dark">
                    <h5 class="modal-title fs-6">
                        <span v-if="isNew">新增優惠券</span>
                        <span v-else>編輯優惠券</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <Form @submit="updateCoupon()" v-slot="{ errors }" id="form">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="code" class="form-label">優惠碼</label>
                            <Field v-model="tempCoupons.code" type="text" class="form-control" id="code"
                                placeholder="請輸入優惠碼" name="優惠碼" :class="{ 'is-invalid': errors['優惠碼'] }" rules="required">
                            </Field>
                            <ErrorMessage name="優惠碼" class="invalid-feedback"></ErrorMessage>
                        </div>
                        <div class="mb-3">
                            <label for="title" class="form-label">優惠券名稱</label>
                            <Field v-model="tempCoupons.title" type="text" class="form-control" id="title"
                                placeholder="請輸入優惠券名稱" name="優惠券名稱" :class="{ 'is-invalid': errors['優惠券名稱'] }"
                                rules="required"></Field>
                            <ErrorMessage name="優惠券名稱" class="invalid-feedback"></ErrorMessage>
                        </div>
                        <div class="mb-3">
                            <label for="percent" class="form-label">折扣</label>
                            <Field v-model="tempCoupons.percent" id="percent" class="form-select" name="折扣"
                                :class="{ 'is-invalid': errors['折扣'] }" rules="required" as="select">
                                <option v-for=" i, index in 10 " :key="index" :value="i * 10">{{ i * 10 }}</option>
                            </Field>
                            <ErrorMessage name="折扣" class="invalid-feedback"></ErrorMessage>
                        </div>
                        <div class="mb-3">
                            <label for="due_date" class="form-label">到期日</label>
                            <Field type="date" class="form-control" id="due_date" placeholder="請輸入到期日" name="到期日" value=""
                                v-model="formattedDate" :class="{ 'is-invalid': errors['到期日'] }" rules="required"></Field>
                            <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input v-model="tempCoupons.is_enabled" id="is_enabled" class="form-check-input"
                                    name="is_enabled" type="checkbox" :true-value="1" :false-value="0" />
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn btn-outline-danger"
                            :disabled="!isNew && Object.keys(errors).length !== 0">儲存</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    <!-- 優惠券 end -->
</template>

<script>
import PaginationComponent from '../../components/paginationComponent.vue'
import deleteModalComponent from '../../components/deleteModalComponent.vue'
import { swal2 } from '../../assets/utils/sweetalert.js'
import { common } from '../../assets/utils/common.js'
import { Modal } from 'bootstrap'
import { Field, ErrorMessage, Form } from 'vee-validate'
const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env

export default {
    data () {
        return {
            editorModal: {},
            action: {
                add: 'add',
                edit: 'edit',
                delete: 'delete'
            },
            isNew: false,
            coupons: [],
            pagination: {},
            tempCoupons: {}
        }
    },
    mounted () {
        common.checkAdmin(this.getCoupons, () => { this.$router.push({ name: 'login' }) })
        this.editorModal = new Modal((this.$refs.editorModal), {
            keyboard: false
        })
    },
    computed: {
        formattedDate () {
            let date = ''
            if (this.tempCoupons) {
                date = new Date(this.tempCoupons.due_date)
                date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            }
            return date
        }
    },
    methods: {
        openModal (action, item) {
            if (action === this.action.add) {
                this.tempCoupons = {}
                this.isNew = true
                document.querySelector('#form').reset()
                this.editorModal.show()
            } else if (action === this.action.edit) {
                this.tempCoupons = { ...item }
                this.isNew = false
                this.editorModal.show()
            } else if (action === this.action.delete) {
                this.tempCoupons = { ...item }
                this.$refs.deleteModal.show()
            }
        },
        convertDate (timestamp) {
            const date = new Date(timestamp)
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        },
        getCoupons (page = 1) {
            const loader = this.$loading.show()
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/coupons?page=${page}`
            this.$http
                .get(url)
                .then((resp) => {
                    const { coupons, pagination } = resp.data
                    this.coupons = coupons
                    this.pagination = pagination
                })
                .catch((err) => {
                    swal2.toastErrorMsg('取得優惠券失敗')
                })
                .finally(() => { loader.hide() })
        },
        updateCoupon () {
            const loader = this.$loading.show()
            let url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/coupon`
            let http = 'post'

            if (!this.isNew) {
                url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/coupon/${this.tempCoupons.id}`
                http = 'put'
            }

            this.tempCoupons.percent = Number.parseInt(this.tempCoupons.percent)
            this.tempCoupons.due_date = new Date(document.querySelector('#due_date').value).getTime()
            this.tempCoupons.is_enabled = document.querySelector('#is_enabled').checked === true ? 1 : 0
            // console.log(this.tempCoupons)
            this.$http[http](url, { data: this.tempCoupons })
                .then((response) => {
                    swal2.toastSuccMsg('優惠券儲存成功')
                    this.editorModal.hide()
                    this.getCoupons()
                })
                .catch((err) => {
                    // console.log(err)
                    swal2.toastErrorMsg('優惠券儲存失敗:' + err.message)
                })
                .finally(() => { loader.hide() })
        },
        delCoupon () {
            const loader = this.$loading.show()
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/coupon/${this.tempCoupons.id}`
            this.$http
                .delete(url)
                .then((response) => {
                    swal2.toastSuccMsg('優惠券刪除成功')
                    this.$refs.deleteModal.hide()
                    this.getCoupons()
                })
                .catch((err) => {
                    swal2.toastErrorMsg('優惠券刪除失敗')
                })
                .finally(() => { loader.hide() })
        }
    },
    components: {
        PaginationComponent,
        deleteModalComponent,
        // eslint-disable-next-line vue/no-reserved-component-names
        Form,
        Field,
        ErrorMessage
    }
}

</script>
