import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore } from './session'
//import type { NewPost, Post } from '@/types'
//import dataPosts from '../data/posts.json'
import type { Reply, DataEnvelope, DataListEnvelope, Post } from "../../../server/types";

export const usePostStore = defineStore('post', () => {
  const session = useSessionStore();
  const posts = ref<Post[]>([]);
  const id = ref(2);

  // The store functions as the controller
  async function loadPosts() {
    const data = await session.api<DataListEnvelope<Post>>("/post");
    posts.value = data.data;
  }

  async function getPost(id: number) {
    return session.api<DataEnvelope<Post>>(`/post/${id}`);
  }

  async function addPost(post: Omit<Post, "postid">) {
    const data = await session.api<DataEnvelope<Post>>('/post/new', post);
    posts.value.push(data.data);
    return data;
  }

  async function updatePost(id: number, post: Omit<Post, "postid">) {
    const data = await session.api<DataEnvelope<Post>>(`/post/${id}`, post, {
      method: 'PATCH',
    })
    const index = posts.value.findIndex((p) => p.postid === id)
    if (index !== -1) {
      posts.value[index] = data.data
    }
    return data
  }

  async function deletePost(id: number) {
    const data = await session.api<DataEnvelope<Post>>(`/post/${id}`, null, {
      method: 'DELETE',
    })
    const index = posts.value.findIndex((p) => p.postid === id)
    if (index !== -1) {
      posts.value.splice(index, 1)
    }
    return data
  }

  async function getComments(post_id: number) {
    const data = await session.api<DataListEnvelope<Reply>>(`/reply/post/${post_id}`);
    return data.data;
  }

  async function addComment(post_id: number, body: string) {
    const data = await session.api<DataEnvelope<Post>>(`/reply/new?author=${id.value}`, {
      "postid": post_id,
      "content": body
    });
    return data;
  }
  
  return { posts, addPost, deletePost, loadPosts, getPost, updatePost, addComment, getComments }
})