import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Paper } from '@material-ui/core';
import DeleteRecipe from './DeleteRecipe';
import EditIcon from '@material-ui/icons/Edit';
import ImageUpload from './ImageUpload';

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
    return <div>Recipe not found...</div>;
  }

  const handleUpdateClick = () => {
    navigate(`/update/${recipe.id}`);
  };

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  const imagePath = `/recipe-images/${recipe.id}.png`;
  
  return (
    <Paper elevation={3} style={{
        padding: '20px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <h2>{recipe.name}</h2>
      <img src={imagePath} alt={recipe.name} style={{ maxWidth: '300px', marginTop: '20px' }} />
      <ImageUpload recipeId={recipe.id} />
      <p><strong>Id:</strong> {recipe.id}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>URL:</strong> <a href={recipe.url}>{recipe.url}</a></p>
      <p><strong>Calories:</strong> {recipe.calories}</p>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleUpdateClick}
        >
          Update Recipe
        </Button>
        <DeleteRecipe recipeId={recipe.id} onDeleteSuccess={handleDeleteSuccess} />
      </div>
    </Paper>
  );
}
