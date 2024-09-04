package com.baris.recipe_app.service;

import com.baris.recipe_app.model.Recipe;

import java.util.List;

public interface RecipeService {
    public Recipe saveRecipe(Recipe recipe);
    public List<Recipe> getAllRecipes();
    public Recipe updateRecipe(int id, Recipe recipe);
}
