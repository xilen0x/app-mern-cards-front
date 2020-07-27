import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation'
import NotesList from './components/NotesList'
import CreateNotes from './components/CreateNotes'
import CreateUser from './components/CreateUser'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact component={NotesList} />
      <Route path="/edit/:id" component={CreateNotes} />
      <Route path="/create" component={CreateNotes} />
      <Route path="/user" component={CreateUser} />
    </BrowserRouter>
  );
}

export default App;
