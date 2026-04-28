import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../../../server/types'
import { api as myApi } from '@/services/api'

export type FeedbackMessage = {
  type: 'success' | 'danger' | 'info'
  text: string
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null);

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



  async function login(username: string) {
    api<{
      data?: {
        token: string,
        user?: User
      },
      success: boolean
    }>("/users/login", {
      username: username
    }).then((newUser) => {
      console.log(newUser);
      user.value = (newUser.data ?? {}).user ?? null;
      console.log(user.value);
    });
  }   
  function logout() {
    user.value = null;
  }


  return { user, login, logout, addMessage, handleError, api }
})
