<template>
  <div class="bg-gray-100">
    <Navbar /><br>

    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold text-indigo-800 mb-8">Welcome to FOOD!</h1>

      <div class="max-w-3xl mx-auto text-gray-700">
        <p class="text-lg leading-relaxed">
          We are passionate about bringing you a delightful culinary experience by sharing a diverse collection of mouthwatering recipes.
          Our mission is to inspire home cooks and food enthusiasts alike to explore the joy of cooking, creating delicious meals that cater to various tastes and preferences.
        </p>

        <p class="text-lg leading-relaxed mt-4">
          At FOOD, we believe that cooking is an art, and the kitchen is your canvas. Whether you're a seasoned chef or just starting your culinary journey,
          our platform is designed to provide you with a rich tapestry of recipes, cooking tips, and culinary inspiration.
        </p>

        <p class="text-lg leading-relaxed mt-4">
          Our team of experienced chefs and food enthusiasts curates an extensive range of recipes, from quick and easy weekday meals to gourmet delights for special occasions.
          We strive to cater to every palate, offering a diverse selection that includes vegetarian, vegan, gluten-free, and more.
        </p>

        <p class="text-lg leading-relaxed mt-4">
          We understand the importance of connecting over a shared meal, and that's why we're committed to making your cooking experience enjoyable and rewarding.
          Explore our recipes, learn new techniques, and embark on a culinary adventure with us. Join our community, share your kitchen triumphs, and let's savor the joy of creating and sharing delicious meals together.
        </p>
      </div>
    </div>
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