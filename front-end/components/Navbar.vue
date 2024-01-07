<template>
    <div class="fixed w-full h-28 bg-slate-400 top-0">
        <ul class="flex justify-evenly items-center h-full">
            <li> <NuxtLink to="/">Home</NuxtLink></li>
            <li> <NuxtLink to="/about">about</NuxtLink></li>
            <li> <NuxtLink to="/recipelisting">recipe</NuxtLink></li>
            <li v-if="!signedin"> <NuxtLink to="/login">login</NuxtLink></li>
            <li v-if="!signedin"> <NuxtLink to="/signup">signup</NuxtLink></li>
            <li v-if="signedin"> <NuxtLink to="/userprofile">yourprofile</NuxtLink></li>
            <li v-if="signedin"> <NuxtLink to="/AddRecipe">userprofile</NuxtLink> </li>
            <li v-if="signedin"> <NuxtLink to="/Login" >logout</NuxtLink> </li>
        </ul>

    </div>
</template>

<script setup >
const signedin = ref(true)

</script>

<style scoped>

</style>