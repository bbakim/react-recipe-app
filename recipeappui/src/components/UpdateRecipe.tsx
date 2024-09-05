import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Button, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '99%',
      },
    },
    button: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
  }),
);

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  url: string;
  calories: number;
}

export default function UpdateRecipe() {
  const { id } = useParams<{ id: string }>();
  const paperStyle={padding:'50px 20px', width:"96%",margin:"20px auto"}
  const classes = useStyles();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [url, setUrl] = useState("")
  const [calories, setCalories] = useState<number>(0)
  useEffect(() => {
    fetch(`http://localhost:8080/recipe/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setRecipe(result);
        setName(result.name);
        setIngredients(result.ingredients);
        setUrl(result.url);
        setCalories(result.calories);
      })
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [id])
  const handleClick=async(e: React.FormEvent)=>{
    e.preventDefault()
    const updatedRecipe={name,ingredients,url,calories}
    fetch(`http://localhost:8080/recipe/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    }).then(()=>{
        console.log("Recipe updated")
        alert('Recipe updated successfully');
    })
    .catch((error) => {
      console.error('Error updating recipe:', error);
      alert('Failed to update the recipe');
    });
  }

  if (!recipe) {
    return <div>Unable to get recipe...</div>;
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <h1 style={{ textAlign: 'center' }}>Update Recipe</h1>
        <Paper elevation={3} style={paperStyle}>
          <div>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <TextField
              required
              id="ingredients"
              label="Ingredients"
              variant="outlined"
              value={ingredients}
              onChange={(e)=>setIngredients(e.target.value)}
            />
            <TextField
              required
              id="url"
              label="URL"
              variant="outlined"
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
            />
            <TextField
              required
              id="calories"
              label="Calories"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={calories}
              onChange={(e)=>setCalories(parseInt(e.target.value))}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ display: 'block', margin: '0 auto' }}
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={handleClick}
          >
            Submit
          </Button>
        </Paper>
      </form>
    </div>
  );
}
