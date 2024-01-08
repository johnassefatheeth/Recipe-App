<template>
    <div class="p-4">
      <div class="max-w-xl mx-auto bg-white rounded-lg shadow-md">
        <div class="p-4" v-if="query.data && query.data.value">
          <h1 class="text-2xl font-bold mb-4">{{ query.data.value.food_recipe_Recipes_by_pk.title }}</h1>
          <img class="w-full mb-4" v-if="query.data.value.food_recipe_Recipes_by_pk.Image.url" :src="query.data.value.food_recipe_Recipes_by_pk.Image.url" alt="Recipe Image">
  
          <h2 class="text-lg font-bold mb-2">Category: {{ query.data.value.food_recipe_Recipes_by_pk.Category.name }}</h2>
          <p class="mb-4">Preparation Time: {{ query.data.value.food_recipe_Recipes_by_pk.preparation_time }} min</p>
  
          <h2 class="text-lg font-bold mb-2">Ingredients:</h2>
          <ul class="list-disc list-inside mb-4">
            <li v-for="ingredient in query.data.value.food_recipe_Recipes_by_pk.RecipeIngredients" :key="ingredient.Ingredient.name">
              {{ ingredient.Ingredient.name }}
            </li>
          </ul>
  
          <h2 class="text-lg font-bold mb-2">Steps:</h2>
          <ol class="list-decimal list-inside">
            <li v-for="step in query.data.value.food_recipe_Recipes_by_pk.Steps" :key="step.dscriptoin">
              {{ step.dscriptoin }}
            </li>
          </ol>
  
          <!-- New lines to display additional data -->
          <h2 class="text-lg font-bold mb-2">Description:</h2>
          <p>{{ query.data.value.food_recipe_Recipes_by_pk.description }}</p>
  
          <h2 class="text-lg font-bold mb-2">Created At:</h2>
          <p>{{ query.data.value.food_recipe_Recipes_by_pk.created_at }}</p>
  
          <h2 class="text-lg font-bold mb-2">Featured Image:</h2>
          <img class="w-full mb-4" v-if="query.data.value.food_recipe_Recipes_by_pk.featured_img" :src="query.data.value.food_recipe_Recipes_by_pk.Image.url" alt="Featured Image">
  
          <h2 class="text-lg font-bold mb-2">User:</h2>
          <p>{{ query.data.value.food_recipe_Recipes_by_pk.User.name }}</p>
  
          <!-- Section to display comments -->
          <h2 class="text-lg font-bold mb-2">Comments:</h2>
          <ul>
            <li v-for="comment in query.data.value.food_recipe_Recipes_by_pk.Comments" :key="comment.created_at">
              <p>{{ comment.comment }}</p>
              <p>By: {{ comment.user_id }}</p>
              <p>Created At: {{ comment.created_at }}</p>
            </li>
          </ul>
  
          <!-- Add more lines here to display other data as needed -->
  
        </div>
        <div v-else>
          Loading...
        </div>
      </div>
    </div>
  </template>

<script setup>
const id=useRoute().params.id
console.log(id); // $routes.param.id


const query = await useAsyncQuery (gql`
 query MyQuery ($id: Int!) {
  food_recipe_Recipes_by_pk(id: $id) {
    Category {
      name
    }
    Bookmarks_aggregate {
      aggregate {
        sum {
            recipe_id
        }
      }
    }
    Comments {
      comment
      user_id
      created_at
    }
    Comments_aggregate {
      aggregate {
        sum {
          id
        }
      }
    }
    Image {
      url
    }
    Likes_aggregate {
      aggregate {
        sum {
          User_id
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
    RecipeIngredients {
      Ingredient {
        name
      }
    }
    Steps(order_by: {step_order: asc}) {
      dscriptoin
    }
    Steps_aggregate {
      aggregate {
        sum {
          id
        }
      }
    }
    created_at
    description
    featured_img
    preparation_time
    title
    updated_at
    User {
      name
    }
  }
}

`,{id})


</script>

<style scoped>

</style>