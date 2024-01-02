<template>
    <div class="w-full flex h-screen justify-center  items-center bg-stone-700">
    <div class="w-96 p-4 h-fit flex justify-center items-center bg-stone-500 rounded-xl"> 
    
    <br>
    <form class="w-full flex flex-col justify-center items-center" @submit.prevent="signup">
        <h1 class="m-8 text-3xl">login</h1>
      
        <input class="p-2 w-10/12 rounded-xl" placeholder="UserName" v-model="username" type="text" required />
      
      <br>
        <input class="p-2 w-10/12 rounded-xl" placeholder="password" v-model="password" type="password" required />
      
      <br>
      <button class="w-40 h-14 bg-slate-600 rounded-2xl text-white hover:bg-slate-900" type="submit">Log in</button>
    </form>
  </div>
  </div>
</template>

<script setup>


const username = ref('');
const password = ref('');

</script>

<style scoped>

</style>