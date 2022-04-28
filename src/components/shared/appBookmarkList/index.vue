<template>
  <div class="w-100">
    <div class="p-2 grid grid-cols-5 gap-4">
      <bookmark-list-item v-for="n in 8" :key="n" />
    </div>
  </div>
</template>

<script>
import bookmarkListItem from "./bookmarkListItem.vue"
export default {
  components: {
    bookmarkListItem,
  },
}
</script>
