<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
    <input
      autofocus
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
    <select v-model="userData.category_id" class="input mb-3">
      <option value="Selected" selected>Kategori</option>
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
        category_id: null,
        description: null,
      },
    }
  },
  mounted() {
    this.$appAxios.get("/categories").then((category_response) => {
      this.categoryList = category_response?.data || []
    })
  },
  methods: {
    onSave() {
      const saveData = {
        ...this.userData,
        user_id: this._getCurrentUser?.id,
        created_at: new Date(),
      }
      console.log(saveData)
      this.$appAxios
        .post("/bookmarks", saveData)
        .then((save_bookmark_response) => {
          console.log(save_bookmark_response)
          // this.$router.push({ name: "HomePage" })
          this.userData = {
            title: null,
            url: null,
            category_id: null,
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
