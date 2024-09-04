import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRecipe from './components/CreateRecipe';
import GetAllRecipe from './components/GetAllRecipes';
import SearchAppBar from './components/SearchAppBar';

function App() {
  return (
    <Router>
      <SearchAppBar />
      <Routes>
        <Route path="/" element={<CreateRecipe />} />
        <Route path="/recipes" element={<GetAllRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
