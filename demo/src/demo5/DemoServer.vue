<template>
  <demo-container>
    <button class="button" @click="fetchPosts">Получить все сообщения</button>
    <button class="button" @click="getPostById">Получить одно сообщение</button>
    <button class="button" @click="createPost">Создать сообщение</button>
    <button class="button" @click="updatePost">Редактировать сообщение</button>
    <button class="button" @click="deletePost">Удалить сообщение</button>
  </demo-container>
  <div class="response">{{ response }}</div>
</template>

<script setup>
import { ref } from "vue";
import DemoContainer from "../components/DemoContainer.vue";
import jsonPlaceholderService from "./services/json-placeholder-service";

const response = ref(null);

const newPost = {
  userId: 1,
  title: "Наш новый пост",
  body: "Мы создали новый пост",
};

function clearResponse() {
  response.value = null;
}

async function fetchPosts() {
  clearResponse();
  response.value = await jsonPlaceholderService.fetchPosts();
}

async function getPostById() {
  clearResponse();
  response.value = await jsonPlaceholderService.getById(1);
}

async function createPost() {
  clearResponse();
  response.value = await jsonPlaceholderService.createPost(newPost);
}

async function updatePost() {
  clearResponse();
  response.value = await jsonPlaceholderService.updatePost({
    ...newPost,
    id: 1,
  });
}

async function deletePost() {
  clearResponse();
  await jsonPlaceholderService.deletePost(1);
}
</script>

<style scoped>
.response {
  padding: 0 50px 0 50px;
  height: 300px;
  overflow-y: scroll;
}

.button {
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Phantomsans, sans-serif;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 19px 24px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  margin: 20px;
}

.button:active,
.button:hover {
  outline: 0;
}

@media (min-width: 768px) {
  .button {
    min-width: 196px;
  }
}
</style>
