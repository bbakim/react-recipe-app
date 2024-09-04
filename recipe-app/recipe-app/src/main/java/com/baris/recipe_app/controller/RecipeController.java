package com.baris.recipe_app.controller;

import com.baris.recipe_app.model.Recipe;
import com.baris.recipe_app.service.RecipeService;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/recipe")
@CrossOrigin
@AllArgsConstructor
public class RecipeController {

    private RecipeService recipeService;

    @PostMapping("/add")
    public String add(@RequestBody Recipe recipe) {
        recipeService.saveRecipe(recipe);
        return "New recipe is added";
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

    @PutMapping("/update/{id}")
    public Recipe update(@PathVariable int id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe);
    }
}
