export const getMeals = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await data.json();
  return result.meals;
};

export const getDrinks = async () => {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await data.json();
  return result.drinks;
};

export const getMealsCat = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const result = await data.json();
  return result.meals;
};

export const getDrinksCat = async () => {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const result = await data.json();
  return result.drinks;
};

export const getAllCategoryMeals = async (input) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`);
  const result = await data.json();
  return result.meals;
};

export const getAllCategoryDrinks = async (input) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${input}`);
  const result = await data.json();
  return result.drinks;
};
