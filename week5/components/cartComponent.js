export default {
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "annavue",
      cart: {},
      offcanvas: {},
      isOpenOrder: false,
    };
  },
  mounted() {
    this.offcanvas = new bootstrap.Offcanvas(this.$refs.offcanvas);
  },
  methods: {
    show() {
      this.getCartData();
      this.offcanvas.show();
    },
    openOrderArea() {
      //console.log("openOrderArea");
      this.offcanvas.hide();
      this.$emit("open");
    },
    getCartData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
      axios
        .get(url)
        .then((response) => {
          this.cart = response.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    removeOneCartItem(cartId) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${cartId}`;
      axios
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
      const url = `${this.apiUrl}/api/${this.apiPath}/carts`;
      axios
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
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${cartItem.id}`;
      axios
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
  props: [""],
  template: `<div ref="offcanvas" class="offcanvas offcanvas-start bg-dark text-muted">
    <div class="offcanvas-header border-bottom border-secondary">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">購物車</h5>
      <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"
        aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-4">
      <ul class="list-unstyled">
        <li v-for="cartItem in cart.carts" :key="cartItem.id"
          class="row align-items-center border-bottom border-secondary py-2">
          <button type="button" class="btn-close btn-close-white small me-3" aria-label="Close"
            @click="removeOneCartItem(cartItem.id)"></button>
          <div class="cart-img" role="button" :style="{backgroundImage:'url(' + cartItem.product.imageUrl + ')'}">
          </div>
          <div class="col">
            <p class="m-0 text-white-50">{{cartItem.product.title}}</p>
            <span class="d-block text-white-50" style="letter-spacing: 1px;">$ {{cartItem.product.price}}元/條</span>
          </div>
          <div class="col-3">
            <select class="form-select" :value="cartItem.qty" @change="(e)=>changeQty(cartItem,e.target.value)">
              <option v-for="i in 20" :value="i">{{i}}</option>
            </select>
          </div>
          <div class="col-12 d-flex justify-content-end">
            <div class="loading text-white-50 fade"><span>.....</span><span></span><span></span></div>
            <p class="m-0 text-white-50 text-end">$ {{cartItem.total}}元</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="offcanvas-footer">
      <p class="text-end p-4"> 總計金額：$ {{cart.final_total}} 元 </p>
      <p class="p-4 pt-0 text-center">
        <button type="button" class="btn btn-light p-2 w-100" :disabled="cart.carts?.length===0" @click="openOrderArea"> 確認結帳 </button>
        <button type="button" class="btn btn-outline-secondary p-2 w-100 mt-3" @click="removeAllCartItem"
          :disabled="cart.carts?.length===0"> 清空購物車
        </button>
      </p>
    </div>
  </div>`,
};
