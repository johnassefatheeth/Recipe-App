<template>
    <div class="w-full flex h-screen justify-center  items-center bg-stone-700">
    <div class="w-96 h-96 flex justify-center items-center bg-stone-500"> 
    
    <br>
    <form @submit.prevent="signup">
      <label>
        Username:
        <input class="m-8" v-model="username" type="text" required />
      </label>
      <br>
      <label>
        email:
        <input class="m-8" v-model="email" type="email" required />
      </label>
      <br>
      <label>
        Password:
        <input class="m-8" v-model="password" type="password" required />
      </label>
      <br>
      <button class="m-4" type="submit">Signup</button>
    </form>
  </div>
  </div>
</template>

<script setup>


const username = ref('');
const password = ref('');
const email = ref('');

</script>

<style scoped>

</style>