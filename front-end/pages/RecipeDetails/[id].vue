<template>
    <div>
        {{ query.data.value.food_recipe_Recipes_by_pk }}

    </div>
</template>

<script setup>

const query = await useAsyncQuery (gql`
 query MyQuery {
  food_recipe_Recipes_by_pk(id: 1) {
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

`)

</script>

<style scoped>

</style>