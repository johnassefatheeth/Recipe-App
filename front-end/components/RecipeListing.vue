<template>
    <div>
        {{ props.myObject }}

    </div>
</template>

<script setup>

const props = defineProps({
  myObject: {
    type: Object,
    required: true
  }})

  

</script>

<style scoped>

</style>