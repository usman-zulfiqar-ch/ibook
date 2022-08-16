
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';




function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (messege, type)=>{
    setAlert({
      msg: messege,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 4000);
  }
  return (
    <> 
      <NoteState>
       <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container"> 
        <Routes>
            <Route exact path="/" element={< Home  showAlert={showAlert} />} />
        </Routes>
         <Routes>
            <Route path="/about" element={< About />} />
        </Routes>
         <Routes>
            <Route path="/login" element={< Login showAlert={showAlert}/>} />
        </Routes>
         <Routes>
            <Route path="/signup" element={< Signup showAlert={showAlert} />} />
        </Routes>
        </div>
        </Router>
        </NoteState>
    </>
      
  
  );
}

export default App;
