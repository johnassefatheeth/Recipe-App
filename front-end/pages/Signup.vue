<!-- YourComponent.vue -->

<template>
    <div class="w-full flex h-screen justify-center items-center bg-stone-700">
      <div class="w-96 p-4 h-fit flex justify-center items-center bg-stone-500 rounded-xl">
        <br>
        <form class="w-full flex flex-col justify-center items-center" @submit.prevent="signup">
  
          <h1 class="m-8 text-3xl">Signup</h1>
  
          <Field name="name" rules="required|noNumbers|customMin:2" v-slot="{ errors }">
            <input class="p-2 w-10/12 rounded-xl" placeholder="Name" v-model="name" type="text" required />
            <span class="error">{{ errors[0] }}</span>
          </Field>
  
          <br>
  
          <Field name="username" rules="required|unique" v-slot="{ errors }">
            <input class="p-2 w-10/12 rounded-xl" placeholder="Username" v-model="username" type="text" required />
            <span class="error">{{ errors[0] }}</span>
          </Field>
  
          <br>
  
          <Field name="password" rules="required|min:8" v-slot="{ errors }">
            <input class="p-2 w-10/12 rounded-xl" placeholder="Password" v-model="password" type="password" required />
            <span class="error">{{ errors[0] }}</span>
          </Field>
  
          <br>
  
          <Field name="email" rules="required|email" v-slot="{ errors }">
            <input class="p-2 w-10/12 rounded-xl" placeholder="Email" v-model="email" type="email" required />
            <span class="error">{{ errors[0] }}</span>
          </Field>
  
          <br>
  
          <button class="w-40 h-14 bg-slate-600 rounded-2xl text-white hover:bg-slate-900" type="submit">Signup</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Field } from 'vee-validate';
  
  const username = ref('');
  const password = ref('');
  const email = ref('');
  const name = ref('');
  
  const signup = () => {
    // Your signup logic here
  };
  
  </script>
  
  <style scoped>
  /* Your styles go here */
  </style>
  