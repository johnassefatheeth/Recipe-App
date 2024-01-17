<template>
<div class="h-auto bg-gradient-to-r from-blue-600 to-green-500 w-80 m-4 md:m-8 rounded-lg overflow-hidden transition transform hover:scale-105 cursor-pointer flex flex-col justify-between">
  <img class="w-full h-48 object-cover rounded-t-lg" :src="imgUrl" alt="food image">
  <div class="p-4">
    <p class="text-lg text-white mb-2">{{ catagory }} 🍔</p>
    <p class="text-3xl text-white mb-4">{{ title }} 🌮</p>
    <p class="text-xl text-white flex items-center justify-between">
      <span>⏱ {{ preparationTime }} mins</span>
      <span>🌟 {{ rating }}</span>
    </p>
  </div>
</div>


</template>

<script setup>
const props = defineProps({
    imgUrl: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    preparationTime: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },

    rating: {
      type: Number
    }
    
  });

</script>

<style  scoped>

</style>