export const getMeals = async () => {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await data.json();
    return result.meals;
  } catch (e) {
    console.log(e);
  }
};

export const getDrinks = async () => {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await data.json();
    return result.drinks;
  } catch (e) {
    console.log(e);
  }
};

export const getMealsCat = async () => {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const result = await data.json();
    return result.meals;
  } catch (e) {
    console.log(e);
  }
};

export const getDrinksCat = async () => {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const result = await data.json();
    return result.drinks;
  } catch (e) {
    console.log(e);
  }
};

export const getAllCategoryMeals = async (input) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`);
    const result = await data.json();
    return result.meals;
  } catch (e) {
    console.log(e);
  }
};

export const getAllCategoryDrinks = async (input) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${input}`);
    const result = await data.json();
    return result.drinks;
  } catch (e) {
    console.log(e);
  }
};

export const filterMeals = async (input) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`);
    const result = await data.json();
    return result.meals;
  } catch (e) {
    console.log(e);
  }
};

export const searchMeals = async (type, input) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${type}=${input}`);
    const result = await data.json();
    return result.meals;
  } catch (e) {
    console.log(e);
  }
};

export const filterDrinks = async (input) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`);
    const result = await data.json();
    return result.drinks;
  } catch (e) {
    console.log(e);
  }
};

export const searchDrinks = async (type, input) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${input}`);
    const result = await data.json();
    return result.drinks;
  } catch (e) {
    console.log(e);
  }
};

export const detailsFoods = async (input) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${input}`);
    const result = await data.json();
    return result.meals;
  } catch (e) {
    console.log(e);
  }
};

export const detailsDrinks = async (input) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${input}`);
    const result = await data.json();
    return result.drinks;
  } catch (e) {
    console.log(e);
  }
};

export const surpriseAPI = async (input) => {
  try {
    const url = input === 'Explore Foods' ? 'themealdb' : 'thecocktaildb';
    const data = await fetch(`https://www.${url}.com/api/json/v1/1/random.php`);
    const result = await data.json();
    return input === 'Explore Foods' ? result.meals[0].idMeal : result.drinks[0].idDrink;
  } catch (e) {
    console.log(e);
  }
};

export const getIngredientsFoods = async () => {
  try {
    const LIMIT = 12;
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const result = await data.json();
    const limitedResults = result.meals.slice(0, LIMIT);
    return limitedResults;
  } catch (e) {
    console.log(e);
  }
};

export const getIngredientsDrinks = async () => {
  try {
    const LIMIT = 12;
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const result = await data.json();
    const limitedResults = result.drinks.slice(0, LIMIT);
    return limitedResults;
  } catch (e) {
    console.log(e);
  }
};

export const getNation = async () => {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const result = await data.json();
    return result.meals;
  } catch (e) {
    console.log(e);
  }
};
