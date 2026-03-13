import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    username: "test",
    logged: false
  })
  function setUser(newUser: User) {
    user.value = newUser
  }

  return { user, setUser }
})
