package com.baris.recipe_app.service;

import com.baris.recipe_app.model.Recipe;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface RecipeService {
    Recipe saveRecipe(Recipe recipe);
    List<Recipe> getAllRecipes();
    Recipe getRecipe(int id) throws ChangeSetPersister.NotFoundException;
    Recipe updateRecipe(int id, Recipe recipe);
    String deleteRecipe(int id);
}
