<template>
    <div class="w-full h-screen justify-center  items-center bg-stone-700">
    <div class="w-96 h-96 flex-col justify-center items-center bg-stone-500"> 
    <h1>Signup</h1>
    <form @submit.prevent="signup">
      <label>
        Username:
        <input v-model="username" type="text" required />
      </label>
      <label>
        Password:
        <input v-model="password" type="password" required />
      </label>
      <button type="submit">Signup</button>
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