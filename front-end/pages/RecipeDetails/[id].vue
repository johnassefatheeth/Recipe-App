<template>
  <div class="p-4">
    <div class="mx-auto bg-white rounded-lg shadow-md p-4" v-if="query.data && query.data.value">
      <div v-if="store.userID == query.data.value.food_recipe_Recipes_by_pk.User.id">
        <button @click="deleteRecipe" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-red-800">Delete recipe</button>
        <button @click="editRecipe" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-yellow active:bg-yellow-800">Edit Recipe</button>
      </div>

      <h1 class="text-2xl font-bold mb-4">{{ query.data.value.food_recipe_Recipes_by_pk.title }}</h1>
      <img class="w-1/2 mb-4" v-if="query.data.value.food_recipe_Recipes_by_pk.Image.url" :src="query.data.value.food_recipe_Recipes_by_pk.Image.url" alt="Recipe Image">

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
      <img class="w-1/2 mb-4" v-if="query.data.value.food_recipe_Recipes_by_pk.featured_img" :src="query.data.value.food_recipe_Recipes_by_pk.Image.url" alt="Featured Image">

      <h2 class="text-lg font-bold mb-2">User:</h2>
      <NuxtLink :to="`/UserProfile/${query.data.value.food_recipe_Recipes_by_pk.User.id}`" class="text-blue-500 hover:underline">{{ query.data.value.food_recipe_Recipes_by_pk.User.name }}</NuxtLink>

      <!-- Section to display comments -->
      <h2 class="text-lg font-bold mb-2">Comments:</h2>
      <Comment :comments="query.data.value.food_recipe_Recipes_by_pk.Comments" />

      <div>
        <h2 class="font-bold mb-2">Rating: {{ query.data.value.food_recipe_Recipes_by_pk.Ratings_aggregate.aggregate.avg.rating }}/5</h2>
        <h2 class="font-bold mb-2">Likes: {{ query.data.value.food_recipe_Recipes_by_pk.Likes_aggregate.aggregate.count }}</h2>
        <h2 class="font-bold mb-2">Bookmarked by: {{ query.data.value.food_recipe_Recipes_by_pk.Bookmarks_aggregate.aggregate.count }} people</h2>
      </div>

      <div v-if="userloged">
        <button v-if="!likedBeforeB && !likedNow" @click="addlike" class="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Like 👍</button>
        <button @click="addbookmark" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-800">Bookmark 🔖</button>
        <select v-model="rating" class="mt-4 p-2 border border-gray-300 rounded">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button @click="addrate" class="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-yellow active:bg-yellow-800">Rate ⭐</button>
        <input type="textarea" v-model="comment" class="mt-4 p-2 border border-gray-300 rounded" placeholder="Add comment">
        <button @click="addcomment" class="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-purple active:bg-purple-800">Comment 💬</button>
      </div>

      <!-- Add more lines here to display other data as needed -->
    </div>

    <div v-else>
      Loading...
    </div>
  </div>
</template>


<script setup>
 

const id=useRoute().params.id


const store=useUserStore()
var likedNow=ref(false)
var userloged

if (store.userID) {
  userloged = true;
} else {
  userloged = false;
}



const deleteRecipe=async()=>{
  const DELETE_RECIPE=gql`
  mutation MyMutation($RID: Int) {
  delete_food_recipe_Likes(where: {recipe_id: {_eq: $RID}}) {
    affected_rows
  }
  delete_food_recipe_Bookmarks(where: {recipe_id: {_eq: $RID}}) {
    affected_rows
  }
  delete_food_recipe_Ratings(where: {recipe_id: {_eq: $RID}}) {
    affected_rows
  }
  delete_food_recipe_RecipeIngredients(where: {Recipe_id: {_eq: $RID}}) {
    affected_rows
  }
  delete_food_recipe_Steps(where: {recipe_id: {_eq: $RID}}) {
    affected_rows
  }
  delete_food_recipe_Recipes(where: {id: {_eq: $RID}}) {
    affected_rows
  }
}

  `

  const {mutate}=useMutation(DELETE_RECIPE)
  try {

    const {data}=await mutate({
      RID:id
    })  
    console.log(data)
    navigateTo('/')
  }
  catch(error){
    console.log(error)
  }
}


const rating=ref(1)
const comment=ref('')






const addbookmark=async()=>{
  
  const ADD_BOOKMARK = gql`
  mutation MyMutation($UID: Int ,$RID: Int) {
  insert_food_recipe_Bookmarks(objects: {user_id: $UID, recipe_id: $RID}) {
    returning {
      id
    }
  }
}
    `;

const { mutate } = useMutation(ADD_BOOKMARK)

try {
        const { data } = await mutate({
          UID:store.userID,
          RID:id
        });
 // Access the result using result.data
        console.log(data);
        likedNow=true
        return likedNow
      } catch (error) {
        console.log(error);
      }
}

const addcomment=async()=>{
  const ADD_COMMENT=gql`
  mutation MyMutation($comment:String, $UID: Int,$RID: Int) {
  insert_food_recipe_Comments(objects: {comment: $comment, recipe_id: $RID, user_id: $UID}) {
    returning {
      id
    }
  }
}
  `

  const {mutate}=useMutation(ADD_COMMENT)
  try{
    const {data}=await mutate({
      comment:comment.value,
      UID:store.userID,
      RID:id
    })
  }
  catch(error){
    console.log(error)
  }
}



const addrate=async()=>{
  const ADD_RATE=gql`
  mutation MyMutation($UID: Int ,$RID: Int, $rating: Int) {
  insert_food_recipe_Ratings(objects: {user_id: $UID, recipe_id: $RID, rating: $rating}) {
    returning {
      id
    }
  }
  }`

  const { mutate } = useMutation(ADD_RATE)
  try{
      const { data } = await mutate({
        UID:store.userID,
        RID:id,
        rating:rating.value
      })
      console.log(data)
  }
  catch(error){
    console.log(error)
  }
}



const addlike=async()=>{

  const ADD_LIKE = gql`
  mutation MyMutation($UID: Int ,$RID: Int) {
  insert_food_recipe_Likes(objects: {User_id: $UID, recipe_id: $RID}) {
    returning {
      id
    }
  }
}
    `;

const { mutate } = useMutation(ADD_LIKE)

try {
        const { data } = await mutate({
          UID:store.userID,
          RID:id
        });
 // Access the result using result.data
        console.log(data);
        likedNow=true
        return likedNow
      } catch (error) {
        console.error(error);
      }

}


const query = await useAsyncQuery (gql`
 query MyQuery ($id: Int!) {
  food_recipe_Recipes_by_pk(id: $id) {
    Category {
      name
    }
    Bookmarks_aggregate {
      aggregate {
        count(columns: id)
      }
    }
    Comments {
      comment
      user_id
      created_at
      User {
        UserName
      }
    }
    Comments_aggregate {
      aggregate {
        count(columns: comment)
      }
    }
    Image {
      url
    }
    Likes_aggregate {
      aggregate {
        count(columns: User_id)
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
        count(columns: dscriptoin)
      }
    }
    created_at
    description
    featured_img
    preparation_time
    title
    updated_at
    User {
        id
      name
    }
  }
}

`,{id})


if(store.userID){

const likedBefore=await useAsyncQuery(gql`
query MyQuery($UID: Int!,$RID: Int!) {
  food_recipe_Likes(where: {User_id: {_eq: $UID}, recipe_id: {_eq: $RID}}) {
    recipe_id
    User_id
  }
}
`,{UID:store.userID,RID:id})

likedBeforeB=(likedBefore.data.value.food_recipe_Likes.length)
}


var likedBeforeB=ref(0)

</script>

<style scoped>

</style>