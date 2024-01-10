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
          <option v-for="category in query.data.value.food_recipe_Categories" :value="category.name" :key="category.id">{{ category.name }}</option>
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
        <textarea v-model="recipeTemplate.Steps" id="steps" name="steps" rows="4" class="w-full p-2 border border-gray-300 rounded"></textarea>
      </div>
  
      <div class="my-4">
      <button class="bg-green-500 text-white font-semibold py-2 px-4 rounded">
        Save
      </button>
    </div>
    </div>
  </template>
  
  <script setup>

  const emits = defineEmits(["filechange"]);

    const onFileChange = async (e) => {
      var file = e.target.files || e.dataTransfer.files;
      if (!file.length) return;


      const {snapshot ,DownloadURL, metadata} = await uploadFile(file[0]);

        console.log(snapshot, DownloadURL, metadata);

      emits("filechange", snapshot, DownloadURL, metadata);
    };


  const recipeTemplate = ref({
    Category: '',
    PrepTime: 0,
    Ingredient: [],
    Description: '',
    Creator: 'johnA',
    Title: '',
    Steps: [{
        stepOrder: 0,
        stepDescription: '',
    }],
  });


  //recipeTemplate.Author = useCookie('username').value
  

  const saveRecipe = async () => {
    const { data, error } = await useAsyncQuery(gql`
      mutation MyMutation {
  insert_food_recipe_Recipes(objects: {Catagory_id: 1, Creator_id: 2, description: "kj", preparation_time: 10, title: "doro", featured_img: 1}) {
    returning {
      id
    }
  }
}
    `, { recipe: recipeTemplate.value });

    const { imgdata, imgerror } = await useAsyncQuery(gql`
   mutation MyMutation {
  insert_food_recipe_Images(objects: {url: "https://www.pexels.com/search/food/"}) {
    returning {
      id
    }
  }
}
`, { recipe: recipeTemplate.value });
    
const { stepdata, steperror } = await useAsyncQuery(gql`
   mutation MyMutation {
  insert_food_recipe_Steps(objects: {recipe_id: 10, dscriptoin: "jkjh", step_order: 3}){
    returning {
      recipe_id
    }
  }
}
`, { recipe: recipeTemplate.value });


const { ingdata, ingerror } = await useAsyncQuery(gql`
   mutation MyMutation {
  insert_food_recipe_RecipeIngredients(objects: {Recipe_id: 10, quantity: 1.5, unit: "g", Ingredient_id: 10}) {
    returning {
      Recipe_id
    }
  }
}

`, { recipe: recipeTemplate.value });
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