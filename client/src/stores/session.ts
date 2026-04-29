import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, DataEnvelope } from '../../../server/types'
import { api as myApi } from '@/services/api'

export type FeedbackMessage = {
  type: 'success' | 'danger' | 'info'
  text: string
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null);


  const token = ref<string | null>(null)

  async function login(username: string, password: string) {
    const response = await myApi<DataEnvelope<{ user: User; token: string }>>(
      '/users/login',
      { username, password },
      { method: 'POST' },
    ).catch((err) => handleError(err)); // we are not using the API call function with built-in error handling
    if (!response?.success) {
      addMessage(response?.message || 'Login failed', 'danger');
      return;
    }
    const { user: loggedInUser, token: authToken } = response.data;
    user.value = loggedInUser;
    token.value = authToken;
  }

  async function register(username: string, _password: string) {
    const response = await myApi<DataEnvelope<{ user: User; token: string }>>(
      '/users/new',
      { username: username, bio: "" },
      { method: 'POST' },
    ).catch((err) => handleError(err));;
    if (!response?.success) {
      addMessage(response?.message || 'Register failed', 'danger');
      return;
    }
  }

  function logout() {
    user.value = null
    token.value = null
  }

  function addMessage(text: string, type: FeedbackMessage['type'] = 'info') {
    // TODO; turn this into some kind of toast for all types of messages??
    if (type == 'danger') { alert(text); }
  }
  function handleError(error: Error | string) {
    const message = typeof error === 'string' ? error : error.message
    addMessage(message, 'danger')
    console.error(error)
  }

  function api<T>(endpoint: string, data?: unknown, options: RequestInit = {}) {
    
     options.headers = {
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
      ...options.headers,
    }

    
    return myApi<T>(endpoint, data, options).catch((err) => {
      handleError(err);
      throw err;
    });
  }

  return { user, login, register, token, logout, addMessage, handleError, api }
})
