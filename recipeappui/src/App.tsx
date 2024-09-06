import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRecipe from './components/CreateRecipe';
import GetAllRecipe from './components/GetAllRecipes';
import SearchAppBar from './components/SearchAppBar';
import GetRecipe from './components/GetRecipe';
import UpdateRecipe from './components/UpdateRecipe';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <Router>
      <SearchAppBar />
      <Routes>
        <Route path="/" element={<CreateRecipe />} />
        <Route path="/recipes" element={<GetAllRecipe />} />
        <Route path="/recipe/:id" element={<GetRecipe />} />
        <Route path="/update/:id" element={<UpdateRecipe />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
