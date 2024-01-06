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
          
  
          <h2 class="text-2xl mt-2">Sign Up</h2>
          <VTextInput
            type="text"
            name="name"
            label="name"
            placeholder="full name"
            leftIcon="fa-envelope"
          />

          <VTextInput
            type="text"
            name="userName"
            label="userName"
            placeholder="userName"
            leftIcon="fa-envelope"
          />
  
          <VTextInput
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            leftIcon="fa-envelope"
          />
          <VTextInput
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            leftIcon="fa-lock"
          />
          <VTextInput
            type="password"
            name="confirmed"
            label="Confirm Password"
            placeholder="Confirm Password"
            leftIcon="fa-lock"
          />
  
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
  
          
        </VForm>
  </div>
  </div>
</template>

<script setup>
 import { object, string, ref as yupRef } from "yup";


const username = ref('');
const password = ref('');


const handleSubmit= ()=>{

}


const initialValues = { email: "", password: "", confirmed: "" ,name:"",userName:""};

const schema = object({
    email: string()
      .required()
      .email(),
    //   .test(
    //     "email-is-taken",
    //     "Email is already taken",
    //     async (value) => !(await existingEmail(value))
    //   )
    //   .label("Email Address"),
    password: string().required().min(8).label("Your Password"),
    confirmed: string()
      .required()
      .oneOf([yupRef("password")], "Passwords do not match")
      .label("Your Confirmation Password"),
    name: string()
      .required()
      .min(2),
    userName: string().required()
  });

</script>

<style scoped>

</style>