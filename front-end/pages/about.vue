<template>
    <div>
        <p>hello about</p>
        <p>{{ query }}</p>
    </div>
</template>
<script setup>


const query = useQuery (gql`
  query getShips($limit: Int!) {
    ships(limit: $limit) {
      id
      name
    }
  }
`)

</script>