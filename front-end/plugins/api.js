import { ref } from 'vue';
import { useHttp } from '@nuxt/http';

export  function useApi() {
  const error = ref(null);

  async function login(email, password) {
    try {
      const response = await $fetch('http://localhost:8088/graphql-request', {
            headers:{
              "email":email.value,
              "password":password.value,
            }
          });
    return response;
    } catch (err) {
      // Handle error
      error.value = 'Login failed. Please try again later.';
      console.error('Login failed:', err);
    }

  }

  return { login, error };
}

export default function setupApi(app) {
  app.provide('api', useApi());
}