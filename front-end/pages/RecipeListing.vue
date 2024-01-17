<template>
    <Navbar/>
    <br><br><br><br>
        <h1 class="text-3xl font-bold ml-20">Top Rated</h1>
    <div class="flex flex-wrap justify-center items-center">
        <div class="flex flex-wrap  justify-center" v-for="recipe in query.data.value.food_recipe_Recipes" :key="recipe.id">
          <div @click="goToRecipe(recipe.id)">

          
            <RecipeCard
            :title= recipe.title 
            :imgUrl=recipe.Image.url
            :catagory= recipe.Category.name
            :author=recipe.User.name
            :preparationTime=recipe.preparation_time
            :rating= recipe.Ratings_aggregate.aggregate.avg.rating
            />

          </div>

            
        
      </div> 
    </div> 
    <h1 class="text-3xl font-bold ml-20">LIKED</h1>
    <div class="flex flex-wrap justify-center items-center">
        <div class="flex flex-wrap  justify-center" v-for="recipe in query2.data.value.food_recipe_Recipes" :key="recipe.id">
          <div @click="goToRecipe(recipe.id)">

          
            <RecipeCard
            :title= recipe.title 
            :imgUrl=recipe.Image.url
            :catagory= recipe.Category.name
            :author=recipe.User.name
            :preparationTime=recipe.preparation_time
            :rating= recipe.Ratings_aggregate.aggregate.avg.rating
            />

          </div>

            
        
      </div> 
    </div> 
    <h1 class="text-3xl font-bold ml-20">QUICK DISH</h1>
    <div class="flex flex-wrap justify-center items-center">
        <div class="flex flex-wrap  justify-center" v-for="recipe in query3.data.value.food_recipe_Recipes" :key="recipe.id">
          <div @click="goToRecipe(recipe.id)">

          
            <RecipeCard
            :title= recipe.title 
            :imgUrl=recipe.Image.url
            :catagory= recipe.Category.name
            :author=recipe.User.name
            :preparationTime=recipe.preparation_time
            :rating= recipe.Ratings_aggregate.aggregate.avg.rating
            />

          </div>

            
        
      </div> 
    </div> 
    <h1 class="text-3xl font-bold ml-20">RECENT</h1>
    <div class="flex flex-wrap justify-center items-center">
        <div class="flex flex-wrap  justify-center" v-for="recipe in query4.data.value.food_recipe_Recipes" :key="recipe.id">
          <div @click="goToRecipe(recipe.id)">

          
            <RecipeCard
            :title= recipe.title 
            :imgUrl=recipe.Image.url
            :catagory= recipe.Category.name
            :author=recipe.User.name
            :preparationTime=recipe.preparation_time
            :rating= recipe.Ratings_aggregate.aggregate.avg.rating
            />

          </div>

            
        
      </div> 
    </div> 
</template>

<script setup>


const goToRecipe = (id) => {
     navigateTo(`/RecipeDetails/${id}`)
    
}




const query = await useAsyncQuery (gql`
 query MyQuery {
  food_recipe_Recipes(order_by: {Ratings_aggregate: {avg: {rating: asc}}}, limit: 6) {
    Category {
      name
    }
    Image {
      url
    }
    Ratings_aggregate {
      aggregate {
        avg {
          rating
        }
      }
    }
    User {
      name
    }
    id
    title
    preparation_time
  }
}

`)


const query2 = await useAsyncQuery (gql`
 query MyQuery {
  food_recipe_Recipes(limit: 6, order_by: {Likes_aggregate: {count: desc}}) {
    Category {
      name
    }
    Image {
      url
    }
    Ratings_aggregate {
      aggregate {
        avg {
          rating
        }
      }
    }
    User {
      name
    }
    id
    title
    preparation_time
  }
}

`)


const query3 = await useAsyncQuery (gql`
 query MyQuery {
  food_recipe_Recipes(limit: 6, order_by: {preparation_time: asc}) {
    Category {
      name
    }
    Image {
      url
    }
    Ratings_aggregate {
      aggregate {
        avg {
          rating
        }
      }
    }
    User {
      name
    }
    id
    title
    preparation_time
  }
}

`)


const query4 = await useAsyncQuery (gql`
 query MyQuery {
  food_recipe_Recipes(limit: 6, order_by: {created_at: desc}) {
    Category {
      name
    }
    Image {
      url
    }
    Ratings_aggregate {
      aggregate {
        avg {
          rating
        }
      }
    }
    User {
      name
    }
    id
    title
    preparation_time
  }
}

`)
</script>

<style lang="scss" scoped>

</style>