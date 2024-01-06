<template>
    <div>
        <p>hello about</p>
        <p v-for="country in query.data.value.food_recipe_Categories">{{ country.id }}{{ country.name }}</p>
    </div>
</template>
<script setup>


const query = await useAsyncQuery (gql`
 query MyQuery {
  food_recipe_Categories {
    id
    name
  }
}
`)

</script>