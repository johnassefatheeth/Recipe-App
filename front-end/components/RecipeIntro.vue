<template>
<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg transition-transform hover:shadow-xl transform hover:scale-105 m-4">
  <div>
    <p class="text-3xl">{{ title }}</p>
    <p class="text-lg">{{ catagory }}</p>
    <p class="text-lg">{{ preparationTime }} mins</p>
    <p class="text-lg">{{ author }}</p>
    <p class="text-lg">Rating: {{ rating }}</p>
  </div>
</div>

</template>

<script setup>


const props = defineProps({
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