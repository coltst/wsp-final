import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post } from '@/types'
import dataPosts from '../data/posts.json'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>(dataPosts.posts)
  function addPost(post: Post) {
    
  }

  return { posts, addPost }
})
