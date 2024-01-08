<template>
    <div>
        <Navbar/>
        
        <br><br><br><br><br>
        <div class="flex flex-wrap">
        <div class="flex" v-for="recipe in query.data.value.food_recipe_Recipes" :key="recipe.id">
          <div @click="goToRecipe(recipe.id)">

          
            <RecipeCard
            :title= recipe.title 
            :imgUrl=recipe.Image.url
            :catagory= recipe.Category.name
            :author=recipe.User.name
            :rating= recipe.Ratings_aggregate.aggregate.avg.rating
            />

          </div>

            
        
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
  food_recipe_Recipes {
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
  }
}

`)

</script>