<template>
  <div class="w-100">
    <div class="p-2 grid grid-cols-5 gap-4">
      <bookmark-list-item v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import bookmarkListItem from "./bookmarkListItem.vue"
export default {
  components: {
    bookmarkListItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>
