<template>
    <!-- 訂單列表 -->
    <section class="products container-lg py-8">
        <table class="table align-middle">
            <thead>
                <tr class="text-center">
                    <th scope="col">序號</th>
                    <th scope="col">訂單日期</th>
                    <th scope="col" class="text-start">訂單編號</th>
                    <th scope="col">是否付款</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in orders" :key="item.id" class="text-center">
                    <td width="100" class="text-center">{{ ++index }}</td>
                    <td width="200">{{ convertDate(item.create_at) }}</td>
                    <td width="" class="text-start">{{ item.id }}</td>
                    <td width="200" class="text-center">
                        <span v-if="item.paid" class="text-success">已付款</span>
                        <span v-else>未付款</span>
                    </td>
                    <td width="300" class="text-center">
                        <button type="button" class="btn btn-outline-success btn-sm me-2" @click="openModal('edit', item)">
                            編輯
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                            刪除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination-component :pages="pagination" @go-to-page="getOrders"></pagination-component>
    </section>

    <!-- 訂單刪除 start -->
    <delete-modal-component ref="deleteModal" :data="{ item: '訂單', text: tempOrder.id }"
        @delete="delOrder"></delete-modal-component>
    <!-- 訂單刪除 end -->

    <!-- 訂單內容 start -->
    <div class="modal fade" ref="editorModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header text-white bg-primary" data-bs-theme="dark">
                    <h5 class="modal-title fs-6">訂單編輯</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <Form @submit="$event => updateOrder()" v-slot="{ errors }" id="form">
                    <div class="modal-body">
                        <!-- 訂單內容 -->
                        <!-- <div class="card mb-2">
                            <div class="card-header bg-transparent text-center ">
                                本次訂單內容</div>
                            <div class="card-body">
                                <ul class="list-unstyled">
                                    <li v-for="(item) in products" :key="item.id"
                                        class="row align-items-center-bottom py-2 g-2">
                                        <img class="order-img" :src="item.imageUrl" :alt="item.title">
                                        <div class="col">
                                            <p class="mb-0"></p>
                                            <p class="mb-0 d-block small" style="letter-spacing: 1px;">$
                                                NT$ {{ item.price }} 元/盒</p>
                                        </div>
                                        <div class="col-1 text-end">
                                            {{ item.num }}
                                        </div>
                                        <div class="col-3">
                                            <p class="m-0 text-end">NT$ {{ item.price * item.num }}元</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="text-end">
                                    總計金額：$ 280元
                                </div>
                            </div>
                        </div> -->

                        <!-- 訂購資訊 -->
                        <div class="card border-secondary">
                            <div class="card-header bg-secondary text-light text-center ">
                                本次訂購資訊</div>
                            <div class="card-body p-lg-5">
                                <div class="mb-3">
                                    <label for="name" class="form-label">訂購人姓名</label>
                                    <Field v-model="tempOrder.user.name" type="text" class="form-control" id="name"
                                        placeholder="請輸入訂購人姓名" name="姓名" :class="{ 'is-invalid': errors['姓名'] }"
                                        rules="required"></Field>
                                    <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">訂購人Email</label>
                                    <Field v-model="tempOrder.user.email" type="email" class="form-control" id="email"
                                        placeholder="請輸入訂購人Email" name="Email" :class="{ 'is-invalid': errors['Email'] }"
                                        rules="required|email"></Field>
                                    <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
                                </div>
                                <div class="mb-3">
                                    <label for="tel" class="form-label">訂購人手機號碼</label>
                                    <Field v-model="tempOrder.user.tel" type="tel" class="form-control" id="tel"
                                        placeholder="請輸入訂購人手機號碼" name="手機號碼" :class="{ 'is-invalid': errors['手機號碼'] }"
                                        :rules="checkPhone"></Field>
                                    <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
                                </div>
                                <div class="mb-3"><label for="address" class="form-label">訂購人地址</label>
                                    <Field v-model="tempOrder.user.address" type="text" class="form-control" id="address"
                                        placeholder="請輸入訂購人地址" name="地址" :class="{ 'is-invalid': errors['地址'] }"
                                        rules="required"></Field>
                                    <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                                </div>
                                <div class="mb-3"><label for="message" class="form-label">備註</label>
                                    <Field v-model="tempOrder.message" class="form-control" id="message" rows="3" name="備註">
                                    </Field>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn btn-outline-danger"
                            :disabled="Object.keys(errors).length !== 0">儲存</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- 訂單內容 end -->
</template>

<script>
import PaginationComponent from '../../components/paginationComponent.vue'
import deleteModalComponent from '../../components/deleteModalComponent.vue'
import { swal2 } from '../../assets/utils/sweetalert.js'
import { common } from '../../assets/utils/common.js'
import { Modal } from 'bootstrap'
import { Form, Field, ErrorMessage } from 'vee-validate'
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
            orders: [],
            pagination: {},
            tempOrder: {
                user: {}
            }
            // orderProducts: []
        }
    },
    mounted () {
        common.checkAdmin(this.getOrders, () => { this.$router.push({ name: 'login' }) })
        this.editorModal = new Modal((this.$refs.editorModal), {
            keyboard: false
        })
    },
    methods: {
        openModal (action, item) {
            if (action === this.action.edit) {
                this.tempOrder = { ...item }
                this.editorModal.show()

                // 商品都被刪光了,比對不到,先不作
                // 每次開啟都要清空
                // this.orderProducts = []
                // 這筆訂單的商品id陣列
                // const pids = []
                // Object.values(item.products).forEach(item => { pids.push(item.id) })
                // console.log(pids)
                // 取回所有商品
                // this.$http
                //     .delete(`${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/products/all`)
                //     .then((resp) => {
                //         // 找取id符合的商品
                //         const { products } = resp.data
                //     })
                //     .catch((err) => {
                //         // console.log(err)
                //     })
                //     .finally(() => { })
            } else if (action === this.action.delete) {
                this.tempOrder = { ...item }
                this.$refs.deleteModal.show()
            }
        },
        getOneProduct (productId, callback) {

        },
        convertDate (timestamp) {
            const date = new Date(timestamp)
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        },
        checkPhone (value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '手機號碼不正確，必須為09開頭。'
        },
        getOrders (page = 1) {
            const loader = this.$loading.show()
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/orders?page=${page}`
            this.$http
                .get(url)
                .then((resp) => {
                    const { orders, pagination } = resp.data
                    this.orders = orders
                    this.pagination = pagination
                })
                .catch((err) => {
                    swal2.toastErrorMsg('取得訂單失敗')
                })
                .finally(() => { loader.hide() })
        },
        updateOrder () {
            const loader = this.$loading.show()
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/order/${this.tempOrder.id}`
            const method = 'put'
            this.$http[method](url, { data: this.tempOrder })
                .then((response) => {
                    swal2.toastSuccMsg('商品儲存成功')
                    this.editorModal.hide()
                    this.getOrders()
                })
                .catch((err) => {
                    swal2.toastErrorMsg('訂單儲存失敗')
                })
                .finally(() => { loader.hide() })
        },
        delOrder () {
            const loader = this.$loading.show()
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/order/${this.tempOrder.id}`
            this.$http
                .delete(url)
                .then((response) => {
                    swal2.toastSuccMsg('商品刪除成功')
                    this.$refs.deleteModal.hide()
                    this.getOrders()
                })
                .catch((err) => {
                    swal2.toastErrorMsg('訂單刪除失敗')
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

<style>
.order-img {
    max-width: 78px;
    max-height: auto;
    width: 100%;
    height: auto;
    object-fit: cover;
}
</style>
