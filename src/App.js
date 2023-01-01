import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Chat from "./Chat"
import { useState } from 'react';


function App() {
  const [user, setUser] = useState("null")
  return (
    <div className="App">
      <Router >
        {!user ? (
          <h1>LOGIN PAGE</h1>
        ) : (
          <>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Routes>
                <Route path="/room/:roomId" element={<Chat />} />
                <Route path="/about" element={<div style={{ marginTop: '400px' }}>manger de la banane</div>} />
              </Routes>
            </div>
          </>
        )}

      </Router>
    </div>
  );
}

export default App;
