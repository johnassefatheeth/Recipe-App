<template>
  <Navbar/>
  <section class="relative">
		<div class="container mx-auto flex flex-col lg:flex-row items-center gap-12 mt-10">
		  <!-- Content -->
		  <div class="flex flex-1 flex-col items-center lg:items-start overflow-hidden m-10 p-10">
			<h2 class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500 font-bold text-3xl md:text-4 lg:text-6xl text-center lg:text-center mb-2 py-2 slideUp">
				Learn. Cook. Share.<br/>Cooking Made Easy.
			</h2>
			<div class="overflow-hidden">
			<p class="font-thin text-xl md:text-3xl text-center lg:text-left slideUp">
				Say good bye to long and frustrating
			</p>
			<p class="font-thin text-xl md:text-3xl text-center lg:text-left slideUp">
				food blogs and recipe videos. Access </p>
			<p class="font-thin text-xl md:text-3xl text-center lg:text-left slideUp">
				our recipe cards to prepare any dish </p>
			<p class="font-thin text-xl md:text-3xl text-center lg:text-left slideUp">
				in minutes.</p>
			
		    </div>
			<div class="flex mx-auto md:mx-40 mt-6 justify-center flex-wrap gap-6">
			  <a href="#search-dish-call">
        <NuxtLink to="/RecipeListing">
			  <button type="button" class="bg-blue-600  text-white text-xl font-regular py-2 px-4 rounded transition duration-500 ease-in-out hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 ...">
				Browse Dish
			  </button>
      </NuxtLink>
			</a>
			</div>
		  </div>
		  <!-- Image -->
		  <div class="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
			<img class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full fadeInRotate" src="../assets/image/platefood.png" alt="" />
		  </div>
		</div>
		
	  </section>
</template>

<script setup>







</script>