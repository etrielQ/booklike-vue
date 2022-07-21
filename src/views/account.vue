<template>
  <app-header></app-header>
  <div class="flex flex-row">
    <side-bar />
    {{ $log($route) }}
    <component
      :is="$route.meta.componentName"
      :items="bookmarkList"
    ></component>
    <!-- <app-bookmark-list :items="bookmarkList" v-if="bookmarkList.length > 0" /> -->
    <!-- <div v-else>bu kategoride içerik yok</div> -->
  </div>
</template>

<script>
import sideBar from "@/components/account/sideBar"
export default {
  components: {
    sideBar,
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
}
</script>
