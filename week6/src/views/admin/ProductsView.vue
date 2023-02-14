<template>
    <div class="container">
        <h2 class="fs-3 fw-bold text-center mb-3">{{ text }}</h2>
        <div class="my-3">
            <button class="btn btn-success" @click="openModal('new')">
                建立新的產品
            </button>
        </div>
        <table class="table align-middle">
            <thead>
                <tr>
                    <th scope="col">序號</th>
                    <th scope="col">產品分類</th>
                    <th scope="col">產品圖片</th>
                    <th scope="col">產品名稱</th>
                    <th scope="col">產品狀態</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in products" :key="item.id">
                    <td>{{ ++index }}</td>
                    <td>{{ item.category }}</td>
                    <td><img :src="item.imageUrl" class="table-img" :alt="item.title"></td>
                    <td>{{ item.title }}</td>
                    <td class="text-center">
                        <span v-if="item.is_enabled" class="text-success">啟用中</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btn-outline-success btn-sm"
                                @click="openModal('edit', item)">
                                編輯
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm"
                                @click="openModal('delete', item)">
                                刪除
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination-component :pages="pagination" @go-to-page="getData"></pagination-component>
    </div>
</template>

<script>
import PaginationComponent from '../../components/paginationComponent.vue'

const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;


export default {
    data() {
        return {
            text: '產品管理',
            products: [],
            pagination: {},
        }
    }, mounted() {

        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        if (token === undefined || token.length === 0) {
            this.$router.push({ name: 'login' });
        } else {
            this.$http.defaults.headers.common.Authorization = token;
            this.checkAdmin();
        }

    }, methods: {
        getproducts(page = 1) {
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/products?page=${page}`;
            this.$http
                .get(url)
                .then((response) => {
                    const { products, pagination } = response.data;
                    this.products = products;
                    this.pagination = pagination;
                })
                .catch((err) => {
                    alert(err.response);
                });
        },
        checkAdmin() {
            const url = `${VITE_API_ROOT}/api/user/check`;
            this.$http
                .post(url)
                .then(() => {
                    this.getproducts();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                    this.$router.push({ name: 'login' });
                });
        },
    }, components: {
        PaginationComponent
    }
}

</script>

<style>
.table-img {
    width: 100px;
    object-fit: cover;
}
</style>