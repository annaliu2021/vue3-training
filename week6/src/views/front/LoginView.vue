<template>
  <div class="container">
    <div class="row justify-content-center">
      <h2 class="h3 mb-3 font-weight-normal text-center">請先登入</h2>
      <div class="col-8">
        <form class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              v-model="user.username"
              id="floatingInput"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              v-model="user.password"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const url = `${VITE_API_ROOT}/admin/signin`;
      this.$http
        .post(url, this.user)
        .then((response) => {
          const { token, expired, message } = response.data;
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`;
          alert(message);
          this.$router.push({ name: "adminHome" });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
