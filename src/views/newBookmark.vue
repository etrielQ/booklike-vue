<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
    <input
      ref="title"
      v-model="userData.title"
      type="text"
      placeholder="Başlık"
      class="input mb-3"
    />
    <input
      v-model="userData.url"
      type="text"
      placeholder="URL"
      class="input mb-3"
    />
    <select v-model="userData.categoryId" class="input mb-3">
      <option value="Selected" selected disabled>Kategori</option>
      <option
        v-for="category in categoryList"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <textarea
      placeholder="Açıklama"
      class="input mb-3"
      cols="30"
      rows="10"
      v-model="userData.description"
    ></textarea>
    <div class="flex items-center justify-end gap-x-1">
      <button
        class="secondary-button"
        @click="$router.push({ name: 'HomePage' })"
      >
        İptal
      </button>
      <button class="default-button" @click="onSave()">Kaydet</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      categoryList: [],
      userData: {
        title: null,
        url: null,
        categoryId: null,
        description: null,
      },
    }
  },
  mounted() {
    this.$appAxios.get("/categories").then((category_response) => {
      this.categoryList = category_response?.data || []
    })

    this.$refs.title.focus()
  },
  methods: {
    onSave() {
      const saveData = {
        ...this.userData,
        userId: this._getCurrentUser?.id,
        created_at: new Date(),
      }
      this.$appAxios.post("/bookmarks", saveData).then(() => {
        this.$router.push({ name: "HomePage" })
        this.userData = {
          title: null,
          url: null,
          categoryId: null,
          description: null,
        }
      })
    },
  },
  computed: {
    ...mapGetters(["_getCurrentUser"]),
  },
}
</script>
