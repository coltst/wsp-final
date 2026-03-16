<script setup lang="ts">
import { usePostStore } from '@/stores/post';
import { useSessionStore } from '@/stores/session';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const postStore = usePostStore();
const sessionStore = useSessionStore();
const router = useRouter();

const title = ref("");
const body = ref("");
const tags = ref("");

function post() {
    if (
        ((title.value ? title.value : "").trim() !== "") &&
        ((body.value ? body.value : "").trim() !== "")
    ) {
        postStore.addPost({
            title: title.value,
            body: body.value,
            tags: tags.value.split(" "),
            user: sessionStore.user.username.toString()
        });
        router.push('/');
    }
}
</script>

<template>
    <div class="w-screen h-screen grid grid-cols-12 grid-rows-12 gap-4 py-7 px-20">
        <div class="row-start-1 row-span-1 col-start-1 col-span-11">
            <input type="text" class="w-full" name="title" id="title" placeholder="Title" v-model="title">
        </div>
        <div class="row-start-2 row-span-10 col-start-1 col-span-12">
            <textarea class="h-full w-full commentinput" id="input" v-model="body" />
        </div>
        <div class="row-start-12 row-span-1 col-start-1 col-span-12">
            <input type="text" class="w-full" name="tags" id="tags" placeholder="Space-separated tags..."
                v-model="tags">
        </div>
        <div class="row-start-1 row-span-1 col-start-12 col-span-1">
            <button class="darkbutton w-full" type="button" @click="post()">
                <div class="darkbuttoninner" />
                <FontAwesomeIcon :icon="faPaperPlane" inverse />
            </button>
        </div>
    </div>
</template>

<style scoped></style>