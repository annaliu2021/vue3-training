<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="pages.has_pre ? '' : 'disabled'">
        <a
          v-if="pages.has_pre"
          class="page-link"
          href="#"
          @click.prevent="goToPage(pages.current_page - 1)"
          >Previous</a
        >
        <span v-else class="page-link">Previous</span>
      </li>
      <li
        v-for="(item, index) in pages.total_pages"
        :key="index"
        class="page-item"
      >
        <span v-if="item === pages.current_page" class="page-link">{{
          item
        }}</span>
        <a v-else class="page-link" href="#" @click.prevent="goToPage(item)">{{
          item
        }}</a>
      </li>
      <li class="page-item" :class="pages.has_next ? '' : 'disabled'">
        <a
          v-if="pages.has_next"
          class="page-link"
          href="#"
          @click.prevent="goToPage(pages.current_page + 1)"
          >Next</a
        >
        <span v-else class="page-link">Next</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  data () {
    return {}
  },
  methods: {
    goToPage (page) {
      this.$emit('goToPage', page)
    }
  }
}
</script>
