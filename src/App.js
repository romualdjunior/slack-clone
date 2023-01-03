import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Chat from "./Chat"
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvier';


function App() {
  const [{ user }, dispatch] = useStateValue()
  return (
    <div className="App">
      <Router >
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Routes>
                <Route path="/room/:roomId" element={<Chat />} />
                <Route path="/about" element={<div style={{ marginTop: '400px' }}>manger de la banane</div>} />
                <Route path="/" element={<div style={{ marginTop: '400px' }}>manger de la banane</div>} />
              </Routes>
            </div>
          </>
        )}

      </Router>
    </div>
  );
}

export default App;
