<template>
    <div>
        {{ recipeTemplate }}
      <div class="my-4">
        <label for="title" class="text-lg font-bold">Title</label>
        <input v-model="recipeTemplate.Title" type="text" id="title" name="title" class="w-full p-2 border border-gray-300 rounded">
      </div>
  
      <div class="my-4">
        <label for="category" class="text-lg font-bold">Category</label>
        <select v-model="recipeTemplate.Category" id="category" name="category" class="w-full p-2 border border-gray-300 rounded">
          <option v-for="category in query.data.value.food_recipe_Categories" :value="category.id" :key="category.id">{{ category.name }}</option>
        </select>
      </div>
  
      <div class="my-4">
        <label for="preparationTime" class="text-lg font-bold">Preparation Time</label>
        <input v-model="recipeTemplate.PrepTime" type="number" id="preparationTime" name="preparationTime" class="w-full p-2 border border-gray-300 rounded">
      </div>
  
      <div class="my-4">
        <label for="description" class="text-lg font-bold">Description</label>
        <input v-model="recipeTemplate.Description" type="text" id="description" name="description" class="w-full p-2 border border-gray-300 rounded">
    </div>
  
      <div class="my-4">
        <img v-if="recipeTemplate.imgUrl!=''" :src=recipeTemplate.imgUrl alt="your image" class="w-44 h-44">
        <label class="text-lg font-bold">Image</label>
        <input type="file" name="image" class="w-full" @change="onFileChange">
      </div>
  
      <div class="my-4">
        <label class="text-lg font-bold">Ingredients</label>
        <div class="flex flex-wrap">
            <button v-for="ingredient in ingredients.data.value.food_recipe_Ingredients" :key="ingredient.name" class="w-full md:w-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2 mb-2" @click="recipeTemplate.Ingredient.includes(ingredient.name) ?recipeTemplate.Ingredient.splice(recipeTemplate.Ingredient.indexOf(item), 1):recipeTemplate.Ingredient.push(ingredient.name)" :class="{ 'bg-blue-500': !recipeTemplate.Ingredient.includes(ingredient.name), 'bg-green-500': recipeTemplate.Ingredient.includes(ingredient.name) }"> {{ ingredient.name }} </button>
        </div>
      </div>
  
      <div class="my-4">
    <label for="steps" class="text-lg font-bold">Steps</label>
    <div v-for="(step, index) in recipeTemplate.Steps" :key="index" class="flex">
      <input v-model="step.stepOrder" type="number" class="w-12 p-2 mr-2 border border-gray-300 rounded" placeholder="Order">
      <textarea v-model="step.stepDescription" :id="'step-' + index" :name="'step-' + index" rows="4" class="flex-1 p-2 border border-gray-300 rounded" placeholder="Description"></textarea>
      <button @click="removeStep(index)" class="ml-2 text-red-500">Remove</button>
    </div>
    <button @click="addStep" class="mt-2">Add Step</button>
  </div>
  
      <div class="my-4">
      <button @click="saveRecipe" class="bg-green-500 text-white font-semibold py-2 px-4 rounded">
        Save
      </button>
    </div>
    </div>
  </template>
  
  <script setup>

  import {useMutation} from '@vue/apollo-composable';



  const recipeTemplate = ref({
    Category: 0,
    PrepTime: 0,
    Ingredient: [],
    Description: '',
    Creator: 1,
    Title: '',
    Steps: [{
        stepOrder: 0,
        stepDescription: '',
  }],
    imgUrl: '',
    imgId:0,
    recipeId:0,
  });


const addImage = async () => {
  const CREATE_IMAGE_MUTATION = gql`
    mutation MyMutation($url: String!) {
      insert_food_recipe_Images(objects: { url: $url }) {
        returning {
          id
        }
      }
    }
  `;

  try {
    const { mutate } = useMutation(CREATE_IMAGE_MUTATION);

    const result = await mutate({ url: recipeTemplate.value.imgUrl });

    recipeTemplate.imgId = result.data.insert_food_recipe_Images.returning[0].id
    console.log(recipeTemplate.imgId ); // Access the result using result.data

    // If you want to access the returned data directly, you can use result.data
    // console.log(result.data);

  } catch (error) {
    console.log(error);
  }
};


 


  const addStep = () => {
  const newStep = {
    stepOrder: recipeTemplate.value.Steps.length + 1,
    stepDescription: '',
  };
  recipeTemplate.value.Steps.push(newStep);
};

const removeStep = (index) => {
  recipeTemplate.value.Steps.splice(index, 1);
};

  const emits = defineEmits(["filechange"]);

    const onFileChange = async (e) => {
      var file = e.target.files || e.dataTransfer.files;
      if (!file.length) return;


      const {snapshot ,DownloadURL, metadata} = await uploadFile(file[0]);


        recipeTemplate.value.imgUrl = DownloadURL



      emits("filechange", snapshot, DownloadURL, metadata);
    };


 


  //recipeTemplate.Author = useCookie('username').
  
  const CREATE_RECIPE_MUTATION = gql`
      mutation MyMutation(
        $catagory: Int!
        $creator: Int!
        $description: String!
        $preparation_time: Int!
        $title: String!
        $featured_img: Int!
      ) {
        insert_food_recipe_Recipes(
          objects: {
            Catagory_id: $catagory
            Creator_id: $creator
            description: $description
            preparation_time: $preparation_time
            title: $title
            featured_img: $featured_img
          }
        ) {
          returning {
            id
          }
        }
      }
    `;
  

  const saveRecipe = async () => {
    
  try {
    await addImage(); // Wait for the completion of addImage()
console.log(recipeTemplate.imgId )
    

    const { mutate } = useMutation(CREATE_RECIPE_MUTATION);

    const { data } = await mutate({
      catagory: recipeTemplate.value.Category,
      creator: recipeTemplate.value.Creator,
      description: recipeTemplate.value.Description,
      preparation_time: recipeTemplate.value.PrepTime,
      title: recipeTemplate.value.Title,
      featured_img: recipeTemplate.value.imgId,
    });

    recipeTemplate.recipeId =
      data.insert_food_recipe_Recipes.returning[0].id;
    console.log(recipeTemplate.recipeId); // Access the result using result.data

  } catch (error) {
    console.log(error);
  }
};
  
  const query = await useAsyncQuery(gql`
    query MyQuery {
      food_recipe_Categories {
        id
        name
      }
    }
  `);
  
  const ingredients = await useAsyncQuery(gql`
    query MyQuery {
      food_recipe_Ingredients {
        name
      }
    }
  `);
  
  
  </script>
  
  <style scoped>
  label {
    display: block;
  }
  </style>