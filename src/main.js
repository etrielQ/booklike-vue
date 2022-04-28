import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "@/assets/style.css"

import appHeader from "@/components/shared/appHeader"
import appBookmarkList from "@/components/shared/appBookmarkList/index.vue"

const app = createApp(App)
app.component("appHeader", appHeader)
app.component("appBookmarkList", appBookmarkList)
app.use(router)
app.mount("#app")
