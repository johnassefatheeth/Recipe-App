<template>
    <div>
        <input v-model="recipeTemplate.Title" type="text" name="title">
        <select v-model="recipeTemplate.Category" defaultValue="Any" class="w-full">
            <option v-for="category in query.data.value.food_recipe_Categories" :value="category.name">{{ category.name }}</option>
          </select>
        <input v-model="recipeTemplate.PrepTime" type="number" name="preparationTime">
        <input v-model="recipeTemplate.Description" type="text" name="description">
        <input type="text" name="image">
        <input type="text" name="steps">
        <button
            v-for="ingredient in ingredients.data.value.food_recipe_Ingredients"
            :key="ingredient.name"
            class="w-full bg-slate-300 border-2"
            @click="recipeFilter.Ingredient.includes(ingredient.name) ?recipeFilter.Ingredient.splice(recipeFilter.Ingredient.indexOf(item), 1):recipeFilter.Ingredient.push(ingredient.name)" 
          >
            {{ ingredient.name }}
          </button>


        <input type="text" name="author">

    </div>
</template>

<script setup>

const recipeTemplate = ref({  
  Category  : '',
  PrepTime: 0,
  Ingredient: [],
  Description: '',
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

<style  scoped>

</style>