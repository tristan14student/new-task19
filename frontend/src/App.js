import React from 'react';

import './App.css';
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import Tracks from './components/Tunes'
import iBooks from './components/eBooks'
import userFavorite from './components/myfave'




class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
      <div>
        <h1>Noisy</h1>
        <ul className="head">
          <li><NavLink exact to="/">Home</NavLink> </li>
          <li><NavLink to="/music">Music</NavLink></li>
          <li><NavLink to="/Books">Books</NavLink></li>
          <li><NavLink to="/favourites">favourites</NavLink></li>
          
        </ul>
        <div className="content">
            <Route exact path="/music" component={Tracks} />
            <Route path="/books" component={iBooks} />
            <Route path="/favourites" component={userFavorite}/>
           
            
        </div>
      </div>
      </BrowserRouter>
    )}}
      

export default App;
