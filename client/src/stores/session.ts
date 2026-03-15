import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useSessionStore = defineStore('session', () => {
  const user = ref<User>({
    username: "test",
    logged: false,
    admin: false
  })
  function setUser(newUser: User) {
    user.value = newUser
  }
  function logout() {
    user.value.username = "";
    user.value.logged = false;
    user.value.admin = false;
  }

  return { user, setUser, logout }
})
