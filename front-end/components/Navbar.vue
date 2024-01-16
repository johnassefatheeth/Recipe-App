<template>
    <div
      @mouseleave="hoverOnBrowse = false"
      class="absolute opacity-80 z-20 w-full h-20 bg-gradient-to-r from-blue-600 to-green-500 top-0 transition-all duration-300 ease-in-out "
    > 
      <div class="w-1/5  h-20 float-left">
        <img class="h-full ml-4" src="../assets/image/food.png" alt="">
      </div>
      <ul class="flex justify-evenly items-center h-full float-right mr-4">
        <li
          @mouseover="hoverOnBrowse = false"
          class="hover:text-white transition-all duration-300 ease-in-out m-4 mr-8"
        >
          <NuxtLink to="/" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Home</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          class=" m-4 hover:text-white transition-all duration-300 ease-in-out mr-8"
        >
          <NuxtLink to="/about" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">About</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          class=" m-4 hover:text-white transition-all duration-300 ease-in-out mr-8"
        >
          <NuxtLink to="/RecipeListing" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Recipe</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = true"
          class=" m-4 hover:text-white transition-all duration-300 ease-in-out mr-8"
        >
          <button class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Filter</button>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="!signedin"
          class=" m-4 hover:text-white transition-all duration-300 ease-in-out mr-8"
        >
          <NuxtLink to="/login" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Login</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="!signedin"
          class="  m-4 hover:text-white transition-all duration-300 ease-in-out mr-8"
        >
          <NuxtLink to="/signup" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Signup</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="signedin"
          class=" m-4 hover:text-white transition-all duration-300 ease-in-out mr-8"
        >
          <NuxtLink
            @click="goToUser(store.userID)"
            class="text-gray-300"
          >Your Profile</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="signedin"
          class=" m-4 hover:text-white transition-all duration-300 ease-in-out mr-8"
        >
          <NuxtLink to="/AddRecipe" class="text-gray-300">Add Recipe</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="signedin"
          class="hover:text-white transition-all duration-300 ease-in-out mr-8"
        >
          <NuxtLink @click="logout" class="text-gray-300">Logout</NuxtLink>
        </li>
      </ul>
  
      <div
        v-if="hoverOnBrowse"
        @mouseover="hoverOnBrowse = true"
        class="w-full h-fit bg-gradient-to-r from-blue-600 to-green-500 p-6 transition-all duration-300 ease-in-out"
      >
        <Filter />
      </div>
    </div>
  </template>
  
  

<script setup >


import {useUserStore} from "~/stores"


const store=useUserStore()

var signedin 

if (store.userID) {
    signedin = true;
} else {
    signedin = false;
}


const hoverOnBrowse = ref(false)
const hoverByTime= ref(false)


const goToUser = (id) => {
     navigateTo(`/UserProfile/${id}`)
    
}

console.log(store.userID)

const logout=()=>{
    store.setUser()
    store.setToken()
    navigateTo('/login')

}

</script>

<style scoped>

</style>