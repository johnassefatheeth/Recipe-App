<template>
    <div class="w-full flex h-screen justify-center  items-center bg-stone-700">
    <div class="w-96 p-4 h-fit flex justify-center items-center bg-stone-500 rounded-xl"> 
    
    <br>
    <VForm class="">
        <VField
          name="name"
          :rules="isRequired"
          class=""
          placeholder="name"
        />
        <br>
        <VErrorMessage name="name" class="help is-danger" />
      </VForm>
  </div>
  </div>
</template>

<script setup>


const isRequired = (value) => {
  if (value && value.trim()) {
    return true;
  }
  return "This is required right now!";
};

</script>

<style scoped>

</style>