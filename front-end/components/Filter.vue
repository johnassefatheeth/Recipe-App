<template>
  <div class="w-full bg-gradient-to-r from-blue-600 to-green-500 p-6">
    <h1>Browse by</h1>
    <ul class="flex justify-evenly items-center h-full">
      <li class="w-42 border-2 bg-white p-4 rounded m-4">
        <div class="mb-2">Category</div>
        <select v-model="recipeFilter.Category" defaultValue="Any" class="w-full border p-2">
          <option v-for="category in query.data.value.food_recipe_Categories" :value="category.name">{{ category.name }}</option>
        </select>
        <button class="bg-blue-500 text-white px-3 py-1 rounded mt-4" @click="recipeFilter.SearchMethod = 1">Filter</button>
      </li>
      <li class="w-full border-2 bg-white p-4 rounded">
        <div class="mb-2">Preparation Time</div>
        <select v-model="recipeFilter.PreparationTime" class="w-full border p-2">
          <option value="15">15 max</option>
          <option value="30">30 max</option>
          <option value="45">45 max</option>
          <option value="60">60 max</option>
          <option value="3600">I don't care</option>
        </select>
        <button class="bg-blue-500 text-white px-3 py-1 rounded mt-4" @click="recipeFilter.SearchMethod = 2">Filter</button>
      </li>
      <li class="w-full border-2 bg-white p-4 rounded">
        <div class="mb-2">Ingredient</div>
        <div class="flex flex-wrap">
          <input type="text" v-model="recipeFilter.Ingredient" class="w-full border p-2">
        </div>
        <button class="bg-blue-500 text-white px-3 py-1 rounded mt-4" @click="recipeFilter.SearchMethod = 3">Filter</button>
      </li>
      <li class="w-full border-2 bg-white p-4 rounded">
        <div class="mb-2">Creator's user name</div>
        <input type="text" v-model="recipeFilter.Creator" class="w-full border p-2" />
        <button class="bg-blue-500 text-white px-3 py-1 rounded" @click="recipeFilter.SearchMethod = 4">Search</button>
      </li>
      <li class="w-full border-2 bg-white p-4 rounded">
        <div class="mb-2">Recipe Title</div>
        <input type="text" v-model="recipeFilter.Title" class="w-full border p-2" />
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
  Ingredient: '',
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