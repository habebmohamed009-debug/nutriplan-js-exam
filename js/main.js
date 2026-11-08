import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';
let mainMenuItems=document.querySelectorAll(".nav-link");
let mealCategoriesSection=document.getElementById("meal-categories-section");
let productsSection=document.getElementById("products-section");
let foodlogSection=document.getElementById("foodlog-section");
let allRecipesSection=document.getElementById("all-recipes-section");
let recipesGrid=document.getElementById("recipes-grid");
let searchAreas=document.querySelector("#search-filters-section .flex");
let categoriesGrid=document.getElementById("categories-grid");
let searchFiltersSection=document.getElementById("search-filters-section");
let sections=document.querySelectorAll("section");
let mealDetailsSection=document.getElementById("meal-details")
let productsGrid=document.getElementById("products-grid")

for(let menuItem of mainMenuItems){
    menuItem.addEventListener("click",()=>{
        for(let section of sections){
            section.classList.add("hidden")
        }
        if ( menuItem.getAttribute("data-target")=="meal-categories-section"){
            mealCategoriesSection.classList.remove("hidden")
            allRecipesSection.classList.remove("hidden")
            searchFiltersSection.classList.remove("hidden");
        }else if ( menuItem.getAttribute("data-target")=="products-section"){
            productsSection.classList.remove("hidden")
        }else if (menuItem.getAttribute("data-target")=="foodlog-section"){
            foodlogSection.classList.remove("hidden")
        }
        
    })
}
async function getAllMeals(){
    let mealResult= await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`)
    let finalMealResult= await mealResult.json();
    let allMeals=finalMealResult.results
    
displayAllMeals(allMeals)
}

getAllMeals()

function displayAllMeals(meals){
    let temp=``
    for (let meal of meals){        
        temp+=`
        <div
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="${meal.id}"
        >
            <div class="relative h-48 overflow-hidden">
            <img
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="${meal.thumbnail}"
                alt="${meal.name}"
                loading="lazy"
            />
            <div class="absolute bottom-3 left-3 flex gap-2">
                <span
                class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                >
                ${meal.category}
                </span>
                ${meal.area?
                ` <span
                class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                >
                ${meal.area}
                </span>`:''}
            </div>
            </div>
            <div class="p-4">
            <h3
                class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
            >
                ${meal.name}
            </h3>
            <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                ${meal.instructions}
            </p>
            <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-gray-900">
                <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                ${meal.category}
                </span>
                <span class="font-semibold text-gray-500">
                <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                ${meal.area}
                </span>
            </div>
            </div>
        </div>
        `
    }

    recipesGrid.innerHTML=temp
}
//////////////////////////////////////////

async function getMealArea() {
    let areaResult=await fetch("https://nutriplan-api.vercel.app/api/meals/areas")
    let finalAreaResult=await areaResult.json();
    displayArea(finalAreaResult.results)
}
getMealArea()
////////////////////////////////////////////////
function displayArea(areas){
    let temp=``
    for (let area of areas){
        temp+=`
                <button
                class="area-filter-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
                >
                ${area.name}
                </button>
        `
    }
    searchAreas.innerHTML=temp
    let allCuisines =document.createElement("button")
    searchAreas.prepend(allCuisines)
    allCuisines.innerText="All Cuisines"
    allCuisines.classList.add("area-filter-btn","bg-emerald-600","px-4", "py-2","text-white", "rounded-full", "font-medium","hover:text-white", "text-sm", "whitespace-nowrap", "hover:bg-emerald-700","transition-all");
}
/////////////////////////////////////////////////////////
async function getAllCategories() {
    let categoriesResult= await fetch("https://nutriplan-api.vercel.app/api/meals/categories")
    let finalCategoriesResult= await categoriesResult.json()
    let categories=finalCategoriesResult.results
    displayAllCategories(categories)
    categoriesGrid.addEventListener("click",(e)=>{
        let clickedCard = e.target.closest('.category-card');
        if (!clickedCard) return;
            for(let category of categories){
                if (clickedCard.getAttribute("data-category")==category.name){
                    filterMeals(category.name)
                }
            }  
    })
    
}
const items = {
        Beef: {
            bg: "from-red-50 to-rose-50",
            border: "border-red-200 hover:border-red-400",
            iconFrom: "from-red-400",
            iconTo: "to-rose-500",
            text: "text-red-600"
        },
        Chicken: {
            bg: "from-amber-50 to-orange-50",
            border: "border-amber-200 hover:border-amber-400",
            iconFrom: "from-amber-400",
            iconTo: "to-orange-500",
            text: "text-amber-600"
        },
        Dessert: {
            bg: "from-pink-50 to-rose-50",
            border: "border-pink-200 hover:border-pink-400",
            iconFrom: "from-pink-400",
            iconTo: "to-rose-500",
            text: "text-pink-600"
        },
        Lamb: {
            bg: "from-orange-50 to-amber-50",
            border: "border-orange-200 hover:border-orange-400",
            iconFrom: "from-orange-400",
            iconTo: "to-amber-500",
            text: "text-orange-600"
        },
        Miscellaneous: {
            bg: "from-slate-50 to-gray-50",
            border: "border-slate-200 hover:border-slate-400",
            iconFrom: "from-slate-400",
            iconTo: "to-gray-500",
            text: "text-slate-600"
        },
        Pasta: {
            bg: "from-yellow-50 to-amber-50",
            border: "border-yellow-200 hover:border-yellow-400",
            iconFrom: "from-yellow-400",
            iconTo: "to-amber-500",
            text: "text-yellow-600"
        },
        Pork: {
            bg: "from-rose-50 to-red-50",
            border: "border-rose-200 hover:border-rose-400",
            iconFrom: "from-rose-400",
            iconTo: "to-red-500",
            text: "text-rose-600"
        },
        Seafood: {
            bg: "from-cyan-50 to-blue-50",
            border: "border-cyan-200 hover:border-cyan-400",
            iconFrom: "from-cyan-400",
            iconTo: "to-blue-500",
            text: "text-cyan-600"
        },
        Side: {
            bg: "from-green-50 to-emerald-50",
            border: "border-green-200 hover:border-green-400",
            iconFrom: "from-green-400",
            iconTo: "to-emerald-500",
            text: "text-green-600"
        },
        Starter: {
            bg: "from-teal-50 to-cyan-50",
            border: "border-teal-200 hover:border-teal-400",
            iconFrom: "from-teal-400",
            iconTo: "to-cyan-500",
            text: "text-teal-600"
        },
        Vegan: {
            bg: "from-emerald-50 to-green-50",
            border: "border-emerald-200 hover:border-emerald-400",
            iconFrom: "from-emerald-400",
            iconTo: "to-green-500",
            text: "text-emerald-600"
        },
        Vegetarian: {
            bg: "from-lime-50 to-green-50",
            border: "border-lime-200 hover:border-lime-400",
            iconFrom: "from-lime-400",
            iconTo: "to-green-500",
            text: "text-lime-600"
        },
        Breakfast: {
            bg: "from-amber-50 to-orange-50",
            border: "border-amber-200 hover:border-amber-400",
            iconFrom: "from-amber-400",
            iconTo: "to-orange-500",
            text: "text-amber-600"
        },
        Goat: {
            bg: "from-stone-50 to-amber-50",
            border: "border-stone-200 hover:border-stone-400",
            iconFrom: "from-stone-400",
            iconTo: "to-amber-500",
            text: "text-stone-600"
        }
    }
const icons = {
        Beef: "fa-drumstick-bite",
        Chicken: "fa-drumstick-bite",
        Dessert: "fa-cake-candles",
        Lamb: "fa-drumstick-bite",
        Pasta: "fa-bowl-food",
        Pork: "fa-bacon",
        Seafood: "fa-fish",
        Side: "fa-plate-wheat",
        Starter: "fa-utensils",
        Vegan: "fa-leaf",
        Vegetarian: "fa-seedling",
        Breakfast: "fa-mug-hot",
        Miscellaneous: "fa-bowl-rice",
        Goat: "fa-drumstick-bite"
    }
function displayAllCategories(categories){
    let temp=``
    for (let category of categories){
        let style = items[category.name] ;
        let icon = icons[category.name] ;
        temp+=`
        <div
            class="category-card bg-gradient-to-br ${style.bg} rounded-xl p-3 border ${style.border} hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
            data-category="${category.name}"
        >
            <div class="flex items-center gap-2.5">
            <div
                class="text-white w-9 h-9 bg-gradient-to-br ${style.iconFrom} ${style.iconTo} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
            >
                <i class="fa-solid ${icon}"></i>
            </div>
            <div>
                <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
            </div>
            </div>
        </div>
        `
    }
    categoriesGrid.innerHTML=temp
}
getAllCategories()
/////////////////////////////////////////////////////////////////////////////
    async function filterMeals(category) {
        let filteredMealRes=await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?category=${category}&page=1&limit=25`)
        let finalFilteredMealRes=await filteredMealRes.json()
        let filterdMeals =finalFilteredMealRes.results;
        displayAllMeals(filterdMeals)
    }
    filterMeals("chicken")
///////////////////////////////////////////////////////////////////////////////
async function filterByArea(area){
    let mealsByAreaRes=await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?area=${area}&page=1&limit=25`)
        let finalMealsByAreaRes=await mealsByAreaRes.json()
        let filterdMealsByArea =finalMealsByAreaRes.results;
        displayAllMeals(filterdMealsByArea)
    }
searchFiltersSection.addEventListener("click",(e)=>{
        let clickedArea=e.target.closest(".area-filter-btn")
        if (!clickedArea) return;
        let allAreas=document.querySelectorAll(".area-filter-btn")
    
        for (let area of allAreas){
            area.classList.remove("text-white","bg-emerald-600")
            area.classList.add("bg-gray-100", "text-gray-700")
        }
        clickedArea.classList.remove("bg-gray-100", "text-gray-700")
        clickedArea.classList.add("text-white","bg-emerald-600")
        let searchArea=clickedArea.innerText.toLocaleLowerCase ().trim()
            if(searchArea!="all cuisines"){
                filterByArea(searchArea)
            }
        
    }) 
/////////////////////////////////////////////////////////////////////////
let searchInput=document.getElementById("search-input");
searchInput.addEventListener("keyup",()=>{
    let searchInputValue=searchInput.value.trim()
    searchRecipes(searchInputValue)
})

async function searchRecipes(searchValue){
    
    if(!searchValue) return;
    let searchUrl=await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${searchValue}&page=1&limit=25`)
    let searchRes=await searchUrl.json()
    let finalSearchRes=searchRes.results
        displayAllMeals(searchRes.results)
}
////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////
recipesGrid.addEventListener("click", async (e) => {
    let clickedCard = e.target.closest(".recipe-card");
    if (!clickedCard) return; 
    let mealId = clickedCard.getAttribute("data-meal-id");
    
    try {
        let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/${mealId}`);
        let data = await response.json();
    
        let recipeDetails = data.result; 
        console.log(recipeDetails.ingredients);
        
        showRecipeDetail(recipeDetails);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
});


// ==========================================

function showRecipeDetail(recipe) {

    mealDetailsSection.classList.remove("hidden");
    mealCategoriesSection.classList.add("hidden");
    allRecipesSection.classList.add("hidden");
    searchFiltersSection.classList.add("hidden");

    let ingredientsHTML = ``;
        for (let item of recipe.ingredients) {
            ingredientsHTML += `
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                    <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                    <span class="text-gray-700">
                        <span class="font-medium text-gray-900">${item.measure || ''}</span> ${item.ingredient || ''}
                    </span>
                </div>
            `;
        }
    let instructionsHTML = '';    
        let stepIndex = 1;

for (let step of recipe.instructions) {
    instructionsHTML += `
        <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                ${stepIndex}
            </div>
            <p class="text-gray-700 leading-relaxed pt-2">${step}</p>
        </div>
    `;
    
    stepIndex++;
}

    let youtubeEmbed = recipe.youtube ? recipe.youtube.replace("watch?v=", "embed/") : ""; // =====>>>  By AI
    let temp = `
    <div class="max-w-7xl mx-auto">
        <button id="back-to-meals-btn" class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
        </button>
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
                <img src="${recipe.thumbnail || ''}" alt="${recipe.name || 'Recipe Image'}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-8">
                    <div class="flex items-center gap-3 mb-3">
                        <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${recipe.category || 'Uncategorized'}</span>
                        ${recipe.area ? `<span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${recipe.area}</span>` : ''}
                    </div>
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${recipe.name || 'Unknown Recipe'}</h1>
                    <div class="flex items-center gap-6 text-white/90">
                        <span class="flex items-center gap-2">
                            <i class="fa-solid fa-clock"></i>
                            <span>30 min</span>
                        </span>
                        <span class="flex items-center gap-2">
                            <i class="fa-solid fa-utensils"></i>
                            <span id="hero-servings">4 servings</span>
                        </span>
                        <span class="flex items-center gap-2">
                            <i class="fa-solid fa-fire"></i>
                            <span id="hero-calories">485 cal/serving</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap gap-3 mb-8">
            <button
                id="log-meal-btn"
                class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                data-meal-id="52772"
                >
                <i class="fa-solid fa-clipboard-list"></i>
                <span>Log This Meal</span>
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- العمود الأيسر: المكونات والخطوات -->
            <div class="lg:col-span-2 space-y-8">

                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-list-check text-emerald-600"></i> Ingredients
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${ingredientsHTML}
                    </div>
                </div>

                <!-- قسم الخطوات -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-shoe-prints text-emerald-600"></i> Instructions
                    </h2>
                    <div class="space-y-4">
                        ${instructionsHTML}
                    </div>
                </div>
                ${youtubeEmbed ? `
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-video text-red-500"></i> Video Tutorial
                    </h2>
                    <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                        <iframe src="${youtubeEmbed}" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
                ` : ''}
            </div>

            <div class="space-y-6">
                <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-chart-pie text-emerald-600"></i> Nutrition Facts
                    </h2>
                    <div id="nutrition-facts-container">
                        <p class="text-sm text-gray-500 mb-4">Click "Analyze" to calculate</p>
                        <button id="analyze-btn" class="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" >
                            Analyze Recipe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    mealDetailsSection.innerHTML = temp;
    
    document.getElementById("back-to-meals-btn").addEventListener("click", () => {
        mealDetailsSection.classList.add("hidden");
        mealCategoriesSection.classList.remove("hidden");
        allRecipesSection.classList.remove("hidden");
        searchFiltersSection.classList.remove("hidden");
    });
    let analyzeBtn=document.getElementById("analyze-btn")
    analyzeBtn.addEventListener("click",()=>{
        let formattedIngredients = recipe.ingredients.map(item => {
            return `${item.measure || ''} ${item.ingredient || ''}`.trim();
        });
        console.log("Sending to Analyze:", formattedIngredients);
        analyzeNutrition(formattedIngredients);
    })
    let logMealBtn = document.getElementById("log-meal-btn");
    if (logMealBtn) {
        logMealBtn.addEventListener("click", () => {
            let loggedMeals = JSON.parse(localStorage.getItem("loggedMeals")) || [];
            
            let mealToLog = {
                id: recipe.id || recipe.idMeal, 
                name: recipe.name,
                thumbnail: recipe.thumbnail,
                category: recipe.category
            };
            
            let exists = loggedMeals.find(m => m.id === mealToLog.id);
            if (!exists) {
                loggedMeals.push(mealToLog);
                localStorage.setItem("loggedMeals", JSON.stringify(loggedMeals));
                Swal.fire({
                    title: "Added!",
                    text: `"${recipe.name}" has been added to your Food Log.`,
                    icon: "success",
                    confirmButtonColor: "#059669"
                });
                
                if (typeof displayLoggedMeals === "function") displayLoggedMeals(); 
            } else {
                Swal.fire({
                    title: "Already Logged",
                    text: "This meal is already in your Food Log.",
                    icon: "info",
                    confirmButtonColor: "#059669"
                });
            }
        });
    }
}
//////////////////////////////////////////////////////////////////////////
const apiKey = "GF6JB8TwGPRdR6cHqzqgL6BBBbzJjhmwdhBp9rNB";

async function analyzeNutrition(ingredientsData) {
    let container = document.getElementById("nutrition-facts-container");
    
    container.innerHTML = `<p class="text-center text-gray-500 py-4">Calculating... <i class="fa-solid fa-spinner fa-spin"></i></p>`;
    try {
        let response = await fetch("https://nutriplan-api.vercel.app/api/nutrition/analyze", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "x-api-key": apiKey 
            },
            body: JSON.stringify({
                ingredients: ingredientsData 
            })
        });

        let nutritionData = await response.json();
        
        console.log("Nutrition Analysis Result:", nutritionData.data.perServing);
        let finaldata=nutritionData.data.perServing
        let temp=`
            <p class="text-sm text-gray-500 mb-4">Per serving</p>

                <div
                class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${finaldata.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
                </div>

                <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">${finaldata.protein}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div
                    class="bg-emerald-500 h-2 rounded-full"
                    style="width: 84%"
                    ></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">${finaldata.carbs}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div
                    class="bg-blue-500 h-2 rounded-full"
                    style="width: 17%"
                    ></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${finaldata.fat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div
                    class="bg-purple-500 h-2 rounded-full"
                    style="width: 12%"
                    ></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">${finaldata.fiber}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div
                    class="bg-orange-500 h-2 rounded-full"
                    style="width: 14%"
                    ></div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">${finaldata.sugar}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div
                    class="bg-pink-500 h-2 rounded-full"
                    style="width: 24%"
                    ></div>
                </div>
                </div>

            <div class="mt-6 pt-6 border-t border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">
                    Vitamins & Minerals (% Daily Value)
                </h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin A</span>
                        <span class="font-medium">15%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin C</span>
                        <span class="font-medium">25%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Calcium</span>
                        <span class="font-medium">4%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Iron</span>
                        <span class="font-medium">12%</span>
                    </div>
                </div>
            </div>
        `
        container.innerHTML = temp;
        
    } catch (error) {
        console.error("Error analyzing nutrition:", error);
    }
}
/////////////////////////////////////////////////////////////////////
///scanner section

let productSearchInput=document.getElementById("product-search-input")
let barcodeInput=document.getElementById("barcode-input")
let productsEmpty=document.getElementById("products-empty")
async function getProductByName(product){
    let productsRes=await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${product}&page=1&limit=24`)
    let productsFinalRes=await productsRes.json()
    displayProducts(productsFinalRes.results)
}

function displayProducts(products){
    let temp=``
    for(let product of products){
        temp+=`
            <div
                    class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                    data-barcode="${product.barcode}"
                >
                    <div
                    class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                    >
                    <img
                        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    />

                    <!-- Nutri-Score Badge -->
                    <div
                        class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                    >
                        Nutri-Score ${product.nutritionGrade.toUpperCase()}
                    </div>

                    <!-- NOVA Badge -->
                    <div
                        class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                        title="NOVA ${product.novaGroup}"
                    >
                        ${product.novaGroup}"
                    </div>
                    </div>

                    <div class="p-4">
                    <p
                        class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                    >
                        ${product.brand}
                    </p>
                    <h3
                        class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                    >
                        ${product.name}
                    </h3>

                    <div
                        class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                    >
                        <span
                        ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                        >
                        <span
                        ><i class="fa-solid fa-fire mr-1"></i>${product.nutrients.calories} kcal/100g</span
                        >
                    </div>

                    <!-- Mini Nutrition -->
                    <div class="grid grid-cols-4 gap-1 text-center">
                        <div class="bg-emerald-50 rounded p-1.5">
                            <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}g</p>
                            <p class="text-[10px] text-gray-500">Protein</p>
                        </div>
                        <div class="bg-blue-50 rounded p-1.5">
                        <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}g</p>
                        <p class="text-[10px] text-gray-500">Carbs</p>
                        </div>
                        <div class="bg-purple-50 rounded p-1.5">
                        <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}g</p>
                        <p class="text-[10px] text-gray-500">Fat</p>
                        </div>
                        <div class="bg-orange-50 rounded p-1.5">
                        <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}g</p>
                        <p class="text-[10px] text-gray-500">Sugar</p>
                        </div>
                    </div>
                    </div>
            </div>
            `
    }
    productsGrid.innerHTML=temp
    productsEmpty.classList.add("hidden")

}

productSearchInput.addEventListener("keyup",()=>{
    let productSearchInputValue=productSearchInput.value.trim()
    if(!productSearchInputValue) return;    
        getProductByName(productSearchInputValue)
    })

//////////////////////////////////////////////////////////////
async function getProductByBarcode(barcode) {
    try {
        let productsRes = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`);
        let productsFinalRes = await productsRes.json();
        
        if (productsFinalRes.result) {
            displayProducts([productsFinalRes.result]);
        } else {
            productsGrid.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <i class="fa-solid fa-barcode text-gray-300 text-4xl mb-2"></i>
                    <p class="text-gray-500">Product not found. Please check the barcode.</p>
                </div>`;
        }
    } catch (error) {
        console.error("Error fetching product by barcode:", error);
    }
}
barcodeInput.addEventListener("keyup", (e) => {
    let barcodeInputValue = barcodeInput.value.trim();
    if (e.key === "Enter" && barcodeInputValue !== "") {
        getProductByBarcode(barcodeInputValue);
    }
});
///////////////////////////////////////////////////////////////
let productCategories=document.getElementById("product-categories")
async function getproductCategories() {
    let categoroiesUrl=await fetch("https://nutriplan-api.vercel.app/api/products/categories")
    let categoroiesUrlRes=await categoroiesUrl.json()
    let categories=categoroiesUrlRes.results;
    let temp=``
    for (let category of categories){
        temp+=`<button
                class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all"
            >
                ${category.name}
            </button>`
    }
    
    productCategories.innerHTML=temp
}
getproductCategories()
///////////////////////////////////////////////////////////////////////////////
// FOOD LOG FUNCTIONS

window.removeLoggedMeal = function(mealId) {
    let loggedMeals = JSON.parse(localStorage.getItem("loggedMeals")) || [];
    let updatedMeals = loggedMeals.filter(meal => String(meal.id) !== String(mealId));
    localStorage.setItem("loggedMeals", JSON.stringify(updatedMeals));
    displayLoggedMeals();
}
function displayLoggedMeals() {
    let loggedItemsList = document.getElementById("logged-items-list");
    if (!loggedItemsList) return;

    let loggedMeals = JSON.parse(localStorage.getItem("loggedMeals")) || [];

    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    loggedMeals.forEach(meal => {
        if(meal.nutrients) {
            totals.calories += meal.nutrients.calories;
            totals.protein += meal.nutrients.protein;
            totals.carbs += meal.nutrients.carbs;
            totals.fat += meal.nutrients.fat;
        }
    });

    let targets = { calories: 2000, protein: 50, carbs: 250, fat: 65 };

    let progressCards = document.querySelectorAll("#foodlog-today-section .grid > div");
    
    if (progressCards.length === 4) {
        let updateCard = (card, current, target, unit, normalColor) => {
            let percentage = Math.min((current / target) * 100, 100).toFixed(0);
            let isOver = current > target;
            let textSpan = card.querySelectorAll("span")[1]; 
            textSpan.innerText = `${current} / ${target} ${unit}`;
            textSpan.className = `text-sm font-bold ${isOver ? 'text-red-500' : 'text-gray-500'}`;

            let bar = card.querySelector(".rounded-full > div");
            bar.style.width = `${percentage}%`;
            bar.className = `${isOver ? 'bg-red-500' : normalColor} h-2.5 rounded-full transition-all duration-500`;
        };

        updateCard(progressCards[0], totals.calories, targets.calories, "kcal", "bg-emerald-500");
        updateCard(progressCards[1], totals.protein, targets.protein, "g", "bg-blue-500");
        updateCard(progressCards[2], totals.carbs, targets.carbs, "g", "bg-amber-500");
        updateCard(progressCards[3], totals.fat, targets.fat, "g", "bg-purple-500");
    }
    let countTitle = document.querySelector("#foodlog-today-section h4");
    if(countTitle) countTitle.innerText = `Logged Items (${loggedMeals.length})`;

    let clearBtn = document.getElementById("clear-foodlog");
    if (clearBtn) clearBtn.style.display = loggedMeals.length > 0 ? "block" : "none";
    if (loggedMeals.length === 0) {
        loggedItemsList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
                <p class="font-medium">No meals logged today</p>
                <p class="text-sm">Add meals from the Recipes page</p>
            </div>`;
    } else {
        let temp = ``;
        for (let meal of loggedMeals) {
            let n = meal.nutrients || { calories: 0, protein: 0, carbs: 0, fat: 0 };
            temp += `
                <div class="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 mb-2 shadow-sm transition-all hover:border-emerald-300">
                    <div class="flex items-center gap-4">
                        <img src="${meal.thumbnail}" class="w-12 h-12 rounded-lg object-cover">
                        <div>
                            <h4 class="font-bold text-gray-900 text-sm">${meal.name}</h4>
                            <div class="text-xs text-gray-500 mt-0.5">
                                1 serving • <span class="text-emerald-600">${meal.type || 'Recipe'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <div class="text-right mr-2 hidden sm:block">
                            <span class="text-base font-bold text-emerald-600">${n.calories}</span>
                            <span class="text-[10px] text-gray-500 uppercase">kcal</span>
                        </div>
                        <div class="flex items-center gap-1.5 hidden md:flex">
                            <span class="bg-gray-50 text-gray-600 text-[11px] px-2 py-1 rounded font-medium">${n.protein}g P</span>
                            <span class="bg-gray-50 text-gray-600 text-[11px] px-2 py-1 rounded font-medium">${n.carbs}g C</span>
                            <span class="bg-gray-50 text-gray-600 text-[11px] px-2 py-1 rounded font-medium">${n.fat}g F</span>
                        </div>
                        <button onclick="removeLoggedMeal('${meal.id}')" class="text-gray-400 hover:text-red-500 p-2 transition-colors">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }
        loggedItemsList.innerHTML = temp;
    }

    let dateObj = new Date();
    let dateElement = document.getElementById("foodlog-date");
    if(dateElement) dateElement.innerText = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}
/////////////////////////////////////////

