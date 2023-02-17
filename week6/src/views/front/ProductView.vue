<template>
  <div class="container">
    <!-- <h2 class="fs-3 fw-bold text-center mb-3">{{ text }}</h2> -->
    <div>
      <router-link
        class="btn btn-outline-secondary my-3"
        role="button"
        :to="{ name: 'products' }"
      >
        返回產品列表
      </router-link>
    </div>
    <div class="row gap-5">
      <div class="col col-md-5">
        <div
          class="product-img border"
          :style="{ backgroundImage: 'url(' + product.imageUrl + ')' }"
        ></div>
        <div class="d-flex mt-4">
          <div
            class="product-small-img border me-4"
            :style="{ backgroundImage: 'url(' + product.imageUrl + ')' }"
          ></div>
          <div
            class="product-small-img border me-4"
            :style="{ backgroundImage: 'url(' + product.imageUrl + ')' }"
          ></div>
          <div
            class="product-small-img border"
            :style="{ backgroundImage: 'url(' + product.imageUrl + ')' }"
          ></div>
        </div>
      </div>
      <div class="col">
        <p>{{ product.category }}</p>
        <h3>{{ product.title }}</h3>
        <div>
          <p>{{ product.description }}</p>
          <p>{{ product.content }}</p>
          <p class="mt-4">
            <small class="fs-4">$ {{ product.price }} NTD</small>
            <small class="ms-2 text-secondary">/ 個</small>
          </p>
          <div class="mt-4 d-flex">
            <select
              class="form-select me-3"
              aria-label="Default select example"
              v-model="number"
              style="width: 100px"
            >
              <option v-for="i in 20" :value="i" :key="i">{{ i }}</option>
            </select>
            <button
              class="bottom-0 btn btn-danger"
              type="button"
              :disabled="isDisabled"
              @click="addToCart(product.id)"
            >
              加入購物車
              <div class="loading bounceball d-none fade">
                <span></span><span></span><span></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      number: 1,
      text: "產品明細",
      product: {},
      isDisabled: false,
    };
  },
  mounted() {
    this.getOneProduct();
  },
  methods: {
    getOneProduct() {
      const { id } = this.$route.params;
      const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((response) => {
          //console.log(response.data.product)
          this.product = response.data.product;
        })
        .catch((err) => {
          alert(err.response);
        });
    },
    addToCart(productId) {
      this.isDisabled = true;
      this.$http
        .post(`${VITE_API_ROOT}/api/${VITE_API_PATH}/cart`, {
          data: { product_id: productId, qty: this.number },
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .finally(() => {
          this.isDisabled = false;
        });
    },
  },
};
</script>

<style>
.product-img {
  /* background-image: url("https://storage.googleapis.com/vue-course-api.appspot.com/annavue/1675490570956.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cWTHw4e5Kr6%2BquA825d0CNCjsWCeGHLPdtBF45Kjx0EAPhtJY%2BRc4sJtNNDwKN%2FuUDBvcuWSK9HMHzGkGN2aBgn%2FL3fk13pXEp%2FMw1024kLMgjuU2%2BSdFPNSzxsCQ1UpM%2F99JNEC5OLRlI3OxYdrfg2glxWiGgc9zaDaxbcGcEzin5zeZSC4ZlGmc236%2FPwAXlnP62Dc%2FKlBFgr1jsGT%2FZsTpVKqcd6dfytcNFqLSMI%2FToZvoZf%2Fz4NM7warq%2FFIZivDDumNUuwqtihImK3U0a%2FbpRv75Y3%2BYISCzHinKSuORWOdAQ16zv9uzghjqQmLmnjesj8rECKr35XUiCFSyg%3D%3D"); */
  background-position: center 70%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
}

.product-small-img {
  /* background-image: url("https://storage.googleapis.com/vue-course-api.appspot.com/annavue/1675490570956.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cWTHw4e5Kr6%2BquA825d0CNCjsWCeGHLPdtBF45Kjx0EAPhtJY%2BRc4sJtNNDwKN%2FuUDBvcuWSK9HMHzGkGN2aBgn%2FL3fk13pXEp%2FMw1024kLMgjuU2%2BSdFPNSzxsCQ1UpM%2F99JNEC5OLRlI3OxYdrfg2glxWiGgc9zaDaxbcGcEzin5zeZSC4ZlGmc236%2FPwAXlnP62Dc%2FKlBFgr1jsGT%2FZsTpVKqcd6dfytcNFqLSMI%2FToZvoZf%2Fz4NM7warq%2FFIZivDDumNUuwqtihImK3U0a%2FbpRv75Y3%2BYISCzHinKSuORWOdAQ16zv9uzghjqQmLmnjesj8rECKr35XUiCFSyg%3D%3D"); */
  background-position: center 70%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 7rem;
  height: 6rem;
}
</style>
