<template>
    <div>
      <!-- <p v-if="queryResult.data" >Query Result: {{  queryResult.data.food_recipe_Recipes}}</p> -->
      <div v-if="queryResult.data" class="flex flex-wrap">
      <div v-for="recipe in queryResult.data.food_recipe_Recipes" :key="recipe.id" class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <div @click="goToRecipe(recipe.id)">
          <RecipeIntro
            :image="recipe.Image.url"
            :title="recipe.title"
            :preparationTime="recipe.preparation_time"
            :author="recipe.User.name"
            :rating="recipe.Ratings_aggregate.aggregate.avg.rating"
          />
        </div>
      </div>
    </div>
      
    </div>
  </template>
  
  <script setup>

const props = defineProps({
    myObject: {
      type: Object,
      required: true
    }})
    
    var queryResult = ref({});
   
  const executeQuery = async (searchMethod) => {
    
  
    switch (searchMethod) {
      case 1:
        queryResult.value = await useAsyncQuery(gql`query MyQuery ($Cat: String!) {
          food_recipe_Recipes(where: {Category: {name: {_eq: $Cat}}}) {
            title
            preparation_time
            Category {
            name
            }
            id
            User {
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
          }
        }`, { Cat: props.myObject.Category });
        break;
      case 2:
        queryResult.value = await useAsyncQuery(gql`query MyQuery ($prp: Int!) {
          food_recipe_Recipes(where: {preparation_time: {_lte: $prp}}) {
            title
            preparation_time
            Category {
            name
            }
            id
            User {
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
          }
        }`, { prp: props.myObject.PreparationTime });
        break;
      case 3:
        
      queryResult.value = await useAsyncQuery(gql`
          query MyQuery($ingname: String!) {
  food_recipe_Recipes(where: {RecipeIngredients: {Ingredient: {name: {_eq: $ingname}}}}) {
    title
    preparation_time
    Category {
      name
    }
    id
    User {
      name
      Likes_aggregate {
        aggregate {
          sum {
            User_id
          }
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
  }
}
`, { ingname: props.myObject.Ingredient });
        break;
      case 4:
        queryResult.value = await useAsyncQuery(gql`query MyQuery ($User: String!) {
          food_recipe_Recipes(where: {User: {UserName: {_ilike: $User}}}) {
            title
            preparation_time
            Category {
            name
            }
            id
            User {
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
          }
        }`, { User: props.myObject.Creator });
        break;
      case 5:
        queryResult.value = await useAsyncQuery(gql`query MyQuery ($Title: String!) {
          food_recipe_Recipes(where: {title: {_ilike: $Title}}) {
            title
            preparation_time
            Category {
            name
            }
            id
            User {
            name
            Likes_aggregate {
                aggregate {
                sum {
                    User_id
                }
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
          }
        }`, { Title: props.myObject.Title });
        break;
      default:
        break;
    }
  
    
  };
  console.log(queryResult.value);
  watch(() => props.myObject.SearchMethod, (newSearchMethod, oldSearchMethod) => {
    executeQuery(newSearchMethod);
  });


  const goToRecipe = (id) => {
     navigateTo(`/RecipeDetails/${id}`)
    
}
  </script>



