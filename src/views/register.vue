<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Kayıt Ol</h3>
    <input
      type="text"
      placeholder="Tam Ad"
      class="input mb-3"
      v-model="userData.fullname"
    />
    <input
      type="text"
      placeholder="Kullanıcı Adı"
      class="input mb-3"
      v-model="userData.username"
    />
    <input
      type="password"
      placeholder="Şifre"
      class="input mb-3"
      v-model="userData.password"
    />
    <button class="default-button" @click="onSave">Kayıt ol</button>
    <span class="text-center mt-3 text-sm">
      Zaten Üyeyim,
      <router-link
        :to="{ name: 'LoginPage' }"
        class="text-red-900 hover:text-black"
        >Giriş Yap!</router-link
      >
    </span>
  </div>
</template>

<script>
import CryptoJS from "crypto-js"

export default {
  data() {
    return {
      userData: {
        fullname: null,
        username: null,
        password: null,
      },
    }
  },
  methods: {
    onSave() {
      const key = "booklike123!456?"
      const cryptedPassword = CryptoJS.AES.encrypt(
        this.userData.password,
        key
      ).toString() // password şifreleme
      console.log(cryptedPassword)
      console.log(this.userData)

      this.$appAxios.post("/users", {
        ...this.userData,
        password: cryptedPassword,
      })

      // const decryptedPassword = CryptoJS.AES.decrypt(
      //   cryptedPassword,
      //   key
      // ).toString(CryptoJS.enc.Utf8) // şifreyi çözme
      // console.log(decryptedPassword)
    },
  },
}
</script>
