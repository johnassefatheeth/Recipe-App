<template>
    <div
      @mouseleave="hoverOnBrowse = false"
      class="absolute z-10 w-full h-28 bg-slate-400 top-0 transition-all duration-300 ease-in-out"
    >
      <ul class="flex justify-evenly items-center h-full">
        <li
          @mouseover="hoverOnBrowse = false"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <NuxtLink to="/" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Home</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <NuxtLink to="/about" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">About</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <NuxtLink to="/" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Recipe</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = true"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <button class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Filter</button>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="!signedin"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <NuxtLink to="/login" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Login</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="!signedin"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <NuxtLink to="/signup" class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out">Signup</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="signedin"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <NuxtLink
            @click="goToUser(store.userID)"
            class="text-gray-300"
          >Your Profile</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="signedin"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <NuxtLink to="/AddRecipe" class="text-gray-300">Add Recipe</NuxtLink>
        </li>
        <li
          @mouseover="hoverOnBrowse = false"
          v-if="signedin"
          class="hover:text-white transition-all duration-300 ease-in-out"
        >
          <NuxtLink @click="logout" class="text-gray-300">Logout</NuxtLink>
        </li>
      </ul>
  
      <div
        v-if="hoverOnBrowse"
        @mouseover="hoverOnBrowse = true"
        class="w-full h-fit bg-slate-400 p-6 transition-all duration-300 ease-in-out"
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