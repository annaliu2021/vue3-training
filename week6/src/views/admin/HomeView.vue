<template>
  <div class="container">
    <h1>這是後台首頁</h1>
  </div>
</template>
<script>
const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {};
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
    checkAdmin() {
      const url = `${VITE_API_ROOT}/api/user/check`;
      this.$http
        .post(url)
        .then(() => {
          //this.$router.push({ name: 'adminOrders' });
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push({ name: "login" });
        });
    },
  },
};
</script>
