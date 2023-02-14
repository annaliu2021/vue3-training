<template>
    <div class="container">
        <h2 class="fs-3 fw-bold text-center mb-3">{{ text }}</h2>
        <table class="table align-middle">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">產品圖片</th>
                    <th scope="col">產品名稱</th>
                    <th scope="col" width="150px" class="text-end">單價</th>
                    <th scope="col" width="200px" class="text-center">數量</th>
                    <th scope="col" width="150px" class="text-end">小計</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cartItem in cart.carts" :key="cartItem.id">
                    <td><button type="button" class="btn-close" aria-label="Close"
                            @click="removeOneCartItem(cartItem.id)"> </button></td>
                    <td>
                        <div class="cart-img" role="button"
                            :style="{ backgroundImage: 'url(' + cartItem.product.imageUrl + ')' }"></div>
                    </td>
                    <td>{{ cartItem.product.title }}</td>
                    <td class="text-end">$ {{ cartItem.product.price }}元</td>
                    <td>
                        <select class="form-select mx-auto" :value="cartItem.qty" style="width:100px"
                            @change="(e) => changeQty(cartItem, e.target.value)">
                            <option v-for="i in 20" :value="i">{{ i }}</option>
                        </select>
                    </td>
                    <td class="text-end">$ {{ cartItem.total }}元</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6" class="text-end">總計金額：$ {{ cart.final_total }} 元</td>
                </tr>
            </tfoot>
        </table>
        <div class="d-flex justify-content-center my-3">
            <button type="button" class="btn btn-outline-secondary p-2 me-3" @click="removeAllCartItem"
                :disabled="cart.carts?.length === 0"> 清空購物車
            </button>
            <button type="button" class="btn btn-outline-danger p-2" :disabled="cart.carts?.length === 0"
                @click="goToOrder">下一步:填寫訂購資訊</button>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {
            text: "購物車",
            cart: {},
        };
    },
    mounted() {
        this.getCartData();
    },
    methods: {
        goToOrder() {
            this.$router.push({ name: 'order' });
        },
        getCartData() {
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/cart`;
            this.$http
                .get(url)
                .then((response) => {
                    //console.log(response.data.data);
                    this.cart = response.data.data;
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        },
        removeOneCartItem(cartId) {
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/cart/${cartId}`;
            this.$http
                .delete(url)
                .then((response) => {
                    alert(response.data.message);
                    this.getCartData();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        },
        removeAllCartItem() {
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/carts`;
            this.$http
                .delete(url)
                .then((response) => {
                    alert(response.data.message);
                    this.getCartData();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        },
        changeQty(cartItem, qty) {
            const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/cart/${cartItem.id}`;
            this.$http
                .put(url, {
                    data: { product_id: cartItem.product.id, qty: Number(qty) },
                })
                .then((response) => {
                    alert(response.data.message);
                    this.getCartData();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        },
    },
    components: { RouterLink }
}

</script>

<style>
.cart-img {
    /* background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/annavue/1675490570956.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cWTHw4e5Kr6%2BquA825d0CNCjsWCeGHLPdtBF45Kjx0EAPhtJY%2BRc4sJtNNDwKN%2FuUDBvcuWSK9HMHzGkGN2aBgn%2FL3fk13pXEp%2FMw1024kLMgjuU2%2BSdFPNSzxsCQ1UpM%2F99JNEC5OLRlI3OxYdrfg2glxWiGgc9zaDaxbcGcEzin5zeZSC4ZlGmc236%2FPwAXlnP62Dc%2FKlBFgr1jsGT%2FZsTpVKqcd6dfytcNFqLSMI%2FToZvoZf%2Fz4NM7warq%2FFIZivDDumNUuwqtihImK3U0a%2FbpRv75Y3%2BYISCzHinKSuORWOdAQ16zv9uzghjqQmLmnjesj8rECKr35XUiCFSyg%3D%3D'); */
    width: 5rem;
    height: 5rem;
    overflow: hidden;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>