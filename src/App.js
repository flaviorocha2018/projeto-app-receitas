import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import ExploreMain from './pages/ExploreMain';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DetailsFoods from './pages/DetailsFoods';
import DetailsDrinks from './pages/DetailsDrinks';
import InProgress from './pages/InProgress';
import Ingredients from './pages/Ingredients';
import Nationalities from './pages/Nationalities';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods/:id" component={ DetailsFoods } />
          <Route exact path="/drinks/:id" component={ DetailsDrinks } />
          <Route exact path="/foods/:id/in-progress" component={ InProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ InProgress } />
          <Route exact path="/explore" component={ ExploreMain } />
          <Route exact path="/explore/foods" component={ Explore } />
          <Route exact path="/explore/drinks" component={ Explore } />
          <Route exact path="/explore/foods/ingredients" component={ Ingredients } />
          <Route exact path="/explore/drinks/ingredients" component={ Ingredients } />
          <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
