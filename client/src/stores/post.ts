import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore } from './session'
//import type { NewPost, Post } from '@/types'
//import dataPosts from '../data/posts.json'
import type { DataEnvelope, DataListEnvelope, Post } from "../../../server/types";

export const usePostStore = defineStore('post', () => {
  const session = useSessionStore();
  const posts = ref<Post[]>([]);

  // The store functions as the controller
  async function loadPosts() {
    const data = await session.api<DataListEnvelope<Post>>("/post");
    posts.value = data.data;
  }

  async function getPost(id: number) {
    return session.api<DataEnvelope<Post>>(`/post/${id}`);
  }

  async function addPost(post: Omit<Post, "postID">) {
    const data = await session.api<DataEnvelope<Post>>('/post/new', post);
    posts.value.push(data.data);
    return data;
  }

  async function updatePost(id: number, post: Omit<Post, "postID">) {
    const data = await session.api<DataEnvelope<Post>>(`/post/${id}`, post, {
      method: 'PATCH',
    })
    const index = posts.value.findIndex((p) => p.postID === id)
    if (index !== -1) {
      posts.value[index] = data.data
    }
    return data
  }

  async function deletePost(id: number) {
    const data = await session.api<DataEnvelope<Post>>(`/post/${id}`, null, {
      method: 'DELETE',
    })
    const index = posts.value.findIndex((p) => p.postID === id)
    if (index !== -1) {
      posts.value.splice(index, 1)
    }
    return data
  }

  function addComment(post_id: number, _author: string, _body: string) {
    for (const post of posts.value) {
      if (post.postID === post_id) {
        /*post.comments.push({
          id: -1, // will be determined by DB later
          body: body,
          user: author
        });*/
      }
    }
  }

  return { posts, addPost, deletePost, loadPosts, getPost, updatePost, addComment }
})