<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out hover:shadow-xl">
      <h1 class="text-2xl font-bold mb-4">{{ query.data.value.food_recipe_Users_by_pk.name }}</h1>
      <p class="mb-2 hover:text-blue-500">Username: {{ query.data.value.food_recipe_Users_by_pk.UserName }}</p>
      <p class="mb-2 hover:text-blue-500">Email: {{ query.data.value.food_recipe_Users_by_pk.email }}</p>
      <p class="mb-2 hover:text-blue-500">Created At: {{ formatTimestamp(query.data.value.food_recipe_Users_by_pk.created_at)  }}</p>
      <p class="mb-2 hover:text-blue-500">Average Rating: {{ query.data.value.food_recipe_Users_by_pk.Ratings_aggregate.aggregate.avg.rating }}</p>
      <p class="mb-2 hover:text-blue-500">Total Likes: {{ query.data.value.food_recipe_Users_by_pk.Likes_aggregate.aggregate.sum.recipe_id }}</p>
      <div v-if="userId===store.userID">
        {{ fetchBookmarks() }}
        <h2>Bookmarked</h2>
        <ul>
          <li v-for="bookmark in bookmarks.data.value.food_recipe_Bookmarks" :key="bookmark.id">
            <NuxtLink :to="`/RecipeDetails/${bookmark.id}`" class="hover:text-blue-500">
              <RecipeIntro
                :title="bookmark.title"
                :preparationTime="bookmark.preparation_time"
                :catagory="bookmark.Category.name"
                :rating="bookmark.Ratings_aggregate.aggregate.avg.rating"
              />
            </NuxtLink>
          </li>
        </ul>

      
      </div>
      
      <div class="mt-4">
        <h2 class="text-lg font-bold mb-2">Recipes:</h2>
        <ul class="flex flex-wrap">
  <li v-for="recipe in query.data.value.food_recipe_Users_by_pk.Recipes" :key="recipe.id" class="hover:bg-gray-100 transition-all duration-300 ease-in-out mr-4">
    <NuxtLink :to="`/RecipeDetails/${recipe.id}`" class="hover:text-blue-500">
      <RecipeIntro
        :title="recipe.title"
        :preparationTime="recipe.preparation_time"
        :catagory="recipe.Category.name"
        :rating="recipe.Ratings_aggregate.aggregate.avg.rating"
      />
    </NuxtLink>
  </li>
</ul>

      </div>
    </div>
  </div>

  <div>
  </div>
</template>


<script setup>
import {useUserStore} from "~/stores"

  const store=useUserStore()
const userId=useRoute().params.UserId

onMounted(async() => {

var enableEditing

if(userId==store.userID)
  enableEditing=true
else
  enableEditing=false
})





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
      preparation_time
      Ratings_aggregate {
        aggregate {
          avg {
            rating
          }
        }
      }
    }
  }
}

`,{id:userId})


const fetchBookmarks=async()=>{
  const BookmarkedRecipes=await useAsyncQuery(gql`
  query MyQuery($id:Int!) {
  food_recipe_Bookmarks(where: {user_id: {_eq: $id}}) {
    Recipe {
      id
      preparation_time
      title
    }
  }
}
  `,{id:userId})
}



const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjust the format as needed
};

</script>

<style scoped>

</style>