import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Button, Paper } from '@material-ui/core';

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

export default function Recipe() {
  const paperStyle={padding:'50px 20px', width:"96%",margin:"20px auto"}
  const classes = useStyles();
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [url, setUrl] = useState("")
  const [calories, setCalories] = useState<number>(0)
  const handleClick=async(e: { preventDefault: () => void; })=>{
    e.preventDefault()
    const recipe={name,ingredients,url,calories}
    console.log(recipe)
    fetch('http://localhost:8080/recipe/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    }).then(()=>{
        console.log("New Recipe added")
        alert('Recipe added successfully');
    })
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <h1 style={{ textAlign: 'center' }}>Add Recipe</h1>
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
