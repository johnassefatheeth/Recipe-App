<template>
    <div>
      <p>Search Method: {{ props.myObject.SearchMethod }}</p>
      <p >Query Result: {{  queryResult.value }}</p>
      
    </div>
  </template>
  
  <script setup>

const props = defineProps({
    myObject: {
      type: Object,
      required: true
    }})
    
    let queryResult = ref({});
   
  const executeQuery = async (searchMethod) => {
    
  
    switch (searchMethod) {
      case 1:
        queryResult = await useAsyncQuery(gql`query MyQuery ($Cat: String!) {
          food_recipe_Recipes(where: {Category: {name: {_eq: $Cat}}}) {
            title
            preparation_time
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
        }`, { Cat: props.myObject.Category });
        break;
      case 2:
        queryResult = await useAsyncQuery(gql`query MyQuery ($prp: Int!) {
          food_recipe_Recipes(where: {preparation_time: {_lte: $prp}}) {
            title
            preparation_time
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
        }`, { prp: props.myObject.PreparationTime });
        break;
      case 3:
        // Query for search method 3
        break;
      case 4:
        queryResult = await useAsyncQuery(gql`query MyQuery ($User: String!) {
          food_recipe_Recipes(where: {User: {UserName: {_ilike: $User}}}) {
            title
            preparation_time
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
        }`, { User: props.myObject.Creator });
        break;
      case 5:
        queryResult = await useAsyncQuery(gql`query MyQuery ($Title: String!) {
          food_recipe_Recipes(where: {title: {_ilike: $Title}}) {
            title
            preparation_time
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
  
    console.log(queryResult);
  };
  
  watch(() => props.myObject.SearchMethod, (newSearchMethod, oldSearchMethod) => {
    executeQuery(newSearchMethod);
  });
  </script>



