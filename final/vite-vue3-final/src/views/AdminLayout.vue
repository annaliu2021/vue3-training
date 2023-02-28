<template>
    <!-- 導覽列 -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-lg">
            <RouterLink class="navbar-brand" :to="{ name: 'login' }">
                <h1 class="fs-5 mb-0">默默蛋糕</h1>
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item me-3 active">
                        <RouterLink class="nav-link" :to="{ name: 'adminProducts' }">商品管理</RouterLink>
                    </li>
                    <li class="nav-item me-3">
                        <RouterLink class="nav-link" :to="{ name: 'adminOrders' }">訂單管理</RouterLink>
                    </li>
                    <li class="nav-item me-3">
                        <RouterLink class="nav-link" :to="{ name: 'adminCoupons' }">優惠券管理</RouterLink>
                    </li>
                    <li class="align-items-center d-flex me-3 nav-item">
                        <span v-if="!isLogon">未登入</span>
                        <a v-else class="nav-link p-0 nav-icons align-items-center d-flex" role="button" @click="logout">
                            登出
                            <svg viewBox="0 96 960 960" class="ms-1">
                                <path
                                    d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div> <!-- navbar-collapse.// -->
        </div> <!-- container-fluid.// -->
    </nav>

    <main>
        <router-view />
    </main>

    <!-- 頁尾 -->
    <footer class="align-items-center d-flex bg-primary text-white">
        <div class="container">
            <div class="text-center">
                <h6>默默蛋糕</h6>
                <p>本網站僅供個人作品使用，不提供商業用途 | <RouterLink class="link-light" :to="{ name: 'login' }">回到前台</RouterLink>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
import { swal2 } from '../assets/utils/sweetalert.js'
import { common } from '../assets/utils/common.js'
import { RouterLink } from 'vue-router'
const { VITE_API_ROOT } = import.meta.env
export default {
    data () {
        return {
            isLogon: false
        }
    },
    mounted () {
        common.checkAdmin(() => { this.isLogon = true })
    },
    methods: {
        logout () {
            const loader = this.$loading.show()
            const url = `${VITE_API_ROOT}/api/user/check`
            this.$http
                .post(url)
                .then(() => {
                    swal2.confirm('', '你確定要登出嗎？', () => {
                        document.cookie =
                            'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                        swal2.toastSuccMsg('登出成功!')
                        this.isLogon = false
                        this.$router.push({ name: 'login' })
                    })
                })
                .catch((err) => {
                    swal2.toastErrorMsg(err.message)
                    this.$router.push({ name: 'login' })
                })
                .finally(() => { loader.hide() })
        }
    },
    components: {
        RouterLink
    }
}

</script>

<style>
main {
    min-height: calc(100vh - 120px - 56px);
}

footer {
    height: 120px;
}

.navbar .nav-icons .cart-bag {
    transform: scale(1.1);
}

.navbar .nav-icons svg {
    width: 1.2rem;
    fill: #fff;
}
</style>
