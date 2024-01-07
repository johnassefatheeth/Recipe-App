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
            <ul  class="flex justify-evenly items-center h-full">
                <li class="w-full bg-slate-300 border-2"><div >catagory</div><p v-for="country in query.data.value.food_recipe_Categories">{{ country.name }}</p></li>
                <li class="w-full bg-slate-300 border-2"><div>preparation time</div></li>
                <li class="w-full bg-slate-300 border-2"><div>ingredient</div></li>
                <li class="w-full bg-slate-300 border-2"><div>creator</div></li>
                <li class="w-full bg-slate-300 border-2"><div>recipe title</div></li>
            </ul>

        </div>

    </div>
</template>

<script setup >
const signedin = ref(true)
const hoverOnBrowse = ref(false)
const hoverByTime= ref(false)




const query = await useAsyncQuery (gql`
 query MyQuery {
  food_recipe_Categories {
    id
    name
  }
}
`)

</script>

<style scoped>

</style>