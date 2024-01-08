<template>
    <div @mouseleave="hoverOnBrowse = false" class="fixed w-full h-28 bg-slate-400 top-0">
        <ul class="flex justify-evenly items-center h-full">
            <li @mouseover="hoverOnBrowse = false"> <NuxtLink to="/">Home</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false"> <NuxtLink to="/about">about</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false"> <NuxtLink to="/RecipeListing">recipe</NuxtLink></li>
            <li  @mouseover="hoverOnBrowse = true"  > browse</li>
            <li @mouseover="hoverOnBrowse = false" v-if="!signedin"> <NuxtLink to="/login">login</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false" v-if="!signedin"> <NuxtLink to="/signup">signup</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false" v-if="signedin"> <NuxtLink to="/userprofile/1">yourprofile</NuxtLink></li>
            <li @mouseover="hoverOnBrowse = false" v-if="signedin"> <NuxtLink to="/AddRecipe">Add Recipe</NuxtLink> </li>
            <li @mouseover="hoverOnBrowse = false" v-if="signedin"> <NuxtLink to="/Login" >logout</NuxtLink> </li>
        </ul>


        <div v-if="hoverOnBrowse" @mouseover="hoverOnBrowse = true" class="w-full h-fit bg-slate-400 p-6" >
            <ul  class="flex justify-evenly items-center h-full">
                <li class="w-full bg-slate-300 border-2"><div >catagory</div><p v-for="catagory in query.data.value.food_recipe_Categories">{{ catagory.name }}</p></li>
                <li class="w-full bg-slate-300 border-2"><div>preparation time</div>
                     <select name="" id="">
                        <option value="1"> -15 min</option>
                        <option value="2"> 16-30 min</option>
                        <option value="3"> 31 -45 min</option>
                        <option value="4">45-60 min</option>
                        <option value="5">60 min -</option>
                    </select>
                </li>
                <li class="w-full bg-slate-300 border-2"><div>ingredient</div>
                    <p v-for="ingredient in ingredients.data.value.food_recipe_Ingredients">{{ ingredient.name }}</p>
                </li>
                <li class="w-full bg-slate-300 border-2"><div>creator</div>
                    <input type="text">
                    <button>search</button>
                </li>
                <li class="w-full bg-slate-300 border-2"><div>recipe title</div>
                    <input type="text">
                    <button>search</button>
                
                </li>
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


const ingredients =await useAsyncQuery (gql`
 query MyQuery {
  food_recipe_Ingredients {
    name
  }
}

`)


console.log(ingredients.data.food_recipe_Categories)
</script>

<style scoped>

</style>