<template>
    <div>
        <p>hello about</p>
        <p>{{ query }}</p>
    </div>
</template>
<script setup>


const query = useQuery (gql`
 query MyQuery {
  food_recipe_Categories {
    id
    name
  }
}
`)

</script>