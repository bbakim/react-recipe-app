package com.baris.recipe_app.service;

import com.baris.recipe_app.model.Recipe;
import com.baris.recipe_app.repository.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    @Override
    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @Override
    public Recipe getRecipe(int id) {
        return recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
    }

    @Override
    public Optional<Recipe> findByName(String name) {
        return recipeRepository.findByName(name); // Adjust this method call to your repository
    }

    @Override
    public Recipe updateRecipe(int id, Recipe updatedRecipe) {
        Recipe oldRecipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
        oldRecipe.setName(updatedRecipe.getName());
        oldRecipe.setIngredients(updatedRecipe.getIngredients());
        oldRecipe.setUrl(updatedRecipe.getUrl());
        oldRecipe.setCalories(updatedRecipe.getCalories());
        return recipeRepository.save(oldRecipe);
    }

    @Override
    public String deleteRecipe(int id) {
        recipeRepository.deleteById(id);
        return "Recipe deleted";
    }
}
