<template>
    <div>
        {{ recipeTemplate }}
        <VForm
          class="bg-white p-5 rounded"
          :validation-schema="schema"
          :initial-values="initialValues"
          v-slot="{ meta: formMeta, errors: formErrors }"
          @submit="handleSubmit"
        >

      <div class="my-4">
        <label for="title" class="text-lg font-bold">Title</label>
        <VField v-model="recipeTemplate.Title" type="text" id="title" name="title" class="w-full p-2 border border-gray-300 rounded"/>
        <VErrorMessage name="title" as="p" class="mt-2 text-sm text-red-600" />
      </div>
  
      <div class="my-4">
        <label for="category" class="text-lg font-bold">Category</label>
        <select v-model="recipeTemplate.Category" id="category" name="category" class="w-full p-2 border border-gray-300 rounded">
          <option v-for="category in query.data.value.food_recipe_Categories" :value="category.id" :key="category.id">{{ category.name }}</option>
        </select>
        
      </div>
  
      <div class="my-4">
        <label for="preparationTime" class="text-lg font-bold">Preparation Time</label>
        <VField v-model="recipeTemplate.PrepTime" type="number" id="preparationTime" name="preparationTime" class="w-full p-2 border border-gray-300 rounded"/>
        <VErrorMessage name="preparationTime" as="p" class="mt-2 text-sm text-red-600" />
    </div>
  
      <div class="my-4">
        <label for="description" class="text-lg font-bold">Description</label>
        <VField v-model="recipeTemplate.Description" type="text" id="description" name="description" class="w-full p-2 border border-gray-300 rounded"/>
        <VErrorMessage name="description" as="p" class="mt-2 text-sm text-red-600" />
    </div>
  
      <div class="my-4">
        <img v-if="recipeTemplate.imgUrl!=''" :src=recipeTemplate.imgUrl alt="your image" class="w-44 h-44">
        <label class="text-lg font-bold">Image</label>
        <input type="file" name="image" class="w-full" @change="onFileChange">
      </div>
  
      <div class="my-4">
        <label class="text-lg font-bold">Ingredients</label>
        <div class="flex flex-wrap">
            <button v-for="ingredient in ingredients.data.value.food_recipe_Ingredients" :key="ingredient.id" class="w-full md:w-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2 mb-2" @click="recipeTemplate.Ingredient.includes(ingredient.id) ?recipeTemplate.Ingredient.splice(recipeTemplate.Ingredient.indexOf(item), 1):recipeTemplate.Ingredient.push(ingredient.id)" :class="{ 'bg-blue-500': !recipeTemplate.Ingredient.includes(ingredient.id), 'bg-green-500': recipeTemplate.Ingredient.includes(ingredient.id) }"> {{ ingredient.name }} </button>
        </div>
        <vField  v-model="newIngredient" class="w-full p-2 border border-gray-300 rounded" type ="text" id="newCategory" name="newCategory"/>
        {{ newIngredient}}
        <button @click="addNewIngredient">add</button>
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
      <button @click="addingerdient" class="bg-green-500 text-white font-semibold py-2 px-4 rounded">
        Save
      </button>
    </div>
    </VForm>
    </div>
  </template>
  
  <script setup>

  import {useMutation} from '@vue/apollo-composable';
  import { number, object, string, ref as yupRef } from "yup";
  import {useUserStore} from "~/stores"


  const store=useUserStore()



const newIngredient=ref('')


onMounted(async()=>{
  if(!store.userID){
    navigateTo('/login')
  }
})


const addNewIngredient=async()=>{
  const ADD_NEW_INGREDIENT=gql`
  mutation MyMutation($name: String!) {
  insert_food_recipe_Ingredients(objects: {name: $name}){
    returning {
      id
    }
  }
}
  `
  const {mutate}=useMutation(ADD_NEW_INGREDIENT)
  await mutate({name:newIngredient.value})
  fetchIgredients()
  newIngredient.value=''
  
}

const fetchIgredients=async()=>{
  ingredients = await useAsyncQuery(gql`
    query MyQuery {
      food_recipe_Ingredients {
        name
        id
      }
    }
  `);
  
}






const handleSubmit= ()=>{

}


const initialValues = {  description: "",title:"",preparationTime:0};

const schema = object({
    
    description: string().required().min(10).label("description"),
    title: string().required().min(3).label("Title"),
    preparationTime: number().required().min(2).max(3600).label("Preparation Time"),
  });


  


  const recipeTemplate = ref({
    Category: 0,
    PrepTime: 0,
    Ingredient: [],
    Description: '',
    Creator: store.userID,
    Title: '',
    Steps: [{
        stepOrder: 0,
        stepDescription: '',
  }],
    imgUrl: '',
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
 // Access the result using result.data
    return result.data.insert_food_recipe_Images.returning[0].id;

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
    ; // Wait for the completion of addImage()
    let imgId=await addImage()

    const { mutate } = useMutation(CREATE_RECIPE_MUTATION);
    
    
      try {
        console.log(imgId);
        const { data } = await mutate({
          catagory: recipeTemplate.value.Category,
          creator: recipeTemplate.value.Creator,
          description: recipeTemplate.value.Description,
          preparation_time: recipeTemplate.value.PrepTime,
          title: recipeTemplate.value.Title,
          featured_img: imgId,
        });
 // Access the result using result.data
        console.log(data.insert_food_recipe_Recipes.returning[0].id);
        return data.insert_food_recipe_Recipes.returning[0].id;
      } catch (error) {
        console.log(error);
      }
  } catch (error) {
    console.log(error);
  }
};









const ADD_INGREDIENT_MUTATION = gql`
      mutation MyMutation($ingId: Int!, $recId: Int!) {
  insert_food_recipe_RecipeIngredients(objects: {Ingredient_id: $ingId, Recipe_id: $recId}) {
    returning {
      id
    }
  }
}
    `;
   const addingerdient = async () => {
    let recId=await saveRecipe()
    
    const { mutate } = useMutation(ADD_INGREDIENT_MUTATION);
    // console.log(recipeTemplate.value.Ingredient);
    for (const ingredient of recipeTemplate.value.Ingredient) {
   //console.log(ingredient);
    try {
      const { data } = await  mutate({
        ingId: ingredient,
        recId: recId,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
};
   
 addsteps(recId)

}

const ADD_STEP_MUTATION = gql`
      mutation MyMutation($stepOrder: Int!, $stepDescription: String!, $recId: Int!) {
        insert_food_recipe_Steps(objects: {step_order: $stepOrder, dscriptoin: $stepDescription, recipe_id: $recId}) {
    returning {
      id
    }
  }
}
    `;


const addsteps=async (recId)=>{
  const { mutate } = useMutation(ADD_STEP_MUTATION);
  for (const step of recipeTemplate.value.Steps) {
    try {
      const { data } = await  mutate({
        stepOrder: step.stepOrder,
        stepDescription: step.stepDescription,
        recId: recId,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
};


useRouter().push('/RecipeDetails/'+recId);
}






  
  const query = await useAsyncQuery(gql`
    query MyQuery {
      food_recipe_Categories {
        id
        name
      }
    }
  `);
  
  var ingredients = await useAsyncQuery(gql`
    query MyQuery {
      food_recipe_Ingredients {
        name
        id
      }
    }
  `);




  
  
  </script>
  
  <style scoped>
  label {
    display: block;
  }
  </style>