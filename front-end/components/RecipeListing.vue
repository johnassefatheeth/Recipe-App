<template>
    <div>
        {{ props.myObject}}
        {{ query}}

        <!-- <div class="flex" v-for="recipe in query.data.food_recipe_Recipes" :key="recipe.id">
          <div @click="goToRecipe(recipe.id)">

          
            <RecipeCard
            :title= recipe.title 
            :imgUrl=recipe.Image.url
            :catagory= recipe.Category.name
            :author=recipe.User.name
            :rating= recipe.Ratings_aggregate.aggregate.avg.rating
            />

          </div>

            
        
      </div>  -->

    </div>
</template>

<script setup>

const props = defineProps({
  myObject: {
    type: Object,
    required: true
  }})

 const query=ref()



  switch (props.myObject.SearchMethod) {
  case 1:
    query = await useAsyncQuery(gql`query MyQuery ($Cat: String!) {
      food_recipe_Recipes(where: {Category: {name: {_eq: $Cat}}}) {
        id
      }
    }`, {Cat: props.myObject.Category})
    console.log(query)
    break;
  case 2:
    query = await useAsyncQuery(gql`query MyQuery ($prp: Int!) {
      food_recipe_Recipes(where: {preparation_time: {_lt: $prp}}) {
        id
      }
    }`, {prp: props.myObject.PrepTime})
    break;
  case 3:
    // query= await useAsyncQuery(gql`query MyQuery {
    //   food_recipe_Recipes(where: {preparation_time: {_lt: 80}}) {
    //     id
    //   }
    // }`)
    break;
  case 4:
    query = await useAsyncQuery(gql`query MyQuery ($User: String!) {
      food_recipe_Recipes(where: {User: {UserName: {_ilike: $User}}}) {
        id
      }
    }`, {User: props.myObject.Creator})
    break;
  case 5:
    query = await useAsyncQuery(gql`query MyQuery ($Title: String!) {
      food_recipe_Recipes(where: {title: {_ilike: $Title}}) {
        id
      }
    }`, {Title: props.myObject.Title})
    break;
  default:
    
    break;
}
</script>

<style scoped>

</style>