import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "annavue",
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
    };
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    console.log(token);
    this.checkAdmin();
  },
  methods: {
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
    getData(page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(isNew, item) {
      if (isNew === "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === "delete") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
  },
});

app.component("productModalComponent", {
  template: "#productModal",
  props: ["product", "isNew"],
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "annavue",
      selectedFile: [],
      handleFilesReselt: "",
      isOpenFileArea: false,
    };
  },
  mounted() {
    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        keyboard: false,
      }
    );
  },
  methods: {
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = "post";

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.product.id}`;
        http = "put";
      }

      axios[http](url, { data: this.product })
        .then((response) => {
          alert(response.data.message);
          productModal.hide();
          this.$emit("update");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    createImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push("");
    },
    openModal() {
      productModal.show();
    },
    //顯示檔案上傳區塊
    openFileArea() {
      this.isOpenFileArea = !this.isOpenFileArea;
    },
    //取得檔案物件
    handleFiles(event) {
      //目前限制只能單個檔案上傳,所以先清空陣列
      this.selectedFile = [];

      for (const file of event.target.files) {
        this.selectedFile.push(file);
      }
    },
    //把檔案上傳server,取回檔案網址
    uploadFiles() {
      if (this.selectedFile.length > 0) {
        //console.log(this.selectedFile.length);

        let url = `${this.apiUrl}/api/${this.apiPath}/admin/upload`;

        const fileList = this.selectedFile;
        //清空;
        this.selectedFile = [];
        document.querySelector("#fileUpload").value = "";

        //開始上傳
        for (const file of fileList) {
          const formData = new FormData();
          formData.append("file", file);
          axios
            .post(url, formData)
            .then((response) => {
              if (response.data.success) {
                //如果success = true,把網址指派給this.product.imageUrl
                // alert("圖片上傳成功!");
                this.product.imageUrl = response.data.imageUrl;
                console.log();
              } else {
                //server回傳結果
                this.handleFilesReselt = response.data.message;
              }
            })
            .catch((err) => {
              alert(err.message);
            });
        }

        // //顯示上傳結果
        // const success = successList.join("");
        // const fail = failList.join("");
        // this.handleFilesReselt = `${success}\n${fail}`;
      } else {
        this.handleFilesReselt = "沒有選擇任何檔案!";
      }
    },
  },
});

app.component("delProductModalComponent", {
  template: "#delProductModal",
  props: ["product"],
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "annavue",
    };
  },
  mounted() {
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
      }
    );
  },
  methods: {
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.product.id}`;

      axios
        .delete(url)
        .then((response) => {
          //alert(response.data.message);
          delProductModal.hide();
          this.$emit("update");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal() {
      delProductModal.show();
    },
  },
});

app.component("paginationComponent", {
  template: "#pagination",
  props: ["pages"],
  methods: {
    goToPage(page) {
      this.$emit("goToPage", page);
    },
  },
});

app.mount("#app");
