import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { NewPost, Post } from '@/types'
import dataPosts from '../data/posts.json'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>(dataPosts.posts)
  function addPost(post: NewPost) {

  }
  function addComment(post_id: number, author: string, body: string) {
    for (const post of posts.value) {
      if (post.id === post_id) {
        post.comments.push({
          id: -1, // will be determined by DB later
          body: body,
          user: author
        });
      }
    }
  }

  return { posts, addPost, addComment }
})
