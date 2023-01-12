import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// 取得產品資料串接 GET API
// 新增產品資料串接 POST API
// 刪除產品資料串接 DELETE API
// 編輯產品資料串接 PUT API

let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "annavue",
      products: [],
      isNew: false, //是不是新增的狀態
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  mounted() {
    //初始化 Bootstrap Modal物件
    //防止 Bootstrap Modal 在單擊外部或按 Escape 時消失
    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        backdrop: "static",
        keyboard: true,
      }
    );

    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        backdrop: "static",
        keyboard: false,
      }
    );

    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    //檢查是否登入
    this.checkAdmin();
  },
  methods: {
    //檢查是否登入
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    //取得產品列表
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
          // console.log(this.products);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //新增與編輯產品
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = "post";

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = "put";
      }

      axios[http](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          productModal.hide();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //打開Modal
    openModal(action, item) {
      //如果傳進來的參數是new,代表現在是新增
      if (action === "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (action === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (action === "delete") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    //刪除產品
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          delProductModal.hide();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
}).mount("#app");
