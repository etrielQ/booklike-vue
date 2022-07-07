<template>
  <app-header />
  <div class="flex flex-row">
    <sidebar @category-changed="updateBookmarkList" />
    <app-bookmark-list :items="bookmarkList" />
  </div>
</template>

<script>
import sidebar from "@/components/home/sidebar.vue"
export default {
  components: {
    sidebar,
  },
  data() {
    return {
      bookmarkList: [],
    }
  },
  created() {
    this.$appAxios
      .get("/bookmarks?_expand=category&_expand=user")
      .then((bookmark_list_response) => {
        this.bookmarkList = bookmark_list_response?.data
      })
  },
  methods: {
    updateBookmarkList(categoryId) {
      const url = categoryId
        ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}`
        : `/bookmarks?_expand=category&_expand=user`
      this.$appAxios.get(url).then((bookmark_list_response) => {
        this.bookmarkList = bookmark_list_response?.data
      })
    },
  },
}
</script>
