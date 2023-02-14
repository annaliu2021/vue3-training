<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-secondary">
        <div class="container">
            <RouterLink class="navbar-brand" :to="{ name: 'home' }" role="button">week6</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'products' }" role="button">產品
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'cart' }" role="button">購物車
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'adminHome' }" role="button">
                            前往後台
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <main style="padding-top: 80px;min-height: calc( 100vh - 40px);">
        <RouterView />
    </main>

    <footer class="footer py-2 bg-secondary">
        <div class="container text-center">
            <small class="text-white fw-light mb-0">Anna 練習文件</small>
        </div>
    </footer>
</template>


<script>
import { RouterView } from 'vue-router'
export default {
    components: {
        RouterView
    }
}
</script>
