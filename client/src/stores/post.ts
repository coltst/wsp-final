import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStore } from './session'
//import type { NewPost, Post } from '@/types'
//import dataPosts from '../data/posts.json'
import type { Reply, DataEnvelope, DataListEnvelope, Post, Reaction } from "../../../server/types";

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

  async function addPost(post: Partial<Post>) {
    const data = await session.api<DataEnvelope<Post>>(`/post/new`, post);
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

  async function getCommentsPaging(post_id: number, start: number, chunkSize: number) {
    const data = await session.api<DataListEnvelope<Reply>>(`/reply/post/${post_id}?page=${start}&pageSize=${chunkSize ?? 5}`);
    return data;
  }

  async function addComment(post_id: number, body: string) {
    const data = await session.api<DataEnvelope<Post>>(`/reply/new`, {
      "postid": post_id,
      "content": body
    });
    return data;
  }

  async function getReactions(post_id: number) {
    const data = await session.api<DataListEnvelope<Reaction>>(`/reaction/post/${post_id}`);
    return data.data;
  }

  async function addReaction(post_id: number, content: string, toggle?: boolean) {
    if (toggle ?? false) {
      const data = await session.api<DataEnvelope<Post>>(`/reaction/post/toggle/${post_id}`, {
        "content": content
      });
      return data;
    } else {
      const data = await session.api<DataEnvelope<Post>>(`/reaction/new`, {
        "postid": post_id,
        "content": content
      });
      return data;
    }
  }

  return { posts, addPost, deletePost, loadPosts, getPost, updatePost, addComment, getComments, getCommentsPaging, getReactions, addReaction }
})
