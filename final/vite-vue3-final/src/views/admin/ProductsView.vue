<!-- eslint-disable n/handle-callback-err -->
<template>
  <!-- 商品分類 -->
  <section class="category container-lg pt-6 pb-4">
    <div class="row justify-content-center">
      <div class="col col-lg-6">
        <nav class="nav nav-pills flex-column flex-sm-row gap-2">
          <a class="flex-sm-fill text-sm-center btn btn-outline-primary"
            :class="[this.nowCategory === '' ? 'active' : '']" aria-current="page" role="button"
            @click="getProducts()">全部</a>
          <a class="flex-sm-fill text-sm-center btn btn-outline-primary"
            :class="[this.nowCategory === '手作蛋糕' ? 'active' : '']" role="button" @click="getProducts(1, '手作蛋糕')">手作蛋糕</a>
          <a class="flex-sm-fill text-sm-center btn btn-outline-primary"
            :class="[this.nowCategory === '手作甜點' ? 'active' : '']" role="button" @click="getProducts(1, '手作甜點')">手作甜點</a>
          <a class="flex-sm-fill text-sm-center btn btn-outline-primary"
            :class="[this.nowCategory === '鳳梨酥' ? 'active' : '']" role="button" @click="getProducts(1, '鳳梨酥')">鳳梨酥</a>
        </nav>
      </div>
    </div>
  </section>

  <!-- 商品列表 -->
  <section class="products container-lg">
    <div class="">
      <button type="button" class="btn btn-outline-success" @click="(_$event) => openModal('add')">
        新增商品
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr class="text-center">
          <th scope="col">序號</th>
          <th scope="col">分類</th>
          <th scope="col">圖片</th>
          <th scope="col" class="text-start">名稱</th>
          <th scope="col">是否啟用</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="item.id">
          <td width="50" class="text-center">{{ ++index }}</td>
          <td width="150" class="text-center">{{ item.category }}</td>
          <td width="150" class="text-center">
            <img :src="item.imageUrl" class="table-img" :alt="item.title" />
          </td>
          <td>{{ item.title }}</td>
          <td width="200" class="text-center">
            <span v-if="item.is_enabled" class="text-success">啟用中</span>
            <span v-else>未啟用</span>
          </td>
          <td width="200" class="text-center">
            <button type="button" class="btn btn-outline-success btn-sm me-2"
              @click="(_$event) => openModal('edit', item)">
              編輯
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="(_event) => openModal('delete', item)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @go-to-page="getProducts"></pagination-component>
  </section>

  <!-- 商品刪除 start -->
  <delete-modal-component ref="deleteModal" :data="{ item: '商品', text: tempProduct.title }"
    @delete="delProduct"></delete-modal-component>
  <!-- 商品刪除 end -->

  <!-- 商品內容 start -->
  <div class="modal fade" ref="editorModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-white bg-primary" data-bs-theme="dark">
          <h5 class="modal-title fs-6">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <Form @submit="updateProduct" v-slot="{ errors }" id="form">
          <div class="modal-body">
            <div class="input-group mb-3">
              <input type="file" class="form-control" id="imageUpload" @change="handleImage" />
              <button class="btn btn-outline-secondary" type="button" id="imageUpload" @click="uploadImage"
                :disabled="this.selectedFile.length === 0">
                立即上傳圖片
              </button>
            </div>
            <div v-if="tempProduct.imagesUrl?.length > 0">
              <p class="mb-2 small">第一張為主圖</p>
              <div class="upload-area g-2 row row-cols-4 mb-3 p-2">
                <div v-for="(item, index) in tempProduct.imagesUrl" :key="index" class="col text-center">
                  <img :src="item" class="table-img" />
                  <!-- <input type="hidden" name="imgUrl" value="" /> -->
                <!-- <div>
                  <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" value="" />
                                                                                                                            </div> -->
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">商品標題</label>
              <Field v-model="tempProduct.title" type="text" class="form-control" id="name" placeholder="請輸入商品標題"
                name="商品標題" :class="{ 'is-invalid': errors['商品標題'] }" rules="required" />
              <ErrorMessage name="商品標題" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                  name="是否啟用" :true-value="1" :false-value="0" />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
                <ErrorMessage name="商品標題" class="invalid-feedback"></ErrorMessage>
              </div>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">商品分類</label>
              <Field class="form-select" name="商品分類" v-model="tempProduct.category"
                :class="{ 'is-invalid': errors['商品分類'] }" rules="required" as="select">
                <option value="">請選擇</option>
                <option value="手作蛋糕">手作蛋糕</option>
                <option value="手作甜點">手作甜點</option>
                <option value="鳳梨酥">鳳梨酥</option>
              </Field>
              <ErrorMessage name="商品標題" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">商品單位</label>
              <select class="form-select" name="商品單位" v-model="tempProduct.unit" :class="{ 'is-invalid': errors['商品分類'] }"
                rules="required" as="select">
                <option value="盒">盒</option>
                <option value="個">個</option>
                <option value="組">組</option>
              </select>
              <ErrorMessage name="商品單位" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">建議售價 <small>(NT)</small></label>
              <Field v-model.number="tempProduct.origin_price" type="number" class="form-control" id="address" name="建議售價"
                :class="{ 'is-invalid': errors['建議售價'] }" rules="required" />
              <ErrorMessage name="建議售價" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">商品售價 <small>(NT)</small></label>
              <Field v-model.number="tempProduct.price" type="number" class="form-control" id="address" name="商品售價"
                :class="{ 'is-invalid': errors['商品售價'] }" rules="required" />
              <ErrorMessage name="商品售價" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">商品說明</label>
              <Field v-model="tempProduct.content" class="form-control" id="message" rows="2" name="商品說明"
                :class="{ 'is-invalid': errors['商品說明'] }" rules="required" as="textarea"></Field>
              <ErrorMessage name="商品說明" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">商品描述</label>
              <Field v-model="tempProduct.description" class="form-control" id="message" rows="5" name="商品描述"
                :class="{ 'is-invalid': errors['商品描述'] }" rules="required" as="textarea"></Field>
              <ErrorMessage name="商品說明" class="invalid-feedback"></ErrorMessage>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="submit" class="btn btn-outline-danger" :disabled="!isNew && Object.keys(errors).length !== 0">
              儲存
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
  <!-- 商品內容 end -->
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
      categoryType: {
        pipeapple: '鳳梨酥',
        cake: '手作蛋糕',
        dessert: '手作甜點'
      },
      nowCategory: '',
      products: [],
      pagination: {},
      isNew: false,
      tempProduct: {
        imagesUrl: []
      },
      selectedFile: []
    }
  },
  mounted () {
    common.checkAdmin(this.getProducts, () => { this.$router.push({ name: 'login' }) })
    this.editorModal = new Modal((this.$refs.editorModal), {
      keyboard: false
    })
  },
  methods: {
    checkAdmin () {
      const loader = this.$loading.show()
      const url = `${VITE_API_ROOT}/api/user/check`
      this.$http
        .post(url)
        .then(() => {
          this.getProducts()
        })
        .catch(() => {
          swal2.toastErrorMsg('使用者身分確認失敗')
          this.$router.push({ name: 'login' })
        })
        .finally(() => { loader.hide() })
    },
    openModal (action, item) {
      if (action === this.action.add) {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        // this.$refs.form.reset()
        // this.$refs.form.resetValidation()
        document.querySelector('#form').reset()
        this.editorModal.show()
      } else if (action === this.action.edit) {
        this.tempProduct = { ...item }
        this.isNew = false
        this.editorModal.show()
      } else if (action === this.action.delete) {
        this.tempProduct = { ...item }
        this.$refs.deleteModal.show()
      }
    },
    getProducts (page = 1, category) {
      const loader = this.$loading.show()
      let url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/products?page=${page}`

      if (category !== undefined && category.length > 0) {
        url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/products?page=${page}&category=${category}`
        this.nowCategory = category
      } else {
        this.nowCategory = ''
      }

      this.$http
        .get(url)
        .then((resp) => {
          const { products, pagination } = resp.data
          this.products = products
          this.pagination = pagination
        })
        .catch(() => {
          swal2.toastErrorMsg('取得商品失敗')
        })
        .finally(() => { loader.hide() })
    },
    delProduct () {
      const loader = this.$loading.show()
      const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/product/${this.tempProduct.id}`

      this.$http
        .delete(url)
        .then(() => {
          swal2.toastSuccMsg('商品刪除成功')
          this.$refs.deleteModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          // console.log(err)
          swal2.toastErrorMsg('商品刪除失敗')
        })
        .finally(() => { loader.hide() })
    },
    updateProduct () {
      if (!this.tempProduct.imagesUrl || this.tempProduct.imagesUrl.length === 0) {
        swal2.toastWarningMsg('請先上傳圖片')
        return
      }

      const loader = this.$loading.show()
      let url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/product`
      let http = 'post'

      if (!this.isNew) {
        url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/product/${this.tempProduct.id}`
        http = 'put'
      }

      if (this.tempProduct.imagesUrl?.length > 0) {
        this.tempProduct.imageUrl = this.tempProduct.imagesUrl[0]
      }

      this.$http[http](url, { data: this.tempProduct })
        .then(() => {
          swal2.toastSuccMsg('商品儲存成功')
          this.editorModal.hide()
          this.getProducts()
        })
        .catch(() => {
          swal2.toastErrorMsg('商品儲存失敗')
        })
        .finally(() => {
          loader.hide()
        })
    },
    // 取得圖片檔案
    handleImage (event) {
      // 目前限制只能單個檔案上傳,所以先清空陣列
      this.selectedFile = []

      for (const file of event.target.files) {
        this.selectedFile.push(file)
      }
    },
    // 圖片上傳
    uploadImage () {
      const loader = this.$loading.show()
      if (this.selectedFile.length > 0) {
        // console.log(this.selectedFile.length)

        const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/upload`
        const fileList = this.selectedFile
        // 清空;
        this.selectedFile = []
        document.querySelector('#imageUpload').value = ''

        // 開始上傳
        for (const file of fileList) {
          const formData = new FormData()
          formData.append('file', file)
          this.$http
            .post(url, formData)
            .then((response) => {
              if (response.data.success) {
                // 如果success = true,把網址指派給this.product.imageUrl
                swal2.toastSuccMsg('圖片上傳成功')
                if (!this.tempProduct.imagesUrl) {
                  this.tempProduct.imagesUrl = []
                }
                this.tempProduct.imagesUrl.push(response.data.imageUrl)

                // console.log(response.data.imageUrl)
              } else {
                // server回傳結果
                swal2.toastErrorMsg('圖片上傳失敗')
              }
            })
            .catch((err) => {
              // console.log(err)
              swal2.toastErrorMsg('圖片上傳失敗')
            })
            .finally(() => { loader.hide() })
        }
      } else {
        swal2.toastWarningMsg('您沒有上傳圖片')
      }
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
.table-img {
  max-width: 78px;
  max-height: auto;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.upload-area {
  height: 100%;
  border: 3px gainsboro dashed;
}
</style>
