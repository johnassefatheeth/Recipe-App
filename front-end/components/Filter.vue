<template>
    <div class="w-full bg-gradient-to-r from-blue-600 to-green-500 p-6">
      <ul class="flex justify-evenly items-center h-full">
        <li class="w-full  border-2">
          <div>Category</div>
          <select v-model="recipeFilter.Category" defaultValue="Any" class="w-full">
            <option v-for="category in query.data.value.food_recipe_Categories" :value="category.name">{{ category.name }}</option>
          </select>
          <button  class="bg-blue-500 text-white px-3 py-1 rounded mt-4" @click="recipeFilter.SearchMethod = 1">Filter</button>
        </li>
        <li class="w-full bg-slate-300 border-2">
          <div>Preparation Time</div>
          <select v-model="recipeFilter.PreparationTime" class="w-full">
            <option value="15">15 max</option>
            <option value="30">30 max</option>
            <option value="45">45 max</option>
            <option value="60">60 max</option>
            <option value="3600">I don't care</option>
          </select>
          <button  class="bg-blue-500 text-white px-3 py-1 rounded mt-4" @click="recipeFilter.SearchMethod = 2">Filter</button>
        </li>
        <li class="w-full bg-slate-300 border-2">
          <div>Ingredient</div>
          <div class="flex flex-wrap ">
            <button v-for="ingredient in ingredients.data.value.food_recipe_Ingredients" :key="ingredient.id" class="w-full md:w-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2 mb-2" @click="recipeFilter.Ingredient.includes(ingredient.id) ?recipeFilter.Ingredient.splice(recipeFilter.Ingredient.indexOf(item), 1):recipeFilter.Ingredient.push(ingredient.id)" :class="{ 'bg-blue-500': !recipeFilter.Ingredient.includes(ingredient.id), 'bg-green-500': recipeFilter.Ingredient.includes(ingredient.id) }"> {{ ingredient.name }} </button>
        </div>
          <button  class="bg-blue-500 text-white px-3 py-1 rounded mt-4" @click="recipeFilter.SearchMethod = 3">Filter</button>
        </li>
        <li class="w-full bg-slate-300 border-2">
          <div>Creator</div>
          <input type="text" v-model="recipeFilter.Creator" class="w-full" />
          <button class="bg-blue-500 text-white px-3 py-1 rounded" @click="recipeFilter.SearchMethod = 4">Search</button>
        </li>
        <li class="w-full bg-slate-300 border-2">
          <div>Recipe Title</div>
          <input type="text" v-model="recipeFilter.Title" class="w-full" />
          <button class="bg-blue-500 text-white px-3 py-1 rounded" @click="recipeFilter.SearchMethod = 5">Search</button>
        </li>
      </ul>

  
      
  
      <RecipeListing :myObject="recipeFilter" />
    </div>
  </template>

<script setup>
const recipeFilter = ref({  
  Category  : '',
  PrepTime: 0,
  Ingredient: [],
  Creator: '',
  Title: '',
  SearchMethod: 0,
});






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

</script>

<style lang="scss" scoped>

</style>