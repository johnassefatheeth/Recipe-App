<template>
    <div @mouseleave="hoverOnBrowse = false" class="fixed w-full h-28 bg-slate-400 top-0">
        <ul class="flex justify-evenly items-center h-full">
            <li @mouseover="hoverOnBrowse = false"> <NuxtLink to="/">Home</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false"> <NuxtLink to="/about">about</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false"> <NuxtLink to="/recipelisting">recipe</NuxtLink></li>
            <li  @mouseover="hoverOnBrowse = true"  > browse</li>
            <li @mouseover="hoverOnBrowse = false" v-if="!signedin"> <NuxtLink to="/login">login</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false" v-if="!signedin"> <NuxtLink to="/signup">signup</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false" v-if="signedin"> <NuxtLink to="/userprofile">yourprofile</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false" v-if="signedin"> <NuxtLink to="/AddRecipe">Add Recipe</NuxtLink> </li>
            <li @mouseover="hoverOnBrowse = false" v-if="signedin"> <NuxtLink to="/Login" >logout</NuxtLink> </li>
        </ul>


        <div v-if="hoverOnBrowse" @mouseover="hoverOnBrowse = true" class="w-full h-fit bg-slate-400 p-6" >
            <ul>
                <li>by time
                    <ul v-if="hoverOnBrowse">
                        <li> - 15 min </li>
                        <li> 15-30 min</li> 
                        <li> 30-45 min</li>   
                        <li> 45-60 min</li>  
                        <li> 60 min - </li>              
                    </ul>
                </li>
                <li>by catagory</li>
                <li>creator</li>
                <li>ingredients</li>
                <li>search recipe</li>
            </ul>
        
        </div>

    </div>
</template>

<script setup >
const signedin = ref(true)
const hoverOnBrowse = ref(false)

</script>

<style scoped>

</style>