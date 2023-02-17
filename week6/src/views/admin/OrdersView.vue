<template>
  <div class="container">
    <h2 class="fs-3 fw-bold text-center mb-3">{{ text }}</h2>
    <table class="table align-middle">
      <thead>
        <tr>
          <th scope="col">序號</th>
          <th scope="col">訂單編號</th>
          <th scope="col">訂購人姓名</th>
          <th scope="col">訂單狀態</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orders" :key="item.id">
          <td>{{ ++index }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.user.name }}</td>
          <td></td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary">訂單細節</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component
      :pages="pagination"
      @go-to-page="getData"
    ></pagination-component>
  </div>
</template>

<script>
import PaginationComponent from "../../components/paginationComponent.vue";
const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      text: "訂單管理",
      orders: [],
      pagination: {},
    };
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token === undefined || token.length === 0) {
      this.$router.push({ name: "login" });
    } else {
      this.$http.defaults.headers.common.Authorization = token;
      this.checkAdmin();
    }
  },
  methods: {
    getOrders(page = 1) {
      const url = `${VITE_API_ROOT}/api/${VITE_API_PATH}/admin/orders?page=1`;
      this.$http
        .get(url)
        .then((response) => {
          //console.log(response.data);
          const { orders, pagination } = response.data;
          this.orders = orders;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    checkAdmin() {
      const url = `${VITE_API_ROOT}/api/user/check`;
      this.$http
        .post(url)
        .then(() => {
          this.getOrders();
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push({ name: "login" });
        });
    },
  },
  components: {
    PaginationComponent,
  },
};
</script>
