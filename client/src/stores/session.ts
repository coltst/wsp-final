import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'
import { api as myApi } from '@/services/api'

export type FeedbackMessage = {
  type: 'success' | 'danger' | 'info'
  text: string
}

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
  const messages = ref<FeedbackMessage[]>([])
  function addMessage(text: string, type: FeedbackMessage['type'] = 'info') {
    messages.value.push({ type, text })
  }
  function handleError(error: Error | string) {
    const message = typeof error === 'string' ? error : error.message
    addMessage(message, 'danger')
    console.error(error)
  }

  function api<T>(endpoint: string, data?: unknown, options: RequestInit = {}) {
    return myApi<T>(endpoint, data, options).catch((err) => {
      handleError(err);
      throw err;
    });
  }

  return { user, setUser, logout, addMessage, handleError, api }
})
