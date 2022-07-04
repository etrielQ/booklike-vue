import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
var ls = new SecureLS({ isCompression: false })

export default createStore({
  state: {
    user: null,
    saltKey: "booklike123!456?",
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
    logoutUser(state) {
      state.user = null
    },
    addToLikes(state, bookmarkId) {
      state.user.likes.push(bookmarkId)
    },
  },

  getters: {
    _isAuthenticated(state) {
      return state.user !== null
    },
    _getCurrentUser(state) {
      const user = state.user
      delete user?.password
      return user
    },

    _userLikes: (state) => state.user?.likes || [],
    _userBookmarks: (state) => state.user?.bookmarks || [],

    _currentUserId(state) {
      return state?.user?.id
    },

    _saltKey(state) {
      return state.saltKey
    },
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
})
