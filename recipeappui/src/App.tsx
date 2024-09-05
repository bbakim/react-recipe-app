import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRecipe from './components/CreateRecipe';
import GetAllRecipe from './components/GetAllRecipes';
import SearchAppBar from './components/SearchAppBar';
import GetRecipe from './components/GetRecipe';
import UpdateRecipe from './components/UpdateRecipe';

function App() {
  return (
    <Router>
      <SearchAppBar />
      <Routes>
        <Route path="/" element={<CreateRecipe />} />
        <Route path="/recipes" element={<GetAllRecipe />} />
        <Route path="/recipe/:id" element={<GetRecipe />} />
        <Route path="/update/:id" element={<UpdateRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
