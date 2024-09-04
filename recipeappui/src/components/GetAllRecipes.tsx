import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';

const paperStyle = { padding: '50px 20px', width: "95%", margin: '20px auto' };

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  url: string;
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/recipe/getAll")
      .then(res => res.json())
      .then(result => setRecipes(result))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Recipes</h1>
      <Paper elevation={3} style={paperStyle}>
        {recipes.map(recipe => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={recipe.id}
          >
            Id: {recipe.id}<br />
            Name: {recipe.name}<br />
            Ingredients: {recipe.ingredients}<br />
            URL: {recipe.url}<br />
          </Paper>
        ))}
      </Paper>
    </div>
  );
}
