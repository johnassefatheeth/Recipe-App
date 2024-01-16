

<script setup>
 import { object, string, ref as yupRef } from "yup";
import { useApi } from "~/plugins/api";
import {useUserStore} from "~/stores"


const store=useUserStore()
const router=useRouter()

if(store.userID){
  router.push('/')
}



const email = ref('');
const password = ref('');
const show=ref(false)

const handleSubmit= async()=>{
  const { login } = useApi();
  const UId=await login(email, password)
  if(UId.user_id){
  store.setToken(UId.token)
    
  store.setUser(UId.user_id)
  console.log(store.userID)
  show.value=false
  router.push('/')
  
  }
  else{
    console.log(UId)
    show.value=true
  }
  

}


const initialValues = {  password: "",email:""};

const schema = object({
    
    password: string().required().min(8).label("Your Password"),
    email: string().required().email()
  });

</script>


<template>
  <div class="w-full flex h-screen justify-center  items-center bg-stone-700">
  <div class="w-96 h-fit flex justify-center items-center bg-stone-500 rounded-xl"> 
  
  <br>
  <VForm
        class="bg-white p-5 rounded"
        :validation-schema="schema"
        :initial-values="initialValues"
        v-slot="{ meta: formMeta, errors: formErrors }"
        @submit="handleSubmit"
      >
        

        <h2 class="text-2xl mt-2">Log In</h2>
        
        <VTextInput
          type="text"
          name="email"
          label="email"
          placeholder="email"
          leftIcon="fa-envelope"
          @input="email = $event.target.value"
        />

        
        <VTextInput
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          leftIcon="fa-lock"
          @input="password = $event.target.value"
        />
        <p v-if="show">invalid cridentials</p>


        <template v-if="Object.keys(formErrors).length">
          <p class="help is-danger font-bold">
            Please correct the following errors:
          </p>
          <ul>
            <li
              v-for="(message, field) in formErrors"
              :key="field"
              class="help is-danger"
            >
              {{ message }}
            </li>
          </ul>
        </template>

        <button
          class="bg-blue-500 text-white mt-3 py-2 px-4 rounded"
          :class="{ 'bg-primary': formMeta.valid }"
          :disabled="!formMeta.valid"
          type="submit"
        >
          Submit
        </button>
        <NuxtLink to="/">log in as guest</NuxtLink>

        
      </VForm>
</div>
</div>
</template>