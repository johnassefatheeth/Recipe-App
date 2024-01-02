<template>
    <div>
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
</template>

<script setup>


const username = ref('');
const password = ref('');

</script>

<style scoped>

</style>