package com.baris.recipe_app.controller;

import com.baris.recipe_app.model.Recipe;
import com.baris.recipe_app.service.RecipeService;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipe")
@CrossOrigin
@AllArgsConstructor
public class RecipeController {

    private RecipeService recipeService;

    @PostMapping("/add")
    public Recipe add(@RequestBody Recipe recipe) {
        return recipeService.saveRecipe(recipe);
    }

    @GetMapping("/getAll")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @SneakyThrows
    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable int id) {
        return recipeService.getRecipe(id);
    }

    @GetMapping("/recipeByName/{name}")
    public Optional<Recipe> getRecipeByName(@PathVariable String name) {
        return recipeService.findByName(name);
    }

    @PutMapping("/update/{id}")
    public Recipe update(@PathVariable int id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        return recipeService.deleteRecipe(id);
    }
}
