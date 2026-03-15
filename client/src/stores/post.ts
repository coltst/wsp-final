import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { NewPost, Post } from '@/types'
import dataPosts from '../data/posts.json'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>(dataPosts.posts)
  const postNumber = ref<number>(11); // will be determined by DB
  function addPost(post: NewPost) {
    posts.value.push({
      id: postNumber.value, // this will be determined by the DB later
      title: post.title,
      body: post.body,
      tags: post.tags,
      reactions: {"likes": 0, "dislikes": 0},
      views: 0,
      user: post.user,
      comments: []
    });
    postNumber.value += 1;
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
  function deletePost(post_id: number) {
    posts.value = posts.value.filter((post) => post.id !== post_id);
  }

  return { posts, addPost, deletePost, addComment }
})
