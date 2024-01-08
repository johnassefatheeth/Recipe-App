<template>
 <div class="container mx-auto px-4 py-8">
     <div class="bg-white rounded-lg shadow-lg p-4"> 
        <h1 class="text-2xl font-bold mb-4">{{ query.data.value.food_recipe_Users_by_pk.name }}</h1> 
        <p class="mb-2">Username: {{ query.data.value.food_recipe_Users_by_pk.UserName }}</p> 
        <p class="mb-2">Email: {{ query.data.value.food_recipe_Users_by_pk.email }}</p>
        <p class="mb-2">Created At: {{ query.data.value.food_recipe_Users_by_pk.created_at }}</p> 
        <p class="mb-2">Average Rating: {{ query.data.value.food_recipe_Users_by_pk.Ratings_aggregate.aggregate.avg.rating }}</p> 
        <p class="mb-2">Total Likes: {{ query.data.value.food_recipe_Users_by_pk.Likes_aggregate.aggregate.sum.recipe_id }}</p> 
        <div class="mt-4"> 
            <h2 class="text-lg font-bold mb-2">Recipes:</h2> 
            <ul> 
                <li v-for="recipe in query.data.value.food_recipe_Users_by_pk.Recipes" :key="recipe.id"> 
                    <NuxtLink :to="`/RecipeDetails/${recipe.id}`"> <p>{{ recipe.title }}</p> <p>Category: {{ recipe.Category.name }}</p> </NuxtLink>
                </li> 
            </ul> 
        </div> 
    </div> 
</div> 

<div>
</div>
</template>

<script setup>
const userId=useRoute().params.UserId


const query=await useAsyncQuery(gql`
query MyQuery ($id: Int!) {
  food_recipe_Users_by_pk(id: $id) {
    UserName
    created_at
    email
    name
    Likes_aggregate {
      aggregate {
        sum {
          recipe_id
        }
      }
    }
    Ratings_aggregate {
      aggregate {
        avg {
          rating
        }
      }
    }
    Recipes {
      Category {
        name
      }
      title
      id
    }
  }
}

`,{id:userId})

</script>

<style scoped>

</style>