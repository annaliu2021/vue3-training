<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <RouterLink class="navbar-brand" :to="{ name: 'adminHome' }" role="button">week6</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'adminOrders' }" role="button">訂單管理
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'adminProducts' }" role="button">產品管理
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'home' }" role="button">
                            前往前台
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" role="button" @click.prevent="logout">登出
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <main style="padding-top: 80px;min-height: calc( 100vh - 40px);">
        <RouterView />
    </main>

    <footer class="footer py-2 bg-dark">
        <div class="container text-center">
            <small class="text-white fw-light mb-0">Anna 練習文件</small>
        </div>
    </footer>
</template>

<script>
const { VITE_API_ROOT, VITE_API_PATH } = import.meta.env;

export default {
    data() {
        return {

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
    }
    , methods: {
        logout() {
            const url = `${VITE_API_ROOT}/api/user/check`;
            this.$http
                .post(url)
                .then(() => {
                    var yes = confirm('你確定要登出嗎？');
                    if (yes) {
                        // 刪除 cookie 非常簡單。
                        // 刪除 cookie 時不必指定 cookie 值。
                        // 只需將 expires 參數設置為過去的日期：
                        document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        alert('登出成功!')
                        this.$router.push({ name: 'login' });
                    }
                })
                .catch((err) => {
                    alert(err.response.data.message);
                    this.$router.push({ name: 'login' });
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
                    this.$router.push({ name: 'login' });
                });
        },
    }
}

</script>