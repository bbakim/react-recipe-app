import { FC } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface DeleteRecipeProps {
  recipeId: number;
  onDeleteSuccess: () => void;
}

const DeleteRecipe: FC<DeleteRecipeProps> = ({ recipeId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const response = await fetch(`http://localhost:8080/recipe/delete/${recipeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Recipe deleted successfully!');
          onDeleteSuccess();
        } else {
          alert('Failed to delete the recipe.');
        }
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('An error occurred while deleting the recipe.');
      }
    }
  };

  return (
    <Button 
        variant="contained"
        color="secondary"
        onClick={handleDelete}
        startIcon={<DeleteIcon />}
        style={{ marginTop: '20px' }}
      >
        Delete Recipe
      </Button>
  );
};

export default DeleteRecipe;