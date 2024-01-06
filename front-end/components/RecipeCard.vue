<template>
    <div class="h-96 bg-slate-600 w-96 m-8">
        <img class="w-full h-2/3" :src=imgUrl alt="food image">
        <div class="p-4">
            <p class="text-lg">{{catagory}}</p>
            <p class="text-3xl">{{title}}</p>
            <p class="text-xl float-right relative bottom-0">preparation time</p>
        </div>
        <p>{{rating}}</p>

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