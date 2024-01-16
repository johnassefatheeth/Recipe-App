<template>
    <div class="bg-gray-100 p-4">
      <ul>
        <li v-for="comment in comments" :key="comment.created_at" class="mb-4">
          <p class="text-lg font-bold">{{ comment.comment }}</p>
          <p class="text-gray-600 hover:underline cursor-pointer" @click="navigateTo(`/UserProfile/${comment.user_id}`)">By: {{ comment.User.UserName }}</p>
          <p class="text-gray-600">Commented At: {{ formatTimestamp(comment.created_at) }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['comments']);


  const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjust the format as needed
};
  </script>