import { ref } from 'vue';
import { useHttp } from '@nuxt/http';

export  function useApi() {
  const error = ref(null);

  async function login(email, password) {
    try {
      const response = await $fetch('http://localhost:8088/graphql-request', {
        params: {
          variables: {
            email,
            password,
          },
        },
      });

      const userData = response
      //data?.data?.food_recipe_Users;
      if (userData) {
        // Login successful, you can store the user data in a state management solution like Vuex or in local storage
        console.log('Login successful:', userData);
      } else {
        error.value = 'Invalid username or password';
      }
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