import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useSessionStore = defineStore('session', () => {
  const user = ref<User>({
    username: "test",
    logged: false
  })
  function setUser(newUser: User) {
    user.value = newUser
  }

  return { user, setUser }
})
