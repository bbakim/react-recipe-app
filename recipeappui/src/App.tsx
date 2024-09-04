import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList'; // Import your new RecipeList component
import SearchAppBar from './components/SearchAppBar';

function App() {
  return (
    <Router>
      <SearchAppBar />
      <Routes>
        <Route path="/" element={<Recipe />} />
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </Router>
  );
}

export default App;
