<template>
    <div class="space-y-4">
      <div class="flex items-center space-x-4">
        <label class="text-sm font-medium text-gray-600">{{ label }}</label>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative rounded-md shadow-sm flex-grow focus-within:ring focus-within:border-blue-300">
          <VField :name="name" v-slot="{ field, meta, errors }" >
            <input
              v-bind="field"
              class="form-input block w-full sm:text-sm sm:leading-5"
              :class="{
                'border-green-500': meta.valid && meta.touched,
                'border-red-500': !meta.valid && meta.touched,
              }"
              :placeholder="placeholder"
              :type="type"
            />
            <span class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <i class="fas" :class="leftIcon"></i>
            </span>
            <span
              class="absolute inset-y-0 right-0 pr-2 flex items-center"
              v-if="meta.valid && meta.touched"
            >
              <i class="fas fa-check text-green-500"></i>
            </span>
            <span
              class="absolute inset-y-0 right-0 pr-2 flex items-center"
              v-else-if="!meta.valid && meta.touched"
            >
              <i class="fas fa-times text-red-500"></i>
            </span>
            <VErrorMessage :name="name" as="p" class="mt-2 text-sm text-red-600" />
            
          </VField>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    leftIcon: {
      type: String,
      default: "",
    },
    
  });
  </script>
  