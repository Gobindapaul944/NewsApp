
import './App.css';
import React, { Component } from 'react'
import NavBar from './Component/NavBar';
import News from './Component/News';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
       <NavBar/> 
        <Routes>
        <Route exact path="/" element={<News key="general" pageSize={3} country="in" category="general"/>}/> 
        <Route exact path="/business" element={<News  key="business" pageSize={3} country="in" category="business"/>}/> 
        <Route exact path="/Entertainment" element={<News  key="Entertainment" pageSize={3} country="in" category="Entertainment"/>}/> 
        <Route exact path="/health" element={<News  key="health" pageSize={3} country="in" category="health"/>}/> 
        <Route exact path="/sports" element={<News key="sports" pageSize={3} country="in" category="sports"/>}/> 
        <Route exact path="/science" element={<News  key="science" pageSize={3} country="in" category="science"/>}/> 
        <Route exact path="/technology" element={<News  key="technology" pageSize={3} country="in" category="technology"/>}/> 
       </Routes>
      
      </div>
      </BrowserRouter>
    )
  }
}



