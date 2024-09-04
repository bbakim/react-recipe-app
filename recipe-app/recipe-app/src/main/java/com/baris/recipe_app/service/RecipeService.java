package com.baris.recipe_app.service;

import com.baris.recipe_app.model.Recipe;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface RecipeService {
    public Recipe saveRecipe(Recipe recipe);
    public List<Recipe> getAllRecipes();
    public Recipe getRecipe(int id) throws ChangeSetPersister.NotFoundException;
    public Recipe updateRecipe(int id, Recipe recipe);
}
