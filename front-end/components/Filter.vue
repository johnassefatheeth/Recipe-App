<template>
    <div class="w-full h-fit bg-slate-400 p-6" >
            <ul  class="flex justify-evenly items-center h-full">
                <li class="w-full bg-slate-300 border-2"><div >catagory</div><p v-for="catagory in query.data.value.food_recipe_Categories">{{ catagory.name }}</p></li>
                <li class="w-full bg-slate-300 border-2"><div>preparation time</div>
                     <select name="" id="">
                        <option value="1"> -15 min</option>
                        <option value="2"> 16-30 min</option>
                        <option value="3"> 31 -45 min</option>
                        <option value="4">45-60 min</option>
                        <option value="5">60 min -</option>
                    </select>
                </li>
                <li class="w-full bg-slate-300 border-2"><div>ingredient</div>
                    <p v-for="ingredient in ingredients.data.value.food_recipe_Ingredients">{{ ingredient.name }}</p>
                </li>
                <li class="w-full bg-slate-300 border-2"><div>creator</div>
                    <input type="text">
                    <button>search</button>
                </li>
                <li class="w-full bg-slate-300 border-2"><div>recipe title</div>
                    <input type="text">
                    <button>search</button>
                
                </li>
            </ul>

        </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>