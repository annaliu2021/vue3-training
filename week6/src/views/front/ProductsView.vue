<template>
  <div class="container my-3">
    <!-- <h2 class="fs-3 fw-bold text-center mb-3">{{ text }}</h2> -->
    <ul class="row row-cols-lg-3 list-unstyled p-0">
      <li
        v-for="item in products"
        :key="item.id"
        class="col d-flex flex-column mb-3"
      >
        <router-link
          class="products-img border"
          role="button"
          :to="`/Product/${item.id}`"
          :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }"
        >
          <small>商品內容</small>
        </router-link>
        <div class="p-3 text-center">
          <p class="m-0">{{ item.title }}</p>
          <p class="mt-1">
            <small class="">$ {{ item.price }}元/條</small>
          </p>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-outline-primary mt-auto fs-6 w-100"
          @click="addToCart(item.id)"
          :disabled="isDisabled"
        >
          加入購物車
          <div class="loading bounceball d-none fade">
            <span></span><span></span><span></span>
          </div>
        </button>
      </li>
    </ul>
    <pagination-component
      :pages="pagination"
      @go-to-page="getProductsData"
    ></pagination-component>
  </div>
</template>

<script>
import PaginationComponent from "../../components/paginationComponent.vue";

const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;

const loadingSetting = {
  loader: "dots",
  canCancel: true,
  color: "#36495e",
};

export default {
  data() {
    return {
      text: "產品列表",
      products: [],
      pagination: {},
      isDisabled: false,
    };
  },
  mounted() {
    this.getProductsData();
  },
  methods: {
    getProductsData(page = 1) {
      let loader = this.$loading.show(loadingSetting);
      const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/products?page=${page}`;
      this.$http
        .get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          //console.log(products);
          this.products = products;
          this.pagination = pagination;
          loader.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
          loader.hide();
        });
    },
    addToCart(productId, qty = 1) {
      this.isDisabled = true;

      this.$http
        .post(`${VITE_API_ROOT}/api/${VITE_API_PATH}/cart`, {
          data: { product_id: productId, qty: qty },
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
  components: {
    PaginationComponent,
  },
};
</script>

<style>
.products-img {
  /* background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/annavue/1675490570956.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cWTHw4e5Kr6%2BquA825d0CNCjsWCeGHLPdtBF45Kjx0EAPhtJY%2BRc4sJtNNDwKN%2FuUDBvcuWSK9HMHzGkGN2aBgn%2FL3fk13pXEp%2FMw1024kLMgjuU2%2BSdFPNSzxsCQ1UpM%2F99JNEC5OLRlI3OxYdrfg2glxWiGgc9zaDaxbcGcEzin5zeZSC4ZlGmc236%2FPwAXlnP62Dc%2FKlBFgr1jsGT%2FZsTpVKqcd6dfytcNFqLSMI%2FToZvoZf%2Fz4NM7warq%2FFIZivDDumNUuwqtihImK3U0a%2FbpRv75Y3%2BYISCzHinKSuORWOdAQ16zv9uzghjqQmLmnjesj8rECKr35XUiCFSyg%3D%3D'); */
  background-position: center 70%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 350px;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
}

.products-img .small,
.products-img button,
.products-img small {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
  width: calc(100% - 2rem);
  background: #fff;
  color: #414666;
  padding: 0.5rem;
  margin: 0.5rem 0;
  text-align: center;
  box-shadow: 0 2px 6px rgb(33 37 41 / 10%);
  text-transform: uppercase;
  font-size: 0.875rem;
  transition: all 0.3s ease-out;
  z-index: 2;
}

.products-img .small,
.products-img small {
  transform: translate(-50%, 10%);
  opacity: 0;
}

.products-img:after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(33, 37, 41, 0.15);
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.products-img:hover .small,
.products-img:hover small {
  opacity: 1;
  transform: translate(-50%);
}

.products-img:hover:after {
  opacity: 1;
}
</style>
