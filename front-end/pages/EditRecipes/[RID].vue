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
        <select v-model="recipeTemplate.Category" :default=query.data.value.food_recipe_Recipes_by_pk.Category.id id="category" name="category" class="w-full p-2 border border-gray-300 rounded">
          <option v-for="category in catagory.data.value.food_recipe_Categories" :value="category.id" :key="category.id">{{ category.name }}</option>
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
        <label class="text-lg font-bold">Ingredients</label>
        <div class="flex flex-wrap">
            <button v-for="ingredient in ingredients.data.value.food_recipe_Ingredients" :key="ingredient.id" class="w-full md:w-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2 mb-2" @click="recipeTemplate.Ingredient.includes(ingredient.id) ?recipeTemplate.Ingredient.splice(recipeTemplate.Ingredient.indexOf(item), 1):recipeTemplate.Ingredient.push(ingredient.id)" :class="{ 'bg-blue-500': !recipeTemplate.Ingredient.includes(ingredient.id), 'bg-green-500': recipeTemplate.Ingredient.includes(ingredient.id) }"> {{ ingredient.name }} </button>
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
  
const RID=useRoute().params.RID


  



  const query = await useAsyncQuery (gql`
 query MyQuery ($id: Int!) {
  food_recipe_Recipes_by_pk(id: $id) {
    Category {
      name
      id
    }
    Image {
      url
    }
    RecipeIngredients {
      Ingredient {
        name
        id

      }
    }
    Steps(order_by: {step_order: asc}) {
      step_order
      dscriptoin
    }
    description
    featured_img
    preparation_time
    title
    Creator_id
  }
}

`,{id:RID})

if(!store.userID && store.userID!=query.data.value.food_recipe_Recipes_by_pk.Creator_id){
    navigateTo('/')
  }
const handleSubmit= ()=>{

}



const recipeTemplate = ref({
    Category: query.data.value.food_recipe_Recipes_by_pk.Category.id,
    PrepTime: query.data.value.food_recipe_Recipes_by_pk.preparation_time,
    Ingredient: [],
    Description: query.data.value.food_recipe_Recipes_by_pk.description,
    Creator: store.userID,
    Title: query.data.value.food_recipe_Recipes_by_pk.title,
    Steps: [{
        stepOrder: 0,
        stepDescription: '',
  }],
    imgUrl: '',
  });


const ingred=query.data.value.food_recipe_Recipes_by_pk.RecipeIngredients


ingred.forEach(ingredient => {
  recipeTemplate.value.Ingredient.push(ingredient.Ingredient.id)
  
});


const stepss =query.data.value.food_recipe_Recipes_by_pk.Steps

console.log(stepss)

stepss.forEach(step => {
  recipeTemplate.value.Steps.push({stepOrder:step.step_order,stepDescription:step.dscriptoin})
  
});






const initialValues = {  description: query.data.value.food_recipe_Recipes_by_pk.description,title:query.data.value.food_recipe_Recipes_by_pk.title,preparationTime:query.data.value.food_recipe_Recipes_by_pk.preparation_time};

const schema = object({
    
    description: string().required().min(10).label("description"),
    title: string().required().min(3).label("Title"),
    preparationTime: number().required().min(2).max(3600).label("Preparation Time"),
  });


  






 


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

  
 

  
  const UPDATE_RECIPE_MUTATION = gql`
  mutation MyMutation(
  			$RID: Int!
        $catagory: Int!
        $description: String!
        $preparation_time: Int!
        $title: String!
      ) {
  update_food_recipe_Recipes(where: {id: {_eq: $RID}},
   _set: {Catagory_id: $catagory, description: $description, preparation_time: $preparation_time, title: $title}) {
    affected_rows
  }
}
    `;
  

  const saveRecipe = async () => {
  try {

    const { mutate } = useMutation(UPDATE_RECIPE_MUTATION);
    
    
      try {
        
        const { data } = await mutate({
          RID: RID,
          catagory: recipeTemplate.value.Category,
          description: recipeTemplate.value.Description,
          preparation_time: recipeTemplate.value.PrepTime,
          title: recipeTemplate.value.Title,
        });
 // Access the result using result.data
        console.log(data);
        return RID;
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

const DELETE_INGREDIENT_MUTATION = gql`
mutation MyMutation($RID: Int!) {
  delete_food_recipe_RecipeIngredients(where: {Recipe_id: {_eq: $RID}}) {
    affected_rows
  }
}
    `
  const deleteIngredients = async (recId) => {
    try {
      const { mutate } = useMutation(DELETE_INGREDIENT_MUTATION);
      const { data } = await mutate({ RID: recId });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

   const addingerdient = async () => {
    let recId=await saveRecipe()
    await deleteIngredients(recId)
    
    const { mutate } = useMutation(ADD_INGREDIENT_MUTATION);
    for (const ingredient of recipeTemplate.value.Ingredient) {
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

    const DELETE_STEP_MUTATION=gql`
    mutation MyMutation($RID: Int!) {
  delete_food_recipe_Steps(where: {recipe_id: {_eq: $RID}}) {
    affected_rows
  }
}
`

const deleteSteps = async (recId) => {
  try {
    const { mutate } = useMutation(DELETE_STEP_MUTATION);
    const { data } = await mutate({ RID: recId });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};


const addsteps=async (recId)=>{
  await deleteSteps(recId)
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






  
  const catagory = await useAsyncQuery(gql`
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