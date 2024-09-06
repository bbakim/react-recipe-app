import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  url: string;
  calories: number;
}

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract the 'name' query parameter from the URL
  const query = new URLSearchParams(location.search);
  const recipeName = query.get('name');

  useEffect(() => {
    if (recipeName) {
      // Fetch the recipe by name from the backend
      console.log(`Fetching recipe by name: ${recipeName}`);
      
      fetch(`http://localhost:8080/recipe/recipeByName/${encodeURIComponent(recipeName)}`)
        .then((res) => {
          console.log(`Fetch response status: ${res.status}`);
          if (!res.ok) {
            throw new Error('Failed to fetch the recipe');
          }
          return res.json();
        })
        .then((data: Recipe) => {
          setLoading(false);
          console.log('Fetched recipe data:', data);
          if (data && data.id) {
            // Navigate to the recipe detail page if the recipe is found
            navigate(`/recipe/${data.id}`);
          } else {
            setError('Recipe not found');
            console.log('Recipe not found in the fetched data');
          }
        })
        .catch((err) => {
          setError('Recipe not found');
          setLoading(false);
          console.error('Error fetching recipe:', err);
        });
    }
  }, [recipeName, navigate]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // This point is rarely reached since navigation occurs when a recipe is found
  return <Typography>Redirecting to the recipe...</Typography>;
}
