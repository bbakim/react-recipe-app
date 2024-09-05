import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Paper } from '@material-ui/core';

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
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/recipe/${id}`)
      .then((res) => res.json())
      .then((result) => setRecipe(result))
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleUpdateClick = () => {
    navigate(`/update/${recipe.id}`);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <h2>{recipe.name}</h2>
      <p><strong>Id:</strong> {recipe.id}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>URL:</strong> <a href={recipe.url}>{recipe.url}</a></p>
      <p><strong>Calories:</strong> {recipe.calories}</p>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleUpdateClick}
        style={{ marginTop: '20px' }}
      >
        Update Recipe
      </Button>
    </Paper>
  );
}
