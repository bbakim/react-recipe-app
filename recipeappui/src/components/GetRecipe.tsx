import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  url: string;
  calories: number;
}

export default function GetRecipe() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/recipe/${id}`)
      .then((res) => res.json())
      .then((result) => setRecipe(result))
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <h2>{recipe.name}</h2>
      <p><strong>Id:</strong> {recipe.id}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>URL:</strong> <a href={recipe.url}>{recipe.url}</a></p>
      <p><strong>Calories:</strong> {recipe.calories}</p>
    </Paper>
  );
}
