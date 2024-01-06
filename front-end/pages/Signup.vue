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
          <button
            class="toggle-debug bg-link text-white py-2 px-4 rounded-full float-right"
            @click="debug = !debug"
          >
            {{ debug ? "Remove Debug" : "Show Debug" }}
          </button>
  
          <h2 class="text-2xl mt-2">Sign Up</h2>
  
          <VTextInput
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            :debug="debug"
            leftIcon="fa-envelope"
          />
          <VTextInput
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            :debug="debug"
            leftIcon="fa-lock"
          />
          <VTextInput
            type="password"
            name="confirmed"
            label="Confirm Password"
            placeholder="Confirm Password"
            :debug="debug"
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
  
          <div class="debug mt-3" v-if="debug">
            <pre>{{ formMeta }}</pre>
          </div>
        </VForm>
      </div>
    </div>
  </template>
  
  <script setup>
  import { object, string, ref as yupRef } from "yup";
  import { configure } from "vee-validate";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { gql } from '@apollo/client';
import { useQuery } from "@vue/apollo-composable";
  const debug = ref(false);
  
  onMounted(() => {
    debug.value = useRouter().currentRoute.value.query.debug === "true";
  });
  
  const existingEmail = async (value) => {
      try {
        
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation($email: String!) {
              check_user_by_email(email: $email)
            }
          `,
          variables: {
            email: value,
          },
        });

        // Handle the response data
        const result = data.check_user_by_email;
        console.log(result); // Boolean value returned by the function
      } catch (error) {
        // Handle errors
        console.error('Error invoking database function:', error);
      }
    }
  
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
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
      .email()
      .test(
        "email-is-taken",
        "Email is already taken",
        async (value) => !(await existingEmail(value))
      )
      .label("Email Address"),
    password: string().required().min(8).label("Your Password"),
    confirmed: string()
      .required()
      .oneOf([yupRef("password")], "Passwords do not match")
      .label("Your Confirmation Password"),
  });
  
  const initialValues = { email: "", password: "", confirmed: "" };
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
  