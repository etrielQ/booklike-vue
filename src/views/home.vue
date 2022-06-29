<template>
  <app-header />
  <div class="flex flex-row">
    <sidebar />
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
        console.log(bookmark_list_response)
        this.bookmarkList = bookmark_list_response?.data
      })
  },
}
</script>
