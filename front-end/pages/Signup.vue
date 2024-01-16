<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 class="text-2xl text-center mb-6 text-white">
          VeeValidate Tutorial
        </h2>
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
import { configure } from "vee-validate";
import bcrypt from 'bcryptjs'; 
import {useUserStore} from "~/stores"


const store=useUserStore()
const router=useRouter()

if(store.userID){
  router.push('/')
}



const saltRounds = 10; // Number of salt rounds for bcrypt

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};



const ADD_USER = gql`mutation MyMutation(
  $userName: String!,
  $email: String!,
  $name: String!,
  $password: String!
) {
  insert_food_recipe_Users(objects: {
    UserName: $userName,
    email: $email,
    name: $name,
    password: $password
  }) {
    returning {
      id
      UserName
      email
      name
    }
  }
}`;








const handleSubmit = async (values, actions) => {
  const encryptedPassword = await encryptPassword(values.password);
  console.log({ ...values, password: encryptedPassword });
  const { mutate } = useMutation(ADD_USER);
  try {
      const { data } = await  mutate({
        userName: values.userName,
        email: values.email,
        name: values.name,
        password:encryptedPassword
      });
      console.log(data);
  actions.resetForm();
    } catch (error) {
      console.log(error);
    }
};

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const schema = object({
  email: string()
    .required()
    .email(),
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

const initialValues = { email: "", password: "", confirmed: "", name: "", userName: "" };
</script>
  
  <style scoped>
    .min-h-screen {
      min-height: 100vh;
    }
  
    .bg-link {
      background-color: #3490dc;
    }
  
    .bg-blue-500 {
      background-color: #4299e1;
    }
  
    .text-primary {
      color: #4299e1;
    }
  </style>
  