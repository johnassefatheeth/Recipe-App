<template>
    <div>
        
        <p>work</p><br><br><br><br><br>
        <div v-for="recipe in query.data.value.food_recipe_Recipes" :key="recipe.id">
        <h2>{{ recipe.User.name }}</h2>
        <h3>{{ recipe.Category.name }}</h3>
        <img :src="recipe.Image.url" alt="Recipe Image" />
        <p>Average Rating: {{ recipe.Ratings_aggregate.aggregate.avg.rating }}</p>
      </div>    </div>
</template>
<script setup>


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
  }
}

`)

console.log(query.data)

</script>